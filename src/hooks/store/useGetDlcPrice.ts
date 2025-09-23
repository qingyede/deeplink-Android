import { ref, watch } from 'vue'
import { useIntervalFn } from '@vueuse/core'
import { dlcPriceOcw } from '@/api/price/index'

export const useGetDlcPrice = () => {
  const dlc_price = ref(0)
  const isReady = ref(false)

  const { pause, resume, isActive } = useIntervalFn(
    async () => {
      try {
        const { data: res } = await dlcPriceOcw()
        if (res.code === '10502') {
          dlc_price.value = Number(res.content.dlc_price)
          isReady.value = true
        } else {
          window.$message?.error('DLC价格获取失败')
        }
      } catch (e) {
        console.error('[useGetDlcPrice] 请求出错', e)
      }
    },
    80000,
    { immediateCallback: true }
  )

  const waitReady = () => {
    return new Promise((resolve) => {
      if (isReady.value) {
        resolve(true)
        return
      }
      const stop = watch(isReady, (val) => {
        if (val) {
          stop()
          resolve(true)
        }
      })
    })
  }

  return { dlc_price, waitReady, pause, resume, isActive }
}
