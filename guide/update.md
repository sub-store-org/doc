---
title: 更新与维护
description: Sub-Store 各部署方式的更新方法与日常维护
---

# 更新与维护

## Docker 版

### 手动更新

```bash
docker pull xream/sub-store
docker rm -f sub-store
docker run -it -d --restart=always \
  -e "SUB_STORE_FRONTEND_BACKEND_PATH=/2cXaAxRGfddmGz2yx1wA" \
  -p 127.0.0.1:3001:3001 \
  -v /root/sub-store-data:/opt/app/data \
  --name sub-store \
  xream/sub-store
```

数据目录挂载在 `/opt/app/data`，更新容器不会丢数据。

### 自动更新（Watchtower）

使用 [Watchtower](https://containrrr.dev/watchtower/) 自动监控并更新容器：

```bash
docker run -d \
  --name watchtower \
  --restart=always \
  -v /var/run/docker.sock:/var/run/docker.sock \
  containrrr/watchtower \
  --interval 3600 sub-store
```

每 3600 秒检查一次，有新版本则自动更新。可配合通知发送到 Telegram，参考 [折腾啥博客](https://zhetengsha.eu.org/blog/posts/1312)。

## Android 模块版

- **更新后端**：`/data/adb/sub_store/scripts/update_backend.sh`
- **更新前端**：`/data/adb/sub_store/scripts/update_frontend.sh`
- **更新 HTTP-META**：`/data/adb/sub_store/scripts/update_http_meta.sh`
- **更新 Node.js**：从 [Delusions6515/node-android-build](https://github.com/Delusions6515/node-android-build) 下载新版本，替换 `/data/adb/sub_store/bin/sub_store_node`
- **手动重启**：`/data/adb/sub_store/scripts/start.sh` 或 `sub_store.service restart`

也可在 KernelSU App 内下拉刷新或杀后台重进查看最新状态。

## 代理 App 版

- 在代理 App 中**更新外部资源**，确保模块和脚本为最新版
- 模块有新版本时，删除旧模块重新安装，或把模块优先级调到最高
- 前端长时间没更新时参考 [清除前端 PWA 缓存](./troubleshooting)

## 更新前备份

更新前建议先备份数据，见 [我的概览 - 备份与恢复](../my/overview)。也可配置定时备份环境变量 `SUB_STORE_BACKEND_UPLOAD_CRON`，见 [环境变量](../reference/environment-variables)。

## 版本验证

更新后访问健康检查接口确认版本：

```
http://127.0.0.1:3001/<后端前缀>/api/utils/env
```

返回的 `data.version` 即当前后端版本号。也可在前端「我的」页查看。
