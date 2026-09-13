---
title: 脚本示例
description: 常用脚本示例：节点操作、筛选、测活、流量信息、排序与去重
---

# 脚本示例

以下是常用场景的脚本示例。完整 API 参考见 [脚本 API](./api)，使用方式见 [脚本使用](./usage)。

## 节点操作

### 给节点名添加 ISO 国家代码前缀

```javascript
$server.name = `[${ProxyUtils.getISO($server.name)}] ${$server.name}`
```

### 给节点名添加旗帜（把台湾旗帜替换为 WS）

```javascript
$server.name = `[${ProxyUtils.getFlag($server.name).replace(/🇹🇼/g, '🇼🇸')}] ${ProxyUtils.removeFlag($server.name)}`
```

### 设置前置代理

```javascript
$server['underlying-proxy'] = '节点名称'
// 只给 mihomo 输出也可以用 dialer-proxy
// 只给 sing-box 输出也可以用 detour
```

### 设置 SNI（从文件读取）

```javascript
const sni = await produceArtifact({
  type: 'file',
  name: 'sni'
})
$server.sni = sni
```

### 从配置文件读取并控制节点行为

```javascript
const config = (ProxyUtils.JSON5 || JSON).parse(await produceArtifact({
  type: 'file',
  name: 'config'
}))
$server.reuse = config.reuse
```

## 脚本筛选

### 排除指定协议

```javascript
return !['hysteria2', 'hysteria', 'tuic', 'juicity'].includes($server.type)
```

### 只保留特定地区节点

```javascript
return /港|hk|hongkong|🇭🇰|日|jp|japan|🇯🇵|美|us|🇺🇸/i.test($server.name)
```

## 节点测活

使用脚本链接（节点操作 → 脚本操作 → 链接）：

**Loon / Surge：**

```
https://raw.githubusercontent.com/xream/scripts/main/surge/modules/sub-store-scripts/check/availability.js#show_latency=true&keep_incompatible=true&status=204&url=http%3A%2F%2Fconnectivitycheck.platform.hicloud.com%2Fgenerate_204&timeout=1000&retries=1&retry_delay=1000&concurrency=10
```

**Node.js 版（需要 [HTTP-META](../advanced/http-meta)，Docker 版用带 `http-meta` tag 的镜像，Android 模块版内置）：**

```
https://raw.githubusercontent.com/xream/scripts/main/surge/modules/sub-store-scripts/check/http_meta_availability.js#show_latency=true&keep_incompatible=true&status=204&url=http%3A%2F%2Fconnectivitycheck.platform.hicloud.com%2Fgenerate_204&timeout=1000&retries=1&retry_delay=1000&concurrency=10&http_meta_protocol=http&http_meta_host=127.0.0.1&http_meta_port=9876&http_meta_start_delay=3000&http_meta_proxy_timeout=10000
```

常用参数：`timeout`（调小）、`show_latency`（节点名加延迟）、`keep_incompatible`、`url`/`status`（需 encodeURIComponent）。详见 [折腾啥博客](https://zhetengsha.eu.org/blog/posts/1210)。

## 流量/过期信息节点

给订阅添加一个显示流量和过期信息的虚拟节点：

```
https://raw.githubusercontent.com/xream/scripts/main/surge/modules/sub-store-scripts/sub-info/node.js
```

支持通过订阅链接参数设置重置周期：

- 每月固定日重置：`#resetDay=19`
- 固定天数重置：`#cycleDays=31&startDate=2024-06-04`
- 显示剩余流量：`#showRemaining`

详见 [折腾啥博客](https://zhetengsha.eu.org/blog/posts/948)。

## 按延迟排序

参考 [折腾啥博客](https://zhetengsha.eu.org/blog/posts/1966)。

## 节点按 IP+端口去重

参考 [折腾啥博客](https://zhetengsha.eu.org/blog/posts/2314)。

## 域名解析多 IP 裂变

将一个域名节点裂变为多个 IP 节点，参考 [折腾啥博客](https://zhetengsha.eu.org/blog/posts/2559)。

## 标记 IPv6 节点

参考 [折腾啥博客](https://zhetengsha.eu.org/blog/posts/2197)。

## 修改 QX obfs

QX 中 SS 的 http obfs 与 VMess 的 http obfs 实现不同，特殊服务端下需要互相替换：

- `obfs=http` → `obfs=vmess-http`（SS 协议使用 VMess 的 http 混淆）
- `obfs=http` → `obfs=shadowsocks-http`（VMess 协议使用 SS 的 http 混淆）

参考 [折腾啥博客](https://zhetengsha.eu.org/blog/posts/3777)。

## 通过机场节点更新机场订阅

在单条订阅中使用脚本操作，自动取一个有效节点写回订阅的代理设置：

```javascript
function operator(proxies, targetPlatform, context) {
  const SUBS_KEY = 'subs'
  const $ = $substore
  const { source } = context
  if (source._collection) throw new Error('不支持组合订阅, 请在单条订阅中使用此脚本')
  const proxy = proxies.find(p => p.name.includes('🇭🇰'))
  const subs = $.read(SUBS_KEY).map(sub => {
    if (sub.name === proxy._subName) {
      sub.proxy = ProxyUtils.produce([proxy], 'Surge')
      console.log(`订阅 ${proxy._subDisplayName || proxy._subName} 写入代理/策略 ${sub.proxy}`)
    }
    return sub
  })
  $.write(subs, SUBS_KEY)
  return proxies
}
```

参考 [折腾啥博客](https://zhetengsha.eu.org/blog/posts/5726)。

## 清理脚本缓存

在脚本操作前面添加一个脚本操作，保留 1 小时缓存：

```javascript
async function operator() {
  scriptResourceCache._cleanup(undefined, 1 * 3600 * 1000)
}
```

清掉所有脚本缓存：

```javascript
async function operator() {
  scriptResourceCache.revokeAll()
}
```

## 更多脚本

- [节点测速](https://zhetengsha.eu.org/blog/posts/1258)
- [UDP 检测](https://zhetengsha.eu.org/blog/posts/1431)
- [GPT 检测](https://zhetengsha.eu.org/blog/posts/1209)
- [节点丢包率统计](https://zhetengsha.eu.org/blog/posts/6149)
- [检测落地](https://zhetengsha.eu.org/blog/posts/1269)
- [检测入口](https://zhetengsha.eu.org/blog/posts/1358)
- [入口 & 落地 检测完整示例](https://zhetengsha.eu.org/blog/posts/1415)
- [从节点名称提取流量信息和套餐等级](https://zhetengsha.eu.org/blog/posts/2657)
