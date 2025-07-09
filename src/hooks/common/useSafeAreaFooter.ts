// src/hooks/useSafeAreaFooter.ts
import { ref, onMounted, onUnmounted } from 'vue'

/**
 * 获取并设置底部安全区域高度（如 iPhone X 系列的 home indicator 区域）
 * 支持从 Native 接收 action: 3003 回调
 */
export function useSafeAreaFooter() {
  const safeAreaBottom = ref('0px')

  /**
   * 主动请求 Native 返回底部安全区域信息
   */
  const requestSafeArea = () => {
    if (window.dlc?.toNative) {
      window.dlc.toNative(
        JSON.stringify({
          action: 3003,
        })
      )
    }
  }

  /**
   * 处理 Native 回调
   */
  const handleToH5 = (json: string) => {
    try {
      const returndata = JSON.parse(json)
      console.log('[safe-area-bottom] 返回数据:', returndata)

      if (returndata.action === 3003) {
        const rawBottom =
          returndata.data?.safeAreaBottom ??
          returndata.data?.navigationBarHeight ?? // 尝试兼容老版本
          returndata.data?.statusBarHeight

        if (rawBottom != null) {
          const logicalBottom = Math.round(rawBottom / window.devicePixelRatio)
          safeAreaBottom.value = `${logicalBottom}px`

          document.documentElement.style.setProperty('--safe-area-bottom', safeAreaBottom.value)

          console.log(`[safe-area-bottom] 原始: ${rawBottom}px`)
          console.log(`[safe-area-bottom] 逻辑像素: ${safeAreaBottom.value}`)
        } else {
          console.warn('[safe-area-bottom] 未返回有效 bottom 安全距离')
        }
      }
    } catch (err) {
      console.error('[safe-area-bottom] 解析失败:', err, '原始数据:', json)
    }
  }

  onMounted(() => {
    // 监听回调注入
    const originalToH5 = window.toH5
    window.toH5 = (json: string) => {
      console.log(json, '????????')
      handleToH5(json)
      if (typeof originalToH5 === 'function') {
        originalToH5(json)
      }
    }

    requestSafeArea()
    window.addEventListener('resize', requestSafeArea)
  })

  onUnmounted(() => {
    window.removeEventListener('resize', requestSafeArea)
  })

  return {
    safeAreaBottom, // 直接使用 ref
  }
}
