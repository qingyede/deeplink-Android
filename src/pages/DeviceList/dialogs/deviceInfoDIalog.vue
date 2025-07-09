<template>
  <n-card title="当前设备：dao" class="w-full" segmented>
    <div class="flex flex-col gap-3">
      <n-text>
        <span class="">识别码：</span>
        <span class="text-blue-600 font-mono">{{ props.item?.deviceCode }}</span>
      </n-text>

      <n-text>
        <span class="">机器系统：</span>
        <span>{{ props.item?.name }}</span>
      </n-text>

      <!-- 备注区域 -->
      <div class="flex items-center space-x-2">
        <span class="">备注：</span>

        <template v-if="!isEditing && remark">
          <span class="text-gray-800 break-all flex-1">{{ remark }}</span>
          <n-button size="tiny" @click="startEditing">编辑</n-button>
        </template>

        <template v-else-if="!isEditing && !remark">
          <n-button size="tiny" type="primary" @click="startEditing"> 添加备注 </n-button>
        </template>

        <template v-else>
          <n-input v-model:value="tempRemark" placeholder="请输入备注" size="small" class="flex-1" clearable />
          <n-button size="tiny" type="primary" @click="saveRemark"> 保存 </n-button>
          <n-button size="tiny" @click="cancelEditing"> 取消 </n-button>
        </template>
      </div>
    </div>
  </n-card>
</template>

<script lang="ts" setup>
import { ref, defineProps } from 'vue'

const props = defineProps(['item'])
let remark = ref('')
const isEditing = ref(false)
const tempRemark = ref('')

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
