import { useI18n } from 'vue-i18n'
import { useClipboard } from '@vueuse/core'
import { appStore } from '@/store/Modules/app'
import { NGradientText } from 'naive-ui'
import { decryptKeystore } from '@/utils/decryptKeystore'
import exportWallet from '@/pages/home/modules/dialogs/exportWallet.vue'
import DBC from '@/assets/img/dbc.png'
import DLC from '@/assets/img/dlc.png'
import { formatNumber } from '@/utils/common/formatNumber'
import { useGetDbcAndDlcNumber } from '@/hooks/wallet/useGetDbcAndDlcNumber'
import { priceStore } from '@/store/Modules/price/index'
import { convertDbcToUsd, convertDlcToUsd } from '@/utils/common/transferToUsd'
import { useGetDlcPrice } from '@/hooks/store/useGetDlcPrice'
import { useGetDbcPrice } from '@/hooks/store/useGetDbcPrice'
import { useRouter, useRoute } from 'vue-router'

export const useWalletToken = () => {
  const { t, locale } = useI18n()
  const { copy } = useClipboard()
  const app = appStore()
  const { dbcNumber, dlcNumber } = useGetDbcAndDlcNumber()
  const price = priceStore()
  const { dlc_price } = useGetDlcPrice()
  const { dbc_price } = useGetDbcPrice()
  const router = useRouter()
  const route = useRoute()
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
    window.$message?.success(t('home.copySuccess'))
  }

  // 个人加密货币数据
  const cryptoData = computed(() => {
    return [
      {
        coin: 'DLC',
        icon: DLC,
        number: formatNumber(dlcNumber.value),
        price: price.useLocalizedCurrency(convertDlcToUsd(Number(dlcNumber.value), dlc_price.value)),
      },
      {
        coin: 'DBC',
        icon: DBC,
        number: formatNumber(dbcNumber.value),
        price: price.useLocalizedCurrency(convertDbcToUsd(Number(dbcNumber.value), dbc_price.value)),
      },
    ]
  })

  // 卡片操作按钮
  const cardAction = ref([
    {
      t: 'home.exportWallet',
      icon: null,
      h: () => {
        let exportWalletRef: any = ref()
        const d = window.$dialog?.warning({
          title: () =>
            h(NGradientText, { size: 24, type: 'success', class: 'font-bold' }, { default: () => t('home.title') }),
          content: () => h(exportWallet, { ref: exportWalletRef }),
          positiveText: t('home.export'),
          negativeText: t('app.cancel'),
          negativeButtonProps: { color: '#3CD8A6', size: 'medium' },
          positiveButtonProps: { color: '#03C188', size: 'medium' },
          class: 'rounded-2xl dark:bg-[#1a1a1a] dark:text-white',
          showIcon: false,
          onPositiveClick: async () => {
            console.log(exportWalletRef.value)
            if (d) {
              console.log(exportWalletRef.value?.formRef)
              const rs = await new Promise(async (resolve, reject) => {
                exportWalletRef.value?.formRef?.validate(async (errors) => {
                  if (!errors) {
                    resolve(true)
                  } else {
                    window.$message?.error(t('home.checkPassword'))
                    resolve(false)
                  }
                })
              })
              if (rs) {
                d.loading = true
                d.positiveText = t('home.exporting')
                const { address, privateKey, mnemonic } = await decryptKeystore(
                  app.keystore,
                  exportWalletRef.value.model.password,
                  t
                )
                if (privateKey !== '') {
                  console.log(t('home.success'))
                  copy(privateKey)
                  window.$message?.success(t('home.privateKeyCopied'))
                  d.loading = false
                  d.positiveText = t('app.export')
                } else {
                  d.loading = false
                  d.positiveText = t('app.export')
                  return false
                }
              } else {
                return false
              }
            }
            // console.log(88888)
          },
        })
      },
    },
    {
      t: 'home.disconnect',
      icon: null,
      h: () => {
        const d = window.$dialog?.warning({
          title: () => {
            return h(
              NGradientText,
              {
                size: 24,
                type: 'success',
                class: 'font-bold',
              },
              { default: () => t('home.disconnectWallet') }
            )
          },
          content: () => t('home.disconnectConfirm'),
          class: 'rounded-2xl dark:bg-[#1a1a1a] dark:text-white',
          showIcon: false,
          negativeButtonProps: { color: '#3CD8A6', size: 'medium' },
          positiveButtonProps: { color: '#03C188', size: 'medium' },
          positiveText: t('app.confirm'),
          negativeText: t('app.cancel'),
          onPositiveClick: async () => {
            if (d) {
              d.loading = true
              d.positiveText = 'loading...'
              await new Promise((resolve, reject) => {
                setTimeout(() => {
                  d.loading = false
                  d.positiveText = t('app.confirm')
                  app.$reset()
                  router.push({ name: 'IsWallet' })
                  window.$message?.success(t('home.disconnectSuccess'))
                  resolve(true)
                }, 1000)
              })
            }
          },
        })
      },
    },
  ])

  return {
    showBalance,
    toggleBalance,
    copyH,
    cryptoData,
    cardAction,
  }
}
