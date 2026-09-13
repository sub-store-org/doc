---
title: HTTP-META
description: HTTP-META 是什么、怎么用：本地执行节点测试脚本（测活/测速/落地检测等）
---

# HTTP-META

[HTTP-META](https://github.com/xream/http-meta) 是一个本地 HTTP 代理服务，让 Sub-Store 可以在**本地**执行节点测试类脚本（测活、测延迟、测速、GPT/UDP 检测、落地/入口检测等），避免每个节点测试都发到远端，更快也更稳定。

## 什么场景需要

- 节点测活 / 测延迟 / 测速：需要真实发起连接测试
- 落地 / 入口检测：配合 [MMDB](./mmdb) 本地数据库可节约大量请求时间
- 其他需要本地执行环境的脚本

## 如何启用

- **Docker 版**：使用带 `http-meta` tag 的镜像（`xream/sub-store`），本地且端口为默认值时无需额外设置
- **Android 模块版**：内置 HTTP-META，可直接使用相关脚本
- 自定义端口：环境变量 `PORT`（默认 `9876`，注意可能与其他服务冲突）；调试可用 `META_DISABLE_AUTO_CLEAN=true` 和 `META_TEMP_FOLDER=/opt/app/data` 查看每次运行的日志和配置

## 脚本中使用

节点测活（Node.js 版）示例链接参数：

```
http://127.0.0.1:9876 ... http_meta_protocol=http&http_meta_host=127.0.0.1&http_meta_port=9876&http_meta_start_delay=3000&http_meta_proxy_timeout=10000
```

参考脚本：

- [节点测活（完善版）](https://zhetengsha.eu.org/blog/posts/1210)：Loon/Surge 用 `availability.js`，Node.js 版用 `http_meta_availability.js`，常用参数 `timeout`（可调小）、`show_latency`（节点名加延迟）、`keep_incompatible`、`url`/`status`（测活地址与期望状态码，需 encodeURIComponent）
- [节点测速](https://zhetengsha.eu.org/blog/posts/1258)
- [节点丢包率统计](https://zhetengsha.eu.org/blog/posts/6149)
- [检测落地](https://zhetengsha.eu.org/blog/posts/1269) / [检测入口](https://zhetengsha.eu.org/blog/posts/1358) / [入口 & 落地 检测完整示例](https://zhetengsha.eu.org/blog/posts/1415)

::: tip
如果你要使用 HTTP-META，注意使用代理后最终请求的还是不是你想要的 HTTP-META 实例（代理策略会改写请求去向）。
:::
