---
title: 日志
description: 查看后端日志，排查问题时的第一手资料
---

# 日志

## 查看方式

- **前端**：「我的」页（或前端右上角）可查看后端日志
- **Docker 版**：`docker logs -f -t --tail 100 sub-store`
- **Android 模块版**：日志在 `/data/adb/sub_store/run` 目录

## 排查时看什么

- 启动日志中应包含 `[FRONTEND] :::3001` 与 `[FRONTEND -> BACKEND]` 转发信息
- 订阅拉取错误：证书问题（`unable to verify the first certificate`）、超时（`timeout`）等
- 请求是否真的到达后端（配合 [故障排查](../guide/troubleshooting) 使用）

## 反馈问题

向开发者反馈问题时，请附上**后端日志**（隐藏 Token 等信息）与复现步骤，见 [故障排查 - 合理的反馈方式](../guide/troubleshooting)。
