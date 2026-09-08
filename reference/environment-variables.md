---
title: 环境变量
description: Sub-Store 后端（Node.js / Docker）环境变量完整说明
---

# 环境变量

Sub-Store 后端（Node.js / Docker 版）通过环境变量进行配置。支持通过 `.env` 文件设置。

::: tip
环境变量会随版本演进，**最新说明以 [Docker 镜像页面](https://hub.docker.com/r/xream/sub-store) 为准**。本文为常用变量的整理。
:::

## 端口与监听

| 变量 | 说明 | 默认 |
| --- | --- | --- |
| `SUB_STORE_BACKEND_API_PORT` | 后端 API 监听端口 | `3000` |
| `SUB_STORE_BACKEND_API_HOST` | 后端 API 监听地址。**不应该对外暴露**，这是内部裸后端 | `127.0.0.1` |
| `SUB_STORE_FRONTEND_PORT` | 前端监听端口 | `3001` |
| `SUB_STORE_FRONTEND_HOST` | 前端监听地址，可按需开放（如局域网） | - |
| `SUB_STORE_BACKEND_MERGE` | 为 `true` 时后端同时处理前端资源与 API 请求，合并前后端端口，仅暴露一个端口 | - |
| `SUB_STORE_FRONTEND_BACKEND_PATH` | 前端访问后端时使用的路径前缀 | `/2cXaAxRGfddmGz2yx1wA` |
| `SUB_STORE_BACKEND_PREFIX` | 后端也加上 `SUB_STORE_FRONTEND_BACKEND_PATH` 设置的后缀，适用于同主机防扫场景 | - |
| `SUB_STORE_FRONTEND_PATH` | 前端文件夹路径。Docker 版自带默认内部路径，无需设置 | - |
| `HOST` / `PORT` | HTTP-META 使用的监听配置；默认端口 `9876`，可能与其他服务（如 ddns-go）冲突 | `127.0.0.1:9876` |

合并端口示例：

```
SUB_STORE_BACKEND_MERGE=true
SUB_STORE_FRONTEND_BACKEND_PATH=/2cXaAxRGfddmGz2yx1wA
SUB_STORE_CORS_ALLOWED_ORIGINS=https://sub-store-frontend.a.com
```

此时仅暴露前端端口（如 3001），后端通过 `http://127.0.0.1:3001/<前缀>` 访问。

## CORS 与安全

| 变量 | 说明 | 默认 |
| --- | --- | --- |
| `SUB_STORE_CORS_ALLOWED_ORIGINS` | CORS allowlist，多个来源用逗号分隔；使用官方前端时无需设置。**建议设置具体来源**，`*` 意味着任意网站均可通过浏览器 CORS 读取本地后端 | `https://sub-store.vercel.app,http://substore.stash,https://substore.stash` |
| `SUB_STORE_MAX_HEADER_SIZE` | undici header 大小限制；订阅响应头过大时报 `Headers Overflow Error` 时可调大 | `32768` |
| `SUB_STORE_BODY_JSON_LIMIT` | JSON Body 大小限制 | `1mb`（例：`10mb`） |
| `SUB_STORE_BACKEND_DEFAULT_PROXY` | 设置默认代理，支持 SOCKS5 / HTTP / HTTPS，影响脚本中的请求 | 例：`socks5://a:b@host:7890`、`http://127.0.0.1:7890` |

## 定时任务

| 变量 | 说明 | 示例 |
| --- | --- | --- |
| `SUB_STORE_BACKEND_SYNC_CRON` | 定时将订阅/文件上传到私有 Gist（对应前端「同步」tab） | `55 23 * * *` |
| `SUB_STORE_PRODUCE_CRON` | 后台定时处理订阅，用于脚本缓存预热；格式 `cron,类型,名称`，多个任务用分号连接（`sub`=单条订阅，`col`=组合订阅） | `0 */2 * * *,sub,a;0 */3 * * *,col,b` |
| `SUB_STORE_BACKEND_UPLOAD_CRON` | 定时备份全部数据（对应「我的 → 备份/上传」） | - |
| `SUB_STORE_BACKEND_DOWNLOAD_CRON` | 定时恢复数据 | - |
| `SUB_STORE_PUSH_SERVICE` | 推送服务 URL（支持 shoutrrr URL，如 Telegram / Bark / PushPlus），任务完成/失败时通知 | - |

::: warning 旧变量
`SUB_STORE_BACKEND_CRON`（旧定时任务变量）自后端 2.14.376 起弃用，应改用 `SUB_STORE_BACKEND_SYNC_CRON`；Docker 版旧的 `SUB_STORE_CRON` 不再支持。
:::

## 数据备份与恢复

| 变量 | 说明 |
| --- | --- |
| `SUB_STORE_DATA_URL` | 启动时从该地址拉取并恢复数据（建议用 Gist Raw 链接，可加 `#noCache`） |
| `SUB_STORE_DATA_URL_POST` | 拉取数据后执行的自定义命令，如设置 Token：`content.settings.gistToken='xxxxx'` |

接口：`/api/utils/backup?action=upload`（备份）、`/api/utils/backup?action=download`（恢复，可加 `keep=settings.gistToken` 保留现有 Token）。

::: danger GitHub Token
GitHub 会扫描明文 Gist 中的 GitHub Token。选择明文备份时将**不会**备份 Token；Base64 编码备份才会完整备份。默认使用 Base64 编码。Token 被吊销时备份会失败，请更新 Sub-Store 后配置新 Token 再备份。
:::

## MMDB（本地 IP 数据库）

搭配检测落地/入口脚本使用，数据来自本地，可节约大量请求时间：

| 变量 | 说明 |
| --- | --- |
| `SUB_STORE_MMDB_COUNTRY_PATH` | MaxMind GeoLite2 Country 数据库路径 |
| `SUB_STORE_MMDB_ASN_PATH` | MaxMind GeoLite2 ASN 数据库路径 |
| `SUB_STORE_MMDB_CRON` | 定时更新 MMDB（后端 >= 2.19.30） |
| `SUB_STORE_MMDB_COUNTRY_URL` | Country 数据库下载地址（使用定时更新时需要） |
| `SUB_STORE_MMDB_ASN_URL` | ASN 数据库下载地址（使用定时更新时需要） |

## 自定义显示与响应

| 变量 | 说明 |
| --- | --- |
| `SUB_STORE_BACKEND_CUSTOM_NAME` | 自定义前端显示的运行环境名称 |
| `SUB_STORE_BACKEND_CUSTOM_ICON` | 自定义前端显示的运行环境图标 |
| `SUB_STORE_X_POWERED_BY` | 自定义响应头中的 `X-Powered-By` |

## 代理 App 版对应的模块参数

代理 App 版通过模块参数实现类似功能：

- `cors`：模块参数版 CORS allowlist，默认 `https://sub-store.vercel.app,http://substore.stash,https://substore.stash`
- 模块内已内置对应端口与路径逻辑，无需手动配置端口
