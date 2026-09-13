---
title: 故障排查
description: 常见问题排查：代理 App 版、自建/Android 版、订阅拉取失败、前端缓存等
---

# 故障排查

::: warning 前提
代理 App 版必须**开启开关、重写、脚本、MitM（并信任证书）**功能，且模块/脚本下载成功。功能没开，一切排查都无从谈起。
:::

## 代理 App 版排查

以 Sub-Store 模块为例（BoxJs / Script Hub 同理，只是地址不同）：

1. 确认模块和脚本都下载成功
2. 浏览器访问 `https://sub.store/api/utils/env`（注意是 https），应能看到版本号

   ::: warning 注意
   该请求走的是 `sub.store` 重写域名：若 MitM/重写未生效（往往正是排查原因），请求会发往**公网 sub.store**，存在数据泄露风险。建议先按 [sub.store 域名说明](../reference/sub-store-domain) 将 `sub.store` 映射到 `127.0.0.1` 再做验证。
   :::

3. 如果报错，尝试访问 `http://sub.store/api/utils/env`（注意是 http）：若成功，说明是 **MitM / 证书信任** 的问题
4. 还是不行的话，一般是请求没有进重写：检查重写、脚本功能是否开启

其他常见问题：

- **Shadowrocket / Surge 上刷新就失败**：尝试调小请求并发数
- **QX（macOS）请求超时**：参考 QX 相关讨论（并发/超时设置）
- **Stash 异常**：参考 Stash 社区的排查帖
- **前端不是官方 `sub-store.vercel.app`**：需要在模块参数 `cors` 中配置 CORS allowlist
- **macOS**：可用 `surge-cli dump profile effective | grep sub.store` 检查当前配置中的 Sub-Store 相关项；若其他模块覆盖了 `hostname`（规范的模块应使用 `hostname = %APPEND%` 或 `%INSERT%`），删除模块重装、把模块优先级调到最高，或检查模块内容

如仍不行，**带日志**向对应代理 App 的开发者反馈，而不是在群里反复提问。

## 自建 / Docker / Android 版排查

1. 检查日志：`docker logs -f --tail 100 sub-store`，应能看到 `[FRONTEND] :::3001` 与 `[FRONTEND -> BACKEND]` 转发日志
2. 检查端口：`docker ps`，应能看到 `0.0.0.0:3001->3001/tcp`（仅本机监听时显示 `127.0.0.1`）
3. 本机验证：`curl http://127.0.0.1:3001/<后端前缀>/api/utils/env` 应返回 JSON（含 `version`）
4. 依次用「部署机 IP」→「反代域名 http」→「反代域名 https」重复上面的验证，逐步定位是哪一层的问题
5. 前端能打开但设置后端失败：查看浏览器控制台。常见原因是 **HTTPS 前端访问 HTTP 后端**（混合内容），可：
   - Chrome：`chrome://settings/content/insecureContent`
   - Edge：`edge://settings/privacy/sitePermissions/allPermissions/insecureContent`
   - 添加允许访问的后端地址
6. 使用非官方前端时，注意 `SUB_STORE_CORS_ALLOWED_ORIGINS`（2.38.0 起需要设置 CORS allowlist）；若要使用**脚本操作、脚本过滤或修改响应**，必须设置 `SUB_STORE_FRONTEND_BACKEND_PATH`（不想改路径可设 `SUB_STORE_FRONTEND_BACKEND_PATH=/`），或改用 `SUB_STORE_BACKEND_CUSTOM_NAME`

## 订阅拉取失败或协议不全

1. 机场订阅优先使用 **mihomo 订阅**，避免 Shadowrocket 等可能含非标准 URI 的订阅
2. **浏览器能打开、Sub-Store 拉不到**：在订阅设置中把 User-Agent 改成你浏览器的 User-Agent
3. **代理 App 里能用、浏览器打不开**：机场限制了 User-Agent，可尝试常见客户端的 UA（如 `clash.meta/v1.19.99`、`v2ray` 等）
4. **浏览器也打不开**：给该订阅分流换节点，或尝试不走代理
5. **证书报错**（如日志出现 `unable to verify the first certificate`）：仅在**确认信任该机场**时，可在订阅链接结尾加上 `#insecure` 跳过 TLS 校验；否则中间人可替换订阅内容，风险等同于订阅走明文。优先与机场确认证书链/CDN 配置，而不是关闭校验
6. **超时**：在订阅编辑页把超时调大（如 10000ms）重试；客户端自身超时无法调整时，可把超时调小并开启组合订阅的「忽略失败的远程订阅」，或配置定时同步到 Gist 后让客户端使用 Gist 链接（同步任务不存在超时问题）
7. 已知问题：使用 CF 节点访问 CF 订阅链接会报错，跟踪见 [Sub-Store#324](https://github.com/sub-store-org/Sub-Store/issues/324)

## 前端没更新到新版：清除 PWA 缓存

1. 尝试前端最后一个 tab 页面左上角的刷新/清理按钮
2. 删除桌面图标，关闭之前打开的前端页面，杀掉浏览器后台
3. 重新打开浏览器访问前端地址，应刷新出最新版

## 脚本请求超时

使用脚本（尤其未开缓存时）可能导致每次请求耗时过长而超时，可选用：

- **方案 1**：配置 Gist 定时上传，客户端拉取 Gist 链接（定时任务没有超时限制）
- **方案 2**：在脚本中开启缓存（一般为 `cache` 参数设为 `true`），并配合[定时处理订阅](../subscription/overview)预热缓存
- **方案 3**：创建同步配置，设置定时并选择订阅（不上传产物），定时触发处理

## 合理的反馈方式

遇到节点转换/处理结果不对时，请提供：

- 原始订阅内容（可导出为文件）
- 你配置的处理操作与期望结果
- 后端日志

这样可复现并定位问题。更多排查细节见折腾啥博客：[代理 App 版排查](https://zhetengsha.eu.org/blog/posts/1068)、[自建/Android 版排查](https://zhetengsha.eu.org/blog/posts/1278)、[订阅拉取失败或协议不全](https://zhetengsha.eu.org/blog/posts/822)。
