import {defineConfig} from 'vitepress';

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: 'Sub Store',
  description: 'Sub Store 文档',
  lang: 'zh-CN',
  base: '/doc/',
  themeConfig: {
    logo: 'https://sub-store.desnlee.top/favicon.svg',
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      {text: 'Home', link: '/'},
      {text: 'Examples', link: '/markdown-examples'},
      {text: 'Members', link: '/members'}
    ],

    sidebar: [
      {
        text: 'Examples',
        items: [
          {text: 'Markdown Examples', link: '/markdown-examples'},
          {text: 'Runtime API Examples', link: '/api-examples'}
        ]
      }
    ],

    socialLinks: [
      {icon: 'github', link: 'https://github.com/sub-store-org'}
    ],

    lastUpdated: {
      text: '最后更新',
    }
  }
});
