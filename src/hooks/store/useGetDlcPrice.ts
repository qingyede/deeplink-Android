import { useIntervalFn } from '@vueuse/core'
import { dlcPriceOcw } from '@/api/price/index'

export const useGetDlcPrice = () => {
  let dlc_price = ref(0)
  const isReady = ref(false)

  const { pause, resume, isActive } = useIntervalFn(
    async () => {
      const { data: res } = await dlcPriceOcw()
      console.log(res, 'res')
      if (res.code === '10502') {
        dlc_price.value = Number(res.content.dlc_price)
        isReady.value = true // 标记为数据加载完成
      } else {
        window.$message?.error('DLC价格获取失败')
      }
    },
    80000,
    { immediateCallback: true }
  )

  // 返回一个promise，等待数据准备好
  const waitReady = () => {
    return new Promise((resolve) => {
      watch(isReady, (newVal) => {
        if (newVal) {
          resolve(true)
        }
      })
    })
  }

  return { dlc_price, waitReady }
}
