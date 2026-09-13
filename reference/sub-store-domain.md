---
title: sub.store 域名说明
description: ⚠️ sub.store 只是模块脚本重写 MitM 使用的域名，并非我方持有的公网域名
---

# `sub.store` 域名说明

::: warning 声明

⚠️ `sub.store` 其实只是模块脚本重写 MitM 使用的域名，**并非我方持有的公网域名**
:::

## 潜在风险

::: danger 注意

若请求没进重写,数据将发往 `sub.store` 的公网服务
当然你可以使用映射 `sub.store` 到 `127.0.0.1` 等方式来防止意外访问公网的 `sub.store`
但是普通用户仍可能在切换/开关配置模块等操作后,有发往公网的 `sub.store` 的请求

1. 可能(仅仅是可能 不是暗示 `sub.store` 持有者会这么做) 会让 `sub.store` 跳转到一个假前端. 注意: 官方的前端是 `https://sub-store.vercel.app`.
2. 可能会获取到 `sub.store` 的用户数据

存在数据泄露的风险
:::


## 方案

在群内听取了大家的建议, 暂时不更换为新域名(新域名的选择其实也挺蛋疼的. 需要有关联又短又不能被注册(至少短期之内不会)了)
仅发布本通告. 暂不修改.

::: tip
一个示例
```
[Host]
sub.store = 127.0.0.1
```
:::

::: warning 适用范围
将 `sub.store` 映射到 `127.0.0.1` **仅适用于代理 App 模块版**（此时重写让 `sub.store` 命中本机后端）。Docker 自建、Android 模块、SubCase 等场景本地并无 `sub.store:443` 服务，照做会阻断前端访问——此类环境请改用规则拒绝对 `sub.store` 的访问，或配置 DNS 兜底到你可控的地址（如任一无响应 IP），而不是映射到本机。
:::