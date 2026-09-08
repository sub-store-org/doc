---
title: 链接参数
description: Sub-Store 订阅/文件输出链接支持的完整参数清单
---

# 链接参数

Sub-Store 生成的订阅地址与文件地址支持通过 URL 参数复用配置、覆盖行为。下方的参数同时适用于**订阅链接**（`/download/...`）和**文件链接**（`/api/file/...`）。

::: tip 通用链接
当使用通用链接（不指定 `target`）时，Sub-Store 会自动根据请求的 `User-Agent` 判断输出格式。
:::

## 使用参数

例如：建一个 `name` 为 `sub` 的订阅，配置好节点操作后，可自由传入参数复用：

```
/download/sub?target=Surge&content=encodeURIComponent编码过的本地节点
/download/sub?target=Surge&ua=encodeURIComponent编码过的UA&url=encodeURIComponent编码过的订阅链接
```

::: danger 注意事项
- 参数值需要 **encodeURIComponent** 编码
- 布尔开关按「是否传入参数」判断——`false` 等非空字符串也会被视为启用。不想启用就别传
- 使用分享功能时，`fakeSub` / `fakeFile` / `url` / `content` / `mergeSources` / `subInfoUrl` 等参数**禁止使用**；文件分享链接还禁止 `type` / `source` / `sourceType` / `sourceName` / `mode`
:::

## 参数清单

| 参数 | 示例 | 说明 |
| --- | --- | --- |
| `target` | `Surge` | 目标平台。为 `SurgeMac` 时启用 mihomo 支援 Surge 本身不支持的协议。也支持多一级路由 `/download/xxx/ClashMeta`，此时忽略 `target` |
| `url` | `http://a.com` | 远程订阅内容。非 http/https 链接时视为单条本地节点内容 |
| `content` | `a = socks5, 127.0.0.1, 1080` | 本地订阅内容 |
| `ua` | `Surge iOS/3004` | 请求时使用的 User-Agent |
| `proxy` | `http://127.0.0.1:6152` | 指定获取订阅的代理/节点/策略 |
| `mergeSources` | `localFirst` / `remoteFirst` | 按顺序合并本地和远程订阅 |
| `ignoreFailedRemoteSub` | `disabled` | 远程订阅失败处理：`disabled`（严格报错）/ `enabled`（跳过并通知）/ `quiet`（跳过静默）/ `fallbackNotify`（兜底通知）/ `fallbackQuiet`（兜底静默） |
| `ignoreFailedRemoteFile` | `disabled` | 远程文件失败处理：`disabled` / `enabled` / `quiet` |
| `prettyYaml` | `true` | 输出块状 YAML，默认是单行 JSON 风格 |
| `produceType` | `internal` / `raw` | `internal` 获取结构化数据；`raw` 返回原始数据数组 |
| `noCache` | `true` | 不使用缓存（仅限远程链接来源，不影响脚本缓存） |
| `noFlow` | `true` | 强制不查询订阅流量信息 |
| `includeUnsupportedProxy` | `true` | 包含官方/商店版/未续费订阅不支持的协议 |
| `mihomoMerge` | `true` | 为开启仅一个 mihomo 进程 + 多个 listeners 的模式，节点会转成 SOCKS5 |
| `mihomoMergeName` | `mihomo merged` | 设置上面 mihomo 节点的名字 |
| `mihomoLocalPort` | `65535` | 初始端口号，逐个递减 |
| `mihomoExternal` | `true` | 强制指定使用 mihomo External Proxy Program 输出节点 |
| `fakeSub` / `fakeFile` | `true` | 不使用 `name` 查询单条订阅/文件，便于接入其他系统。`fakeSub` 需配合 `url` 或 `content`；`fakeFile` 需配合 `url`/`content` 或 `type=mihomoConfig` + `sourceType`/`sourceName` |
| `subInfoUrl` / `subInfoUserAgent` / `download` | — | 文件可用：指定获取流量的链接 / UA / 启用下载（文件名为显示名称） |
| `$options` | `a=1&b=2` 或 JSON | 传入脚本参数，详见 [脚本使用](../script/usage) |

## 文件链接运行时覆盖

文件链接（`/api/file/...`）除支持上方通用参数，还支持在请求时**覆盖文件的来源配置**（只影响本次请求，不修改已保存的文件）：

| 参数 | 示例 | 说明 |
| --- | --- | --- |
| `type` | `file` / `mihomoConfig` | 覆盖文件类型 |
| `source` | `local` / `remote` | 普通文件来源：`local` 使用 `content`，`remote` 使用 `url` |
| `sourceType` | `local` / `remote` / `none` / `subscription` / `collection` | mihomo 配置文件来源 |
| `sourceName` | `aaa` | `sourceType` 为 `subscription`/`collection` 时指定订阅/组合订阅名称 |
| `mode` | `config` / `proxy` | 仅 `type=mihomoConfig` 且 `sourceType=local`/`remote` 时有效。`config` 把来源作为完整配置，`proxy` 把来源转为节点写入 `proxies` |

示例：

```
/api/file/demo?type=mihomoConfig&sourceType=remote&mode=config&url=encodeURIComponent编码过的链接
```

## 参考

- [官方 Wiki - 链接参数说明](https://github.com/sub-store-org/Sub-Store/wiki/链接参数说明)
- [订阅概览](../subscription/overview)
- [文件概览](../file/overview)
