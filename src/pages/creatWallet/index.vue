<template>
  <div class="px-[16px]">
    <!-- 创建钱包 -->
    <h1 class="text-black text-[24px] font-bold mb-2">New wallet</h1>
    <div class="flex flex-col flex-wrap gap-3">
      <span class="text-[14px] text-[#000]/60 leading-[22px]">
        You must remember your password! You must not lose it, you need your password and your private key to open your
        wallet
      </span>
    </div>

    <div class="mt-[50px] w-full">
      <n-form ref="formRef" :model="model" :rules="rules" label-placement="top">
        <n-grid :cols="24">
          <n-form-item-gi :span="24" label="Your wallet password" path="password">
            <n-input
              type="password"
              show-password-on="click"
              class="min-h-[44px] rounded-lg bg-[#E1EBE7] text-[#737373]"
              v-model:value="model.password"
              placeholder="At least 8 characters with letters and numbers"
            />
          </n-form-item-gi>
          <n-form-item-gi :span="24">
            <n-button
              class="w-full rounded-lg min-h-[48px]"
              color="#D7EDEB"
              round
              @click="handleValidateButtonClick"
              :disabled="!model.password"
            >
              <span class="text-black text-lg"> Create </span>
            </n-button>
          </n-form-item-gi>
        </n-grid>
      </n-form>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive } from 'vue'
import type { FormInst, FormRules } from 'naive-ui'
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()
const formRef = ref<FormInst | null>(null)

const model = reactive({
  password: '',
})

// 校验规则
const rules: FormRules = {
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

const handleValidateButtonClick = (e: MouseEvent) => {
  e.preventDefault()
  formRef.value?.validate((errors) => {
    if (!errors) {
      window.$message?.success('钱包创建成功')
      // 这里可以添加创建钱包的实际逻辑
      router.push({ name: 'walletSuccess' })
    } else {
      window.$message?.error('请检查您的密码')
    }
  })
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
