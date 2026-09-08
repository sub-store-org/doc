---
title: 订阅处理
description: 订阅处理操作：筛选、排序、重命名、属性设置、域名解析与脚本操作
---

# 订阅处理

在单条订阅（或组合订阅）的编辑页中，可以配置**一系列处理操作**，对节点依次进行处理。处理完成后输出即为处理后的结果。

## 筛选类

- **正则筛选**：按正则表达式保留匹配的节点
- **丢弃筛选（Discard regex）**：按正则表达式丢弃匹配的节点
- **地区筛选**：按地区（旗帜/国家）筛选节点
- **协议筛选**：按协议类型筛选节点，只保留需要的协议，例如只保留 `SS` / `VMess`；也可用脚本过滤排除特定协议，例如排除 UDP 类协议：

```javascript
return !['hysteria2', 'hysteria', 'tuic', 'juicity'].includes($server.type)
```

- **无用的节点筛选（Useless proxies filter）**：过滤明显不可用的节点
- **脚本筛选**：通过脚本自由筛选节点

## 操作类

- **设置属性（Set property）**：设置节点属性，如 `udp`、`tfo`、`skip-cert-verify`、SNI 等
- **旗帜操作（Flag）**：为节点添加或移除 emoji 旗帜
- **按名称排序**：按节点名称排序
- **正则排序**：按关键词排序（默认按名称兜底）
- **正则重命名**：按正则表达式批量替换节点名
- **正则删除**：按正则表达式在节点名中删除内容
- **脚本操作**：通过脚本自由修改节点
- **域名解析（Resolve Domain）**：将节点的域名解析为 IP（支持裂变出多 IP 节点、标记 IPv6 等）

操作按配置顺序依次执行，注意顺序会影响最终结果（比如先重命名再排序）。

## 常用小课堂示例

- [按协议筛选节点](https://zhetengsha.eu.org/blog/posts/1687)
- [筛选出 Shadowsocks 2022 节点](https://zhetengsha.eu.org/blog/posts/1817)
- [标记 IPv6 节点](https://zhetengsha.eu.org/blog/posts/2197)
- [按节点名称排序](https://zhetengsha.eu.org/blog/posts/2082)
- [节点按延迟排序](https://zhetengsha.eu.org/blog/posts/1966)
- [节点按 IP+端口去重](https://zhetengsha.eu.org/blog/posts/2314)
- [域名解析多 IP 裂变节点](https://zhetengsha.eu.org/blog/posts/2559)
- [以云通为例，从节点名称提取流量信息和套餐等级并写入](https://zhetengsha.eu.org/blog/posts/2657)
- [修改 QX 的 obfs=http 为 vmess-http](https://zhetengsha.eu.org/blog/posts/3777)（QX 的 SS http obfs 与 VMess http obfs 实现不同，特殊服务端下需要互相替换）

## 脚本操作与脚本筛选

- **脚本操作**：作用于每个节点，可修改节点属性（推荐用节点快捷脚本，直接操作 `$server`）
- **脚本筛选**：返回布尔值决定节点是否保留

两者二选一使用函数式写法时，与快捷脚本写法不可混用（见 [脚本使用](../script/usage)）。

## 拉取别的 Sub-Store 输出时获取所有节点

当用 Sub-Store 拉取另一个 Sub-Store 的输出时，默认只拿到该输出包含的协议。若需要处理全部节点，可开启「包含官方/商店版不支持的协议」（`includeUnsupportedProxy`），详见[折腾啥博客](https://zhetengsha.eu.org/blog/posts/1894)。

## 参考

- 支持的筛选/操作完整清单见[后端仓库 README](https://github.com/sub-store-org/Sub-Store)
- 更多示例见折腾啥博客 [小课堂](https://zhetengsha.eu.org/blog/236/) 板块
