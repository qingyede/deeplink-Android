<template>
  <div class="my-6 flex flex-col gap-5">
    <div class="bg-[#E1EBE7] rounded-[18px] px-[20px] py-[28px]" v-for="(item, index) in cardData" :key="index">
      <div class="flex flex-col items-center gap-6 justify-center">
        <img class="w-[288px] h-[114px] object-cover" :src="item.img" alt="" />
        <h1 class="flex justify-between w-full">
          <span class="text-[28px] font-bold"> {{ $t('PartnerProduct.cutaConsole') }}</span>
          <span class="text-[30px] font-bold text-primary-500"> $100 </span>
        </h1>
        <n-button class="w-[100%] h-[100%] py-1 px-2 rounded-[12px]" type="primary">
          <div class="flex w-full justify-between items-center">
            <div class="flex items-center justify-between gap-2">
              <img src="@/assets/img/btnnfts.png" class="object-cover w-[43px] h-[43px]" alt="" />
              <div class="flex gap-1 flex-col">
                <span class="text-[#005F35] text-sm flex items-center gap-1">
                  <span>{{ item.percent }}</span>
                  <span>{{ item.isOff }} </span>
                </span>
                <span class="font-bold text-[18px] text-black">USD {{ item.usd }}</span>
              </div>
            </div>
            <n-button color="#037752" class="min-h-[43px] py-1 px-2 rounded-[12px] text-sm" type="primary">
              {{ $t('PartnerProduct.buyNow') }}
            </n-button>
          </div>
        </n-button>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue'
import img from '@/assets/img/p1.png'
import img2 from '@/assets/img/nfts.png'
import { useI18n } from 'vue-i18n'
const { t } = useI18n()

// 卡片数据
const cardData = computed(() => {
  return [
    {
      img: img,
      price: t('Store.price'),
      vertion: t('Store.version'),
      percent: '65%',
      isOff: t('Store.isOff'),
      usd: 6.6,
    },
    {
      img: img,
      price: t('Store.price'),
      vertion: t('Store.version'),
      percent: '65%',
      isOff: t('Store.isOff'),
      usd: 6.6,
    },
    {
      img: img,
      price: t('Store.price'),
      vertion: t('Store.version'),
      percent: '65%',
      isOff: t('Store.isOff'),
      usd: 6.6,
    },
    {
      img: img,
      price: t('Store.price'),
      vertion: t('Store.version'),
      percent: '65%',
      isOff: t('Store.isOff'),
      usd: 6.6,
    },
  ]
})
</script>

<style lang="scss" scoped>
:deep(.n-button .n-button__content) {
  width: 100% !important;
}
</style>
