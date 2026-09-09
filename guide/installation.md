---
title: 安装
description: Sub-Store 的多种安装方式对比
---

# 安装

Sub-Store 有多种部署方式，大部分由社区维护：

::: info
高级功能 请参考文档 高级功能 章节

如果你不知道什么是高级功能，那么建议你忽略，~~因为你用不上~~
:::

| 方式 | 说明 | 注意 |
| --- | --- | --- |
| 软件内置 | Clash Party / Sparkle 等客户端内置了 Sub-Store | 大多无法直接使用高级功能 |
| 代理 App 模块 | Surge / Shadowrocket / Loon / QX 等 | 可以变通使用部分高级功能 |
| Android 模块 | [Delusions6515/Sub-Store-Module](https://github.com/Delusions6515/Sub-Store-Module) | **需要 root** <br> 可以直接使用高级功能 |
| Android APP | [sionnx/SubCase](https://github.com/sionnx/SubCase) | 无法直接使用高级功能 |
| Android Termux | https://t.me/e58695/205 | |
| Docker 自建 | 官方镜像 [`xream/sub-store`](https://hub.docker.com/r/xream/sub-store) | 若要使用高级功能，请参考 Docker Hub 页面说明 |
| 官方前端 | <https://sub-store.vercel.app> | 仅前端，需搭配自定义后端使用 |
<!-- | SubDock | [sub-store-org/SubDock](https://github.com/sub-store-org/SubDock) <br> 全平台 Sub-Store 管理器 | 仍在开发中... | -->

## 软件内置

Clash Party / [xishang0128/Sparkle](https://github.com/xishang0128/sparkle) 等客户端内置了 Sub-Store 支持

在客户端内点击右上角下载按钮即可更新内置的 Sub-Store。

## 代理 App 版

Sub-Store 提供各代理 App 的模块/插件/重写配置，位于后端仓库的 [`config` 目录](https://github.com/sub-store-org/Sub-Store/tree/master/config)：

- **Surge / Shadowrocket**：安装 Sub-Store 模块
- **Loon**：
  - 安装插件
  - Loon 3.5.0(969) 及以上推荐使用新版[资源解析器插件](https://raw.githubusercontent.com/sub-store-org/Sub-Store/master/config/Loon-parser.plugin)
    - 旧版在 `[General]` 中配置 `resource-parser`，详见官方 Wiki 的 [Loon 资源解析器说明](https://github.com/sub-store-org/Sub-Store/wiki/Loon-%E8%B5%84%E6%BA%90%E8%A7%A3%E6%9E%90%E5%99%A8%E8%AF%B4%E6%98%8E)
- **QX**：添加重写引用
- **Stash / Egern** 等：使用对应配置

安装后务必确认：**模块/插件已下载成功、开关已开启**，并信任 MitM 证书。若刷新不出新版前端，见 [清除前端 PWA 缓存](./troubleshooting)。

## Android 版

- **模块版**：[Delusions6515/Sub-Store-Module](https://github.com/Delusions6515/Sub-Store-Module)，支持 Magisk、KernelSU 与 APatch
- **App 版**：[sionnx/SubCase](https://github.com/sionnx/SubCase)
- **Termux 版**：社区维护：https://t.me/e58695/205

## Docker 自建

官方镜像：[`xream/sub-store`](https://hub.docker.com/r/xream/sub-store)

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

常见环境变量见 [环境变量](../reference/environment-variables)

所有环境变量的完整说明见 [Docker Hub 页面](https://hub.docker.com/r/xream/sub-store)

## 使用官方前端

不需要安装任何东西，直接在浏览器打开 <https://sub-store.vercel.app> 即可使用（一般需要能正常访问 Vercel）。

自建后端时，在前端「我的」页设置后端地址即可连接。

> 前端为 PWA，未刷新出最新版时请参考 [清除前端 PWA 缓存](./troubleshooting)。

## 更多参考

- 折腾啥博客：[安装下载](https://zhetengsha.eu.org/blog/215/)
- 社区教程：[Lucy 的小白教程](https://wiki.repcz.link/substore/install/)
