<template>
    <a :class="$style.root" :href="link">
        <span>{{ name }}</span>
        <!-- <span :class="$style.bottomText">
          View <span class="vpi-arrow-right" />
        </span> -->
    </a>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'

const props = defineProps<{
    link: string,
    name: string,
}>()
</script>

<style module lang="scss">
.root {
    display: flex;
    flex-direction: column;
    gap: 12px;
    flex-grow: 1;
    flex-wrap: wrap;
    flex-basis: 300px;
    height: 100%;
    width: 100%;
    padding: 24px;
    border: 1px solid;
    border-color: var(--vp-c-divider);
    border-radius: 12px;
    background-color: var(--vp-c-bg-soft);
    transition: all 0.25s !important;
    color: var(--vp-c-text-1) !important;

    &:hover {
        border-color: var(--vp-c-brand-1);
        color: var(--vp-c-brand-1) !important;
    }
}

.bottomText {
    display: flex;
    align-items: center;
    gap: 6px;
}
</style>