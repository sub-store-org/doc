---
title: 支持的格式
description: Sub-Store 支持的输入格式与输出目标平台完整清单
---

# 支持的格式

## 输入格式

Sub-Store 支持以下输入格式（详见[后端仓库 README](https://github.com/sub-store-org/Sub-Store)）：

::: warning
不要用 Shadowrocket 或 NekoBox 导出 URI 再作为输入导入——导出的 URI 可能不是标准 URI。已兼容部分常见的非标准 URI（如 VMess、VLESS）。
:::

### 协议 URI

| URI Scheme | 支持的协议 |
| --- | --- |
| `socks5`、`socks5+tls`、`http`、`https` | 代理 URI |

| URI 协议 | 说明 |
| --- | --- |
| AnyTLS | AnyTLS |
| SOCKS | SOCKS5 |
| SS | Shadowsocks |
| SSR | ShadowsocksR |
| VMess | V2Ray VMess |
| VLESS | V2Ray VLESS |
| Trojan | Trojan |
| Hysteria | Hysteria |
| Hysteria 2 | Hysteria 2 |
| TUIC v5 | TUIC |
| WireGuard | WireGuard |

> HTTP(s) 没有标准 URI 格式，不支持用 URI 输入，请使用其他格式。

### 各代理 App 原生格式

| 平台 | 支持的协议 |
| --- | --- |
| **QX** | SS、SSR、VMess、Trojan、HTTP、SOCKS5、VLESS、AnyTLS |
| **Loon** | SS、SSR、VMess、Trojan、HTTP、SOCKS5、SOCKS5-TLS、WireGuard、VLESS、Hysteria 2、AnyTLS |
| **Surge** | Direct、SS、VMess、Trojan、HTTP、HTTPS、HTTP/2 CONNECT、SOCKS5、SOCKS5-TLS、AnyTLS、TrustTunnel、TUIC、Snell、Hysteria 2、MASQUE、SSH（仅密码认证）、External Proxy Program（仅 macOS）、WireGuard（Surge 互转） |
| **mihomo（Clash.Meta）** | Direct、SS、SSR、VMess、Trojan、HTTP、SOCKS5、Snell、VLESS、WireGuard、Hysteria、Hysteria 2、TUIC、SSH、mieru、sudoku、AnyTLS、MASQUE、Tailscale、GOST Relay、Shadow QUIC、ZeroTier、OpenVPN |

### Clash 格式

- **Clash Proxies YAML**（多行）
- **Clash Proxy JSON / JSON5 / YAML**（单行）

::: info 已弃用
旧版 Clash（SS、SSR、VMess、Trojan、HTTP、SOCKS5、Snell、VLESS、WireGuard）已弃用：前端不再显示，但后端仍支持（通过 `target=Clash` 参数）。
:::

## 输出目标

| 目标平台 | 说明 |
| --- | --- |
| **Plain JSON** | 结构化节点数据，便于调试和脚本使用 |
| **Stash** | — |
| **mihomo（Clash.Meta）** | — |
| **Surfboard** | — |
| **Surge** | — |
| **SurgeMac** | 使用 mihomo 支援 Surge 本身不支持的协议（如 VLESS/SSR） |
| **Loon** | — |
| **Egern** | — |
| **Shadowrocket** | — |
| **QX** | — |
| **sing-box** | — |
| **V2Ray** | — |
| **V2Ray URI** | — |

::: info 已弃用
**Clash**（旧版）已弃用，仍可通过 `target=Clash` 输出。
:::

## 参考

- [本地节点与订阅](../subscription/local)
- [订阅转换](../subscription/conversion)
- [后端仓库 README](https://github.com/sub-store-org/Sub-Store)
