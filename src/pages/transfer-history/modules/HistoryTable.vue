<template>
  <div class="w-full">
    <div class="flex justify-between">
      <span class="text-[#262626] font-bold text-base dark:text-[#fff]">{{ $t('transaction.history') }}</span>
      <span
        @click="transferStore.getTransferListAll()"
        class="text-[#6b6a6a] dark:text-[#fff] font-semibold hover:text-primary-500 transition text-sm flex items-center gap-0.5"
        >{{ $t('transaction.viewAll') }} <Icon class="text-2xl" icon="mdi:arrow-right-thin" />
      </span>
    </div>

    <!-- 历史数据 -->
    <div class="mt-5 px-1">
      <!-- 骨架屏 -->
      <template v-if="transferStore.loading">
        <div v-for="n in 6" :key="n" class="flex items-center justify-between gap-3 mb-5">
          <!-- 左侧图标 -->
          <n-skeleton :width="48" :height="48" circle />

          <!-- 中间信息区域 -->
          <div class="flex flex-col gap-2 flex-1">
            <n-skeleton text :width="80" />
            <n-skeleton text :width="160" />
          </div>

          <!-- 右侧金额 -->
          <n-skeleton text :width="80" />
        </div>
      </template>

      <!-- 空状态 -->
      <n-empty
        v-else-if="!transferStore.loading && currentHistory.length === 0"
        :description="$t('transaction.empty')"
        class="my-10"
      />

      <!-- 历史记录列表 -->
      <ul v-else class="flex flex-col gap-4">
        <li
          @click="toDetail(item)"
          v-for="item in currentHistory"
          :key="item.tx_hash"
          class="flex justify-between items-center gap-3 hover:bg-[#EFF1F0] px-1 py-2 rounded-md transition"
        >
          <img v-if="route.query.coin !== 'DLP'" class="max-w-[48px] max-h-[48px]" :src="currentIcon" alt="" />
          <!-- DLP 圆形图标 -->
          <div
            v-else
            class="flex items-center justify-center w-12 h-12 rounded-full bg-gray-200 text-gray-800 font-bold text-sm"
          >
            DLP
          </div>
          <div class="flex flex-col gap-1 justify-center">
            <span class="text-base font-bold">
              {{ item.direction === 'in' ? $t('transaction.receive') : $t('transaction.send') }}
            </span>
            <span class="text-xs text-[#7E7E7E]">
              <span class="font-bold">{{ item.direction === 'in' ? 'From' : 'To' }}</span
              >:
              <n-tooltip :width="240" trigger="hover">
                <template #trigger>
                  <n-button class="text-[#7E7E7E] text-xs" text>
                    {{ maskMiddle(item.direction === 'in' ? item.from.hash : item.to.hash) }}
                  </n-button>
                </template>
                {{ item.direction === 'in' ? item.from.hash : item.to.hash }}
              </n-tooltip>
            </span>
          </div>

          <div :class="['flex-1 flex justify-end text-base font-semibold', getColor(item)]">
            {{ item.direction === 'in' ? '+' : '-' }}
            <span v-if="item.token?.symbol !== 'DLCCNFT'">
              {{ item.total?.value ? Number(formatUnits(item.total.value)).toFixed(5) : '0.0' }}
            </span>
            {{ item.token?.symbol === 'DLCCNFT' ? 'NFT' : item.token?.symbol }}
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import DBC from '@/assets/img/dbc.png'
import DLC from '@/assets/img/dlc.png'
import NFT from '@/assets/img/mynft.png'

import { useTransferStore } from '@/store/Modules/transfer/index'
import { maskMiddle } from '@/utils/common/maskMiddle'
import { ethers, formatUnits, formatEther } from 'ethers'
import { useIntervalFn } from '@vueuse/core'

const transferStore = useTransferStore()
function getColor(item: any) {
  const isIn = item.direction === 'in'
  const special = '0xE0A4D4faDc092A7E27c48E954524dC51db0d37C9'

  if (item.from?.hash === special) {
    return isIn ? 'text-[#FFBC2C]' : 'text-error-500'
  }
  return isIn ? 'text-success-500' : 'text-error-500'
}
// 初始化历史记录数据
const { pause, resume, isActive } = useIntervalFn(
  async () => {
    transferStore.getTransferList()
  },
  600000,
  { immediateCallback: true }
)
// 计算当前图标
const currentIcon = computed(() => {
  if (route.query.coin === 'DBC') {
    return DBC
  } else if (route.query.coin === 'DLC') {
    return DLC
  } else {
    return NFT
  }
})

// 计算当前历史记录
const currentHistory = computed(() => {
  const list = transferStore.displayTransferList
  if (!list || list.length === 0) return []
  const coin = route.query.coin
  console.log(list, coin, 'coincoincoincoincoincoincoin')

  if (coin === 'DBC') {
    return list.filter((item) => item.token?.symbol === 'DBC')
  } else if (coin === 'DLC') {
    return list.filter((item) => item.token?.symbol === 'DLC')
  } else if (coin === 'DLP') {
    return list.filter((item) => item.token?.symbol === 'DLP')
  } else {
    return list.filter((item) => item.token?.symbol === 'DLCCNFT')
  }
})
const router = useRouter()
const route = useRoute()

// 去往历史记录详情页
const toDetail = (item) => {
  router.push({
    name: 'TransferHistoryDetail',
    query: {
      data: JSON.stringify(item),
      coin: route.query.coin,
    },
  })
}
</script>

<style lang="scss" scoped></style>
