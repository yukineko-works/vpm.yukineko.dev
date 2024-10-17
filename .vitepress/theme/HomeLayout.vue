<template>
    <DefaultTheme.Layout>
        <template #home-features-after>
            <HomePage />
            <Home />
        </template>
    </DefaultTheme.Layout>
</template>

<script setup lang="ts">
import DefaultTheme from 'vitepress/theme'
import Home from './components/Home.vue'
</script>