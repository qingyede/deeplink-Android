<template>
  <n-config-provider :theme-overrides="APP.lightThemeOverrides">
    <AppProvider>
      <Layout />
    </AppProvider>
  </n-config-provider>
</template>

<script lang="ts" setup>
import { watch, onMounted, watchEffect } from 'vue'
import { storeToRefs } from 'pinia'
import Layout from '@/pages/layout/index.vue'
import { NConfigProvider, darkTheme, lightTheme } from 'naive-ui'
import { APP } from '@/constant/APP'
import { appStore } from '@/store/Modules/app/index'
import { useI18n } from 'vue-i18n'
import { priceStore } from '@/store/Modules/price/index'

const price = priceStore()
const app = appStore()
const { locale, t } = useI18n()
const store = appStore()
const { theme } = storeToRefs(store)

// 初始化汇率
price.getExchangeRateH()
const isDark = computed({
  get: () => theme.value === 'dark',
  set: (val: boolean) => {
    theme.value = val ? 'dark' : 'light'
  },
})
// ✅ 实时监听变化，更新 data-theme 属性
watch(
  isDark,
  (val) => {
    const html = document.documentElement
    html.setAttribute('data-theme', val ? 'dark' : 'light')
  },
  { immediate: true }
)

watchEffect(() => {
  locale.value = localStorage.getItem('lang') || 'en'
  app.lang = localStorage.getItem('lang') || 'en'
})
</script>

<style lang="scss" scoped></style>
