---
title: 设置
description: 常用设置项：GitHub Token 与同步、缓存默认时长、备份、请求默认值
---

# 设置

「我的」页与「我的 → 设置」中可配置：

## GitHub 同步

与 Gist 同步/备份相关的配置：

- **GitHub Token**：用于 Gist 同步与备份（建议使用仅 `gist` 权限的 Token；被吊销时同步/备份会失败）
- **Gist age 加密私钥**：Gist 备份使用 age 加密时的解密私钥（`age-secret-key`）
- **GitHub 用户名 / 加速代理**：用于 Gist 同步的 GitHub 用户名与加速代理地址（GitHub API 访问困难时可用）；加速代理可配合匹配正则仅对特定仓库生效
- **GitHub API 地址**：自定义 GitHub API 地址（默认 `https://api.github.com`）
- **GitHub API 请求超时**：GitHub API 请求超时，单位毫秒（默认 `10000`）
- **同步上传分批大小**：同步上传分批大小（默认 `10`）
- **同步平台**：默认为 Gist（GitHub），可切换为 **GitLab Snippet**（β）——切换后 Token 字段按 GitLab Private Token 使用，见 [同步概览 - 同步平台](../sync/overview)
- **Gist 恢复时的 Token 处理**：恢复备份数据时如何处理备份中的 `gistToken` 字段（每次询问 / 覆盖 / 保留），对应 `/api/utils/backup?action=download` 的 URL 参数 `tokenStrategy` / `keep`

## 默认请求值

各订阅/文件请求的默认值（可在单个订阅/编辑页覆盖）：

- **默认 User-Agent**：拉取远程订阅时使用的 UA
- **默认流量信息 UA**：查询订阅流量信息时使用的 UA
- **默认代理/策略**：拉取订阅时使用的默认代理
- **默认超时**：请求超时，单位毫秒（默认 `8000`）
- **后端请求并发数**：后端发起请求的并发上限，以及并发等待时间（请求密集、出现超时/排队时可调小或调大）
- **日志保留条数**：后端日志最多保留多少条（默认不限）

## 缓存默认时长

自定义各类缓存的默认 TTL（单位秒）：

- `resourceCacheTtl`：远程订阅/资源缓存
- `headersCacheTtl`：响应头缓存
- `scriptCacheTtl`：脚本缓存，默认 **48 小时**（172800 秒）
- `cacheThreshold`：缓存大小阈值

## 备份

- **备份编码**：Base64（默认）/ 明文 / age 加密（age 模式需配置下方 Gist age 加密私钥；涉及 Token 备份行为，见 [我的概览](./overview)）

## 环境名称与图标

自定义前端显示的后端环境名/图标（对应 `SUB_STORE_BACKEND_CUSTOM_NAME` / `SUB_STORE_BACKEND_CUSTOM_ICON`，服务端配置）。

各设置项的服务器端对应环境变量见 [环境变量](../reference/environment-variables)。