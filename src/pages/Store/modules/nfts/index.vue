<template>
  <div class="my-6 grid grid-cols-2 gap-5" v-if="!buyNft.nftListLoading">
    <div
      @click="active = index"
      :style="active === index ? 'background: #3CD8A6;' : 'background: #E1EBE7;'"
      class="rounded-[16px] p-3 transition flex flex-col items-center"
      v-for="(item, index) in buyNft.nftList"
      :key="index"
    >
      <!-- 图片 -->
      <img class="w-[80px] h-[80px] object-cover mb-2 rounded-md" src="@/assets/img/nfts.png" alt="" />

      <!-- 文案部分 -->
      <div class="flex flex-col items-center text-center">
        <span class="font-bold text-[16px] text-black">
          {{ item.price }}
        </span>
        <span class="text-[12px] text-gray-600">
          {{ item.vertion }}
        </span>
      </div>

      <!-- 按钮部分 -->
      <n-button class="w-full mt-3 h-[41px] px-2 rounded-[8px]" size="small" type="primary">
        <div class="flex items-center justify-between w-full gap-2">
          <img src="@/assets/img/btnnfts.png" class="w-[28px] h-[28px] object-cover rounded" alt="" />
          <div class="flex flex-col items-end gap-1">
            <span class="text-[#005F35] text-xs flex items-center gap-1">
              <span>{{ item.percent }}</span>
              <span>{{ $t('Store.discount') }}</span>
            </span>
            <span class="font-bold text-[14px] text-black"> {{ item.v }} </span>
          </div>
        </div>
      </n-button>
    </div>
  </div>
  <div v-else class="my-6 grid grid-cols-2 gap-5">
    <n-skeleton class="rounded-lg !h-[180px]" size="large" />
    <n-skeleton class="rounded-lg !h-[180px]" size="large" />
    <n-skeleton class="rounded-lg !h-[180px]" size="large" />
    <n-skeleton class="rounded-lg !h-[180px]" size="large" />
  </div>
  <!-- 立即购买 -->
  <div class="mt-[60px] flex items-center gap-6">
    <n-button
      v-for="(btn, index) in actionButtons"
      :key="index"
      type="primary"
      @click="btn.h(btn)"
      :secondary="btn.secondary"
      class="flex-1 h-[52px] rounded-[12px] text-[20px]"
    >
      <div class="flex items-center gap-2 w-full justify-center">
        <span>{{ btn.label }}</span>
        <Icon class="text-[25px]" :icon="btn.icon" />
      </div>
    </n-button>
  </div>
  <!-- Get Discount campaign ends on July 5th -->
  <!-- Crown NFT Discount Campaign -->
  <div class="mt-[60px] bg-[#000] px-[15px] py-[36px] rounded-[21px] flex flex-col gap-6 relative">
    <h1 class="font-bold sm:text-[18px] md:text-[20px] text-[#fff]">{{ $t('Store.crown_nft_discount_campaign') }}</h1>
    <n-button
      type="primary"
      class="w-full h-[60px] rounded-[12px] text-[20px] text-white border-none *:"
      style="background: linear-gradient(to right, #8000ff, #00ffd1)"
    >
      <div class="flex items-center gap-2 !w-[100%] justify-between">
        <span class="text-[19.5px]">{{ $t('Store.get_discount') }}</span>
        <!-- <Icon class="text-[28px]" icon="mdi:arrow-right" /> -->
      </div>
    </n-button>
    <h2 class="font-bold sm:text-[19px] md:text-[18px] text-[#fff] max-w-[200px]">
      {{ $t('Store.campaign_ends_on') }} <br /><span class="text-[#00FFC3] font-bold text-[22px]">
        {{ nftListEndTimeStr }}</span
      >
    </h2>
    <div class="flex justify-center items-center relative z-[2]">
      <img
        class="w-[116px] h-[116px] border-[1.5px] border-[#00FFC3] rounded-full overflow-hidden"
        src="@/assets/img/c.png"
        alt=""
      />
    </div>
    <!-- 背景渐变光晕 -->
    <div
      class="absolute z-0 bottom-[-80px] left-1/2 w-[350px] h-[400px] translate-x-[-50%] rounded-full pointer-events-none blur-3xl opacity-50"
      style="background: radial-gradient(circle at center, #00ffaa 0%, #960dff 100%)"
    ></div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import img from '@/assets/img/nfts.png'
import { NGradientText } from 'naive-ui'
import { useI18n } from 'vue-i18n'
import NftsDialog from './modules/nftsDialog.vue'
import { useOpenExternalLink } from '@/hooks/common/useExternalLinkOptions'
const { openExternalLink } = useOpenExternalLink()
import { useBuyNftStore } from '@/store/Modules/buyNft/index'
const buyNft = useBuyNftStore()
// import { useSwipeBackBasic } from '@/hooks/common/useBackInterceptor'

// // 页面顶部调用
// useSwipeBackBasic()
// 初始化购买列表
buyNft.getNftListH()
const { t, locale } = useI18n()
let active = ref(0)

const actionButtons = computed(() => [
  {
    label: t('Store.nextpage'),
    icon: 'mdi:arrow-right', // 向右箭头图标
    action: 'next',
    secondary: true,
    h: () => {
      openExternalLink('https://www.deeplink.cloud/nft')
    },
  },
  {
    label: t('Store.buy'),
    icon: 'mdi:cart', // 购物车图标
    action: 'buy', // 可以用于绑定事件或区分按钮
    secondary: false,
    h: async (btn) => {
      const NftsDialogRef = ref()
      const d = window.$dialog?.info({
        title: () => {
          return h(
            NGradientText,
            {
              size: 24,
              type: 'success',
              class: 'font-bold',
            },
            { default: () => '购买NFT' }
          )
        },
        content: () => h(NftsDialog, { ref: NftsDialogRef, data: buyNft.nftList[active.value] }),
        class: 'rounded-2xl dark:bg-[#1a1a1a] dark:text-white',
        showIcon: false,
        negativeButtonProps: { color: '#3CD8A6', size: 'medium' },
        positiveButtonProps: { color: '#03C188', size: 'medium' },
        positiveText: '确认购买',
        negativeText: '取消',
        onPositiveClick: async () => {
          if (d) {
            console.log(buyNft.nftList[active.value], 'btnbtnbtnbtnbtn')
            const rs = await new Promise(async (resolve, reject) => {
              NftsDialogRef.value?.formRef?.validate(async (errors) => {
                if (!errors) {
                  resolve(true)
                } else {
                  window.$message?.error('请检查您的密码')
                  resolve(false)
                }
              })
            })
            if (rs) {
              d.loading = true
              d.positiveText = 'loading...'
              await new Promise((resolve, reject) => {
                setTimeout(() => {
                  d.loading = false
                  d.positiveText = '确定'
                  window.$message?.success('购买成功')
                  resolve(true)
                }, 2000)
              })
            } else {
              return false
            }
          }
        },
      })
    },
  },
])

// 计算属性之活动结束日期
const nftListEndTimeStr = computed(() => {
  if (buyNft.nftListEndTime) {
    if (locale.value === 'zh') {
      return buyNft.nftListEndTime.end_time_zh
    } else if (locale.value === 'ja') {
      return buyNft.nftListEndTime.end_time_ja
    } else if (locale.value === 'ko') {
      return buyNft.nftListEndTime.end_time_ko
    } else if (locale.value === 'vn') {
      return buyNft.nftListEndTime.end_time_vn
    } else {
      return buyNft.nftListEndTime.end_time_en
    }
  }
})
</script>

<style lang="scss" scoped>
:deep(.n-button .n-button__content) {
  width: 100% !important;
}
</style>
