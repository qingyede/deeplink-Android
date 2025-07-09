import { useIntervalFn } from '@vueuse/core'
import { dbcPriceOcw } from '@/api/price/index'
import { computed } from 'vue'

export const useGetDbcPrice = () => {
  // dbc
  let dbc_price = ref(0)

  const { pause, resume, isActive } = useIntervalFn(
    async () => {
      const { data: res } = await dbcPriceOcw()
      console.log(res, 'res')
      if (res.code === '10502') {
        dbc_price.value = Number(res.content.dbc_price)
      } else {
        window.$message?.error('DLC价格获取失败')
      }
    },
    80000,
    { immediateCallback: true }
  )

  return { dbc_price }
}
