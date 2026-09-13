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

::: warning 注意
这里只介绍 [Delusions6515/Sub-Store-Module](https://github.com/Delusions6515/Sub-Store-Module) 的更新方式

[xream 的 Sub-Store 模块](https://t.me/zhetengsha/1008) 已停止更新
:::

可使用管理器 执行(action)按钮 或 KernelSU/APatch WebUI 选择更新
- Magisk 用户如果希望使用 WebUI，可以尝试 [KsuWebUIStandalone](https://github.com/KOWX712/KsuWebUIStandalone/releases) 或 [WebUI X](https://github.com/MMRLApp/WebUI-X-Portable/releases)

手动操作
```shell
su -c "sh /data/adb/modules/sub_store/scripts/sub_store.service start"    # 启动
su -c "sh /data/adb/modules/sub_store/scripts/sub_store.service stop"     # 停止
su -c "sh /data/adb/modules/sub_store/scripts/sub_store.service restart"  # 重启
su -c "sh /data/adb/modules/sub_store/scripts/update_backend.sh"          # 更新后端
su -c "sh /data/adb/modules/sub_store/scripts/update_frontend.sh"         # 更新前端
su -c "sh /data/adb/modules/sub_store/scripts/update_http_meta.sh all"    # 更新 http-meta
```

## 代理 App 版

- 在代理 App 中**更新外部资源**，确保模块和脚本为最新版
- 模块有新版本时，删除旧模块重新安装，或把模块优先级调到最高
- 前端长时间没更新时参考 [清除前端 PWA 缓存](./troubleshooting)

## 更新前备份

更新前建议先备份数据，见 [我的概览 - 备份与恢复](../my/overview#备份与恢复)。也可配置定时备份环境变量 `SUB_STORE_BACKEND_UPLOAD_CRON`，见 [环境变量 - 数据备份与恢复](../reference/environment-variables#数据备份与恢复)。

## 版本验证

更新后访问健康检查接口确认版本：

```
http://127.0.0.1:3001/<后端前缀>/api/utils/env
```

返回的 `data.version` 即当前后端版本号。也可在前端「我的」页查看。
