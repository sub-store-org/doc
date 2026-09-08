---
title: 脚本使用
description: 脚本怎么用：填写位置、参数传递、分支控制、缓存与超时应对
---

# 脚本使用

## 在哪里填写脚本

- **订阅编辑页 → 节点操作 → 脚本操作 / 节点筛选 → 脚本筛选**：填写脚本内容，或填写**脚本链接**（远程脚本，如 `https://raw.githubusercontent.com/.../xxx.js#参数=值`）
- **文件编辑页 → 脚本操作**：处理文件内容
- 脚本链接后可用 `#` 传参数，例如 `#show_latency=true&timeout=1000`

## 参数传递

| 来源 | 说明 |
| --- | --- |
| `$arguments` | 脚本参数（编辑页配置的参数字段） |
| `$options` | 通过**输出链接**传入的参数（`?$options=...`），含 `_req`（本次请求信息：method/url/path/query/params/headers/body，可用于按 UA 分支）与 `_res`（可设置响应头和状态码） |
| 链接参数 | `url`、`content`、`target`、`ua`、`proxy` 等通用参数同样生效 |

::: warning
**参数值需要 encodeURIComponent 编码**。编辑页面左下角的「即时预览」只是获取数据，并不是真实请求，此时 `$options`/`$options._req` 不可用。
:::

`$options` 传法示例（先 `encodeURIComponent`）：

```
/api/file/foo?$options=%7B%22arg1%22%3A%22a%22%2C%22arg2%22%3A%22b%22%7D
```

## 常用能力速览

### 读取文件 / 订阅产物

```javascript
const sni = await produceArtifact({
  type: 'file',       // 'file' | 'subscription' | 'collection'
  name: 'sni'         // 文件名 / 订阅名
})
$server.sni = sni     // 文件内容用到了节点上
```

`produceArtifact` 支持 `platform`（目标平台）与 `produceType`（`internal` 返回数组，否则返回字符串）。

### 分支控制后续操作

`context.process` 可在脚本中决定后续 action 是否执行（按 `customName` 匹配，只影响当前脚本之后的 action）：

```javascript
if ($options?._req) {
  const ua = $options._req.headers?.['user-agent']
  context.process = /Surge/i.test(ua)
    ? { type: 'enable', customNames: ['branch-b'] }
    : { type: 'enable', customNames: ['branch-c'] }
}
```

### 读取原始内容

`context.raw` 为处理前的原始订阅内容（数组）；`context.source` 为订阅/组合订阅数据，可用 `_subName`、`_collectionName` 等快捷取名称。

### 脚本缓存

```javascript
const cache = scriptResourceCache
cache.set('a:1', 1, 1000)      // 第三个参数为自定义过期时间（毫秒）
cache.get('a:1')
cache.gettime('a:1')
cache._cleanup(undefined, 1000) // 清理过期项（可加前缀/自定义过期时间）
```

### 发请求

```javascript
const $ = $substore
const { body, statusCode } = await $.http.post({
  url: 'https://example.com/api',
  headers: { 'user-agent': '...' },
  timeout: 5000,
  body: JSON.stringify({ a: 1 })
})
```

## 超时应对

使用脚本的请求可能较慢，导致客户端拉取超时：

1. 在脚本中开启缓存（参数一般为 `cache=true`），并配合[定时处理订阅](../subscription/overview)预热缓存
2. 或配置 Gist 定时上传，让客户端拉取 Gist 链接
3. 或创建同步配置定时触发处理（不上传产物）

详见[故障排查 - 脚本请求超时](../guide/troubleshooting)。

## 参考

- 官方 Wiki：[脚本使用说明](https://github.com/sub-store-org/Sub-Store/wiki/脚本使用说明)
- [demo.js](https://github.com/sub-store-org/Sub-Store/blob/master/scripts/demo.js)（最全面的示例与字段说明）
- 快捷脚本说明：节点操作[快捷脚本](https://telegram.me/zhetengsha/970)、脚本筛选[快捷脚本](https://telegram.me/zhetengsha/1009)
- [使用本地配置项控制脚本操作示例](https://zhetengsha.eu.org/blog/posts/3402)
