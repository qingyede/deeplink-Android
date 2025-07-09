<script setup lang="ts">
import { h } from 'vue'
import MyCard from './modules/MyCard.vue'
import MyContent from './modules/MyContent.vue'
import BuyDbc from './modules/dialogs/BuyDbc.vue'
import BuyDlc from './modules/dialogs/BuyDlc.vue'

// 购买dbc
const buyDBC = () => {
  window.$dialog?.info({
    title: () => h('div', { class: 'dark:text-white font-bold' }, 'Buy DBC'),
    content: () => h(BuyDbc),
    class: 'rounded-2xl dark:bg-[#1a1a1a] dark:text-white',
    showIcon: false,
    negativeButtonProps: { color: '#3CD8A6' },
    positiveButtonProps: { color: '#03C188' },
    onPositiveClick: () => {
      console.log('Confirm')
    },
  })
}
</script>

<template>
  <div class="px-[16px] w-full">
    <MyCard />

    <!-- 购买 -->
    <!-- <div
      class="mt-[20px] bg-[#f0f1f3] dark:bg-[#1a1a1a] border border-[#e7e8ea] dark:border-[rgba(84,84,84,0.48)] rounded-2xl flex items-center p-3 gap-5 transition-colors duration-300"
    >
      <div class="flex-[1] flex items-center gap-2">
        <n-button @click="buyDBC" type="primary" class="text-white rounded-lg flex-1 min-h-[38px]">
          <template #icon>
            <Icon icon="mdi:cart" class="text-[18px]" />
          </template>
          {{ $t('home.buyDBC') }}
        </n-button>

        <n-button
          @click="buyDlc"
          secondary
          type="primary"
          class="text-black dark:!text-white rounded-lg flex-1 min-h-[38px]"
        >
          <template #icon>
            <Icon icon="mdi:wallet" class="text-[18px]" />
          </template>
          {{ $t('home.buyDLC') }}
        </n-button>
      </div>

      <n-tooltip placement="bottom" trigger="click">
        <template #trigger>
          <Icon icon="mdi:help-circle-outline" class="text-[22px] text-black dark:text-white" />
        </template>
        <span>这里是购买时候的帮助提示</span>
      </n-tooltip>
    </div> -->

    <!-- 主体内容 -->
    <MyContent />
  </div>
</template>

<style lang="scss" scoped></style>
