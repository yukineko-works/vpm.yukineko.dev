// https://vitepress.dev/guide/custom-theme
import { h } from 'vue'
import type { Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import HomeLayout from './HomeLayout.vue'
import BoothLink from './components/BoothLink.vue'
import VPMLink from './components/VPMLink.vue'
import './style.css'

export default {
  extends: DefaultTheme,
  Layout: () => {
    return h(HomeLayout)
  },
  enhanceApp({ app, router, siteData }) {
    app.component('Booth', BoothLink)
    app.component('VPMLink', VPMLink)
  }
} satisfies Theme
