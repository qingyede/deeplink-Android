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
      <img class="w-[66px] h-[66px] object-cover mb-2 rounded-md" src="@/assets/img/nfts.png" alt="" />

      <!-- 文案部分 -->
      <div class="flex flex-col items-center text-center">
        <span class="font-bold text-[14px] text-black">
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
  <div class="mt-[60px] flex items-center gap-6 flex-wrap">
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
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import img from '@/assets/img/nfts.png'
import { NGradientText } from 'naive-ui'
import { useI18n } from 'vue-i18n'
import NftsDialog from './modules/nftsDialog.vue'
import { useOpenExternalLink } from '@/hooks/common/useExternalLinkOptions'
import { useBuyNftStore } from '@/store/Modules/buyNft/index'
import { useGetDlcPrice } from '@/hooks/store/useGetDlcPrice'
import { convertDbcToUsd, convertDlcToUsd } from '@/utils/common/transferToUsd'
import { appStore } from '@/store/Modules/app'
import { useHomeStore } from '@/store/Modules/home/index'
import { useRouter, useRoute } from 'vue-router'
import { useGetUserPoints } from '@/hooks/wallet/useGetUserPoint'
import { useGetDbcAndDlcNumber } from '@/hooks/wallet/useGetDbcAndDlcNumber'

const { dbcNumber, dlcNumber, homeCardLoading } = useGetDbcAndDlcNumber()
const { points } = useGetUserPoints()
const { openExternalLink } = useOpenExternalLink()
const buyNft = useBuyNftStore()
const { dlc_price } = useGetDlcPrice()
const router = useRouter()
const route = useRoute()
const home = useHomeStore()
const app = appStore()

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
      console.log(buyNft.nftList[active.value], 'btnbtnbtn')

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
            { default: () => t('Store.buyNft') }
          )
        },
        content: () => h(NftsDialog, { ref: NftsDialogRef, data: buyNft.nftList[active.value] }),
        class: 'rounded-2xl dark:bg-[#1a1a1a] dark:text-white',
        showIcon: false,
        negativeButtonProps: { color: '#3CD8A6', size: 'medium' },
        positiveButtonProps: { color: '#03C188', size: 'medium', disabled: NftsDialogRef.value?.showBalanceIsOk },
        positiveText: t('app.confirm'),
        negativeText: t('app.cancel'),
        onPositiveClick: async () => {
          if (d) {
            console.log('888888888888888', buyNft.nftList[active.value].value)
            // return false
            if (app.mode) {
              // 积分模式

              console.log(points.value, NftsDialogRef.value?.number)
              // 检查余额
              if (Number(NftsDialogRef.value?.number) <= Number(points.value)) {
                console.log('开始积分购买nft')

                const rs: any = await buyNft.purchaseNFTFlowByPoint({
                  pointAmount: NftsDialogRef.value?.number,
                  saveData: {
                    price: buyNft.nftList[active.value].value,
                    purchaser: app.address,
                    version_type: 0,
                    expire_type: NftsDialogRef.value?.endTime,
                    collection: 0,
                    purchase_path: 'Android_Point',
                    mintNFT: false,
                  },
                })
                if (rs) {
                  router.push({ name: 'home' })
                }
              } else {
                window.$message?.warning(t('remote.pointBalanceNotEnough'))
              }
            } else {
              // 代币模式
              // 先判断钱包余额够不够
              if (Number(NftsDialogRef.value?.number) <= Number(dlcNumber.value)) {
                const rs: any = await buyNft.purchaseNFTFlow({
                  dlcAmount: NftsDialogRef.value?.number,
                  saveData: {
                    price: convertDlcToUsd(Number(NftsDialogRef.value?.number), dlc_price.value),
                    purchaser: app.address,
                    version_type: 0,
                    expire_type: NftsDialogRef.value?.endTime,
                    collection: 0,
                    purchase_path: 'Android',
                    mintNFT: false,
                  },
                })

                if (rs) {
                  router.push({ name: 'home' })
                  home.activeTab = 'NFTs'
                }
              } else {
                window.$message?.warning(t('remote.dlcBalanceNotEnough'))
              }
            }
          }
        },
      })
    },
  },
])
</script>

<style lang="scss" scoped>
:deep(.n-button .n-button__content) {
  width: 100% !important;
}
</style>
