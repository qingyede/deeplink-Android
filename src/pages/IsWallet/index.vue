<template>
  <div class="min-h-[calc(100vh-100px)] px-[16px]">
    <!-- 创建钱包 -->
    <h1 class="text-black text-[24px] font-bold mb-2">Wallet-user manual</h1>
    <div class="flex flex-col flex-wrap gap-3">
      <div class="item" v-for="(item, index) in tipsData" :key="index">
        <span class="text-primary-500 font-bold text-[21px] mr-[2px]">{{ item.number }}</span>
        <span class="text-[14px] text-[#000]/60 leading-6"> {{ item.text }}</span>
        <n-button text type="primary" v-if="item.link">{{ item.link }}</n-button>
      </div>
    </div>
    <!-- 创建按钮 -->
    <div class="mt-[80px] flex flex-col gap-3">
      <n-button
        @click="router.push({ name: 'creatWallet' })"
        type="primary"
        class="flex-[1] rounded-lg min-h-[52px] text-[20px]"
        >Create new wallet</n-button
      >
      <n-button
        @click="router.push({ name: 'openWallet' })"
        class="flex-[1] rounded-lg min-h-[52px] bg-[#03C188]/10 text-black text-[20px]"
        >Open wallet</n-button
      >
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()
// 创建钱包注意事项数据
const tipsData = [
  {
    number: '01',
    text: `Once you log in to your wallet, you can buy professional crown NFT, to support you using more higher level
          functions. Check details`,
  },
  {
    number: '02',
    text: ` Once you log in to your wallet, you can buy DeepBrainChain Coin and DeepLink Coin`,
  },
  {
    number: '03',
    text: ` Once you log in to your wallet, you can purchase cloud gaming or other services.`,
  },
  {
    number: '04',
    text: `Once you log in to your wallet, vou can claim DeepLink Coin rewards.`,
  },
  {
    number: '05',
    text: ` Once you log in to your wallet, you can share your GPU and earn DLC rewards. Your device must be
equipped with an Nvidia 20 series or higher GPU to qualify. For more details on earning, please check: `,
    link: 'https://orion.deeplink.cloud/shortterm',
  },
]
</script>

<style lang="scss" scoped></style>
