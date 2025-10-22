<template>
  <div :class="`fixed bottom-0 left-0  w-full min-h-[100px] !z-[9999] bg-white  dark:bg-background-dark`">
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
