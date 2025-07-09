<template>
  <div
    class="flex flex-col gap-5 w-full rounded-lg text-white px-[17px] py-[20px] relative"
    style="background: linear-gradient(to right, #017543 0%, #017543 26%, #03ff91 100%)"
  >
    <h1 class="text-[20px] font-bold">{{ $t('home.walletBalance') }}</h1>
    <div class="flex gap-6 items-start flex-wrap gap-y-2 text-white">
      <!-- 左侧余额显示区 -->
      <div class="flex flex-wrap items-start gap-x-2 text-base font-bold tabular-nums">
        <template v-if="showBalance">
          <!-- <div class="w-full flex flex-wrap items-start gap-x-6 text-base font-bold tabular-nums">
            <span class="flex flex-col">
              <span class="break-all text-[17.5px]">{{ formatNumber(dlcNumber) }} DLC</span>
              <span class="text-[12.2px] text-gray-300 font-normal"> ≈{{ dlcUsdValue }} </span>
            </span>

            <span class="flex flex-col">
              <span class="break-all text-[17.5px]"> {{ formatNumber(dbcNumber) }} DBC </span>
              <span class="text-[12.2px] text-gray-300 font-normal"> ≈{{ dbcUsdValue }} </span>
            </span>
          </div> -->
          <div class="text-[17.5px] text-base font-bold tabular-nums">
            {{
              price.useLocalizedCurrency(
                convertDbcToUsd(Number(dbcNumber), dbc_price) + convertDlcToUsd(Number(dlcNumber), dlc_price)
              )
            }}
          </div>
        </template>

        <template v-else>
          <span class="text-base font-bold tabular-nums">*********</span>
        </template>
      </div>

      <!-- 右侧眼睛图标 -->
      <Icon
        :icon="showBalance ? 'mdi:eye' : 'mdi:eye-off'"
        class="cursor-pointer text-[20px] flex-shrink-0"
        @click="toggleBalance"
      />
    </div>

    <h1 class="flex items-center gap-3">
      <span class="text-[12px]">{{ maskAddress(app.address) }} </span>
      <Icon @click="copyH" icon="mdi:content-copy" class="cursor-pointer text-[18px]" />
    </h1>
    <h1 class="flex items-center gap-2">
      <n-button @click="transferH" secondary class="text-white text-[12px] md:text-[13px] dark:text-white rounded-lg">
        <template #icon>
          <Icon icon="mdi:wallet" class="text-[18px]" />
        </template>
        {{ $t('home.transfer') }}
      </n-button>
      <n-button
        @click="exportKeystoreToFile()"
        secondary
        class="text-white text-[12px] md:text-[13px] dark:text-white rounded-lg"
        >{{ $t('home.exportWallet') }}</n-button
      >

      <n-button
        @click="disconnectWallet()"
        secondary
        class="text-white text-[12px] md:text-[13px] dark:text-white rounded-lg"
      >
        {{ $t('home.disconnect') }}
      </n-button>
    </h1>

    <!-- 购买 DLC 按钮 -->
    <div class="absolute top-3 right-3">
      <n-button
        @click="buyDlc"
        size="small"
        type="primary"
        class="rounded-full min-h-[36px] px-3 py-1 text-white bg-gradient-to-r from-[#02C38A] to-[#007548] border-none shadow"
      >
        <template #icon>
          <Icon icon="mdi:cart-outline" class="text-[16px]" />
        </template>
        <span class="text-xs font-bold">{{ $t('home.buyDLC') }}</span>
      </n-button>
    </div>
  </div>
  <!-- tabs -->
  <MyTabs :cryptoData="cryptoData" />
</template>

<script lang="ts" setup>
import { appStore } from '@/store/Modules/app'
import { ref } from 'vue'
const app = appStore()
import { useMaskAddress } from '@/hooks/common/useMaskAddress'
const { maskAddress } = useMaskAddress()
import { useClipboard } from '@vueuse/core'
const { copy } = useClipboard()
import { decryptKeystore } from '@/utils/decryptKeystore'
import exportWallet from './dialogs/exportWallet.vue'
import { useGetDbcAndDlcNumber } from '@/hooks/wallet/useGetDbcAndDlcNumber'
import { formatNumber } from '@/utils/common/formatNumber'
import { convertDbcToUsd, convertDlcToUsd } from '@/utils/common/transferToUsd'
import { useGetDbcPrice } from '@/hooks/store/useGetDbcPrice'
import { useGetDlcPrice } from '@/hooks/store/useGetDlcPrice'
import { priceStore } from '@/store/Modules/price/index'
import MyTabs from './myCardModules/myTabs.vue'
import DBC from '@/assets/img/dbc.png'
import DLC from '@/assets/img/dlc.png'
import BuyDlc from '../modules/dialogs/BuyDlc.vue'
import { useI18n } from 'vue-i18n'
import { NGradientText } from 'naive-ui'
import transferDialogDlcAndDbc from './myCardModules/transferDialogDlcAndDbc.vue'
import { useTransfer } from '@/utils/wallet/dbcProvider'
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()
const { transfer } = useTransfer()
const { dbc_price } = useGetDbcPrice()
const { dlc_price } = useGetDlcPrice()
const { t, locale } = useI18n()
const price = priceStore()
const { dbcNumber, dlcNumber, homeCardLoading } = useGetDbcAndDlcNumber()
// 缓存美元价值
const dlcUsdValue = price.useLocalizedCurrency(convertDlcToUsd(Number(dlcNumber.value), dlc_price.value))
const dbcUsdValue = price.useLocalizedCurrency(convertDbcToUsd(Number(dbcNumber.value), dbc_price.value))

// Toggle balance
// Balance visibility state
const showBalance = ref(false)

// Toggle balance visibility
const toggleBalance = () => {
  showBalance.value = !showBalance.value
}

// 点击复制
const copyH = () => {
  copy(app.address)

  window.$message?.success('复制成功')
}

// 导出钱包
const exportKeystoreToFile = () => {
  let exportWalletRef: any = ref()
  const d = window.$dialog?.warning({
    title: '导出钱包',
    content: () => h(exportWallet, { ref: exportWalletRef }),
    positiveText: '导出',
    negativeText: '取消',
    negativeButtonProps: { color: '#3CD8A6', size: 'medium' },
    positiveButtonProps: { color: '#03C188', size: 'medium' },
    class: 'rounded-2xl',
    onPositiveClick: async () => {
      console.log(exportWalletRef.value)
      if (d) {
        console.log(exportWalletRef.value?.formRef)
        const rs = await new Promise(async (resolve, reject) => {
          exportWalletRef.value?.formRef?.validate(async (errors) => {
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
          d.positiveText = '导出中...'
          const { address, privateKey, mnemonic } = await decryptKeystore(app.keystore, exportWalletRef.value.model.password)
          if (privateKey !== '') {
            console.log('导出成功')
            copy(privateKey)
            window.$message?.success('私钥导出成功,已复制到剪贴板')
            d.loading = false
            d.positiveText = '导出'
          } else {
            d.loading = false
            d.positiveText = '导出'
            return false
          }
        } else {
          return false
        }
      }
      // console.log(88888)
    },
  })
}

// 个人加密货币数据
const cryptoData = computed(() => {
  return [
    {
      coin: 'DBC',
      icon: DBC,
      number: formatNumber(dbcNumber.value),
      price: price.useLocalizedCurrency(convertDbcToUsd(Number(dbcNumber.value), dbc_price.value)),
    },
    {
      coin: 'DLC',
      icon: DLC,
      number: formatNumber(dlcNumber.value),
      price: price.useLocalizedCurrency(convertDlcToUsd(Number(dlcNumber.value), dlc_price.value)),
    },
  ]
})
// 总资产（美元）
const totalUsd = computed(() => {
  console.log(convertDbcToUsd(Number(dbcNumber.value), dbc_price.value), 'KKK', dbcNumber.value, dbc_price.value)
  return (
    convertDbcToUsd(Number(dbcNumber.value), dbc_price.value) + convertDlcToUsd(Number(dlcNumber.value), dlc_price.value)
  )
})
// 本地化总资产
const totalAssets = price.useLocalizedCurrency(
  convertDbcToUsd(Number(dbcNumber.value), dbc_price.value) + convertDlcToUsd(Number(dlcNumber.value), dlc_price.value)
)

// 购买Dlc
const buyDlc = () => {
  window.$dialog?.info({
    title: () => h('div', { class: 'dark:text-white font-bold' }, 'Buy DLC'),
    content: () => h(BuyDlc),
    class: 'rounded-2xl dark:bg-[#1a1a1a] dark:text-white',
    showIcon: false,
    negativeButtonProps: { color: '#3CD8A6' },
    positiveButtonProps: { color: '#03C188' },
    onPositiveClick: () => {
      console.log('Confirm')
    },
  })
}

// 点击转账
const transferH = () => {
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
        { default: () => '转账' }
      )
    },
    content: () => h(transferDialogDlcAndDbc, { ref: transferDialogDlcAndDbcDialogRef }),
    class: 'rounded-2xl dark:bg-[#1a1a1a] dark:text-white',
    showIcon: false,
    negativeButtonProps: { color: '#3CD8A6', size: 'medium' },
    positiveButtonProps: { color: '#03C188', size: 'medium' },
    positiveText: '确认',
    negativeText: '取消',
    onPositiveClick: async () => {
      if (d) {
        console.log(transferDialogDlcAndDbcDialogRef.value.activeTab)
        const comp = transferDialogDlcAndDbcDialogRef.value
        if (!comp) return false

        const valid = await comp.validateForm().catch(() => false)
        if (!valid) {
          window.$message?.error('请检查表单输入')
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
            transferDialogDlcAndDbcDialogRef.value.model[coinType].password
          )
          const tx = await transfer(coinType, to, amount, privateKey)

          window.$message?.success(`转账成功,请注意查收`)
        } catch (error) {
          d.loading = false
          d.positiveText = '确认'
          return false
        }
        // await new Promise((resolve, reject) => {
        //   setTimeout(() => {
        //     d.loading = false
        //     d.positiveText = '确定'
        //     window.$message?.success('购买成功')
        //     resolve(true)
        //   }, 2000)
        // })
      }
    },
  })
}

// 点击断开钱包
const disconnectWallet = () => {
  const d = window.$dialog?.warning({
    title: () => {
      return h(
        NGradientText,
        {
          size: 24,
          type: 'success',
          class: 'font-bold',
        },
        { default: () => '断开钱包' }
      )
    },
    content: () => '请确定要断开您的钱包吗？',
    class: 'rounded-2xl dark:bg-[#1a1a1a] dark:text-white',
    showIcon: false,
    negativeButtonProps: { color: '#3CD8A6', size: 'medium' },
    positiveButtonProps: { color: '#03C188', size: 'medium' },
    positiveText: '确定',
    negativeText: '取消',
    onPositiveClick: async () => {
      if (d) {
        d.loading = true
        d.positiveText = 'loading...'
        await new Promise((resolve, reject) => {
          setTimeout(() => {
            d.loading = false
            d.positiveText = '确定'
            app.$reset()
            router.push({ name: 'IsWallet' })
            window.$message?.success('成功断开钱包')
            resolve(true)
          }, 1000)
        })
      }
    },
  })
}
</script>

<style lang="scss" scoped></style>
