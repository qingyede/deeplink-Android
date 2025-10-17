import { defineStore } from 'pinia'
import { ref } from 'vue'
import { exchangeRate } from '@/api/price/index'
import { useI18n } from 'vue-i18n'

export const priceStore = defineStore('price', () => {
  const { t, locale } = useI18n()

  // 汇率表
  const exchangeRateValue = ref<Record<string, number> | null>(null)

  // 拉取汇率
  const getExchangeRateH = async () => {
    const { data: res } = await exchangeRate()
    if (res.code === 10001) {
      exchangeRateValue.value = res.content
    }
    console.log(res, '国家汇率国家汇率')
  }

  /**
   * 返回当前语言下的带符号金额（非响应式）
   * @param usdAmount 美元数额
   */
  const useLocalizedCurrency = (usdAmount: number, n = 5) => {
    if (!exchangeRateValue.value) return '0.00'

    let symbol = '$'
    let rate = exchangeRateValue.value['USD'] || 1

    if (locale.value === 'zh') {
      symbol = '¥'
      rate = exchangeRateValue.value['CNY']
    } else if (locale.value === 'ko') {
      symbol = '₩'
      rate = exchangeRateValue.value['KRW']
    }

    return `${symbol}${(usdAmount * rate).toFixed(n)}`
  }
  return {
    exchangeRateValue,
    getExchangeRateH,
    useLocalizedCurrency,
  }
})
