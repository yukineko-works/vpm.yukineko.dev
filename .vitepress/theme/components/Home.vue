<template>
    <div :class="$style.root">
        <div :class="$style.container">
            <div :class="$style.titleContainer">
                <div>
                    <h2 :class="$style.title">Packages</h2>
                    <p :class="$style.subtext">{{ vpmPackagesUrl }}</p>
                </div>
                <div :class="$style.buttons">
                    <VPButton theme="brand" text="VCCに追加" target="_self" :href="`vcc://vpm/addRepo?url=${encodeURIComponent(vpmPackagesUrl)}`" />
                    <VPButton theme="alt" text="リポジトリURLをコピー" @click="copyRepositoryUrl" />
                </div>
            </div>
            <div>
                <p v-if="loading">Loading...</p>
                <p v-else-if="error">Failed to fetch packages</p>
                <div v-else :class="$style.packages">
                    <template v-for="(vrcPackage, name) in repository?.packages" :key="name">
                        <VRCPackage v-if="Object.keys(vrcPackage.versions).length > 0" :vrcPackage="vrcPackage" />
                    </template>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { VPButton } from 'vitepress/theme'
import { vpmPackagesUrl } from '../../vpm.config'
import VRCPackage from './VRCPackage.vue'
import type { VRCPackages as TVRCPackages } from '../types/vpm'

const loading = ref(true)
const error = ref(false)
const repository = ref<TVRCPackages>()

const copyRepositoryUrl = () => {
    navigator.clipboard.writeText(vpmPackagesUrl)
}

const fetchPackages = async () => {
    try {
        const response = await fetch(vpmPackagesUrl)
        if (!response.ok) {
            throw new Error('Failed to fetch packages')
        }
        repository.value = await response.json()
    } catch (e) {
        error.value = true
    } finally {
        loading.value = false
    }
}

fetchPackages()

</script>

<style module lang="scss">
.root {
    padding: 0 24px;

    @media (min-width: 640px) {
        padding: 0 48px;
    }

    @media (min-width: 960px) {
        padding: 0 64px;
    }
}

.container {
    margin: 0 auto;
    max-width: 1152px;
}

.titleContainer {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 16px 32px;
    flex-wrap: wrap;
    margin-bottom: 32px;
}

.subtext {
    margin-top: 4px;
    color: var(--vp-c-text-2);
    font-size: 14px;

    @media (min-width: 640px) {
        font-size: 15px;
    }

    @media (min-width: 960px) {
        font-size: 16px;
    }
}

.title {
    font-size: 18px;
    font-weight: 500;

    @media (min-width: 640px) {
        font-size: 20px;
    }

    @media (min-width: 960px) {
        font-size: 24px;
    }
}

.buttons {
    display: flex;
    gap: 8px;
}

.packages {
    display: flex;
    flex-direction: column;
    gap: 16px;

    > * {
        width: 100%;
    }
}
</style>