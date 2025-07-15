<template>
  <n-form ref="formRef" :model="model" :rules="rules" label-placement="top">
    <n-grid :cols="24">
      <!-- 目标地址 -->
      <n-form-item-gi :span="24" :label="$t('home.targetAddress')" path="address">
        <n-input
          class="min-h-[44px] rounded-lg"
          v-model:value="model.address"
          :placeholder="$t('home.enterTargetAddress')"
        />
      </n-form-item-gi>
    </n-grid>
  </n-form>
</template>

<script lang="ts" setup>
import { ref, reactive } from 'vue'
import type { FormInst, FormRules } from 'naive-ui'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const props = defineProps({
  nft: {
    type: Object,
    default: null,
  },
})

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
      message: t('home.targetAddressRequired'),
      trigger: ['blur', 'input'],
    },
  ],
  password: [
    {
      required: true,
      message: t('home.passwordRequired'),
      trigger: ['blur', 'input'],
    },
  ],
}
defineExpose({
  model,
  formRef,
  nft: props.nft,
})
</script>

<style lang="scss" scoped></style>
