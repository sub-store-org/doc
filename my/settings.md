---
title: 设置
description: 常用设置项：GitHub Token、缓存默认时长、备份编码、环境名称与图标
---

# 设置

「我的 → 设置」中可配置：

- **GitHub Token**：用于 Gist 同步与备份（建议使用仅 gist 权限的 Token；被吊销时同步/备份会失败）
- **CORS allowlist**：前端访问后端时的跨域白名单（也可通过环境变量 `SUB_STORE_CORS_ALLOWED_ORIGINS` 配置）
- **缓存默认时长**：自定义各类缓存的默认 TTL（如脚本缓存持久化时长 `sub-store-csr-expiration-time`，默认 48 小时）
- **备份编码**：明文 / Base64（涉及 Token 备份行为，见 [我的概览](./overview)）
- **环境名称与图标**：自定义前端显示的后端环境名/图标（对应 `SUB_STORE_BACKEND_CUSTOM_NAME` / `SUB_STORE_BACKEND_CUSTOM_ICON`，服务端配置）

各设置项的服务器端对应环境变量见 [环境变量](../reference/environment-variables)。
