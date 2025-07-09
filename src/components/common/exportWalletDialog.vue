<template>
  <div class="flex flex-col gap-6">
    <!-- <n-alert :show-icon="false" type="warning">
      <div class="text-[12.5px] leading-6">即将导出您的钱包私钥，请务必妥善保管</div>
    </n-alert> -->

    <n-form ref="formRef" :model="model" :rules="rules" label-placement="top">
      <n-grid :cols="24">
        <n-form-item-gi :span="24" label="您的钱包密码" path="password">
          <n-input
            type="password"
            show-password-on="click"
            class="min-h-[44px] rounded-lg"
            v-model:value="model.password"
            placeholder="请输入您的钱包密码"
          />
        </n-form-item-gi>
      </n-grid>
    </n-form>
  </div>
</template>

<script lang="ts" setup>
import { ref, defineExpose } from 'vue'
const formRef = ref<FormInst | null>(null)
import type { FormInst, FormRules } from 'naive-ui'

const model = reactive({
  password: '',
})

// 校验规则
const rules: FormRules = {
  password: [
    {
      validator: (_, value) => {
        if (!value) return new Error('密码是必须的')
        // if (value.length < 8) return new Error('密码长度至少为8个字符')
        // if (!/[a-zA-Z]/.test(value) || !/[0-9]/.test(value)) {
        //   return new Error('密码必须包含字母和数字')
        // }
        return true
      },
      trigger: ['blur', 'input'],
    },
  ],
}

defineExpose({
  formRef,
  model,
})
</script>

<style lang="scss" scoped></style>
