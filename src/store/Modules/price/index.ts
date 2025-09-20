// stores/price.ts
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { exchangeRate } from '@/api/price/index'
import { useI18n } from 'vue-i18n'
import { appStore } from '@/store/Modules/app/index'
import { useGetDlcPrice } from '@/hooks/store/useGetDlcPrice'

export const priceStore = defineStore('price', () => {
  const { t, locale } = useI18n({ useScope: 'global' })
  const app = appStore()
  const { dlc_price } = useGetDlcPrice()

  const exchangeRateValue = ref<Record<string, number> | null>(null)

  const getExchangeRateH = async () => {
    try {
      const { data: res } = await exchangeRate()
      if (res.success) {
        exchangeRateValue.value = res.content
      }
    } catch (e) {
      console.error('getExchangeRateH error:', e)
    }
  }

  /**
   * 返回指定货币代码的汇率
   * @param currency 'USD' | 'CNY' | 'KRW' ...
   */
  const getRateByCurrency = (currency: string): number => {
    if (!exchangeRateValue.value) {
      console.warn('汇率表尚未加载，请先调用 getExchangeRateH')
      return 1
    }
    return exchangeRateValue.value[currency.toUpperCase()] ?? 1
  }

  /**
   * 返回当前语言下的带符号金额
   */
  const useLocalizedCurrency = (usdAmount: number, n = 2) => {
    if (!exchangeRateValue.value) return null

    const lang = String(locale.value).toLowerCase()
    let symbol = '$'
    let rate = exchangeRateValue.value['USD'] ?? 1

    if (lang.startsWith('zh')) {
      symbol = '¥'
      rate = exchangeRateValue.value['CNY'] ?? rate
    } else if (lang.startsWith('ko')) {
      symbol = '₩'
      rate = exchangeRateValue.value['KRW'] ?? rate
    }

    const value = usdAmount * rate
    const formatter = new Intl.NumberFormat(locale.value, {
      minimumFractionDigits: n,
      maximumFractionDigits: n,
    })

    return `${symbol}${formatter.format(value)}`
  }

  const currentUnit = computed(() => {
    const _ = locale.value
    return app.mode ? t('app.point') : 'DLC'
  })

  // 将dlc数量转换位对应的积分以及相关联的usdt价值
  const dlc2usd = (dlc: number) => {
    if (!exchangeRateValue.value) {
      console.warn('汇率表尚未加载，请先调用 getExchangeRateH')
      return {
        points: 0,
        usd: 0,
      }
    }

    const usd = dlc * dlc_price.value
    const localPrice = useLocalizedCurrency(usd)
    console.log(usd, 'usdusd')
    const points = (usd * 1000).toFixed(0)

    useLocalizedCurrency(usd)
    return {
      points,
      localPrice,
    }
  }

  return {
    exchangeRateValue,
    getExchangeRateH,
    getRateByCurrency, // ✅ 新增
    useLocalizedCurrency,
    currentUnit,
    dlc2usd,
  }
})
