<template>
  <div class="flex flex-col gap-3">
    <n-alert type="warning">
      <div class="text-[12.5px] leading-6">{{ $t('shareGpu.deeplink_notice') }}</div>
    </n-alert>

    <n-form ref="formRef" :model="model" :rules="rules" label-placement="top">
      <n-grid :cols="24">
        <n-form-item-gi :span="24" :label="$t('shareGpu.category_label')" path="category">
          <n-select
            class="!min-h-[44px] rounded-lg text-[#737373]"
            v-model:value="model.category"
            :options="model.selectoptions"
            :placeholder="$t('shareGpu.select_category_placeholder_1')"
          />
        </n-form-item-gi>

        <n-form-item-gi :span="24" :label="$t('shareGpu.email_label')" path="email">
          <n-input
            class="min-h-[44px] rounded-lg text-[#737373]"
            v-model:value="model.email"
            :placeholder="$t('shareGpu.enter_email_placeholder_3')"
          >
            <template #suffix>
              <n-button type="primary" class="!py-[17px]" size="small" :disabled="countdown > 0" @click="handleSendCode">
                {{
                  countdown > 0
                    ? `${countdown}${$t('shareGpu.retry_after_seconds')}`
                    : `${$t('shareGpu.get_verification_code')}`
                }}
              </n-button>
            </template>
          </n-input>
        </n-form-item-gi>

        <n-form-item-gi :span="24" :label="$t('shareGpu.verification_code_label')" path="verifyCode">
          <n-input
            class="min-h-[44px] rounded-lg text-[#737373]"
            v-model:value="model.verifyCode"
            :placeholder="$t('shareGpu.enter_verification_code_placeholder_1')"
          />
        </n-form-item-gi>
      </n-grid>
    </n-form>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive } from 'vue'
import type { FormInst, FormRules } from 'naive-ui'
import { useI18n } from 'vue-i18n'
const { t } = useI18n()

// 表单引用
const formRef = ref<FormInst | null>(null)

// 倒计时逻辑
const countdown = ref(0)
let timer: NodeJS.Timeout | null = null

const startCountdown = () => {
  countdown.value = 60
  timer = setInterval(() => {
    if (countdown.value > 0) {
      countdown.value--
    } else {
      clearInterval(timer!)
      timer = null
    }
  }, 1000)
}

const handleSendCode = () => {
  if (!model.email) {
    window.$message?.warning(t('shareGpu.enter_email_placeholder_1'))
    return
  }

  // 模拟发送验证码请求
  window.$message?.success(t('shareGpu.verification_code_sent'))
  startCountdown()
}

// 表单数据模型
const model = reactive({
  category: null,
  email: '',
  verifyCode: '',
  selectoptions: [
    { label: t('shareGpu.personal_computer'), value: '个人电脑' },
    { label: t('shareGpu.internet_cafe_computer'), value: '网吧电脑' },
  ],
})

// 表单验证规则
const rules: FormRules = {
  category: [{ required: true, message: t('shareGpu.select_category_placeholder_2'), trigger: ['blur', 'input'] }],
  email: [
    { required: true, message: t('shareGpu.enter_email_placeholder_2'), trigger: ['blur', 'input'] },
    {
      validator: (_, value) => {
        const emailRegex = /^[\w.-]+@[\w.-]+\.\w+$/
        if (!emailRegex.test(value)) {
          return new Error(t('shareGpu.invalid_email_format'))
        }
        return true
      },
      trigger: 'blur',
    },
  ],
  verifyCode: [{ required: true, message: t('shareGpu.enter_verification_code_placeholder_2'), trigger: ['blur', 'input'] }],
}

defineExpose({
  formRef,
  model,
})
</script>

<style lang="scss" scoped>
:deep(.n-base-selection .n-base-selection-label) {
  height: 44px !important;
}
:deep(.n-base-selection__border) {
  border-radius: 8px !important;
}
:deep(.n-input .n-input__input-el) {
  height: 100% !important;
}
</style>
