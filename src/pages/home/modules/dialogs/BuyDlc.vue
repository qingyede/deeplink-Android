<template>
  <div class="flex flex-col gap-4">
    <n-alert type="warning">
      <div class="text-[12px] leading-4">{{ $t('home.tipDLCFluctuation') }}</div>
    </n-alert>

    <!-- 卡片 -->
    <div class="grid grid-cols-2 gap-3">
      <div
        v-for="(item, index) in bugData"
        :key="index"
        @click="handleClick(item)"
        class="flex flex-col gap-[4px] items-center justify-center border border-[#DFDFDF] rounded-lg shadow-sm py-2 px-2"
      >
        <n-gradient-text class="text-[23px] font-bold" type="info"> {{ item.number }} </n-gradient-text>
        <img :src="item.img" alt="" class="w-[36px] h-[36px] object-fill scale-125" />
        <span class="text-xs md:text-[13px]">{{ item.text }} </span>
        <n-button class="w-[80px] h-[25px] rounded-lg text-xs md:text-[14px]" type="primary">{{
          $t('home.buyNow')
        }}</n-button>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import gate from '@/assets/img/gate.png'
import buydlc from '@/assets/img/buydlc.png'
import bit from '@/assets/img/bit.png'
import bin from '@/assets/img/bin.png'
import PayPal from '@/assets/svg/PayPal.svg'
import xai from '@/assets/img/xai.png'
import lbank from '@/assets/img/lbank.svg'
import { appStore } from '@/store/Modules/app/index'
import { useClipboard } from '@vueuse/core'

const { copy } = useClipboard()
const app = appStore()

// bug的数据
const bugData = ref([
  {
    number: '01',
    text: `Gate.io`,
    img: gate,
    key: 1,
    url: `https://www.gate.tv/trade/DEEPLINK_USDT`,
  },
  {
    number: '02',
    text: `Mexc Exchange`,
    img: buydlc,
    key: 2,
    url: `https://www.mexc.com/exchange/DLC_USDT`,
  },
  {
    number: '03',
    text: `Bitmart Exchange`,
    img: bit,
    key: 3,
    url: `https://www.bitmart.com/trade/en-US?symbol=DLC_USDT`,
  },
  {
    number: '04',
    text: `Bingx Exchange`,
    img: bin,
    key: 4,
    url: `https://bingx.com`,
  },
  {
    number: '05',
    text: `从LBank交易所`,
    img: lbank,
    key: 5,
    url: `https://www.lbank.com/trade/dlc_usdt`,
  },
  {
    number: '06',
    text: `从XAIAgent`,
    img: xai,
    key: 6,
    url: `https://app.xaiagent.io/zh`,
  },
  {
    number: '07',
    text: `PayPal`,
    img: PayPal,
    key: 7,
    url: `https://www.deeplink.cloud/paypal?wallet=${app.address}`,
  },
])

// 点击购买
const handleClick = (item: any) => {
  copy(item.url)
  window.$message?.success(`已复制购买链接，请在浏览器打开进行购买~`)
}
</script>

<style lang="scss" scoped></style>
