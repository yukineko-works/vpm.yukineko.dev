import { defineConfig } from 'vitepress'
import footnote from 'markdown-it-footnote'
import lightbox from 'vitepress-plugin-lightbox'
import SidebarGroupParentGenerator from './sidebarParentGenerator'

const sidebarParentGenerator = new SidebarGroupParentGenerator()

// https://vitepress.dev/reference/site-config
export default defineConfig(sidebarParentGenerator.defineConfig({
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
                { text: '利用規約', link: 'tos' }
            ]
        }, {
            text: 'WIM拡張モジュール',
            collapsed: true,
            base: '/docs/wim-modules/',
            items: [
                { text: 'モジュール一覧', link: 'intro' },
                { text: '導入方法', link: 'getting-started' },
                {
                    text: '設定',
                    collapsed: false,
                    base: '/docs/wim-modules/settings/',
                    items: [
                        { text: 'ライティング設定モジュール', link: 'lighting' },
                        { text: 'サウンド設定モジュール', link: 'sound' },
                        { text: 'スイッチモジュール', link: 'switch' },
                        { text: 'Joinログモジュール', link: 'joinlog' },
                        { text: 'プレイヤー一覧モジュール', link: 'playerlist' },
                        { text: 'QvPen呼び出しモジュール', link: 'qvpen-summoner' },
                        { text: '動画プレイヤー操作モジュール', link: 'videoplayer-controller' },
                        { text: 'テレポートモジュール', link: 'teleport' },
                        { text: 'ミラーモジュール', link: 'mirror' },
                    ]
                },
                {
                    text: '更新履歴',
                    collapsed: false,
                    base: '/docs/wim-modules/changelog/',
                    items: [
                        { text: 'WIM 拡張モジュール Vol.1', link: 'ext-vol1' },
                        { text: 'WIM 拡張モジュール Vol.2', link: 'ext-vol2' },
                    ]
                },
                { text: '利用規約', link: 'tos' }
            ]
        }, {
            text: '天候&太陽システム',
            collapsed: true,
            base: '/docs/wass-core/',
            items: [
                { text: 'このギミックについて', link: 'intro' },
                { text: '導入方法', link: 'getting-started' },
                { text: '設定', link: 'settings' },
                { text: '更新履歴', link: 'changelog' },
                { text: '移行ガイド', link: 'migration-guide' },
                { text: '対応しているSkybox', link: 'supported-skybox' },
                { text: '利用規約', link: 'tos' }
            ]
        }, {
            text: '天気予報パネル',
            collapsed: true,
            base: '/docs/wass-weather-panel/',
            items: [
                { text: 'このギミックについて', link: 'intro' },
                { text: '導入方法', link: 'getting-started' },
                { text: '設定', link: 'settings' },
                { text: '更新履歴', link: 'changelog' },
                { text: '移行ガイド', link: 'migration-guide' },
                { text: '利用規約', link: 'tos' }
            ]
        }],

        socialLinks: [
            { icon: 'github', link: 'https://github.com/yukineko-works' }
        ]
    },
    markdown: {
        config: (md) => {
            md.use(footnote)
            md.use(lightbox);
        }
    }
}, {
    childrenCardGenerator: (items) => {
        const children = items.map((child) => `<PageCard name="${child.text}" link="${child.link}" />`).join('')
        return `<div style="display: flex; flex-wrap: wrap; justify-content:space-between; gap: 1rem; margin-top: 2rem;">${children}</div>`
    }
}))
