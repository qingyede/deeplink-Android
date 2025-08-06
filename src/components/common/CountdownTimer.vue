<template>
  <span>{{ minutes }} {{ $t('devices.minute') }} {{ seconds }} {{ $t('devices.second') }}</span>
</template>

<script setup lang="ts">
import { useRentCountdown } from '@/hooks/common/useRentCountdow'

const props = defineProps<{
  startTime: number
  rentSeconds: number
}>()

const { minutes, seconds } = useRentCountdown(props.startTime, props.rentSeconds)
</script>
