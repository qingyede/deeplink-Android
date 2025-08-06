<template>
  <div class="flex flex-col gap-5">
    <n-descriptions
      bordered
      size="medium"
      :column="1"
      label-placement="left"
      class="text-sm"
      label-class="text-xs md:text-sm dark:!bg-[#1a1a1a] dark:!text-white"
      content-class="dark:bg-[#1a1a1a] text-gray-500 dark:!text-white"
    >
      <n-descriptions-item :label="$t('devices.deviceId')" :span="2">
        {{ props.info?.device_id }}
      </n-descriptions-item>

      <n-descriptions-item :label="$t('devices.gpuType')">
        <n-tag type="success" size="small" round>
          {{ props.info?.machine_info.gpuType || props.info?.machine_info.gpu_type }}
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

      <n-descriptions-item :label="$t('devices.rent_end')">
        <n-button @click="endRentFlowH(props.info)" class="w-full rounded-lg" secondary type="primary">
          {{ $t('devices.rent_end') }}
        </n-button>
      </n-descriptions-item>

      <n-descriptions-item :label="$t('devices.rent_renew')">
        <n-button
          :loading="cloudComputersStore.renewRentLoading"
          class="w-full rounded-lg"
          secondary
          type="primary"
          @click="reRent(props.info)"
        >
          {{ $t('devices.rent_renew') }}
        </n-button>
      </n-descriptions-item>
    </n-descriptions>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { useNow } from '@vueuse/core'
import { useI18n } from 'vue-i18n'
import { useCloudComputersStore } from '@/store/Modules/gpu/cloud-computers'
const cloudComputersStore = useCloudComputersStore()
const { t } = useI18n()
const props = defineProps(['info', 'd'])

function formatSeconds(seconds) {
  console.log(seconds, 'secondssecondssecondssecondssecondsseconds')
  const hours = Math.floor(seconds / 3600)
  const minutes = Math.floor((seconds % 3600) / 60)
  const remainingSeconds = seconds % 60

  let result: any = []
  if (hours > 0) result.push(`${hours}${t('devices.hour')}`)
  if (minutes > 0) result.push(`${minutes}${t('devices.minute')}`)
  if (remainingSeconds > 0 || seconds === 0) result.push(`${remainingSeconds}${t('devices.second')}`)

  return result.join('') || '0秒'
}
onMounted(() => {
  console.log(props, 'propspropsprops')
})
// 开始续租
const reRent = async (info) => {
  console.log(info, '>>>>>>>>>>>>', props.d)
  // if(info.rent_time)
  cloudComputersStore.rentMachineDialogBeforeForm.rentinfo = info
  await cloudComputersStore.renewRentFlow(info)
  props.d?.destroy?.()
}

// 退租
const endRentFlowH = async (info) => {
  console.log(info)
  cloudComputersStore.rentMachineDialogBeforeForm.rentinfo = info
  await cloudComputersStore.endRentFlow(info?.machine_id)
  props.d?.destroy?.()
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
