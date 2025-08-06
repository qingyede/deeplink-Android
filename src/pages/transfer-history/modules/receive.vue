<template>
  <div class="flex flex-col items-start gap-4 p-2">
    <div class="text-sm text-gray-500 dark:text-gray-300">{{ $t('transaction.myAddress') }}：</div>
    <div class="text-base break-all font-mono">{{ app.address }}</div>
    <n-button type="primary" size="small" @click="copyAddress"> {{ $t('transaction.copyAddress') }} </n-button>
  </div>
</template>

<script lang="ts" setup>
import { ref, watchEffect } from 'vue'
import { useClipboard } from '@vueuse/core'
import { appStore } from '@/store/Modules/app'
import { useI18n } from 'vue-i18n'

const { t, locale } = useI18n()
const app = appStore()

const { copy } = useClipboard()

const copyAddress = async () => {
  await copy(app.address)
  window.$message?.success(t('transaction.copySuccess'))
}
</script>

<style scoped>
.break-all {
  word-break: break-all;
}
</style>
