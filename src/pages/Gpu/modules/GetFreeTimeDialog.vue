<template>
  <n-form ref="formRef" :model="model" :rules="rules" label-placement="top">
    <n-grid :cols="24">
      <n-form-item-gi :span="24" :label="$t('gpu.titlecode')" path="password">
        <n-input
          class="min-h-[44px] rounded-lg bg-[#E1EBE7] text-[#737373]"
          v-model:value="model.password"
          :placeholder="$t('gpu.placeholder')"
        />
      </n-form-item-gi>
    </n-grid>
  </n-form>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import type { FormInst, FormRules } from 'naive-ui'
import { useI18n } from 'vue-i18n'
const { t } = useI18n()

const formRef = ref<FormInst | null>(null)
const model = reactive({
  password: '',
})

// 校验规则
const rules: FormRules = {
  password: [
    {
      validator: (_, value) => {
        if (!value) return new Error(t('gpu.required'))

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
