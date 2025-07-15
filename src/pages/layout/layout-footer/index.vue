<template>
  <div :class="`fixed bottom-0 left-0  w-full min-h-[100px] !z-[9999]  `">
    <!-- {{ safeAreaBottom }} -->
    <!-- <n-button type="primary" @click="app.isWalletRegistered = !app.isWalletRegistered">切换</n-button> -->
    <MyFooterX class="min-h-[100px]" />
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import MyFooterX from '@/components/common/MyFooter.vue'
import { appStore } from '@/store/Modules/app'
const app = appStore()
</script>

<style lang="scss" scoped></style>
