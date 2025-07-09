<template>
  <div :style="{ bottom: safeAreaBottom || 0 }" :class="` footer fixed  left-0 w-full h-[100px] !z-[9999]`">
    <!-- {{ safeAreaBottom }} -->
    <!-- <n-button type="primary" @click="app.isWalletRegistered = !app.isWalletRegistered">切换</n-button> -->
    <MyFooterX />
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import MyFooterX from '@/components/common/MyFooter.vue'
import { useSafeAreaFooter } from '@/hooks/common/useSafeAreaFooter'
import { appStore } from '@/store/Modules/app'
const app = appStore()
const { safeAreaBottom } = useSafeAreaFooter()
</script>

<style lang="scss" scoped></style>
