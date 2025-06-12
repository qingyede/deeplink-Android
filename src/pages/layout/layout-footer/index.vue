<template>
  <div class="footer fixed bottom-0 left-0 w-full h-[100px]">
    <!-- <n-button type="primary" @click="app.isWalletRegistered = !app.isWalletRegistered">切换</n-button> -->
    <MyFooterX />
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import MyFooterX from '@/components/common/MyFooter.vue'
</script>

<style lang="scss" scoped></style>
