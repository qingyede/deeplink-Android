<template>
  <div class="flex flex-col gap-5">
    <n-descriptions
      bordered
      size="medium"
      :column="1"
      label-placement="left"
      class="text-sm"
      label-class="text-xs md:text-sm"
    >
      <n-descriptions-item label="设备编号">
        {{ props.info?.device_id }}
      </n-descriptions-item>

      <n-descriptions-item label="GPU 类型">
        <n-tag type="success" size="small" round>
          {{ props.info?.machine_info.gpu_type }}
        </n-tag>
      </n-descriptions-item>

      <n-descriptions-item label="系统类型">
        <n-tag type="info" size="small" round>
          {{ props.info?.os_release }}
        </n-tag>
      </n-descriptions-item>

      <n-descriptions-item label="识别码">
        <span class="font-mono break-all text-xs text-gray-500 dark:text-gray-300">
          {{ props.info?.device_id }}
        </span>
      </n-descriptions-item>

      <n-descriptions-item label="剩余倒计时">
        <CountdownTimer :start-time="props.info.rent_satrtime" :rent-seconds="props.info.rent_time" />
      </n-descriptions-item>

      <n-descriptions-item label="租用总时长">
        <span>{{ formatSeconds(props.info.rent_time) }}</span>
      </n-descriptions-item>
    </n-descriptions>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { useNow } from '@vueuse/core'
const props = defineProps(['info'])
function formatSeconds(seconds) {
  const hours = Math.floor(seconds / 3600)
  const minutes = Math.floor((seconds % 3600) / 60)
  const remainingSeconds = seconds % 60

  let result: any = []
  if (hours > 0) result.push(`${hours}小时`)
  if (minutes > 0) result.push(`${minutes}分钟`)
  if (remainingSeconds > 0 || seconds === 0) result.push(`${remainingSeconds}秒`)

  return result.join('') || '0秒'
}
</script>

<style scoped>
.n-descriptions {
  background-color: #f8f9fa;
  border-radius: 8px;
}
</style>
