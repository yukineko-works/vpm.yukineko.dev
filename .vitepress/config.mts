import { defineConfig } from 'vitepress'
import footnote from 'markdown-it-footnote'
import { vpmPackagesUrl } from './vpm.config'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "yukineko works",
  description: "VPM Repository & Docs",
  lang: 'ja-JP',
  srcDir: 'pages',
  outDir: 'dist',
  cleanUrls: true,
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'ホーム', link: '/' },
      { text: 'ドキュメント', link: '/docs' }
    ],

    sidebar: [{
      text: 'ワールド統合メニュー (WIM)',
      collapsed: true,
      base: '/docs/wim-core/',
      items: [
        { text: 'このギミックについて', link: 'intro' },
        { text: '導入方法', link: 'getting-started' },
        { text: '設定', link: 'settings' },
        { text: 'モジュールの追加方法', link: 'add-module' },
        { text: '更新履歴', link: 'changelog' },
        { text: 'よくある質問', link: 'faq' },
      ]
    }, {
      text: 'WIM拡張モジュール',
      collapsed: true,
      base: '/docs/wim-modules/',
      items: [
        { text: 'このギミックについて', link: 'intro' },
        { text: '導入方法', link: 'getting-started' },
      ]
    }],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/yukineko-works' }
    ]
  },
  markdown: {
    config: (md) => {
      md.use(footnote)
    }
  }
})
