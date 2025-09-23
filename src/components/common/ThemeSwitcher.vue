<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { appStore } from '@/store/Modules/app'
import { onMounted, watch } from 'vue'
import { NSwitch } from 'naive-ui'

const store = appStore()
const { theme } = storeToRefs(store)

const isDark = computed({
  get: () => theme.value === 'dark',
  set: (val: boolean) => {
    theme.value = val ? 'dark' : 'light'
  },
})

// ✅ 正确初始化 data-theme 属性
onMounted(() => {
  const html = document.documentElement
  html.setAttribute('data-theme', isDark.value ? 'dark' : 'light')
})
</script>

<template>
  <n-switch
    :value="isDark"
    @update:value="(val) => (isDark = val)"
    :rail-style="
      ({ checked }) => ({
        backgroundColor: checked ? '#03C188' : '#dcdcdc',
      })
    "
  >
    <template #checked-icon>
      <n-icon>
        <Icon icon="solar:cloudy-moon-bold-duotone" class="text-yellow-500" />
      </n-icon>
    </template>
    <template #unchecked-icon>
      <n-icon>
        <Icon icon="solar:sun-2-linear" class="text-amber-500" />
      </n-icon>
    </template>
  </n-switch>
</template>
