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

// 初始化汇率
price.getExchangeRateH()
const { locale, t } = useI18n()

const app = appStore()

const store = appStore()
const { theme } = storeToRefs(store)
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
  if (app.lang) {
    // 更新 i18n 语言
    locale.value = app.lang
  }
})
</script>

<style lang="scss" scoped></style>
