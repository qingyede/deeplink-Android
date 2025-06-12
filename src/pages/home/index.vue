<script setup lang="ts">
import { h } from 'vue'
import MyCard from './modules/MyCard.vue'
import MyContent from './modules/MyContent.vue'
import BuyDbc from './modules/dialogs/BuyDbc.vue'
import BuyDlc from './modules/dialogs/BuyDlc.vue'

// 购买dbc
const buyDBC = () => {
  window.$dialog?.info({
    title: 'Buy DBC',
    content: () => h(BuyDbc),
    class: 'rounded-2xl',
    showIcon: false,
    onPositiveClick: () => {
      console.log('Confirm')
    },
  })
}

// 购买Dlc
const buyDlc = () => {
  window.$dialog?.info({
    title: 'Buy DLC',
    content: () => h(BuyDlc),
    class: 'rounded-2xl',
    showIcon: false,
    onPositiveClick: () => {
      console.log('Confirm')
    },
  })
}
</script>

<template>
  <div class="px-[16px] w-full">
    <!-- 卡片 -->
    <MyCard />
    <!-- 购买 -->
    <div class="mt-[20px] bg-[#f0f1f3] border border-[#e7e8ea] rounded-2xl flex items-center p-3 gap-5">
      <div class="flex-[1] flex items-center gap-2">
        <n-button @click="buyDBC" type="primary" class="text-white rounded-lg w-[50%] min-h-[38px]">
          <template #icon>
            <Icon icon="mdi:cart" class="text-[18px]" />
          </template>
          Buy DBC</n-button
        >
        <n-button @click="buyDlc" secondary class="text-black bg-[#03C188]/10 rounded-lg w-[50%] min-h-[38px]">
          <template #icon>
            <Icon icon="mdi:wallet" class="text-[18px]" />
          </template>
          Buy DLC</n-button
        >
      </div>
      <n-tooltip placement="bottom" trigger="click">
        <template #trigger>
          <Icon icon="mdi:help-circle-outline" class="text-[22px]" />
        </template>
        <span> 这里是购买时候的帮助提示</span>
      </n-tooltip>
    </div>
    <!-- 主体 -->
    <MyContent />
  </div>
</template>

<style lang="scss" scoped></style>
