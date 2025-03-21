<template>
    <a :href="props.link" :class="$style.root" target="_blank" rel="noopener noreferrer">BOOTHから{{ props.isFree ? 'ダウンロード' : '購入' }}</a>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'

const props = defineProps({
    link: {
        type: String,
        required: true,
    },
    isFree: {
        type: Boolean,
        default: false,
    },
})
</script>

<style module lang="scss">
@use "sass:color";
$booth-color: #fc4d50;

.root {
    display: inline-block;
    background-color: $booth-color;
    color: #fff !important;
    border-radius: 8px;
    font-size: 18px;
    padding: 12px 32px;
    margin-right: 12px;
    margin-bottom: 12px;
    transition: all 0.3s !important;

    &:hover {
        background-color: color.adjust($booth-color, $lightness: 10%);
    }
}
</style>