---
title: 脚本概览
description: Sub-Store 脚本能做什么：节点操作、节点筛选、文件处理、修改响应与自动化
---

# 脚本概览

Sub-Store 内置 JavaScript 脚本能力，用来实现前端可视化操作无法完成的自定义逻辑。

## 脚本位置

- **节点操作 → 脚本操作**：对每个节点进行修改（如改属性、改名称、SNI、前置代理等）
- **节点筛选 → 脚本筛选**：返回布尔值，决定节点是否保留
- **文件 → 脚本操作**：处理文件内容（如生成配置、转换模板）
- **修改响应**：在输出时修改响应头/状态码/内容（需要 `SUB_STORE_FRONTEND_BACKEND_PATH`，见[环境变量](../reference/environment-variables)）

## 两种写法

1. **快捷脚本**：直接操作 `$server`（当前节点），适合简单修改，例如：

```javascript
$server.name = `[${ProxyUtils.getISO($server.name)}] ${$server.name}`
$server['underlying-proxy'] = '名称'
```

2. **函数式脚本**：`operator(proxies, targetPlatform, context)`，拿到完整的节点数组和上下文，适合复杂逻辑：

```javascript
function operator(proxies, targetPlatform, context) {
  // proxies 为节点数组，可整体处理
  return proxies
}
```

::: warning
函数式写法与快捷脚本写法**只能二选一**，不能混用。
:::

## 常见用途

- **节点测试**：测活、测延迟、节点测速、UDP 检测、落地/入口检测等（配合 HTTP-META 可本地执行）
- **节点增强**：按名称提取流量信息、标记地区、改协议参数（如 QX obfs）、去重、排序等
- **文件生成**：动态生成 mihomo / sing-box / Surfboard 配置
- **自动化**：定时处理订阅预热缓存、读取文件配置控制脚本行为

## 资源和参考

- 官方示例：[scripts/demo.js](https://github.com/sub-store-org/Sub-Store/blob/master/scripts/demo.js)（字段说明、工具用法、示例齐全，写脚本前先看它）
- 官方 Wiki：[脚本使用说明](https://github.com/sub-store-org/Sub-Store/wiki/脚本使用说明)
- 社区脚本合集：[折腾啥博客 - 脚本板块](https://zhetengsha.eu.org/blog/240/)
  - [节点测活（完善版）](https://zhetengsha.eu.org/blog/posts/1210)
  - [节点测速](https://zhetengsha.eu.org/blog/posts/1258)
  - [UDP 检测](https://zhetengsha.eu.org/blog/posts/1431)
  - [检测落地](https://zhetengsha.eu.org/blog/posts/1269) / [检测入口](https://zhetengsha.eu.org/blog/posts/1358)
  - [给订阅添加流量/过期信息的节点](https://zhetengsha.eu.org/blog/posts/948)
  - [使用本地配置项控制脚本操作示例](https://zhetengsha.eu.org/blog/posts/3402)
- 编辑页面支持**即时预览**，可复制全部节点名，也可复制「AI 修改节点」示范提示词让 AI 帮你写脚本

## 注意

- 使用脚本但不开缓存时，每次请求都可能耗时过长导致超时，应对方法见 [故障排查](../guide/troubleshooting) 与 [订阅概览](../subscription/overview)
- 脚本 API 完整参考见 [脚本 API](./api)，运行方式见 [脚本使用](./usage)
