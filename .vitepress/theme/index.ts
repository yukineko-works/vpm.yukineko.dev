// https://vitepress.dev/guide/custom-theme
import { h } from 'vue'
import type { Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import HomeLayout from './HomeLayout.vue'
import './style.css'

export default {
  extends: DefaultTheme,
  Layout: () => {
    return h(HomeLayout)
  },
  enhanceApp({ app, router, siteData }) {
  }
} satisfies Theme
