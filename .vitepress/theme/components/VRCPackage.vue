<template>
    <div :class="$style.root">
        <div :class="$style.packageNamesContainer">
            <h2 :class="$style.title">{{ latestPackage.displayName }}</h2>
            <p :class="$style.packageId">{{ latestPackage.name }} &bull; {{ latestPackage.version }}</p>
        </div>
        <p :class="$style.subtext">{{ latestPackage.description }}</p>
    </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'
import type { VRCPackage } from '../types/vpm'

const props = defineProps<{
    vrcPackage: VRCPackage
}>()

const latestPackage = props.vrcPackage.versions[Object.keys(props.vrcPackage.versions)[0]]
</script>

<style module lang="scss">
.root {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 12px;
    flex-wrap: wrap;
    padding: 24px;
    border: 1px solid var(--vp-c-bg-soft);
    border-radius: 12px;
    height: 100%;
    background-color: var(--vp-c-bg-soft);

    @media (max-width: 640px) {
        flex-direction: column;
        gap: 2px;
        align-items: normal;
        padding: 18px 24px;
    }
}

.packageNamesContainer {
    flex-shrink: 0;
}

.title {
    line-height: 24px;
    font-size: 16px;
    font-weight: 600;
}

.subtext {
    font-size: 14px;
    font-weight: 400;
    color: var(--vp-c-text-2);
    overflow-wrap: anywhere;
}

.packageId {
    font-size: 12px;
    font-weight: 400;
    color: var(--vp-c-text-3);
}
</style>