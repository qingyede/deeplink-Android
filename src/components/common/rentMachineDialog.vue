<template>
  <n-divider />
  <n-form
    label-placement="left"
    label-width="auto"
    require-mark-placement="left"
    size="medium"
    :model="cloudComputersStore.rentMachineDialogBeforeForm"
    ref="formRef"
  >
    <n-form-item :label="$t('gpu.rentalDuration')" path="duration">
      <n-select
        v-model:value="cloudComputersStore.rentMachineDialogBeforeForm.duration"
        :options="durationOptions"
        :placeholder="$t('gpu.selectRentalDuration')"
        @update:value="cloudComputersStore.getRentPrice"
      />
    </n-form-item>

    <n-form-item :label="app.mode ? $t('gpu.dlcAmount2') : $t('gpu.dlcAmount')">
      <n-button type="primary" text>
        {{
          app.mode
            ? price.dlc2usd(cloudComputersStore.rentMachineDialogBeforeForm.dLCNumber).points
            : cloudComputersStore.rentMachineDialogBeforeForm.dLCNumber
        }}
        {{ price.currentUnit }}</n-button
      >
    </n-form-item>
    <n-form-item :label="$t('gpu.approxEquivalent')">
      <n-button type="primary" text>{{ cloudComputersStore.rentMachineDialogBeforeForm.price }}</n-button>
    </n-form-item>
  </n-form>
</template>

<script lang="ts" setup>
import { ref, reactive, computed } from 'vue'
import type { FormInst } from 'naive-ui'
import { useCloudComputersStore } from '@/store/Modules/gpu/cloud-computers'
import { priceStore } from '@/store/Modules/price/index'
import { appStore } from '@/store/Modules/app'

const app = appStore()
const price = priceStore()
const cloudComputersStore = useCloudComputersStore()
// 表单实例
const formRef = ref<FormInst | null>(null)
defineExpose({ formRef })

// 时长下拉项（秒为单位）
const durationOptions = [
  { label: '10 minutes', value: 600 },
  { label: '20 minutes', value: 1200 },
  { label: '30 minutes', value: 1800 },
  { label: '40 minutes', value: 2400 },
  { label: '50 minutes', value: 3000 },
  { label: '1 hour', value: 3600 },
  { label: '2 hours', value: 7200 },
]

// 初始化
onMounted(() => {
  cloudComputersStore.getRentPrice()
})
</script>

<style scoped></style>
