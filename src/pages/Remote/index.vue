<template>
  <div class="px-[16px]">
    <!-- 导入钱包 -->
    <h1 class="text-black text-[24px] font-bold mb-2">Control Remote Device</h1>

    <div class="w-full">
      <n-form ref="formRef" :model="model" :rules="rules" label-placement="top">
        <n-grid :cols="24">
          <n-form-item-gi :span="24" label="Partner Device ID" path="id">
            <n-input
              type="password"
              show-password-on="click"
              class="min-h-[44px] rounded-lg bg-[#E1EBE7] text-[#737373]"
              v-model:value="model.id"
              placeholder="请输入您的设备ID"
            />
          </n-form-item-gi>
          <n-form-item-gi :span="24" label="Password" path="password">
            <n-input
              type="password"
              show-password-on="click"
              class="min-h-[44px] rounded-lg bg-[#E1EBE7] text-[#737373]"
              v-model:value="model.password"
              placeholder="请输入您的钱包密码"
              :status="passwordStatus"
            />
          </n-form-item-gi>

          <n-form-item-gi :span="24">
            <div class="flex flex-col gap-4">
              <n-button
                class="w-full rounded-lg min-h-[48px]"
                type="primary"
                round
                @click="handleValidateButtonClick"
                :disabled="!isFormValid"
                :loading="isSubmitting"
              >
                <span class="text-lg"> Connect </span>
              </n-button>
              <div>Connect Purchase and Activate NFT. activate game controllers and other functions</div>
            </div>
          </n-form-item-gi>
        </n-grid>
      </n-form>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive, computed } from 'vue'
import type { FormInst, FormRules } from 'naive-ui'
import { NButton } from 'naive-ui'
import { useRouter } from 'vue-router'
import { Icon } from '@iconify/vue'
import { appStore } from '@/store/Modules/app'

const app = appStore()
const router = useRouter()
const formRef = ref<FormInst | null>(null)
const isSubmitting = ref(false)

// 表单数据模型
const model = reactive({
  id: '', // 设备ID
  password: '', // 密码
})

// 密码输入状态（实时反馈）
const passwordStatus = computed(() => {
  if (!model.password) return undefined
  return model.password.length >= 8 && /[a-zA-Z]/.test(model.password) && /[0-9]/.test(model.password) ? 'success' : 'error'
})

// 表单是否有效
const isFormValid = computed(() => {
  return (
    model.id.length > 0 && // 设备ID必填
    passwordStatus.value === 'success'
  ) // 密码符合规则
})

// 校验规则（简化版）
// 校验规则（精简单行写法）
const rules: FormRules = {
  id: [{ required: true, message: '设备ID是必须的', trigger: ['blur', 'input'] }],
  password: [
    {
      validator: (_, value) => {
        if (!value) return new Error('密码是必须的')
        if (value.length < 8) return new Error('密码长度至少为8个字符')
        if (!/[a-zA-Z]/.test(value) || !/[0-9]/.test(value)) {
          return new Error('密码必须包含字母和数字')
        }
        return true
      },
      trigger: ['blur', 'input'],
    },
  ],
}

// 表单提交
const handleValidateButtonClick = async (e: MouseEvent) => {
  e.preventDefault()
  isSubmitting.value = true

  try {
    await formRef.value?.validate()
    window.$message?.success('连接成功')
  } catch (errors) {
    window.$message?.error('请检查表单内容')
  } finally {
    isSubmitting.value = false
  }
}
</script>

<style lang="scss" scoped>
:deep(.n-input__input-el) {
  height: 100% !important;
}
:deep(.n-input .n-input__suffix .n-base-icon, .n-input .n-input__prefix .n-base-icon) {
  font-size: 23px;
}
</style>
