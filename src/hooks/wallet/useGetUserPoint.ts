// src/hooks/wallet/useGetUserPoints.ts
import { ref } from 'vue'
import { appStore } from '@/store/Modules/app'
import { getUserPointsRaw } from '@/utils/wallet/token'
import { useIntervalFn } from '@vueuse/core'

// 截断到 n 位小数（不四舍五入），并补零
function toFixedDown(input: string, n = 3): string {
  const [i, d = ''] = input.split('.')
  return n <= 0 ? i : `${i}.${d.slice(0, n).padEnd(n, '0')}`
}

export const useGetUserPoints = (interval = 60000) => {
  const app = appStore()
  const loading = ref(false)
  const points = ref('0.000') // 字符串避免大数精度丢失

  const refresh = async () => {
    if (!app.address) return
    loading.value = true
    try {
      const formatted = await getUserPointsRaw(app.address) // ✅ 已是 DLCP 格式化字符串
      points.value = toFixedDown(formatted, 3)
    } catch (e) {
      console.error('[useGetUserPoints] 获取积分失败:', e)
      points.value = '0.000'
    } finally {
      loading.value = false
    }
  }

  const { pause, resume, isActive } = useIntervalFn(
    () => {
      if (app.address) refresh()
    },
    interval,
    { immediateCallback: true }
  )

  return { points, loading, refresh, pause, resume, isActive }
}
