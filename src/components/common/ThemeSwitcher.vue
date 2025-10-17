<!-- ThemeDropdown.vue -->
<template>
  <n-dropdown v-model:value="mode" :options="options" trigger="click" @select="onSelect">
    <n-button text aria-label="主题">
      <Icon :icon="iconOf(mode)" class="text-[22px] text-primary-light dark:text-primary-dark" />
    </n-button>
  </n-dropdown>
</template>

<script setup lang="ts">
import { h, computed } from 'vue'
import { NDropdown, NButton } from 'naive-ui'
import { Icon } from '@iconify/vue'
import { useTheme } from '@/hooks/app/useTheme'
import { useI18n } from 'vue-i18n'
const { t } = useI18n()

const { mode, setMode } = useTheme()

const onSelect = (k: string | number) => setMode(k as any)

const options = computed<any[]>(() => [
  {
    key: 'auto',
    label: t('common.auto'),
    icon: () => h(Icon, { icon: 'material-symbols-light:wand-stars', class: 'text-[16px]' }),
  },
  {
    key: 'light',
    label: t('common.light'),
    icon: () => h(Icon, { icon: 'ph:sun-duotone', class: 'text-[16px]' }),
  },
  {
    key: 'dark',
    label: t('common.dark'),
    icon: () => h(Icon, { icon: 'solar:moon-stars-bold-duotone', class: 'text-[16px]' }),
  },
])

const iconOf = (m: any) =>
  m === 'auto' ? 'material-symbols-light:wand-stars' : m === 'light' ? 'ph:sun-duotone' : 'solar:moon-stars-bold-duotone'
</script>
