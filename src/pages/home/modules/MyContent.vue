<template>
  <!-- 邀请 -->
  <div class="mt-[36px] flex flex-col gap-6">
    <n-input
      v-model:value="value"
      type="text"
      :placeholder="$t('home.inviteCodeInput')"
      class="min-h-[52px] rounded-lg bg-[#E1EBE7] dark:bg-[#2c2c2c] text-[#737373] dark:text-white/80"
    />
    <n-button class="w-full rounded-lg min-h-[52px] text-[22px]" type="primary">{{ $t('home.submit') }}</n-button>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'

import { NDivider } from 'naive-ui'

const router = useRouter()
const route = useRoute()

// 邀请码的值
const value = ref('')
</script>

<style lang="scss" scoped>
:deep(.n-tabs-tab__label) {
  font-weight: bold !important;
  font-size: 16px;
}
:deep(.n-input__input-el) {
  height: 100% !important;
}

:deep(.n-input .n-input__placeholder) {
  padding-left: 10px;
}
</style>
