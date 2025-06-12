<template>
  <div class="px-[16px]">
    <!-- 导入钱包 -->
    <h1 class="text-black text-[24px] font-bold mb-2">Import wallet</h1>
    <div class="flex flex-col flex-wrap gap-3">
      <span class="text-[14px] text-[#000]/60 leading-[22px]">
        You must remember your password! You must not lose it, you need your password and your private key to open your
        wallet
      </span>
    </div>

    <div class="mt-[50px] w-full">
      <n-form ref="formRef" :model="model" :rules="rules" label-placement="top">
        <n-grid :cols="24">
          <n-form-item-gi :span="24" path="privateKey">
            <n-card :title="titleH" class="rounded-lg">
              <n-form-item-gi :span="24" label="Private key" path="privateKey">
                <n-input
                  type="password"
                  show-password-on="click"
                  class="min-h-[44px] rounded-lg bg-[#E1EBE7] text-[#737373]"
                  v-model:value="model.privateKey"
                  placeholder="请输入您的钱包私钥"
                  :status="privateKeyStatus"
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
            </n-card>
          </n-form-item-gi>

          <n-form-item-gi :span="24">
            <n-button
              class="w-full rounded-lg min-h-[48px]"
              type="primary"
              round
              @click="handleValidateButtonClick"
              :disabled="!isFormValid"
              :loading="isSubmitting"
            >
              <span class="text-lg"> Complete </span>
            </n-button>
          </n-form-item-gi>
        </n-grid>
      </n-form>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive, computed } from 'vue'
import type { FormInst, FormRules, FormItemRule } from 'naive-ui'
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
  privateKey: '',
  password: '',
})

// 输入框状态（用于实时验证反馈）
const privateKeyStatus = computed(() => {
  if (!model.privateKey) return undefined
  return /^[0-9a-fA-F]{64}$/.test(model.privateKey) ? 'success' : 'error'
})

const passwordStatus = computed(() => {
  if (!model.password) return undefined
  return model.password.length >= 8 && /[a-zA-Z]/.test(model.password) && /[0-9]/.test(model.password) ? 'success' : 'error'
})

// 表单是否有效（用于禁用按钮）
const isFormValid = computed(() => {
  return (
    model.privateKey.length > 0 &&
    model.password.length >= 8 &&
    privateKeyStatus.value === 'success' &&
    passwordStatus.value === 'success'
  )
})

// 校验规则
const rules: FormRules = {
  privateKey: [
    {
      required: true,
      message: '私钥是必须的',
      trigger: ['blur', 'input'],
    },
    {
      validator: (_, value: string) => {
        // 基本私钥格式校验（64位十六进制）
        return /^[0-9a-fA-F]{64}$/.test(value)
      },
      message: '请输入有效的64位十六进制私钥',
      trigger: ['blur', 'input'],
    },
  ],
  password: [
    {
      required: true,
      message: '密码是必须的',
      trigger: ['blur', 'input'],
    },
    {
      min: 8,
      message: '密码长度至少为8个字符',
      trigger: ['blur', 'input'],
    },
    {
      validator: (_, value: string) => {
        return /[a-zA-Z]/.test(value) && /[0-9]/.test(value)
      },
      message: '密码必须包含字母和数字',
      trigger: ['blur', 'input'],
    },
  ],
}

// 卡片标题组件
const titleH = () => {
  return h('div', { class: 'flex items-center gap-4' }, [
    h(
      NButton,
      {
        color: '#DBEFE7',
        class: 'rounded-lg min-w-[32px] min-h-[45px]',
      },
      () => {
        return h(Icon, {
          icon: 'mdi:lock',
          class: 'text-primary-500 text-[24px]',
        })
      }
    ),
    h('div', { class: 'flex flex-col' }, [
      h('div', { class: 'text-[#000] text-[18px] font-bold' }, 'Private key'),
      h('div', { class: 'text-[#737373] text-[16px]' }, 'Enter your private key details'),
    ]),
  ])
}
// E9873D79C6D87DC0FB6A5778633389F4453213303DA61F20BD67FC233AA33262
// 表单提交
const handleValidateButtonClick = async (e: MouseEvent) => {
  e.preventDefault()
  isSubmitting.value = true

  try {
    await formRef.value?.validate()
    window.$message?.success('钱包导入成功')
    app.isWalletRegistered = true
    router.push({ name: 'home' })
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
// :deep(.n-form-item .n-form-item-label) {
//   font-size: 16px;
//   color: #615f63;
// }
</style>
