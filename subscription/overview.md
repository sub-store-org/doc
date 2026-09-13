---
title: 订阅概览
description: Sub-Store 订阅管理：单条订阅、组合订阅、缓存机制、代理策略与链接参数
---

# 订阅概览

「订阅」页是 Sub-Store 的核心，用来统一管理你的订阅链接与节点数据。

## 单条订阅

单条订阅（subscription）包含：

- **远程订阅链接**：机场或服务商给的订阅地址（可多个）
- **本地内容**：直接填写的本地节点/订阅数据，见 [本地节点与订阅](./local)
- **名称与显示名称**：`name` 用于内部引用（脚本、链接参数），`displayName` 用于显示
- **User-Agent**：拉取远程订阅时使用的 UA（部分机场会按 UA 区分协议下发）
- **代理/策略**：拉取订阅时走代理 App 的策略或指定代理
- **超时**：拉取请求超时时间（毫秒）
- **失败处理**：订阅拉取失败时的行为（严格报错 / 跳过）

保存后即可获得该订阅的**输出链接**，格式为 `/download/<name>`（通用链接），自动根据请求的 User-Agent 输出对应格式；也可通过 `target` 参数指定输出格式，见 [订阅转换](./conversion)。

## 组合订阅

组合订阅（collection）把多条单条订阅合并为一条输出，适合把多个机场合并成一个链接使用，见 [组合订阅](./collection)。

## 缓存机制

- 拉取 Sub-Store 订阅时，若包含远程订阅，且**无缓存 / 缓存已过期 / 远程订阅设置了 `noCache`**，才会重新拉取远程订阅
- 远程订阅缓存时长为 **1 小时**，缓存的唯一 key 为 `url + user agent`
- 可在前端点击刷新按钮手动刷新缓存
- 可用 `noCache` 参数禁用缓存：
  - 内部配置链接：`http://a.com#noCache`
  - 外部拉取 Sub-Store 输出：`https://.../download/1?noCache=true`
- 使用脚本时可在脚本中开启缓存（参数一般为 `cache=true`）；前端可配置各项缓存默认时长；持久化缓存数据保存在数据 JSON 中
- 脚本缓存可通过脚本操作清理，例如保留 1 小时缓存：

```javascript
async function operator() {
  scriptResourceCache._cleanup(undefined, 1 * 3600 * 1000)
}
```

## 代理策略

- **代理 App 版**：请求默认按代理 App 的策略，也可根据订阅 URL 在代理 App 里设置分流，或在前端编辑页直接设置代理/策略
- **Node.js / 自建版**：
  1. 使用 TUN 接管所有请求，在对应代理方案中设置分流
  2. 设置环境变量 `http_proxy` / `https_proxy` / `all_proxy`（小写优先，支持 SOCKS5），参考 [undici EnvHttpProxyAgent](https://github.com/nodejs/undici/blob/main/docs/docs/api/EnvHttpProxyAgent.md)
  3. 在脚本里传入 `proxy` 参数
  4. 在前端编辑页设置代理（本质同 3）
  5. 设置环境变量 `SUB_STORE_BACKEND_DEFAULT_PROXY`

::: tip
仅方式 1、2、3 能影响脚本中发起的请求。
:::

## 定时处理订阅，避免 App 内拉取超时

逻辑：定时处理订阅并预热脚本缓存；在缓存有效期内，Surge 等 App 拉取订阅不会超时。

- **代理 App 版**：在模块参数中设置定时任务（如 Surge 的 `cron-sync-artifacts.min.js`，`Produce=type=cron,cronexp="50 */6 * * *",timeout=120,script-path=...,argument="sub=sub1,sub2&col=col1,col2"`），注意用的是订阅**名称 name**，多个用 `,` 连接
- **Node.js / 自建版**：设置环境变量 `SUB_STORE_PRODUCE_CRON`，格式 `0 */2 * * *,sub,a;0 */3 * * *,col,b`
- 嫌麻烦可以直接使用 [Gist 同步](../sync/overview)：定时任务在后台长时间执行，代理 App 里直接使用 Gist 链接即可

## 输出链接参数

生成的订阅链接支持通过 URL 参数复用配置：如 `target` 指定输出格式、`url` 传入远程订阅、`content` 传入本地节点、`ua` 指定 User-Agent（**参数值需要 encodeURIComponent 编码**）。完整参数清单见 [链接参数](../reference/link-params)。

## 小技巧

- 有些机场只能通过机场节点更新订阅：在编辑页填入一个节点/策略，再通过[脚本读取订阅数据并写回代理](https://zhetengsha.eu.org/blog/posts/5726)，即可让订阅通过机场节点更新
- 更多场景见折腾啥博客 [使用说明](https://zhetengsha.eu.org/blog/234/) 板块
