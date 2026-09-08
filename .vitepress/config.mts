import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: 'Sub-Store',
  description: 'Sub-Store 文档',
  lang: 'zh-CN',
  base: '/doc/',

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
      { text: '订阅', link: '/subscription/' },
      { text: '文件', link: '/file/' },
      { text: '脚本', link: '/script/' },
      { text: '其他功能', link: '/other/' },
      { text: '参考', link: '/reference/' }
    ],

    sidebar: [
      {
        text: '指南',
        items: [
          { text: '快速开始', link: '/guide/getting-started' },
          { text: '安装', link: '/guide/installation' },
          { text: '故障排查', link: '/guide/troubleshooting' }
        ]
      },
      {
        text: '订阅',
        items: [
          { text: '订阅管理', link: '/subscription/' },
          { text: '本地节点与订阅', link: '/subscription/local' },
          { text: '组合订阅', link: '/subscription/collection' }
        ]
      },
      {
        text: '文件',
        items: [
          { text: '文件管理', link: '/file/' },
          { text: '文件脚本', link: '/file/scripts' }
        ]
      },
      {
        text: '脚本',
        items: [
          { text: '脚本概览', link: '/script/' },
          { text: '脚本使用', link: '/script/usage' },
          { text: '脚本 API', link: '/script/api' }
        ]
      },
      {
        text: '其他功能',
        items: [
          { text: '同步', link: '/other/sync' },
          { text: '分享', link: '/other/shares' },
          { text: '归档', link: '/other/archives' },
          { text: '我的', link: '/other/my' }
        ]
      },
      {
        text: '高级功能',
        items: [
          { text: 'HTTP-META', link: '/http-meta/' }
        ]
      },
      {
        text: '参考',
        items: [
          { text: '环境变量', link: '/reference/environment-variables' },
          { text: 'sub.store 域名说明', link: '/reference/sub-store-domain' }
        ]
      }
    ]
  }
})
