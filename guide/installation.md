---
title: 安装
description: Sub-Store 的多种安装方式：代理 App 内使用、Android 版、Docker 自建等
---

# 安装

Sub-Store 有多种部署方式，按使用场景选择：

| 方式 | 适合场景 | 说明 |
| --- | --- | --- |
| 代理 App 内置/模块 | 日常使用，最方便 | Surge / Shadowrocket / Loon / QX 等，见下文 |
| Android 模块 / App | 在手机上长期运行 | Magisk / KernelSU / APatch 模块、SubCase、Termux |
| Docker 自建 | 服务器 / NAS / 长期稳定运行 | 官方镜像 `xream/sub-store` |
| 官方前端直连 | 临时使用 / 配合自建后端 | <https://sub-store.vercel.app> |

## 代理 App 版

Sub-Store 提供各代理 App 的模块/插件/重写配置，位于后端仓库的 [`config` 目录](https://github.com/sub-store-org/Sub-Store/tree/master/config)：

- **Surge / Shadowrocket**：安装 Sub-Store 模块
- **Loon**：安装插件；Loon 3.5.0(969) 及以上推荐使用新版[资源解析器插件](https://raw.githubusercontent.com/sub-store-org/Sub-Store/master/config/Loon-parser.plugin)，旧版在 `[General]` 中配置 `resource-parser`，详见官方 Wiki 的 [Loon 资源解析器说明](https://github.com/sub-store-org/Sub-Store/wiki/Loon-%E8%B5%84%E6%BA%90%E8%A7%A3%E6%9E%90%E5%99%A8%E8%AF%B4%E6%98%8E)
- **QX**：添加重写引用
- **Stash / Egern** 等：使用对应配置

安装后务必确认：**模块/插件已下载成功、开关已开启**，并信任 MitM 证书。若刷新不出新版前端，见 [清除前端 PWA 缓存](./troubleshooting)。

> Clash Party / Sparkle 等客户端内置了 Sub-Store 支持：在客户端内点击右上角下载按钮即可更新内置的 Sub-Store。

## Android 版

- **模块版**（推荐）：[Delusions6515/Sub-Store-Module](https://github.com/Delusions6515/Sub-Store-Module)，支持 Magisk、KernelSU 与 APatch，刷入后访问 `http://127.0.0.1:3001?api=http://127.0.0.1:3000` 即同时打开前端+后端
  - 配置文件：`/data/adb/sub_store/scripts/sub_store.config`（如需局域网访问，将 `sub_store_backend_host="127.0.0.1"` 改为 `0.0.0.0` 后重启）
  - 数据文件：`/data/adb/sub_store/run/sub-store.json`
  - 更新：`/data/adb/sub_store/scripts/update_backend.sh`、`update_frontend.sh`
  - 重启：`/data/adb/sub_store/scripts/start.sh` 或 `sub_store.service restart`
  - 内置 HTTP-META，可使用测活等需要本地执行的脚本
- **App 版**：[sionnx/SubCase](https://github.com/sionnx/SubCase)
- **Termux 版**：社区维护（见折腾啥频道）

## Docker 自建

官方镜像：[hub.docker.com/r/xream/sub-store](https://hub.docker.com/r/xream/sub-store)

快速启动示例：

```bash
docker run -it -d --restart=always \
 -e "SUB_STORE_FRONTEND_BACKEND_PATH=/2cXaAxRGfddmGz2yx1wA" \
 -e "SUB_STORE_CORS_ALLOWED_ORIGINS=https://sub-store-frontend.a.com" \
 -p 127.0.0.1:3001:3001 \
 -v /root/sub-store-data:/opt/app/data \
 --name sub-store \
 xream/sub-store
```

- 前端默认监听 `3001` 端口，后端 API 默认 `3000` 端口（尽量只监听本机）
- 开启 `SUB_STORE_BACKEND_MERGE=true` 可合并前后端端口，仅暴露一个端口
- 数据目录挂载到 `/opt/app/data`，升级容器不会丢数据
- 如需使用测活等脚本，可选用带 `http-meta` tag 的镜像
- 更新：与其他容器一样，可用 [Watchtower](https://containrrr.dev/watchtower/) 自动更新

启动后访问 `http://127.0.0.1:3001`，后端地址形如 `http://127.0.0.1:3001/2cXaAxRGfddmGz2yx1wA`（具体前缀由 `SUB_STORE_FRONTEND_BACKEND_PATH` 决定）。

::: tip 健康检查
`http://127.0.0.1:3001/<后端前缀>/api/utils/env` 会返回后端版本信息，可用于健康检查与排查。
:::

所有环境变量的完整说明见 [环境变量](../reference/environment-variables)。

## 使用官方前端

不需要安装任何东西，直接在浏览器打开 <https://sub-store.vercel.app> 即可使用（一般需要能正常访问 Vercel）。自建后端时，在前端「我的」页设置后端地址即可连接。

> 前端为 PWA，未刷新出最新版时请参考 [清除前端 PWA 缓存](./troubleshooting)。

## 更多参考

- 折腾啥博客：[安装下载](https://zhetengsha.eu.org/blog/215/)、[Android 版说明](https://zhetengsha.eu.org/blog/posts/1008)
- 社区教程：[Lucy 的小白教程](https://wiki.repcz.link/substore/install/)
