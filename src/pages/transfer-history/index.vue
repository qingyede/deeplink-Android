<template>
  <div class="px-4 w-full mx-auto flex flex-col items-center justify-center">
    <div class="flex flex-col gap-3 justify-center items-center">
      <img v-if="route.query.coin !== 'DLP'" class="w-[60px] h-[60px] object-fill" :src="currentIcon" alt="" />
      <div
        v-else
        class="flex items-center justify-center w-12 h-12 rounded-full bg-gray-200 text-gray-800 font-bold text-sm"
      >
        DLP
      </div>
      <div class="text-center flex flex-col gap-1">
        <div class="text-lg font-bold">
          {{ route.query.coin }}
        </div>
        <div class="text-[14px] font-bold flex gap-1.5">
          <div v-if="route.query.coin !== 'NFT'">
            <span class="text-[#7E7E7E]"> {{ currentBalance }}</span>
          </div>
          <div class="text-success-500 w-full text-center" v-else>{{ route.query.length }}{{ $t('transaction.nft') }}</div>
        </div>
      </div>

      <!-- 功能按钮 -->
      <div v-if="route.query.coin !== 'DLP'" class="w-full flex items-center justify-center gap-9 mt-2">
        <div
          v-for="(item, index) in btnData"
          :key="index"
          @click="item.h"
          class="w-[64px] min-h-[86px] flex flex-col gap-1 justify-center items-center group"
        >
          <div
            class="w-[64px] h-[64px] rounded-full bg-[#2F2F2F] flex items-center justify-center transition-all duration-200 ease-in-out hover:bg-[#3a3a3a] active:scale-90 group-hover:shadow-md"
          >
            <Icon :icon="item.icon" class="text-[36px] text-white transition-transform duration-200 group-hover:scale-110" />
          </div>
          <div class="text-sm font-semibold">{{ item.title }}</div>
        </div>
      </div>
    </div>

    <div class="mt-8 w-full">
      <HistoryTable />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed, h } from 'vue'
import HistoryTable from './modules/HistoryTable.vue'
import { useRouter, useRoute } from 'vue-router'
import DBC from '@/assets/img/dbc.png'
import DLC from '@/assets/img/dlc.png'
import NFT from '@/assets/img/mynft.png'
import BuyDlc from '@/pages/home/modules/dialogs/BuyDlc.vue'
import transferDialogDlcAndDbc from '@/pages/home/modules/myCardModules/transferDialogDlcAndDbc.vue'
import { NGradientText } from 'naive-ui'
import { useI18n } from 'vue-i18n'
import { appStore } from '@/store/Modules/app'
import { decryptKeystore } from '@/utils/decryptKeystore'
import { useTransfer } from '@/utils/wallet/dbcProvider'
import Receive from './modules/receive.vue'
import { useHomeStore } from '@/store/Modules/home/index'
import { convertDbcToUsd, convertDlcToUsd } from '@/utils/common/transferToUsd'
import { priceStore } from '@/store/Modules/price/index'
import { useGetDbcAndDlcNumber } from '@/hooks/wallet/useGetDbcAndDlcNumber'
import { useGetDbcPrice } from '@/hooks/store/useGetDbcPrice'
import { useGetDlcPrice } from '@/hooks/store/useGetDlcPrice'

const { t, locale } = useI18n()
const price = priceStore()
const { transfer } = useTransfer(t)
const router = useRouter()
const route = useRoute()
const app = appStore()
const home = useHomeStore()
const { dbc_price } = useGetDbcPrice()
const { dbcNumber, dlcNumber } = useGetDbcAndDlcNumber()
const { dlc_price } = useGetDlcPrice()
import { useGetUserPoints } from '@/hooks/wallet/useGetUserPoint'

const { points } = useGetUserPoints()
// 计算属性值当前代币的余额
const currentBalance = computed(() => {
  if (route.query.coin === 'DBC') {
    return Number(dbcNumber).toFixed(3)
  } else if (route.query.coin === 'DLC') {
    return Number(dlcNumber).toFixed(3)
  } else {
    return Number(points.value).toFixed(3)
  }
})

// 操作按钮数据
const btnData = ref([
  {
    title: t('transaction.receive'),
    icon: 'mdi:arrow-down', // 替换为更贴切的接收图标
    h: () => {
      window.$dialog?.info({
        title: () => {
          return h(
            NGradientText,
            {
              size: 24,
              type: 'success',
              class: 'font-bold',
            },
            { default: () => 'Receive' }
          )
        },
        content: () => h(Receive),
        class: 'rounded-2xl dark:bg-[#1a1a1a] dark:text-white',
        showIcon: false,
        negativeButtonProps: { color: '#3CD8A6', size: 'medium' },
        positiveButtonProps: { color: '#03C188', size: 'medium' },

        onPositiveClick: () => {
          console.log('Confirm')
        },
      })
    },
  },
  {
    title: t('transaction.buy'),
    icon: 'mdi:wallet', // 使用购物车表示购买
    h: () => {
      // 先判断是不是购买NFT
      if (route.query.coin === 'NFT') {
        router.push({ name: 'nfts' })
      } else {
        window.$dialog?.info({
          title: () => {
            return h(
              NGradientText,
              {
                size: 24,
                type: 'success',
                class: 'font-bold',
              },
              { default: () => 'Buy DLC' }
            )
          },
          content: () => h(BuyDlc),
          class: 'rounded-2xl dark:bg-[#1a1a1a] dark:text-white',
          showIcon: false,
          negativeButtonProps: { color: '#3CD8A6', size: 'medium' },
          positiveButtonProps: { color: '#03C188', size: 'medium' },

          onPositiveClick: () => {
            console.log('Confirm')
          },
        })
      }
    },
  },
  {
    title: t('transaction.send'),
    icon: 'mdi:arrow-up', // 替换为更合理的发送图标
    h: () => {
      if (route.query.coin === 'NFT') {
        router.push({ name: 'home' })
        home.activeTab = 'NFTs'
      } else {
        const transferDialogDlcAndDbcDialogRef: any = ref(null)
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
          content: () => h(transferDialogDlcAndDbc, { ref: transferDialogDlcAndDbcDialogRef }),
          class: 'rounded-2xl dark:bg-[#1a1a1a] dark:text-white',
          showIcon: false,
          negativeButtonProps: { color: '#3CD8A6', size: 'medium' },
          positiveButtonProps: { color: '#03C188', size: 'medium' },
          positiveText: t('app.confirm'),
          negativeText: t('app.cancel'),
          onPositiveClick: async () => {
            if (d) {
              console.log(transferDialogDlcAndDbcDialogRef.value.activeTab)
              const comp = transferDialogDlcAndDbcDialogRef.value
              if (!comp) return false

              const valid = await comp.validateForm().catch(() => false)
              if (!valid) {
                window.$message?.error(t('home.formInvalid'))
                return false
              }

              d.loading = true
              d.positiveText = 'loading...'

              const coinType = transferDialogDlcAndDbcDialogRef.value.activeTab // 'DLC' or 'DBC'
              const to = transferDialogDlcAndDbcDialogRef.value.model[coinType].address
              const amount = transferDialogDlcAndDbcDialogRef.value.model[coinType].amount
              // const pwd = transferDialogDlcAndDbcDialogRef.value.model[coinType].password
              try {
                // 从用户钱包系统中解密私钥（你应该有自己的方法）
                const { privateKey, address } = await decryptKeystore(
                  appStore().keystore,
                  transferDialogDlcAndDbcDialogRef.value.model[coinType].password,
                  t
                )
                const tx = await transfer(coinType, to, amount, privateKey, t)

                window.$message?.success(t('home.transferSuccess'))
              } catch (error) {
                d.loading = false
                d.positiveText = t('app.confirm')
                return false
              }
            }
          },
        })
      }
    },
  },
])

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
</script>

<style lang="scss" scoped></style>
