import { useRouter, useRoute } from 'vue-router'

// ✅ 原生 JS 判断是否右滑
export function useSwipeBackBasic() {
  const router = useRouter()
  const route = useRoute()

  let startX = 0
  let startY = 0

  const handleTouchStart = (e: TouchEvent) => {
    const touch = e.touches[0]
    startX = touch.clientX
    startY = touch.clientY
  }

  const handleTouchEnd = (e: TouchEvent) => {
    const touch = e.changedTouches[0]
    const deltaX = touch.clientX - startX
    const deltaY = touch.clientY - startY

    if (deltaX > 80 && Math.abs(deltaY) < 50) {
      // 👇 非系统手势，用户真的滑动了
      console.log('🎯 右滑返回识别')
      router.back()
    } else {
      router.back()
    }
  }

  onMounted(() => {
    document.addEventListener('touchstart', handleTouchStart, { passive: true })
    document.addEventListener('touchend', handleTouchEnd, { passive: true })
  })

  onUnmounted(() => {
    document.removeEventListener('touchstart', handleTouchStart)
    document.removeEventListener('touchend', handleTouchEnd)
  })
}
