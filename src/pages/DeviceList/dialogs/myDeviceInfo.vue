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
      <n-descriptions-item :label="$t('devices.deviceId')" :span="2">
        {{ props.info?.device_id }}
      </n-descriptions-item>

      <n-descriptions-item :label="$t('devices.gpuType')">
        <n-tag type="success" size="small" round>
          {{ props.info?.machine_info.gpu_type }}
        </n-tag>
      </n-descriptions-item>

      <n-descriptions-item :label="$t('devices.systemType')">
        <n-tag type="info" size="small" round>
          {{ props.info?.os_release }}
        </n-tag>
      </n-descriptions-item>

      <n-descriptions-item :label="$t('devices.identityCode')">
        <span class="font-mono break-all text-xs text-gray-500 dark:text-gray-300">
          {{ props.info?.device_id }}
        </span>
      </n-descriptions-item>

      <n-descriptions-item :label="$t('devices.remainingTime')">
        <CountdownTimer :start-time="props.info.rent_satrtime" :rent-seconds="props.info.rent_time" />
      </n-descriptions-item>

      <n-descriptions-item :label="$t('devices.totalDuration')">
        <span>{{ formatSeconds(props.info.rent_time) }}</span>
      </n-descriptions-item>
    </n-descriptions>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { useNow } from '@vueuse/core'
import { useI18n } from 'vue-i18n'
const { t } = useI18n()
const props = defineProps(['info'])
function formatSeconds(seconds) {
  const hours = Math.floor(seconds / 3600)
  const minutes = Math.floor((seconds % 3600) / 60)
  const remainingSeconds = seconds % 60

  let result: any = []
  if (hours > 0) result.push(`${hours}${t('devices.hour')}`)
  if (minutes > 0) result.push(`${minutes}${t('devices.minute')}`)
  if (remainingSeconds > 0 || seconds === 0) result.push(`${remainingSeconds}${t('devices.second')}`)

  return result.join('') || '0秒'
}
</script>

<style scoped>
.n-descriptions {
  background-color: #f8f9fa;
  border-radius: 8px;
}
:deep(.n-descriptions-table-content) {
  max-width: 200px !important;
}
:deep(.n-tag__content) {
  max-width: 200px !important;
  word-break: break-all;
  white-space: normal;
}
:deep(.n-tag) {
  height: 100% !important;
  padding-top: 3px !important;
  padding-bottom: 3px !important;
  line-height: 15px;
}
</style>
