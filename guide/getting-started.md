---
title: 快速开始
description: Sub-Store 是什么、能做什么，以及从零开始的基本使用流程
---

# 快速开始

## Sub-Store 是什么

Sub-Store 是一个**高级订阅管理工具**，可以在一处统一管理、处理、转换和托管你的订阅（订阅链接、节点、配置文件）。

它支持 QX、Loon、Surge、Stash、Egern、Shadowrocket、mihomo(Clash.Meta)、sing-box 等主流客户端，核心能力包括：

- **订阅转换**：在多种订阅格式之间互相转换（SS、VMess、VLESS、Trojan、Hysteria 2、TUIC、WireGuard 等）
- **订阅处理**：对节点进行过滤、排序、重命名、去重、标记等操作
- **组合订阅**：将多条订阅合并为一条链接
- **配置文件生成**：基于订阅与模板生成 mihomo / sing-box / Surfboard 等配置文件
- **托管与分享**：托管订阅与文件，通过链接或分享功能快速分发

## 前端与后端

Sub-Store 由两部分组成：

- **前端**（网页界面）：官方前端为 <https://sub-store.vercel.app>，也可以自建部署
- **后端**（处理引擎）：完成拉取订阅、处理、转换等实际工作

后端可以运行在：

- 你的代理 App 中（Surge / Shadowrocket / Loon 等，通过模块或插件）
- Android 设备上（Magisk / KernelSU / APatch 模块、SubCase 等）
- Docker / 服务器 / 云平台上

前端需要连接一个后端才能工作：打开前端后，在「我的」中设置后端地址。

::: danger 注意
`sub.store` 只是模块脚本重写 MitM 使用的域名，**并非官方持有的公网域名**。详见 [sub.store 域名说明](../reference/sub-store-domain)。
:::

## 基本使用流程

1. **安装**：根据你的环境选择安装方式，见 [安装指南](./installation)
2. **添加订阅**：在「订阅」页新建订阅，填入机场订阅链接，或填写本地节点/订阅内容，见 [订阅概览](../subscription/overview) 与 [本地节点与订阅](../subscription/local)
3. **处理节点**：在订阅中配置筛选、重命名、排序等处理操作，见 [订阅处理](../subscription/processors)
4. **生成输出**：订阅保存后即可获得 Sub-Store 输出链接，把该链接导入你的代理客户端
   - 通用链接会自动根据请求端的 User-Agent 输出对应格式，见 [订阅转换](../subscription/conversion)
5. **进阶**：
   - 需要更复杂逻辑时，可使用 [脚本](../script/overview)（节点操作、测试等）
   - 需要完整配置文件时，使用 [文件](../file/overview) 功能生成 mihomo / sing-box 配置
   - 需要定时拉取或分发时，使用 [同步](../sync/overview) 与 [分享](../shares/overview)

## 参考阅读

- 完整功能参考：官方 Wiki <https://github.com/sub-store-org/Sub-Store/wiki>
- 社区教程合集：[折腾啥博客 - Sub-Store 合集](https://zhetengsha.eu.org/blog/214/)
- 后端源码与发布：<https://github.com/sub-store-org/Sub-Store>
- 前端源码：<https://github.com/sub-store-org/Sub-Store-Front-End>
