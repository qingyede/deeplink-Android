<template>
  <n-form ref="formRef" :model="model" :rules="rules" label-placement="top">
    <n-grid :cols="24">
      <!-- 目标地址 -->
      <n-form-item-gi :span="24" label="目标地址" path="address">
        <n-input class="min-h-[44px] rounded-lg" v-model:value="model.address" placeholder="请输入目标地址" />
      </n-form-item-gi>

      <!-- 密码 -->
      <n-form-item-gi :span="24" label="密码" path="password">
        <n-input
          type="password"
          show-password-on="click"
          class="min-h-[44px] rounded-lg"
          v-model:value="model.password"
          placeholder="请输入密码"
        />
      </n-form-item-gi>
    </n-grid>
  </n-form>
</template>

<script lang="ts" setup>
import { ref, reactive } from 'vue'
import type { FormInst, FormRules } from 'naive-ui'

const formRef = ref<FormInst | null>(null)

const model = reactive({
  address: '',
  password: '',
})

// 校验规则
const rules: FormRules = {
  address: [
    {
      required: true,
      message: '目标地址是必填项',
      trigger: ['blur', 'input'],
    },
  ],
  password: [
    {
      required: true,
      message: '密码是必填项',
      trigger: ['blur', 'input'],
    },
  ],
}
defineExpose({
  model,
  formRef,
})
</script>

<style lang="scss" scoped></style>
