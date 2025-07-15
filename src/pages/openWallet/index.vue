<template>
  <div class="px-[16px]">
    <!-- 导入钱包 -->
    <h1 class="text-black text-[24px] font-bold mb-2">{{ $t('openWallet.importWallet') }}</h1>
    <div class="flex flex-col flex-wrap gap-3">
      <span class="text-[14px] text-[#000]/60 leading-[22px]">
        {{ $t('openWallet.walletPasswordReminder') }}
      </span>
    </div>

    <div class="mt-[36px] w-full">
      <n-form ref="formRef" :model="model" :rules="rules" label-placement="top">
        <n-grid :cols="24">
          <n-form-item-gi :span="24" :label="$t('openWallet.privateKey')" path="privateKey">
            <n-input
              type="password"
              show-password-on="click"
              class="min-h-[44px] rounded-lg bg-[#E1EBE7] text-[#737373]"
              v-model:value="model.privateKey"
              :placeholder="$t('openWallet.enterPrivateKey')"
            />
          </n-form-item-gi>
          <n-form-item-gi :span="24" :label="$t('openWallet.password')" path="password">
            <n-input
              type="password"
              show-password-on="click"
              class="min-h-[44px] rounded-lg bg-[#E1EBE7] text-[#737373]"
              v-model:value="model.password"
              :placeholder="$t('openWallet.enterWalletPassword')"
            />
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
              <span class="text-lg"> {{ $t('openWallet.complete') }} </span>
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
import { useI18n } from 'vue-i18n'
import { useWallet } from '@/hooks/wallet/useWallet'
const { importFromPrivateKey } = useWallet()

const app = appStore()
const router = useRouter()
const formRef = ref<FormInst | null>(null)
const isSubmitting = ref(false)
const { t } = useI18n()
// 表单数据模型
const model = reactive({
  privateKey: '',
  password: '',
})

// 输入框状态（用于实时验证反馈）
const privateKeyStatus = computed(() => {
  if (!model.privateKey) return undefined
  return /^0x[0-9a-fA-F]{64}$/.test(model.privateKey) ? 'success' : 'error'
})

const passwordStatus = computed(() => {
  if (!model.password) return 'error'
  return 'success'
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
      async validator(_, value: string) {
        const normalized = value?.trim()

        if (!normalized) {
          return Promise.reject(new Error(t('openWallet.privateKeyRequired')))
        }

        const isValid = /^0x[0-9a-fA-F]{64}$/.test(normalized)

        if (!isValid) {
          return Promise.reject(new Error(t('openWallet.invalidPrivateKey')))
        }

        return Promise.resolve()
      },
      trigger: ['blur', 'input'],
    },
  ],
  password: [
    {
      async validator(_, value: string) {
        if (!value) {
          return Promise.reject(new Error(t('openWallet.passwordRequired')))
        }
        // if (value.length < 8) {
        //   return Promise.reject(new Error(t('openWallet.passwordMinLength')))
        // }
        // if (!/[a-zA-Z]/.test(value) || !/[0-9]/.test(value)) {
        //   return Promise.reject(new Error(t('openWallet.passwordAlphaNumeric')))
        // }
        return Promise.resolve()
      },
      trigger: ['blur', 'input'],
    },
  ],
}

// E9873D79C6D87DC0FB6A5778633389F4453213303DA61F20BD67FC233AA33262
// 用户输入的

const importWallet = async () => {
  const result = await importFromPrivateKey(model.privateKey, model.password)
  if (result) {
    console.log('地址:', result.address)
    console.log('私钥:', result.privateKey)

    console.log('keystore:', result.keystore)
    window.$message?.success(t('openWallet.walletImportSuccess'))
    app.isWalletRegistered = true
    router.push({ name: 'home' })
    app.address = result.address.toLowerCase()
    app.keystore = result.keystore
  } else {
    window.$message?.error('导入失败，私钥格式或密码错误')
  }
}
// 表单提交
const handleValidateButtonClick = async (e: MouseEvent) => {
  e.preventDefault()
  isSubmitting.value = true

  try {
    await formRef.value?.validate()
    importWallet()
  } catch (errors) {
    window.$message?.error(t('openWallet.formInvalid'))
  } finally {
    isSubmitting.value = false
  }
}
</script>

<style lang="scss" scoped>
:deep(.n-input__input-el) {
  height: 100% !important;
}

// :deep(.n-form-item .n-form-item-label) {
//   font-size: 16px;
//   color: #615f63;
// }
</style>
