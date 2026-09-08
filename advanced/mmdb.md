---
title: MMDB 本地数据库
description: 配置 MaxMind GeoLite2 本地数据库，配合检测脚本使用
---

# MMDB 本地数据库

Sub-Store 后端（Node.js / Docker 版）可加载本地的 MaxMind GeoLite2 数据库，配合[检测落地](https://zhetengsha.eu.org/blog/posts/1269)、[检测入口](https://zhetengsha.eu.org/blog/posts/1358)等脚本使用时，数据来自本地，可节约大量请求时间。

## 环境变量

| 变量 | 说明 |
| --- | --- |
| `SUB_STORE_MMDB_COUNTRY_PATH` | MaxMind GeoLite2 **Country** 数据库路径 |
| `SUB_STORE_MMDB_ASN_PATH` | MaxMind GeoLite2 **ASN** 数据库路径 |
| `SUB_STORE_MMDB_CRON` | 定时更新 MMDB（后端 >= 2.19.30） |
| `SUB_STORE_MMDB_COUNTRY_URL` | Country 数据库下载地址（使用定时更新时需要） |
| `SUB_STORE_MMDB_ASN_URL` | ASN 数据库下载地址（使用定时更新时需要） |

## Docker 配置示例

```bash
docker run -it -d --restart=always \
  -e "SUB_STORE_MMDB_COUNTRY_PATH=/opt/app/data/GeoLite2-Country.mmdb" \
  -e "SUB_STORE_MMDB_ASN_PATH=/opt/app/data/GeoLite2-ASN.mmdb" \
  -v /root/sub-store-data:/opt/app/data \
  ...
```

手动下载数据库放入数据目录，或配置 `SUB_STORE_MMDB_CRON` + `_URL` 让后端定时自动更新。

## 脚本中使用

Node.js 环境下，`ProxyUtils.MMDB` 可用于模拟 Surge / Loon 的 `$utils.ipasn`、`$utils.ipaso`、`$utils.geoip`，具体见 [demo.js](https://github.com/sub-store-org/Sub-Store/blob/master/scripts/demo.js) 与[折腾啥博客](https://zhetengsha.eu.org/blog/posts/1269)。

配合 MMDB 本地数据库的常用脚本：

- [检测落地](https://zhetengsha.eu.org/blog/posts/1269)：检测节点的落地 IP 归属地
- [检测入口](https://zhetengsha.eu.org/blog/posts/1358)：检测节点的入口 IP
- [入口 & 落地 检测完整示例](https://zhetengsha.eu.org/blog/posts/1415)

## 参考

- [环境变量](../reference/environment-variables)
- [HTTP-META](./http-meta)（测活/测速等需要本地执行环境的脚本）
