<template>
    <a :href="`vcc://vpm/addRepo?url=${encodeURIComponent(vpmPackagesUrl)}`" :class="$style.root">VPMから追加</a>
</template>

<script setup lang="ts">
import { vpmPackagesUrl } from '../../vpm.config'
</script>

<style module lang="scss">
@use "sass:color";
$vpm-color: #323245;

.root {
    display: inline-block;
    background-color: $vpm-color;
    color: #fff !important;
    border-radius: 8px;
    font-size: 18px;
    padding: 12px 32px;
    transition: all 0.3s !important;

    &:hover {
        background-color: color.adjust($vpm-color, $lightness: 10%);
    }
}
</style>