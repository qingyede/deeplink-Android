<template>
  <div class="relative inline-block text-left">
    <n-dropdown trigger="click" :options="dropdownOptions" @select="changeLanguage">
      <div>
        <Icon icon="mdi:translate" class="text-[21px] text-primary-500" />
      </div>
    </n-dropdown>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { appStore } from '@/store/Modules/app'
import { Icon } from '@iconify/vue'
import { NDropdown } from 'naive-ui'
import { LANG_MAP } from '@/constant/APP'

// 多语言配置

const app = appStore()
const { locale } = useI18n()

// dropdown 数据
const dropdownOptions = Object.entries(LANG_MAP).map(([key, { label, icon }]) => ({
  label: `${icon}  ${label}`,
  key,
}))

// 切换语言逻辑
const changeLanguage = (lang: string) => {
  locale.value = lang
  app.lang = lang
  localStorage.setItem('lang', lang)
}
</script>

<style scoped>
/* 可根据需要加动画/阴影等效果 */
</style>
