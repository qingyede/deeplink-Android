<template>
  <span>{{ minutes }} 分 {{ seconds }} 秒</span>
</template>

<script setup lang="ts">
import { useRentCountdown } from '@/hooks/common/useRentCountdow'

const props = defineProps<{
  startTime: number
  rentSeconds: number
}>()

const { minutes, seconds } = useRentCountdown(props.startTime, props.rentSeconds)
</script>
