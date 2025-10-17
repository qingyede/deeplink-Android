<template>
  <div class="flex flex-col gap-6">
    <n-alert :show-icon="false" type="warning">
      <div class="text-[12.5px] leading-6 dark:text-[#92400E]">{{ $t('home.exportWarning') }}</div>
    </n-alert>

    <n-form ref="formRef" :model="model" :rules="rules" label-placement="top">
      <n-grid :cols="24">
        <n-form-item-gi :span="24" :label="$t('home.walletPassword')" path="password">
          <n-input
            type="password"
            show-password-on="click"
            class="min-h-[44px] rounded-lg"
            v-model:value="model.password"
            :placeholder="$t('home.enterWalletPassword')"
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
import { useI18n } from 'vue-i18n'
const { t } = useI18n()
const model = reactive({
  password: '',
})

// 校验规则
const rules: FormRules = {
  password: [
    {
      validator: (_, value) => {
        if (!value) return new Error(t('home.passwordRequired'))

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
