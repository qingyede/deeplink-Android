<template>
  <div class="px-4 w-full mx-auto flex flex-col items-center justify-center gap-8">
    <!-- 顶部卡片 -->
    <n-card class="rounded-[24px] shadow-sm dark:bg-[#1e1e1e]">
      <div class="flex items-center justify-center flex-col gap-5">
        <img v-if="route.query.coin !== 'DLP'" class="max-w-[60px] max-h-[60px]" :src="currentIcon" alt="coin" />
        <div
          v-else
          class="flex items-center justify-center w-12 h-12 rounded-full bg-gray-200 text-gray-800 font-bold text-sm"
        >
          DLP
        </div>
        <h1 class="text-lg font-bold flex items-center gap-1 text-[#262626] dark:text-white">
          <span>{{ isSent ? $t('transaction.send') : $t('transaction.receive') }} {{ detailData?.token?.symbol }}</span>
          <Icon class="text-primary-500" :icon="isSent ? 'mdi:send-circle' : 'mdi:call-received'" />
        </h1>

        <ul class="flex flex-col gap-5 w-full">
          <li class="w-full flex items-center justify-between">
            <span class="text-[#262626] font-bold text-base dark:text-white">{{ $t('transaction.status') }}</span>
            <span
              class="text-[#043CC9] font-medium text-[15px] underline underline-offset-4 dark:text-blue-400"
              @click="openExplorer"
            >
              {{ $t('transaction.viewOnExplorer') }}
            </span>
          </li>

          <li class="w-full flex items-center justify-between">
            <span class="text-[#262626] font-bold text-base dark:text-white">{{ $t('transaction.txId') }}</span>
            <span
              @click="copy()"
              class="text-[#043CC9] font-medium text-[15px] flex items-center gap-2 cursor-pointer transition duration-200 active:scale-95 dark:text-blue-400"
            >
              <span class="transition-all duration-300">
                {{ copied ? 'Copied!' : 'Copy transaction ID' }}
              </span>
              <Icon
                :icon="copied ? 'mdi:check-circle-outline' : 'mdi:content-copy'"
                class="transition-transform duration-300"
                :class="copied ? 'text-green-500 scale-110' : ''"
              />
            </span>
          </li>

          <li class="w-full flex items-center justify-between">
            <span class="text-[#262626] font-bold text-base dark:text-white">To</span>
            <span class="font-medium text-[15px] break-all max-w-[190px] dark:text-white/80">
              {{ addressToShow }}
            </span>
          </li>
        </ul>
      </div>
    </n-card>

    <!-- 明细卡片 -->
    <n-card class="rounded-[24px] shadow-sm bg-gray-70 dark:bg-[#1e1e1e]">
      <div class="flex items-center justify-center flex-col gap-1">
        <h1 class="text-base font-bold text-[#262626] w-full text-left dark:text-white">
          {{ $t('transaction.transaction') }}
        </h1>
        <div class="w-full border-t border-dashed border-black dark:border-white/30"></div>

        <div class="mt-4 w-full flex flex-col gap-3">
          <div class="w-full flex items-center justify-between">
            <span class="text-[13.5px] text-[#7E7E7E] dark:text-gray-400">{{ $t('transaction.date') }}</span>
            <span class="text-[13.5px] text-[#7E7E7E] whitespace-nowrap dark:text-gray-300">{{ formattedDate }}</span>
          </div>

          <div class="w-full flex items-center justify-between">
            <span class="text-[13.5px] text-[#7E7E7E] dark:text-gray-400">{{ $t('transaction.amount') }}</span>
            <span class="text-[13.5px] text-[#7E7E7E] whitespace-nowrap dark:text-gray-300">
              {{ isSent ? '-' : '+' }}{{ formattedAmount }}
            </span>
          </div>
        </div>
      </div>
    </n-card>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useClipboard } from '@vueuse/core'
import { formatUnits } from 'ethers'
import { useOpenExternalLink } from '@/hooks//common/useExternalLinkOptions'
// 本地图标
import DLC from '@/assets/img/dlc.png'
import DBC from '@/assets/img/dbc.png'
import NFT from '@/assets/img/mynft.png'

const { openExternalLink } = useOpenExternalLink()

// 路由
const route = useRoute()

// 交易详情数据
const detailData = computed(() => {
  try {
    return JSON.parse(route.query.data as string)
  } catch (e) {
    console.error('交易数据解析失败:', e)
    return null
  }
})

// 动态图标
const currentIcon = computed(() => {
  const coin = route.query.coin
  if (coin === 'DBC') return DBC
  if (coin === 'DLC') return DLC
  return NFT
})

// 方向判断
const isSent = computed(() => detailData.value?.direction === 'out')

// 地址显示
const addressToShow = computed(() => {
  const d = detailData.value
  return d?.direction === 'in' ? d?.from?.hash : d?.to?.hash
})

// 金额格式化
const formattedAmount = computed(() => {
  const val = detailData.value?.total?.value
  const decimals = Number(detailData.value?.total?.decimals ?? 18)
  const symbol = detailData.value?.token?.symbol || ''
  return val ? `${Number(formatUnits(val, decimals)).toFixed(5)} ${symbol}` : `0.0 ${symbol}`
})

// 日期格式化
const formattedDate = computed(() => {
  const time = detailData.value?.timestamp
  return time ? new Date(time).toLocaleDateString() : '--'
})

// 复制功能
const { copy, copied } = useClipboard({
  source: computed(() => detailData.value?.tx_hash || ''),
  copiedDuring: 1500,
})

onMounted(() => {
  console.log(JSON.parse(route.query.data as string))
})

const openExplorer = () => {
  //dbcscan.io/zh/tx/0xde8296e36433fb88d4d2bbe370d2118aeb5bdea11d4ec49b5c2d2f1f15eb79b6
  openExternalLink(`https://dbcscan.io/zh/tx/${detailData.value?.tx_hash}`)
}
</script>
