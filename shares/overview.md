---
title: 分享概览
description: 分享功能：生成分享链接快速分发订阅/文件
---

# 分享概览

「分享」功能为订阅/组合订阅/文件生成一个**分享链接**，方便快速把数据分发给其他人或另一台设备。

## 使用方法

1. 在订阅/文件编辑页打开分享
2. 得到一个分享链接（`/share/...`）
3. 把链接发给对方；对方打开链接即可使用对应数据（自动按请求端 UA 输出格式）

## 注意事项

- 分享功能下有部分参数**禁止使用**：`fakeSub` / `fakeFile` / `url` / `content` / `mergeSources` / `subInfoUrl` 等；文件分享链接还禁止使用 `type` / `source` / `sourceType` / `sourceName` / `mode` 等运行时来源覆盖参数
- 分享链接会暴露你配置的数据，注意不要分享包含敏感信息的文件/订阅
- 可用脚本按请求方限制分享行为，例如 UA 不符合时返回自定义状态码（见 [脚本使用 - 自定义响应](../script/usage)）

## 参考

- [链接参数说明（官方 Wiki）](https://github.com/sub-store-org/Sub-Store/wiki/链接参数说明)（含分享限制的说明）
- [同步](../sync/overview)（另一种分发方式：Gist 链接）
