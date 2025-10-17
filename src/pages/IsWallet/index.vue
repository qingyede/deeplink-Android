<template>
  <div class="px-[16px]">
    <!-- 创建钱包 -->
    <h1 class="text-[24px] font-bold mb-2">{{ $t('IsWallet.walletUserManual') }}</h1>
    <div class="flex flex-col flex-wrap gap-3">
      <div class="item" v-for="(item, index) in tipsData" :key="index">
        <span class="text-primary-500 font-bold text-[21px] mr-[2px]">{{ item.number }}</span>
        <span class="text-[14px] leading-6"> {{ item.text }}</span>
      </div>
    </div>
    <!-- 创建按钮 -->
    <div class="mt-[80px] flex flex-col gap-3">
      <n-button
        @click="router.push({ name: 'creatWallet' })"
        type="primary"
        class="flex-[1] rounded-lg min-h-[52px] text-[20px]"
        >{{ $t('IsWallet.createNewWallet') }}</n-button
      >
      <n-button
        @click="router.push({ name: 'openWallet' })"
        class="flex-[1] rounded-lg min-h-[52px] bg-[#03C188]/10 text-[20px]"
        >{{ $t('IsWallet.openWallet') }}</n-button
      >
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRouter, useRoute } from 'vue-router'
const { t } = useI18n()
const router = useRouter()
const route = useRoute()

const tipsData = computed(() => {
  return [
    {
      number: '01',
      text: t('IsWallet.manage'),
    },
  ]
})
</script>

<style lang="scss" scoped></style>
