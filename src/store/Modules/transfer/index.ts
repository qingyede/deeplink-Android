import { defineStore } from 'pinia'
import { getTokenTransfers } from '@/api/transfer/index'
import { appStore } from '../app'
import { computed, ref } from 'vue'
import { useI18n } from 'vue-i18n'

export const useTransferStore = defineStore('transfer', () => {
  const app = appStore()
  const { t } = useI18n()

  const fullTransferList = ref([])
  const isAllLoaded = ref(false)
  // 数据loading
  const loading = ref(false)

  // 计算属性：模板只用这个来展示
  const displayTransferList: any = computed(() => {
    return isAllLoaded.value ? fullTransferList.value : fullTransferList.value.slice(0, 6)
  })

  // 获取交易记录，并添加 direction 字段
  const getTransferList = async () => {
    loading.value = true
    const res = await getTokenTransfers(app.address)
    console.log(res, 'res')
    loading.value = false
    if (res.status === 200) {
      const userAddress = app.address.toLowerCase()
      const rawItems = res.data.items || []

      fullTransferList.value = rawItems.map((item: any) => {
        const from = item.from?.hash?.toLowerCase?.() || ''
        const to = item.to?.hash?.toLowerCase?.() || ''

        let direction: 'in' | 'out' | 'other' = 'other'
        if (from === userAddress) {
          direction = 'out'
        } else if (to === userAddress) {
          direction = 'in'
        }

        return {
          ...item,
          direction,
        }
      })

      isAllLoaded.value = false
    } else {
      window.$message?.error(res.statusText || '获取交易历史记录失败')
    }
  }

  const getTransferListAll = () => {
    window.$message?.success(t('transaction.allLoaded'))
    isAllLoaded.value = true
  }

  return {
    displayTransferList,
    getTransferList,
    getTransferListAll,
    isAllLoaded,
    loading,
  }
})
