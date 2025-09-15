<template>
  <div class="dark:text-white text-[17px] font-bold my-4">{{ `${t('devices.name')}：${props.item?.name}` }}</div>
  <div class="flex flex-col gap-2">
    <n-text class="dark:!text-white">
      <span class="">{{ $t('devices.code') }}：</span>
      <span class="text-blue-600 font-mono">{{ props.item?.deviceCode }}</span>
    </n-text>

    <n-text class="dark:!text-white">
      <span class="">{{ $t('devices.os') }}：</span>
      <span>{{ props.item?.os }}</span>
    </n-text>

    <!-- 备注区域 -->
    <div class="flex items-center space-x-3">
      <span class="">{{ $t('devices.remark') }}：</span>

      <template v-if="!isEditing && remark">
        <span class="break-all flex-1">{{ remark }}</span>
        <n-button size="tiny" @click="startEditing">{{ $t('devices.edit') }}</n-button>
      </template>

      <template v-else-if="!isEditing && !remark">
        <n-button size="tiny" type="primary" @click="startEditing"> {{ $t('devices.addRemark') }} </n-button>
      </template>

      <template v-else>
        <n-input v-model:value="tempRemark" :placeholder="$t('devices.inputRemark')" class="flex-1" />
        <n-button size="tiny" type="primary" @click="saveRemark"> {{ $t('devices.save') }} </n-button>
        <n-button size="tiny" @click="cancelEditing"> {{ $t('devices.cancel') }} </n-button>
      </template>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, defineProps, h } from 'vue'
import { useI18n } from 'vue-i18n'
import { addDeviceRemark } from '@/api/deviceList/index'
import { appStore } from '@/store/Modules/app/index'
import { parseNotes, parseName } from '@/utils/common/parseNotes'

const app = appStore()
const { t } = useI18n()

const props = defineProps(['item', 'd', 'fetchDeviceList'])
let remark = ref('')
const isEditing = ref(false)
const tempRemark = ref('')

function startEditing() {
  tempRemark.value = remark.value
  isEditing.value = true
}

onMounted(() => {
  remark.value = parseNotes(props.item.device_name)
})

async function saveRemark() {
  console.log(props, 'item', parseNotes(props.item.device_name))
  const { data: res } = await addDeviceRemark({
    wallet: app.address,
    device_id: props.item.device_id,
    name: parseName(props.item.device_name),
    notes: tempRemark.value,
  })
  if (res.success) {
    remark.value = tempRemark.value
    isEditing.value = false
    window.$message?.success('添加成功')
    // 刷新页面
    props.d.destroy?.()
    props.fetchDeviceList()
  }
}

function cancelEditing() {
  isEditing.value = false
  tempRemark.value = ''
}
</script>

<style scoped></style>
