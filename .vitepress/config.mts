import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: 'Sub-Store 文档',
  description: 'Sub-Store 文档',
  lang: 'zh-CN',
  base: '/doc/',
  cleanUrls: true,

  head: [
    ['link', {
      rel: 'icon',
      type: 'image/svg+xml',
      href: '/doc/favicon.svg'
    }]
  ],

  themeConfig: {
    logo: '/favicon.svg',

    socialLinks: [
      { icon: 'github', link: 'https://github.com/sub-store-org' }
    ],

    lastUpdated: {
      text: '最后更新'
    },

    outline: {
      label: '页面导航',
      level: [2, 3]
    },

    docFooter: {
      prev: '上一页',
      next: '下一页'
    },

    nav: [
      { text: '指南', link: '/guide/' },
      { text: '参考', link: '/reference/environment-variables' },
      { text: '成员', link: '/members' }
    ],

    sidebar: [
      {
        text: '指南',
        collapsed: false,
        items: [
          { text: '快速开始', link: '/guide/getting-started' },
          { text: '安装', link: '/guide/installation' },
          { text: '故障排查', link: '/guide/troubleshooting' }
        ]
      },
      {
        text: '参考',
        collapsed: false,
        items: [
          { text: '环境变量', link: '/reference/environment-variables' },
          { text: 'sub.store 域名说明', link: '/reference/sub-store-domain' }
        ]
      },
      {
        text: '脚本',
        collapsed: true,
        items: [
          { text: '脚本概览', link: '/script/overview' },
          { text: '脚本使用', link: '/script/usage' },
          { text: '脚本 API', link: '/script/api' }
        ]
      },
      {
        text: '订阅',
        collapsed: true,
        items: [
          { text: '订阅概览', link: '/subscription/overview' },
          { text: '本地节点与订阅', link: '/subscription/local' },
          { text: '组合订阅', link: '/subscription/collection' },
          { text: '订阅处理', link: '/subscription/processors' },
          { text: '订阅转换', link: '/subscription/conversion' }
        ]
      },
      {
        text: '文件',
        collapsed: true,
        items: [
          { text: '文件概览', link: '/file/overview' },
          { text: '文件脚本', link: '/file/scripts' }
        ]
      },
      {
        text: '同步',
        collapsed: true,
        items: [
          { text: '同步概览', link: '/sync/overview' }
        ]
      },
      {
        text: '分享',
        collapsed: true,
        items: [
          { text: '分享概览', link: '/shares/overview' }
        ]
      },
      {
        text: '归档',
        collapsed: true,
        items: [
          { text: '归档概览', link: '/archives/overview' }
        ]
      },
      {
        text: '我的',
        collapsed: true,
        items: [
          { text: '我的概览', link: '/my/overview' },
          { text: '日志', link: '/my/logs' },
          { text: '设置', link: '/my/settings' }
        ]
      },
      {
        text: '高级功能',
        collapsed: true,
        items: [
          { text: 'HTTP-META', link: '/advanced/http-meta' }
        ]
      }
    ]
  }
})
