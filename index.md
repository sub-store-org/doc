---
# https://vitepress.dev/reference/default-theme-home-page
layout: home

hero:
  name: "Sub-Store"
  text: "高级订阅管理工具"
  tagline: 在一个地方管理、处理、转换和托管你的订阅与配置
  image:
    src: /favicon.svg
    alt: Sub-Store Logo
  actions:
    - theme: brand
      text: 快速开始
      link: /guide/getting-started
    - theme: alt
      text: 安装指南
      link: /guide/installation
    - theme: alt
      text: 前端源码地址
      link: https://github.com/sub-store-org/Sub-Store-Front-End
    - theme: alt
      text: 后端源码地址
      link: https://github.com/sub-store-org/Sub-Store/releases

features:
  - title: 节点订阅转换
    details: 支持多种订阅格式之间的转换，并可对节点进行过滤、排序、重命名等处理
  - title: 配置文件生成
    details: 基于订阅与模板生成所需配置文件，满足不同客户端和使用场景
  - title: 同步分享使用
    details: 支持同步订阅/文件数据，并通过分享功能快速共享
---

::: danger 注意
⚠️ `sub.store` 其实只是模块脚本重写 MitM 使用的域名，**并非我方持有的公网域名**  
详见 [sub.store 域名说明](./reference/sub-store-domain.md)
:::
