<template>
  <div class="mt-[17px]">
    <n-tabs type="line" animated>
      <!-- Crypto Tab -->
      <n-tab-pane name="Crypto" :tab="$t('home.crypto')">
        <div
          class="flex justify-between items-center py-3"
          v-for="(item, index) in props.cryptoData"
          :key="'crypto' + index"
        >
          <div class="flex items-center gap-3">
            <img class="object-cover w-[52px] h-[52px]" :src="item.icon" alt="" />
            <span class="font-bold text-xl dark:text-white">{{ item.coin }}</span>
          </div>
          <div class="flex flex-col gap-1 justify-end items-end">
            <span class="font-bold text-[17px] dark:text-white">{{ item.number }}</span>
            <span class="font-bold text-[12px] text-[#7E7E7E] dark:text-white/60">{{ item.price }}</span>
          </div>
        </div>
      </n-tab-pane>

      <!-- NFTs Tab -->
      <n-tab-pane name="NFTs" :tab="$t('home.nfts')">
        <div
          v-for="(nft, index) in nftData"
          :key="'nft' + index"
          class="flex justify-between items-center py-[11px] dark:border-[#3c3d3f]"
        >
          <!-- NFT 左侧信息 -->
          <div class="flex items-center gap-3">
            <img class="object-cover w-[52px] h-[52px] rounded-md" :src="nfts" alt="NFT 图标" />
            <div class="flex flex-col justify-center gap-1">
              <span class="font-bold text-base md:text-lg dark:text-white">
                {{ nft.name }}
              </span>
              <span class="text-sm text-[#7E7E7E] dark:text-white/60" v-if="nft.isActive && nft.countdown">
                剩余：{{ nft.countdown }}
              </span>
            </div>
          </div>

          <!-- NFT 右侧操作 -->
          <div class="flex flex-col items-end justify-between gap-2 min-w-[90px]">
            <n-tag size="tiny" :type="nft.isActive ? 'success' : 'error'" round class="px-2 py-[2px]">
              {{ nft.isActive ? '已激活' : '未激活' }}
            </n-tag>
            <n-button @click="transferH(nft)" size="small" round secondary type="primary" class="w-[70px] min-h-[32px]">
              转账
            </n-button>
          </div>
        </div>
        <div class="flex flex-col mt-4">
          <div class="flex gap-8">
            <n-button
              @click="router.push({ name: 'Store' })"
              color="#E5F9F3"
              class="flex-[1] rounded-lg min-h-[46px] text-black dark:text-white"
            >
              购买NFT
            </n-button>

            <n-button
              color="#E5F9F3"
              @click="openExternalLink('https://www.deeplink.cloud/nft')"
              class="flex-[1] rounded-lg min-h-[46px] text-black dark:text-white"
            >
              查看NFT功能
            </n-button>
          </div>
          <n-divider class="!mb-1" />
        </div>
        <!-- 空数据提示 -->
        <div v-if="nftData.length === 0" class="text-center py-10 text-gray-400 dark:text-white/50">
          <n-empty description="暂无 NFT 数据">
            <template #extra>
              <n-button size="small"> 购买NFT </n-button>
            </template>
          </n-empty>
        </div>
      </n-tab-pane>
    </n-tabs>
  </div>
</template>

<script lang="ts" setup>
import { defineProps } from 'vue'
import nfts from '@/assets/img/nfts.png'
import { NGradientText } from 'naive-ui'
import TransferDialog from './transferDialog.vue'
import { useRouter, useRoute } from 'vue-router'
import { useOpenExternalLink } from '@/hooks/common/useExternalLinkOptions'
const { openExternalLink } = useOpenExternalLink()

const router = useRouter()
const route = useRoute()

const props = defineProps<{
  cryptoData: any[]
}>()

// 模拟 NFT 数据
const nftData = [
  {
    name: '专业版皇冠NFT / 1个月',
    isActive: true,
    countdown: '14天23小时53分钟',
  },
  {
    name: '至尊版钻石NFT / 永久',
    isActive: false,
    countdown: '89天4小时12分钟',
  },
  {
    name: '尊享版银卡NFT / 3个月',
    isActive: true,
    countdown: '89天4小时12分钟',
  },
]

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
        { default: () => '转账' }
      )
    },
    content: () => h(TransferDialog, { ref: TransferDialogRef }),
    class: 'rounded-2xl dark:bg-[#1a1a1a] dark:text-white',
    showIcon: false,
    negativeButtonProps: { color: '#3CD8A6', size: 'medium' },
    positiveButtonProps: { color: '#03C188', size: 'medium' },
    positiveText: '确认',
    negativeText: '取消',
    onPositiveClick: async () => {
      if (d) {
        console.log(TransferDialogRef.value)
        const rs = await new Promise(async (resolve, reject) => {
          TransferDialogRef.value?.formRef?.validate(async (errors) => {
            if (!errors) {
              resolve(true)
            } else {
              window.$message?.error('请检查您的密码')
              resolve(false)
            }
          })
        })
        console.log(rs)
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
}
</script>

<style lang="scss" scoped>
:deep(.n-tabs-tab__label) {
  font-weight: bold !important;
  font-size: 16px;
}
</style>
