<template>
  <n-config-provider :theme="currentTheme" :theme-overrides="currentOverrides">
    <AppProvider>
      <Layout />
    </AppProvider>
  </n-config-provider>
</template>

<script lang="ts" setup>
import Layout from '@/pages/layout/index.vue'
import { NConfigProvider } from 'naive-ui'
import { APP } from '@/constant/APP'
import { priceStore } from '@/store/Modules/price/index'
import { useTheme } from '@/hooks/app/useTheme'
import { useLang } from '@/hooks/app/useLang'

const price = priceStore()
// 初始化汇率
price.getExchangeRateH()

// 主题（与你现有 useTheme 一样）
const { currentTheme, currentOverrides } = useTheme({
  lightOverrides: APP.lightThemeOverrides,
  darkOverrides: APP.darkThemeOverrides ?? {},
})
// 语言（根部做一次初始化）
useLang({ fallback: 'en' })
</script>

<style lang="scss" scoped></style>
