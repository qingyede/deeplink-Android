// src/hooks/useSafeArea.ts
import { onMounted, onUnmounted, ref } from 'vue'

/**
 * 获取并设置安全区域顶部高度（刘海高度）
 * 通过 native 提供的 dlc.toNative(action: 3003) 获取 statusBarHeight
 */
export function useSafeArea() {
  const safeAreaInsetTop = ref('0px')

  /**
   * 触发 Native 向 H5 返回顶部状态栏高度
   */
  const updateSafeArea = () => {
    if (window.dlc?.toNative) {
      window.dlc.toNative(
        JSON.stringify({
          action: 3003,
        })
      )
    } else {
      // fallback，给默认值（单位为 px，需转逻辑像素）
      const fallbackHeight = Math.round(24)
      safeAreaInsetTop.value = `${fallbackHeight}px`
      document.documentElement.style.setProperty('--safe-area-inset-top', safeAreaInsetTop.value)
    }
  }

  /**
   * 处理 native 回调回来的数据
   */
  const handleToH5 = (json: string) => {
    try {
      const returndata = JSON.parse(json)

      if (returndata.action === 3003 && returndata.data?.statusBarHeight) {
        const raw = returndata.data.statusBarHeight
        const logicalHeight = Math.max(20, raw / window.devicePixelRatio)

        safeAreaInsetTop.value = `${logicalHeight}px`
        document.documentElement.style.setProperty('--safe-area-inset-top', safeAreaInsetTop.value)

        console.log(`[safe-area] 设备像素比: ${window.devicePixelRatio}`)
        console.log(`[safe-area] statusBarHeight(raw): ${raw}px`)
        console.log(`[safe-area] 计算后逻辑像素: ${safeAreaInsetTop.value}`)
      } else {
        console.warn('[safe-area] 无有效 statusBarHeight 数据:', returndata)
      }
    } catch (error) {
      console.error('[safe-area] JSON解析失败:', error, '原始数据:', json)
    }
  }

  onMounted(() => {
    // 拦截 window.toH5 并增强处理
    const originalToH5 = window.toH5
    window.toH5 = (json: string) => {
      handleToH5(json)
      if (typeof originalToH5 === 'function') {
        originalToH5(json)
      }
    }

    updateSafeArea()
    window.addEventListener('resize', updateSafeArea)
  })

  onUnmounted(() => {
    window.removeEventListener('resize', updateSafeArea)
  })

  return {
    safeAreaInsetTop,
  }
}
