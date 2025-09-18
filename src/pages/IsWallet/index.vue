<template>
  <div class="px-[16px]">
    <!-- 创建钱包 -->
    <h1 class="text-black text-[24px] font-bold mb-2">{{ $t('IsWallet.walletUserManual') }}</h1>
    <div class="flex flex-col flex-wrap gap-3">
      <div class="item" v-for="(item, index) in tipsData" :key="index">
        <span class="text-primary-500 font-bold text-[21px] mr-[2px]">{{ item.number }}</span>
        <span class="text-[14px] text-[#000]/60 leading-6"> {{ item.text }}</span>
        <!-- <n-button text type="primary" v-if="item.link">{{ item.link }}</n-button> -->
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
        class="flex-[1] rounded-lg min-h-[52px] bg-[#03C188]/10 text-black text-[20px]"
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
// 创建钱包注意事项数据
// const tipsData = [
//   {
//     number: '01',
//     text: t('IsWallet.walletNftAccessTip'),
//   },
//   {
//     number: '02',
//     text: t('IsWallet.walletBuyTokensTip'),
//   },
//   {
//     number: '03',
//     text: t('IsWallet.walletPurchaseServicesTip'),
//   },
//   // {
//   //   number: '04',
//   //   text: t('IsWallet.walletClaimRewardsTip'),
//   // },
//   // {
//   //   number: '05',
//   //   text: t('IsWallet.walletShareGpuTip'),
//   //   link: 'https://orion.deeplink.cloud/shortterm',
//   // },
// ]

const tipsData = [
  {
    number: '01',
    text: 'After logging into the wallet, you can manage and connect devices under the same wallet.',
  },
]
</script>

<style lang="scss" scoped></style>
