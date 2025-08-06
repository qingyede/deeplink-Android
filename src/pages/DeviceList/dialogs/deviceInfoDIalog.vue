<template>
  <n-card :title="title" class="w-full dark:bg-[#1a1a1a]" segmented>
    <div class="flex flex-col gap-3">
      <n-text class="dark:!text-white">
        <span class="">{{ $t('devices.code') }}：</span>
        <span class="text-blue-600 font-mono">{{ props.item?.deviceCode }}</span>
      </n-text>

      <n-text class="dark:!text-white">
        <span class="">{{ $t('devices.os') }}：</span>
        <span>{{ props.item?.os }}</span>
      </n-text>

      <!-- 备注区域 -->
      <div class="flex items-center space-x-2 dark:!text-white">
        <span class="">{{ $t('devices.remark') }}：</span>

        <template v-if="!isEditing && remark">
          <span class="text-gray-800 break-all flex-1">{{ remark }}</span>
          <n-button size="tiny" @click="startEditing">{{ $t('devices.edit') }}</n-button>
        </template>

        <template v-else-if="!isEditing && !remark">
          <n-button size="tiny" type="primary" @click="startEditing"> {{ $t('devices.addRemark') }} </n-button>
        </template>

        <template v-else>
          <n-input
            v-model:value="tempRemark"
            :placeholder="$t('devices.inputRemark')"
            size="small"
            class="flex-1"
            clearable
          />
          <n-button size="tiny" type="primary" @click="saveRemark"> {{ $t('devices.save') }} </n-button>
          <n-button size="tiny" @click="cancelEditing"> {{ $t('devices.cancel') }} </n-button>
        </template>
      </div>
    </div>
  </n-card>
</template>

<script lang="ts" setup>
import { ref, defineProps, h } from 'vue'
import { useI18n } from 'vue-i18n'
const { t } = useI18n()

const props = defineProps(['item'])
let remark = ref('')
const isEditing = ref(false)
const tempRemark = ref('')

const title = () => h('div', { class: 'dark:text-white font-bold' }, `${t('devices.name')}：${props.item?.name}`)

function startEditing() {
  tempRemark.value = remark.value
  isEditing.value = true
}

function saveRemark() {
  remark.value = tempRemark.value
  isEditing.value = false
}

function cancelEditing() {
  isEditing.value = false
  tempRemark.value = ''
}
</script>

<style scoped></style>
