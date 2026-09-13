---
title: 订阅转换
description: 支持的输出目标平台、通用链接、target 参数，以及生成 mihomo / sing-box / Surfboard 配置文件
---

# 订阅转换

订阅保存后，Sub-Store 可以把它转换为各种客户端格式输出。

## 通用链接

每个订阅/组合订阅都有一个通用输出链接 `/download/<name>`：

- 自动根据请求的 **User-Agent** 判断输出格式（如 Surge 请求输出 Surge 格式）
- 也可用 `target` 参数强制指定目标平台，例如 `/download/sub?target=Surge`
- 支持多一级路由直接指定输出目标：`/download/xxx/ClashMeta`（此时忽略 `target` 参数）

## 支持的输出目标

- **Surge** / **SurgeMac**（`SurgeMac` 时使用 mihomo 支援 Surge 本身不支持的协议，如 VLESS/SSR）
- **Loon**、**QX**、**Stash**、**Shadowrocket**、**Egern**
- **mihomo（Clash.Meta）**、Surfboard
- **sing-box**、**V2Ray**、**V2Ray URI**
- **Plain JSON**（结构化节点数据，便于调试/脚本）
- Clash（已弃用，可传 `target=Clash`）

::: tip
包含官方/商店版不支持的协议时，需启用 `includeUnsupportedProxy` 参数（Clash 系返回全部节点；sing-box 额外包含 SSR/Snell；Surge 会**去除** HTTP 传输层以转换为 Surge 可识别的协议，连通性取决于服务端是否支持去除后的协议）。全部是 WireGuard 节点的订阅可输出为 Surge 模块。
:::

## 生成配置文件

除了输出订阅，Sub-Store 还可以通过「文件」功能**动态生成完整配置文件**，见 [文件概览](../file/overview)。常用场景：

### Mihomo 配置（使用覆写）

1. 打开前端「文件」tab，新建一个 **mihomo 配置**文件
2. 配置来源订阅，选择一个喜欢的**覆写**（支持远程覆写链接，如 Mihomo Party 的 [override-hub](https://github.com/mihomo-party-org/override-hub)）
3. 保存后将链接导入 Mihomo Party 等客户端

覆写无法下载时，可套用 GitHub 加速服务。自定义更新间隔可通过「脚本操作 - 脚本」配合响应头发送实现。

### Mihomo 配置（使用脚本）

不使用覆写、更自由的方式，直接用脚本组装配置，[参考示例](https://zhetengsha.eu.org/blog/posts/1234)。

### sing-box 配置

1. 新建文件，远程链接填模板、脚本操作填转换脚本，例如 [sub-store-template](https://github.com/xishang0128/sub-store-template) 的 `sing-box.json` + `sing-box.js#type=1&name=<组合订阅名>`
2. 也可以自定义模板（远程模板/本地模板）+ 插槽脚本：`template.js#type=组合订阅&name=机场&outbound=🕳ℹ️all|all-auto🏷ℹ️港|hk|hongkong|🇭🇰...`
   - `🕳` 后为 outbound 匹配、`🏷` 后为节点筛选正则、`ℹ️` 表示忽略大小写、`&` 分隔多个 outbound，支持换行；`outbounds` 为空时自动创建 `direct` 兜底
   - 也支持 `url` 参数直接传入订阅链接（需 encodeURIComponent）

### Surfboard 远程托管配置

1. 创建订阅 → 创建目标为 Surfboard 的**同步配置**，定时同步，复制 Gist 链接（必要时拼接加速服务）
2. 新建文件，参考 [托管模板](https://gist.githubusercontent.com/xream/fdef7a788abbd9b583474d02314d47f3/raw/surfboard.conf)，将模板中的两处占位替换为上面的订阅 Gist 链接
3. 再创建一个来源为该文件的同步配置，定时同步，复制 Gist 链接，写回文件头部的 `#!MANAGED-CONFIG <链接> interval=3600 strict=true`
4. 在 Surfboard 中通过最终链接导入，支持后续更新

其他代理 App 也可以参考此逻辑（服务器版直接用文件配置链接即可）。

### sing-box 机场入口 + 落地节点代理链

用脚本生成「机场入口节点 + 落地节点」的代理链配置，[参考示例](https://zhetengsha.eu.org/blog/posts/1241)。

## 参考

- 完整参数说明：[链接参数说明（官方 Wiki）](https://github.com/sub-store-org/Sub-Store/wiki/链接参数说明)
- [使用覆写生成 Mihomo 配置](https://zhetengsha.eu.org/blog/posts/2228)
- [生成 sing-box 配置](https://zhetengsha.eu.org/blog/posts/1070)
- [Surfboard 远程托管配置](https://zhetengsha.eu.org/blog/posts/1111)
