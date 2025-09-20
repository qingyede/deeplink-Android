<template>
  <span class="text-primary-light dark:text-primary-dark">
    {{ $t('common.time.mmss', { m: minutes, s: seconds }) }}
  </span>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted, onBeforeUnmount } from 'vue'

const props = defineProps<{
  startTime: number | string
  rentSeconds: number
}>()

// ✅ 新增：定义自定义事件
const emit = defineEmits<{
  (e: 'finished'): void
}>()

let timer: number | null = null
const remain = ref(0)

// 计算剩余秒数
function calcRemain() {
  const start = typeof props?.startTime === 'string' ? Date.parse(props?.startTime) : props?.startTime
  const end = start + props.rentSeconds * 1000
  const now = Date.now()
  return Math.max(0, Math.floor((end - now) / 1000))
}

// 每秒刷新
function tick() {
  remain.value = calcRemain()
  // ✅ 倒计时结束时触发一次
  if (remain.value === 0) {
    emit('finished')
    stop()
  }
}

function start() {
  stop()
  tick()
  timer = window.setInterval(tick, 1000)
}

function stop() {
  if (timer) {
    clearInterval(timer)
    timer = null
  }
}

// props 变化时重启
watch(() => [props?.startTime, props.rentSeconds], start, { immediate: true })

onMounted(start)
onBeforeUnmount(stop)

// 格式化
const minutes = computed(() => Math.floor(remain.value / 60))
const seconds = computed(() => String(remain.value % 60).padStart(2, '0'))
</script>
