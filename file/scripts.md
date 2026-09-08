---
title: 文件脚本
description: 文件脚本操作：修改文件内容、插入本地节点、动态生成配置
---

# 文件脚本

在文件编辑页的「脚本操作」中填写脚本（或脚本链接），可以动态修改、生成文件内容。

## 基本对象

- `$content`：文件最终内容（可赋值覆盖输出）
- `$files`：文件内容数组（脚本处理时的输入）
- `$options` / `$arguments`：参数，见 [脚本使用](../script/usage)
- `produceArtifact`：读取订阅/组合订阅/其他文件的产物

## 示例

### 往 YAML 文件里插入本地节点

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

### Base64 编码输出

```javascript
$content = ProxyUtils.Base64.encode($content ?? $files[0])
```

### 读取文件配置控制脚本行为

```javascript
const config = (ProxyUtils.JSON5 || JSON).parse(await produceArtifact({
  type: 'file',
  name: 'config' // 文件名
}))
$server.reuse = config.reuse
```

## 用脚本生成配置

文件脚本常与「远程文件模板」配合生成配置：

- 远程链接填模板文件（如 sing-box 模板 `sing-box.tpl.json`），脚本操作填转换脚本（见 [生成 sing-box 配置](https://zhetengsha.eu.org/blog/posts/1070)）
- 或用 `produceArtifact` 直接输出订阅产物：

```javascript
let proxies = await produceArtifact({
  type: 'subscription', // 'subscription' 订阅 或 'collection' 组合订阅
  name: 'sub',          // 订阅的 name
  platform: 'Surge',    // 目标平台
  produceOpts: {
    'include-unsupported-proxy': true,
  }
})
$content = proxies
```

## 修改响应

文件/订阅输出时也可以通过脚本修改响应头与状态码（`$options._res`），例如按请求 User-Agent 返回不同的内容或状态码。此功能需要设置 `SUB_STORE_FRONTEND_BACKEND_PATH` 环境变量，见[环境变量](../reference/environment-variables)。

## 参考

- [demo.js](https://github.com/sub-store-org/Sub-Store/blob/master/scripts/demo.js)（文件脚本示例集中在后半部分）
- [文件概览](./overview)
