---
title: 同步概览
description: 同步配置：把订阅/文件产物定时上传到 Gist / GitLab Snippet，供客户端稳定拉取
---

# 同步概览

「同步」功能把**订阅或文件的处理产物**定时上传到 **Gist（Github）或 GitLab Snippet**，生成一个稳定的链接供客户端使用。

## 为什么用同步

- **避免客户端拉取超时**：客户端（如 Surge）拉取订阅有超时限制，而定时同步任务在后台运行、不受拉取超时影响；客户端直接使用 Gist 链接即可
- **定时重处理**：配合脚本缓存预热，让产物保持最新（见 [订阅概览 - 定时处理订阅](../subscription/overview#定时处理订阅-避免-app-内拉取超时)）
- **分发与备份**：产物以链接形式分发，也便于数据备份

## 使用方法

1. 确保已在「我的」页配置 **GitHub Token** 与用户名（用于写 Gist；详情见 [我的概览 - 设置](../my/settings)）
2. 新建同步配置：选择要同步的订阅/组合订阅或文件，目标平台可选（如 Surfboard、Surge），按需开启**定时同步**
3. 同步一次后点击复制，得到 Gist 链接
4. 把链接导入客户端；客户端无法直连 Gist 时可自行拼接加速服务

## 同步平台

- **Gist（GitHub，默认）**：需要 GitHub Token 与用户名
- **GitLab Snippet**（β）：在「我的」页的 GitHub 配置区可切换同步平台到 GitLab。切换到 GitLab 后，原先的 Token 字段会被当作 **GitLab Private Token** 使用（`PRIVATE-TOKEN` 请求头），GitHub 用户名仅用于头像等展示；因部分页面文案仍显示 Gist，属已知现象，建议先备份数据再使用

## 定时同步

- 前端开启定时开关即可；服务器/Docker 版也可用环境变量 `SUB_STORE_BACKEND_SYNC_CRON` 配置定时任务（见[环境变量](../reference/environment-variables)）
- 定时任务会长时间在后台执行，适合脚本重、耗时的场景

## 注意

::: danger GitHub Token
GitHub 会扫描明文 Gist 中的 GitHub Token。相关注意事项见[环境变量 - 数据备份与恢复](../reference/environment-variables#数据备份与恢复)。
:::

- Sub-Store 通过 API 创建的同步 Gist / Snippet **一律为私有**（后端写死 private）；请勿把敏感内容写入你自己**手工创建**的 Gist
  - **确认 Gist 私有性**：Gist 链接形如 `https://gist.github.com/<user>/<id>`——打开浏览器确认页面上显示 **Private** 徽章（无徽章 = 公开）。Sub-Store 创建的 Gist 均为私有，分发时仅将 raw 链接分发给已确认是私有 Gist 的对象；不确定时可用 GitHub API 检查：`curl -s -H "Authorization: Bearer <token>" https://api.github.com/gists/<id> | jq '.public'`，必须返回 `false`
- 更多思路见折腾啥博客：[定时处理订阅，避免 App 内拉取超时](https://zhetengsha.eu.org/blog/posts/1449)、[Surfboard 远程托管配置](https://zhetengsha.eu.org/blog/posts/1111)
