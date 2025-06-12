<template>
  <n-config-provider :theme-overrides="APP.lightThemeOverrides">
    <AppProvider>
      <Layout />
    </AppProvider>
  </n-config-provider>
</template>

<script lang="ts" setup>
import Layout from '@/pages/layout/index.vue'
import { NConfigProvider, darkTheme, lightTheme } from 'naive-ui'
import { APP } from '@/constant/APP'
import { appStore } from '@/store/Modules/app/index'
const app = appStore()
</script>

<style lang="scss" scoped></style>
