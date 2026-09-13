---
title: 脚本 API
description: 脚本 API 参考：operator 签名、全局对象、节点内部字段、ProxyUtils 与工具函数
---

# 脚本 API

## 函数式脚本签名

```javascript
function operator(proxies = [], targetPlatform, context) {
  // proxies: 传入的内部节点数组
  // targetPlatform: 输出的目标平台（如 'Surge'、'ClashMeta'、'sing-box'）
  // context: 上下文（env / process / raw / source）
  return proxies
}
```

## 全局对象

| 对象 | 说明 |
| --- | --- |
| `$server` | 快捷脚本中的当前节点（快捷脚本与函数式写法二选一） |
| `$arguments` | 脚本参数（编辑页配置的参数字段） |
| `$options` | 通过输出链接传入的参数；含 `_req`（本次请求信息）与 `_res`（可设置响应头/状态码） |
| `$content` / `$files` | 文件脚本中的内容/文件数组，会传递给下一个操作 |
| `$substore` | OpenAPI 客户端（`$.http.get/post`、`$.info` 等），源码见 `backend/src/vendor/open-api.js` |
| `scriptResourceCache` | 脚本缓存：`set(key, value, ttlMs)` / `get(key)` / `gettime(key)` / `_cleanup(prefix, ttlMs)` / `revokeAll()` |
| `ProxyUtils` | 节点处理工具集，见下方 |
| `produceArtifact` | 读取其他订阅/组合订阅/文件的产物：`produceArtifact({ type, name, platform, produceOpts, produceType })` |
| `flowUtils` | 机场订阅流量信息处理工具 |
| `DOMAIN_RESOLVERS` | 内置域名解析配置 |
| `require` | Node.js 环境的 `require`，可引入模块（如 `eval(require("fs"))`） |

### 请求信息 `_req`

`$options._req` 结构：`{ method, url, path, query, params, headers, body, socket: { remoteAddress } }`

### 自定义响应 `_res`

```javascript
if ($options) {
  $options._res = { headers: { 'X-Custom': '1' } } // 自定义响应头
  // 或
  $options._res = { status: 404 }                  // 自定义响应状态码
}
```

## 节点内部字段（常用）

| 字段 | 说明 |
| --- | --- |
| `_subName` / `_subDisplayName` | 当前节点所属单条订阅的名称/显示名 |
| `_collectionName` / `_collectionDisplayName` | 当前节点所属组合订阅的名称/显示名 |
| `underlying-proxy` | 前置代理（自动转换平台写法：mihomo `dialer-proxy`、sing-box `detour`、Egern `prev_hop`、Shadowrocket `chain`） |
| `_no-resolve` | 不解析域名 |
| `_resolved` / `_IPv4` / `_IPv6` / `_IP` / `_IP4P` / `_domain` / `_resolved_ips` | 域名解析相关（解析后自动写入） |
| `tls-fingerprint` | TLS 指纹 |
| `test-url` / `test-timeout` | 测延迟链接/超时 |
| `ports` / `hop-interval` | 端口跳跃 |
| `ip-version` | 节点使用 IP 版本（自动转换各家写法） |
| `block-quic` | QUIC 策略（`auto`/`on`/`off`） |
| `interface-name` | 出站接口（Surge 也可用 `interface`） |
| `keystore-private-key` / `keystore-client-cert` | Surge `[Keystore]` 密钥库条目名 |
| `_qx_obfs_http` | QX 的 http obfs 原始值（`http` / `vmess-http` / `shadowsocks-http` 等） |

节点结构整体参考 mihomo，可参考 mihomo 文档设置更多字段（如 `xudp`、`smux`）；也可在预览界面点击节点查看完整 JSON，或用 `target=JSON` 查看。

## ProxyUtils

```javascript
const ProxyUtils = {
  parse,           // 订阅解析
  process,         // 节点操作/文件操作
  processResponse, // 修改响应处理（对应「修改响应」功能）
  produce,         // 输出订阅
  getRandomPort,   // 随机端口（参考 ports 格式 443,8443,5000-6000）
  ipAddress,       // ip-address 库
  isIPv4, isIPv6, isIP,
  yaml,            // YAML 解析和生成（yaml.load / safeLoad / dump / safeDump）
  getFlag,         // 获取 emoji 旗帜
  removeFlag,      // 移除 emoji 旗帜
  getISO,          // 获取 ISO 3166-1 alpha-2 代码
  Gist,            // Gist 类
  download,        // 下载文本
  downloadFile,    // 下载二进制文件
  age: { encrypt, decrypt },  // age 加解密
  MMDB,            // Node.js 版模拟 $utils.ipasn / ipaso / geoip
  isValidUUID,
  doh,             // DNS over HTTPS 解析
  Buffer,          // feross/buffer
  Base64,          // js-base64
  JSON5,
  hex_md5,
}
```

为兼容 Sparkle 的 JavaScript 覆写，也可直接用 `b64d`（Base64 解码）、`b64e`（Base64 编码）、`Buffer`、`yaml`。

## context

- `context.env`：环境信息（运行版本和后端信息）
- `context.process`：动态控制本次处理中后续 action 的执行（`{ type: 'disable'|'enable', customNames: [...] }`），只影响当前脚本之后的 action；脚本操作与修改响应各自独立
- `context.raw`：原始订阅内容（单条订阅为数组；组合订阅为 `{ 订阅名: 数组 }`）
- `context.source`：订阅/组合订阅数据（`source._collection` 存在与否用来判断脚本设在单条订阅还是组合订阅上）

## 示例

### 节点操作：保留一小时内有效缓存并修改节点

```javascript
async function operator(proxies, targetPlatform, context) {
  scriptResourceCache._cleanup(undefined, 1 * 3600 * 1000)
  return proxies
}
```

### 文件脚本：读取组合订阅并插入 YAML

```javascript
const yaml = ProxyUtils.yaml.safeLoad($content ?? $files[0])
let proxies = await produceArtifact({
  type: 'collection',
  name: '机场',
  platform: 'ClashMeta',
  produceType: 'internal'
})
yaml.proxies.unshift(...proxies)
$content = ProxyUtils.yaml.dump(yaml)
```

### 文件脚本：读配置文件控制行为

```javascript
const config = (ProxyUtils.JSON5 || JSON).parse(await produceArtifact({
  type: 'file',
  name: 'config'
}))
$server.reuse = config.reuse
```

## 参考

- 完整字段说明与更多示例：[demo.js](https://github.com/sub-store-org/Sub-Store/blob/master/scripts/demo.js)
- `$substore` 源码：[open-api.js](https://raw.githubusercontent.com/sub-store-org/Sub-Store/refs/heads/master/backend/src/vendor/open-api.js)
- 缓存行为：见 [订阅概览 - 缓存机制](../subscription/overview)
