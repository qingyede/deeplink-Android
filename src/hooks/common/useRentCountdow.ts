// src/hooks/useRentCountdown.ts
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useIntervalFn } from '@vueuse/core'

export function useRentCountdown(startTimeMs: number, durationSeconds: number) {
  const remainingSeconds = ref(0)

  const updateCountdown = () => {
    const now = Date.now()
    const endTime = startTimeMs + durationSeconds * 1000
    const diffMs = endTime - now
    remainingSeconds.value = Math.max(0, Math.floor(diffMs / 1000))
  }

  const minutes = computed(() => Math.floor(remainingSeconds.value / 60))
  const seconds = computed(() => remainingSeconds.value % 60)

  const { pause, resume } = useIntervalFn(updateCountdown, 1000, { immediate: true })

  onMounted(() => {
    resume()
  })

  onUnmounted(() => {
    pause()
  })

  return {
    minutes,
    seconds,
    remainingSeconds,
    pause,
    resume,
  }
}
