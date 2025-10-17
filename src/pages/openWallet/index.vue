<template>
  <div class="px-[16px]">
    <!-- 导入钱包 -->
    <h1 class="text-[24px] font-bold mb-2">{{ $t('openWallet.importWallet') }}</h1>
    <div class="flex flex-col flex-wrap gap-3">
      <span class="text-[14px] leading-[22px]">
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
              class="min-h-[44px] rounded-lg"
              v-model:value="model.privateKey"
              :placeholder="$t('openWallet.enterPrivateKey')"
            />
          </n-form-item-gi>
          <n-form-item-gi :span="24" :label="$t('openWallet.password')" path="password">
            <n-input
              type="password"
              show-password-on="click"
              class="min-h-[44px] rounded-lg"
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
import { getNonce, getToken } from '@/api/token/index'
import { useDeviceId } from '@/hooks/devices/useDeviceId'
const { registerDevice } = useDeviceId()
import { CreateSignature } from '@/utils/walletInfo'

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

// 表单是否有效（用于禁用按钮）
const isFormValid = computed(() => {
  return model.privateKey.length > 0 && model.password.length > 0
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

        return Promise.resolve()
      },
      trigger: ['blur', 'input'],
    },
  ],
}

const importWallet = async () => {
  const result = await importFromPrivateKey(model.privateKey, model.password)
  if (!result) {
    window.$message?.error(t('app.importFailed'))
    isSubmitting.value = false

    return
  }

  // console.log('地址:', result.address)
  // console.log('私钥:', result.privateKey)
  // console.log('keystore:', result.keystore)

  app.isWalletRegistered = true
  app.address = result.address.toLowerCase()
  app.keystore = result.keystore

  try {
    // 获取 nonce
    const { data: res } = await getNonce(app.address)
    const nonce = res.result ? res.result.nonce + 1 : 0
    console.log(nonce, 'noncenoncenonce')

    // 开始签名
    const { nonce: nonce1, signature } = await CreateSignature(
      nonce,
      app.keystore, // 传递 keystore JSON 字符串
      model.password,
      'json',
      'EVM'
    )
    console.log('签名结果:', nonce1, signature)

    // 注册设备
    const device_id = await registerDevice()
    console.log(device_id, 'device_iddevice_id')

    if (device_id) {
      const { data: tokenRes } = await getToken({
        device_id: device_id,
        user_id: app.address,
        nonce,
        signature,
      })

      if (tokenRes.result) {
        app.token = tokenRes.result.token
        const tokenPayload = JSON.parse(atob(tokenRes.result.token.split('.')[1]))
        console.log(tokenPayload, '解密')
        console.log(tokenRes, 'tokentokenRestokenRestokenResRes')

        // ✅ 所有流程成功后才显示提示并跳转
        window.$message?.success(t('openWallet.walletImportSuccess'))
        router.push({ name: 'home' })
      } else {
        window.$message?.error(t('app.importFailed'))
      }
    } else {
      window.$message?.error(t('app.importFailed'))
    }
    isSubmitting.value = false
  } catch (err) {
    console.error('导入流程失败:', err)
    window.$message?.error(t('app.importFailed'))
    app.$reset()
  } finally {
    isSubmitting.value = false
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
  }
}
</script>

<style lang="scss" scoped>
:deep(.n-input__input-el) {
  height: 100% !important;
}
</style>
