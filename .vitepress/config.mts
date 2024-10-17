import { defineConfig } from 'vitepress'
import footnote from 'markdown-it-footnote'
import { vpmPackagesUrl } from './vpm.config'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "yukineko works",
  description: "VPM Repository & Docs",
  lang: 'ja-JP',
  srcDir: 'pages',
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
  transformPageData: (pageData) => {
    const actions = pageData.frontmatter?.hero?.actions
    if (typeof actions !== 'object' || !Array.isArray(actions)) return

    pageData.frontmatter.hero.actions = actions.map(action => {
      if (action?.link === '#@vcc') {
        action.link = `vcc://vpm/addRepo?url=${encodeURIComponent(vpmPackagesUrl)}`
      }
      return action
    })

    return pageData
  },
  markdown: {
    config: (md) => {
      md.use(footnote)
    }
  }
})
