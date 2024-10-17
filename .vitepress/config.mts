import { defineConfig } from 'vitepress'
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

    sidebar: [
      {
        text: 'Examples',
        items: [
          { text: 'Markdown Examples', link: '/markdown-examples' },
          { text: 'Runtime API Examples', link: '/api-examples' }
        ]
      }
    ],

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
  }
})
