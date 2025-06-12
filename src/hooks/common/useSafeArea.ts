import { onMounted, onUnmounted, ref } from 'vue'

export function useSafeArea() {
  const safeAreaInsetTop = ref('0px')

  const updateSafeArea = () => {
    console.log('useSafeArea: Sending action 3003 to get status bar height')
    console.log('useSafeArea: devicePixelRatio:', window.devicePixelRatio)
    if (window.dlc && window.dlc.toNative) {
      window.dlc.toNative(
        JSON.stringify({
          action: 3003,
        })
      )
    } else {
      const defaultHeight = Math.round(24 * window.devicePixelRatio)
      safeAreaInsetTop.value = `${defaultHeight}px`
      document.documentElement.style.setProperty('--safe-area-inset-top', safeAreaInsetTop.value)
    }
  }

  const handleToH5 = (json: string) => {
    try {
      const returndata = JSON.parse(json) || {}
      if (returndata.action === 3003 && returndata.data && returndata.data.statusBarHeight) {
        let statusBarHeight = returndata.data.statusBarHeight
        // 限制高度范围（20px 到 80px）
        statusBarHeight = Math.max(20, Math.min(80, statusBarHeight))
        safeAreaInsetTop.value = `${statusBarHeight}px`
        document.documentElement.style.setProperty('--safe-area-inset-top', safeAreaInsetTop.value)
        console.log('useSafeArea: Set --safe-area-inset-top to:', safeAreaInsetTop.value)
        console.log('useSafeArea: Raw statusBarHeight:', returndata.data.statusBarHeight)
        console.log('useSafeArea: navigationBarHeight:', returndata.data.navigationBarHeight || 'N/A')
        console.log(
          'useSafeArea: Calculated vw (for comparison):',
          (statusBarHeight / (window.devicePixelRatio * 4.3)).toFixed(4) + 'vw'
        )
      } else {
        console.warn('useSafeArea: Invalid or missing statusBarHeight in action 3003:', returndata)
      }
    } catch (error) {
      console.error('useSafeArea: Failed to parse toH5 data:', error, 'Raw json:', json)
    }
  }

  onMounted(() => {
    const originalToH5 = window.toH5
    window.toH5 = (json: string) => {
      handleToH5(json)
      if (originalToH5) {
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
