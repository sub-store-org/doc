---
title: 我的概览
description: 「我的」页：后端连接、版本信息、Gist 同步、备份与恢复
---

# 我的概览

「我的」页用于管理后端连接与数据：

- **后端地址**：设置前端连接的后端（如自建后端 `http://127.0.0.1:3001/<前缀>`、代理 App 内后端等）
- **运行信息**：显示后端类型与版本（Node / 版本号），可用健康检查接口 `/api/utils/env` 验证
- **Gist 同步**：设置 GitHub Token，手动或定时上传/下载数据

## 备份与恢复

可把全部数据（订阅、文件、设置）备份到 Gist，或从 Gist 恢复。

- 备份接口：`/api/utils/backup?action=upload`（备份）、`/api/utils/backup?action=download&keep=settings.gistToken`（恢复并保留现有 Token）

## 不使用 Gist 的备份与恢复

「我的」页还提供直接备份/恢复全部数据，无需 GitHub Token：

- **备份**：下载 `sub-store_data_<时间>.json` 文件（全量数据，含订阅、文件、设置）
- **恢复**：上传之前备份的数据文件（或该文件的 Base64）覆盖当前数据

::: warning 恢复不可逆
恢复会用上传数据覆盖当前全部数据，请先备份现有数据留底。设置页的「备份编码 / 恢复 Token 处理」见 [设置](./settings)。
:::

## 常见入口

- 版本信息接口：`<后端地址>/api/utils/env`，返回 `{ "status": "success", "data": { "backend": "Node", "version": "..." } }`

::: danger GitHub Token
GitHub 会扫描明文 Gist 中的 GitHub Token：选择明文备份时将**不会**备份 Token，Base64 编码备份才会完整备份（默认 Base64）。Token 被吊销会导致备份失败，请更新到最新版后配置新 Token 再备份。
:::

## 参考

- [环境变量 - 数据备份与恢复](../reference/environment-variables#数据备份与恢复)
- [同步](../sync/overview)
- [设置](./settings)、[日志](./logs)
