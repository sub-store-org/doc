---
title: 本地节点与订阅
description: 本地节点/订阅怎么写：单行协议语法、URI、JSON5/YAML 与完整订阅内容
---

# 本地节点与订阅

在订阅编辑页的「本地内容」中可以：

- 换行输入多个**单行的代理协议 / JSON5 / YAML / URI**
- 混写不同代理 App 语法的节点（如 Surge 格式、Loon 格式、mihomo 格式混排）

一般习惯是：能用 Surge 格式就用 Surge 格式，不行的就换其他格式。

## 支持输入的格式

本地内容支持混写不同来源的格式：协议 URI、Clash Proxies YAML、Clash 单行 JSON / JSON5 / YAML，以及 QX / Loon / Surge / mihomo(Clash.Meta) 原生格式。各平台支持的协议完整清单见[支持的格式](../reference/formats)。

::: warning
不要用 Shadowrocket / NekoBox 导出 URI 再作为输入导入——这样导出的 URI 可能不是标准 URI（已兼容部分常见的非标准 URI，如 VMess、VLESS）。
:::

## 示例

单行 Surge 风格：

```
a = socks5, 127.0.0.1, 1080
b = ss, example.com, 8388, encrypt-method=aes-128-gcm, password=1234
```

单行 mihomo JSON5：

```
{ name: 'demo', type: 'ss', server: 'example.com', port: 8388, cipher: 'aes-128-gcm', password: '1234' }
```

## 本地订阅（完整内容）

也可以把一份完整的远程代理订阅内容直接填进去：

- 完整 **Base64** 订阅内容
- 完整 **YAML** 订阅内容

## WireGuard 写法

支持三种输入语法（示例细节以相关协议文档为准）：

1. **WireGuard URI**：`wireguard://` 或 `wg://`（参数值需要 URL 编码；不建议用 URI，其他格式更直观）
2. **Loon 单行**：`wireguardNode = wireguard,interface-ip=...,private-key="...",peers=[{...}],udp=true`
3. **mihomo 单行 JSON5/YAML**：

```json
{
  "name": "wg",
  "type": "wireguard",
  "server": "162.159.192.1",
  "port": 2480,
  "ip": "172.16.0.2",
  "ipv6": "fd01:...",
  "public-key": "...",
  "private-key": "...",
  "udp": true,
  "dns": ["1.1.1.1", "8.8.8.8"],
  "peers": [{ "server": "162.159.192.1", "port": 2480, "public-key": "...", "allowed-ips": ["0.0.0.0/0"] }]
}
```

::: tip WireGuard 前缀长度
WireGuard 支持 `ip-cidr`（IPv4 前缀长度）与 `ipv6-cidr`（IPv6 前缀长度）字段，未设置时默认分别为 `32` / `128`；输出到 mihomo / Shadowrocket / sing-box / URI 时会把该后缀带上（如 `1.2.3.4/32`）。
:::

## 参考

- 节点内部字段结构：可在预览界面点击节点查看 JSON，或查看 `target=JSON` 的通用订阅输出（Plain JSON）；也可参考 [demo.js](https://github.com/sub-store-org/Sub-Store/blob/master/scripts/demo.js)
- NaiveProxy / Tailscale 等特殊写法的说明见折腾啥博客：[本地节点/订阅怎么写](https://zhetengsha.eu.org/blog/posts/824)、[WireGuard 格式](https://zhetengsha.eu.org/blog/posts/1144)
