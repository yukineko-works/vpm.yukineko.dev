// https://vitepress.dev/guide/custom-theme
import { h } from 'vue'
import type { Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import HomeLayout from './HomeLayout.vue'
import BoothLink from './components/BoothLink.vue'
import VPMLink from './components/VPMLink.vue'
import PageCard from './components/PageCard.vue'
import vitepressNprogress from 'vitepress-plugin-nprogress'
import 'vitepress-plugin-nprogress/lib/css/index.css'
import './style.css'

export default {
  extends: DefaultTheme,
  Layout: () => {
    return h(HomeLayout)
  },
  enhanceApp(ctx) {
    const { app, router, siteData } = ctx
    app.component('Booth', BoothLink)
    app.component('VPMLink', VPMLink)
    app.component('PageCard', PageCard)

    vitepressNprogress(ctx)
  }
} satisfies Theme
