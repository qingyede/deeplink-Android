<template>
  <div class="flex flex-col gap-4">
    <n-alert type="warning">
      <div class="text-[12.5px] leading-6">
        {{ $t('home.tipDBCFluctuation') }}
      </div>
    </n-alert>

    <!-- 卡片 -->
    <div class="flex items-center gap-3">
      <div
        v-for="(item, index) in bugData"
        :key="index"
        class="flex flex-col gap-[5px] items-center justify-center border border-[#DFDFDF] rounded-lg flex-[1] shadow-sm h-[205px] py-2 px-2"
      >
        <n-gradient-text class="text-[23px] font-bold" type="info"> {{ item.number }} </n-gradient-text>
        <img :src="item.img" alt="" class="w-[70px] h-[70px] object-cover" />
        <span class="text-xs md:text-[14px]">{{ item.text }} </span>
        <n-button class="w-[126px] h-[33px] rounded-lg" type="primary">{{ $t('home.buyNow') }}</n-button>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import gate from '@/assets/img/gate.png'
import buydlc from '@/assets/img/buydlc.png'

// bug的数据
const bugData = ref([
  {
    number: '01',
    text: `Gate.io`,
    img: gate,
  },
  {
    number: '02',
    text: `Mexc Exchange`,
    img: buydlc,
  },
])
</script>

<style lang="scss" scoped></style>
