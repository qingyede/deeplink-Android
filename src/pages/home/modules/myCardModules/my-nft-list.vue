<template>
  <!-- 加载中显示骨架屏 -->
  <template v-if="buyNft.nftLoading">
    <div v-for="i in 3" :key="'skeleton' + i" class="p-[6px] bg-white dark:bg-[#1e1e1e] rounded-md mb-4">
      <div class="flex items-start gap-4">
        <!-- 图片骨架 -->
        <n-skeleton width="56px" height="56px" :sharp="false" />

        <!-- 文字和按钮骨架 -->
        <div class="flex-1 flex flex-col gap-3">
          <n-skeleton height="16px" width="100%" />
          <div class="flex gap-3">
            <n-skeleton height="28px" width="60px" :sharp="true" />
            <n-skeleton height="28px" width="60px" :sharp="true" />
          </div>
        </div>
      </div>
    </div>
  </template>

  <!-- 实际数据展示 -->
  <template v-else>
    <div
      v-for="(nft, index) in buyNft.myNftList"
      :key="'nft' + index"
      class="relative p-[6px] bg-white dark:bg-[#1e1e1e] rounded-md"
    >
      <!-- 激活状态标签 -->
      <n-tag
        size="small"
        :type="nft.NFTStatus === 'activated' ? 'success' : 'error'"
        round
        class="absolute top-0 right-0 z-10"
      >
        {{ $t(`home.${nft.NFTStatus}`) }}
      </n-tag>
      <!-- 内容主体 -->
      <div class="flex items-start gap-4 mt-5">
        <img
          @click="router.push({ name: 'transferHistory', query: { coin: 'DLP', length: buyNft.myNftList.length } })"
          class="w-14 h-14 rounded-md object-cover"
          :src="nft.image"
          alt="NFT 图标"
        />
        <div class="flex-1 flex flex-col justify-between">
          <p class="text-base font-bold leading-5 text-black dark:text-white max-w-[180px]">
            <!-- {{ nft.name }} -->
            {{ $t('home.nfts') }}/{{ map[nft.expire_type] }}{{ $t('home.months') }}
          </p>
          <p v-if="nft.NFTStatus === 'activated' ? true : false" class="my-1.5 text-gray-500 text-xs">
            {{ $t('home.time') }}：{{ nft.timeLeftText }}
          </p>
          <div class="mt-3 flex gap-3">
            <n-button size="small" class="rounded-xl" type="primary" @click="transferH(nft)">{{
              $t('home.transfer')
            }}</n-button>
            <n-button
              :disabled="nft.NFTStatus === 'activated' ? true : false"
              size="small"
              class="rounded-xl"
              type="success"
              @click="buyNft.activeNFTFlow(nft.tokenId)"
              >{{ $t('home.activate') }}</n-button
            >
          </div>
        </div>
      </div>
      <n-divider v-if="index !== buyNft.myNftList.length - 1" class="!mb-2" />
    </div>

    <!-- 空状态提示 -->
    <div v-if="buyNft.myNftList.length === 0" class="text-center py-10 text-gray-400 dark:text-white/50">
      <n-empty :description="$t('app.noNftHeld')">
        <template #extra>
          <n-button @click="router.push({ name: 'Store' })" size="small">{{ $t('home.buyNft') }}</n-button>
        </template>
      </n-empty>
    </div>
  </template>

  <!-- 底部操作区 -->
  <div class="flex flex-col mt-[36px]">
    <div class="flex gap-4 flex-wrap">
      <n-button
        @click="router.push({ name: 'Store' })"
        type="primary"
        class="flex-1 rounded-lg min-h-[46px] text-black dark:text-white"
      >
        {{ app.mode ? $t('home.buyNft2') : $t('home.buyNft') }}
      </n-button>
      <n-button
        type="primary"
        @click="openExternalLink('https://deeplinkgame.com')"
        class="flex-1 rounded-lg min-h-[46px] text-black dark:text-white"
      >
        {{ app.mode ? $t('home.viewNftFeatures2') : $t('home.viewNftFeatures') }}
      </n-button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { useBuyNftStore } from '@/store/Modules/buyNft/index'
import { useOpenExternalLink } from '@/hooks/common/useExternalLinkOptions'
import TransferDialog from './transferDialog.vue'
import { NGradientText } from 'naive-ui'
import nfts from '@/assets/img/nfts.png'
import { useRouter, useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'
const { t } = useI18n()
const router = useRouter()
const route = useRoute()
const { openExternalLink } = useOpenExternalLink()
const buyNft = useBuyNftStore()
import { appStore } from '@/store/Modules/app/index'

const app = appStore()
let map = {
  0: 1,
  1: 3,
  2: 6,
  3: 12,
}

let map1 = computed(() => {
  return {
    0: `${t('Store.nft.proCrown')} /`,
    1: `${t('Store.nft.enterpriseCrown')} /`,
  }
})
// 初始化列表
buyNft.getMyNftListH()

// 转账
const transferH = (nft) => {
  const TransferDialogRef: any = ref(null)
  const d = window.$dialog?.info({
    title: () => {
      return h(
        NGradientText,
        {
          size: 24,
          type: 'success',
          class: 'font-bold',
        },
        { default: () => t('home.transfer') }
      )
    },
    content: () => h(TransferDialog, { ref: TransferDialogRef, nft }),
    class: 'rounded-2xl dark:bg-[#1a1a1a] dark:text-white',
    showIcon: false,
    negativeButtonProps: { color: '#3CD8A6', size: 'medium' },
    positiveButtonProps: { color: '#03C188', size: 'medium' },
    positiveText: t('app.confirm'),
    negativeText: t('app.cancel'),
    onPositiveClick: async (nft) => {
      if (d) {
        console.log(TransferDialogRef.value?.nft)
        const rs = await new Promise(async (resolve, reject) => {
          TransferDialogRef.value?.formRef?.validate(async (errors) => {
            if (!errors) {
              resolve(true)
            } else {
              window.$message?.error(t('home.checkPassword'))
              resolve(false)
            }
          })
        })
        console.log(rs)
        if (rs) {
          d.loading = true
          d.positiveText = 'loading...'
          console.log(nft, 'item')
          await buyNft.transferNFTFlow(TransferDialogRef.value?.nft.tokenId, TransferDialogRef.value?.model.address)

          d.loading = false
          d.positiveText = t('home.confirm')

          // 初始化列表
          buyNft.getMyNftListH()
        } else {
          return false
        }
      }
    },
  })
}
</script>

<style lang="scss" scoped></style>
