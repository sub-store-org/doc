---
title: 文件概览
description: 文件功能：托管文本与配置文件，动态生成 mihomo / sing-box / Surfboard 配置
---

# 文件概览

「文件」功能用于托管和动态生成文件内容：普通的文本文件、脚本文件，以及 **mihomo 配置文件**。

## 文件类型

- **普通文件**（file）：托管文本内容（模板、脚本、规则等）
  - 来源：**本地文本**（`content`）或**远程链接**（`url`）
- **mihomo 配置文件**（mihomoConfig）：动态生成完整 mihomo 配置
  - 来源：`local`（本地内容）/ `remote`（远程内容）/ `none`（生成空配置）/ `subscription` / `collection`（用已保存的订阅/组合订阅生成）

## 生成配置文件

| 目标 | 做法 | 参考 |
| --- | --- | --- |
| Mihomo | 新建 mihomo 配置，选订阅 + 覆写模板 | [使用覆写生成 Mihomo 配置](https://zhetengsha.eu.org/blog/posts/2228) |
| sing-box | 远程模板 + 脚本操作转换（如 sub-store-template） | [生成 sing-box 配置](https://zhetengsha.eu.org/blog/posts/1070) |
| Surfboard | 模板文件 + 同步配置做远程托管 | [Surfboard 远程托管配置](https://zhetengsha.eu.org/blog/posts/1111) |

详见 [订阅转换 - 生成配置文件](../subscription/conversion)。

## 输出链接与运行时覆盖

文件保存后获得输出链接 `/api/file/<name>`。请求文件链接时，可**临时覆盖**来源配置（只影响本次请求，不修改已保存的文件）：

| 参数 | 说明 |
| --- | --- |
| `type` | `file` / `mihomoConfig`（覆盖文件类型） |
| `source` | 普通文件来源：`local` / `remote` |
| `sourceType` | mihomo 配置来源：`local` / `remote` / `none` / `subscription` / `collection` |
| `sourceName` | `sourceType` 为订阅/组合订阅时指定名称 |
| `mode` | `config`（整个内容作为完整配置）/ `proxy`（内容转为节点后写入 proxies） |

示例：`/api/file/demo?type=mihomoConfig&sourceType=remote&mode=config&url=<encodeURIComponent 编码的链接>`

其他通用参数（`target`、`content`、`ua`、`noCache` 等）同样适用于文件链接。

## 常见用法

- **托管配置文件**：把配置放在 Sub-Store 里统一管理、更新，客户端拉取文件链接
- **套加速拉取 GitHub 资源**：利用文件功能配合加速服务拉取 GitHub 上的模板/覆写/脚本资源（境外资源直连困难时的常规做法，见[折腾啥博客](https://zhetengsha.eu.org/blog/posts/2106)）
- **加密/解密**：支持 age 加密（`ProxyUtils.age`），配合 `age-secret-key` 参数使用

## 参考

- [文件脚本](./scripts)
- [同步](../sync/overview)：把文件产物定时上传到 Gist
- [链接参数说明（官方 Wiki）](https://github.com/sub-store-org/Sub-Store/wiki/链接参数说明)
