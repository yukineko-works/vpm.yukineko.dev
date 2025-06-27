<template>
    <DefaultTheme.Layout>
        <template #home-features-after>
            <Home />
        </template>
    </DefaultTheme.Layout>
</template>

<script setup lang="ts">
import DefaultTheme from 'vitepress/theme'
import { onMounted } from 'vue'
import { useRouter } from 'vitepress'
import mediumZoom from 'medium-zoom'
import Home from './components/Home.vue'

const router = useRouter();
const setupMediumZoom = () => {
    mediumZoom('[data-zoomable]', {
        background: 'transparent',
    })
}

onMounted(setupMediumZoom)
router.onAfterRouteChange = setupMediumZoom;
</script>

<style>
.medium-zoom-overlay {
    backdrop-filter: blur(5rem);
}

.medium-zoom-overlay,
.medium-zoom-image--opened {
    z-index: 999;
}
</style>