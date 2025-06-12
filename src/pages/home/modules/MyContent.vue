<template>
  <!-- tabs -->
  <div class="mt-[30px]">
    <n-tabs type="line" animated>
      <n-tab-pane name="Crypto" tab="Crypto">
        <div class="flex justify-between items-center py-3" v-for="(item, index) in cryptoData" :key="index">
          <div class="flex items-center gap-3">
            <img class="object-cover w-[48px] h-[48px]" :src="item.icon" alt="" />
            <span class="font-bold text-xl">{{ item.coin }}</span>
          </div>
          <div class="flex flex-col gap-1 justify-end items-end">
            <span class="font-bold text-[17px]">{{ item.number }} </span>
            <span class="font-bold text-[12px] text-[#7E7E7E]">{{ item.price }}</span>
          </div>
        </div>
      </n-tab-pane>
      <n-tab-pane name="NFTs" tab="NFTs">
        <div class="flex justify-between items-center py-3" v-for="(item, index) in cryptoData" :key="index">
          <div class="flex items-center gap-3">
            <img class="object-cover w-[48px] h-[48px]" :src="item.icon" alt="" />
            <span class="font-bold text-xl">{{ item.coin }}</span>
          </div>
          <div class="flex flex-col items-center gap-1">
            <span class="font-bold text-[17px]">{{ item.number }} </span>
            <span class="font-bold text-[12px] text-[#7E7E7E]">{{ item.price }}</span>
          </div>
        </div>
      </n-tab-pane>
    </n-tabs>
  </div>

  <!-- 邀请 -->
  <div class="mt-[40px] flex flex-col gap-3">
    <n-input
      v-model:value="value"
      type="text"
      placeholder="请输入你的邀请码"
      class="min-h-[57px] rounded-lg bg-[#E1EBE7] text-[#737373]"
    />
    <!-- 提交按钮 -->
    <n-button class="w-full rounded-lg min-h-[52px] text-[22px]" type="primary">Submit</n-button>
  </div>
  <!-- 商店 -->
  <div class="mt-[40px] flex flex-col gap-3">
    <!-- 提交按钮 -->
    <div class="flex items-center gap-4">
      <n-button class="flex-[1] rounded-lg min-h-[52px] bg-[#03C188]/10 text-black text-[20px]">Store</n-button>
      <n-button class="flex-[1] rounded-lg min-h-[52px] bg-[#03C188]/10 text-black text-[20px]">Share GPU</n-button>
    </div>
    <n-button class="w-full rounded-lg min-h-[52px] text-black bg-[#03C188]/10 text-[20px]">Play with us</n-button>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import DBC from '@/assets/img/dbc.png'
import DLC from '@/assets/img/dlc.png'

// Crypto模拟数据
const cryptoData = ref([
  {
    coin: 'DBC',
    icon: DBC,
    number: '10,00.00',
    price: '$120.23',
  },
  {
    coin: 'DLC',
    icon: DLC,
    number: '10,00.00',
    price: '$120.23',
  },
])
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
