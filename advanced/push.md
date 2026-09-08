---
title: 推送通知
description: 通过 shoutrrr 配置任务完成/失败时的推送通知（Telegram、Bark、PushPlus 等）
---

# 推送通知

Sub-Store 支持在定时任务完成或失败时发送推送通知。通过环境变量 `SUB_STORE_PUSH_SERVICE` 配置推送服务地址。

## 支持的推送服务

新版已支持 [shoutrrr](https://containrrr.dev/shoutrrr/) URL，常见服务示例：

| 服务 | 示例 |
| --- | --- |
| **Telegram**（shoutrrr） | `telegram://<token>@telegram?chats=-1001234567890` |
| **Bark** | `https://api.day.app/<设备码>/[推送标题]/[推送内容]?group=SubStore&sound=shake` |
| **PushPlus** | `http://www.pushplus.plus/send?token=<token>&title=[推送标题]&content=[推送内容]&channel=wechat` |
| **Telegram Bot** | `https://api.telegram.org/bot<API_KEY>/sendMessage?chat_id=<CHAT_ID>&text=[推送标题][推送内容]` |

::: tip
`[推送标题]` 和 `[推送内容]` 会被自动替换为实际内容。
:::

## 配置方法

### Docker

在启动命令中添加环境变量：

```bash
docker run -it -d --restart=always \
  -e "SUB_STORE_PUSH_SERVICE=https://api.day.app/XXXXXXX/[推送标题]/[推送内容]?group=SubStore" \
  -e "SUB_STORE_BACKEND_SYNC_CRON=55 23 * * *" \
  ...
```

### 其他方式

通过 `.env` 文件或环境变量设置。详见 [环境变量](../reference/environment-variables)。

## 测试推送

以 Telegram Bot 为例，可先用 curl 测试：

```bash
curl "https://api.telegram.org/bot<API_KEY>/sendMessage?chat_id=<CHAT_ID>&text=test"
```

收到消息说明配置正确。

## 何时触发

- 定时同步任务（`SUB_STORE_BACKEND_SYNC_CRON`）完成/失败时
- 定时处理订阅（`SUB_STORE_PRODUCE_CRON`）完成/失败时
- 定时备份/恢复（`SUB_STORE_BACKEND_UPLOAD_CRON` / `SUB_STORE_BACKEND_DOWNLOAD_CRON`）时

## 参考

- [shoutrrr 文档](https://containrrr.dev/shoutrrr/v0.8/services/telegram)
- [环境变量](../reference/environment-variables)
