<template>
  <div class="px-[16px]">
    <!-- 创建钱包 -->
    <h1 class="text-black text-[24px] font-bold mb-2">{{ $t('createWallet.newWallet') }}</h1>
    <div class="flex flex-col flex-wrap gap-3">
      <span class="text-[14px] text-[#000]/60 leading-[22px]">
        {{ $t('createWallet.walletPasswordReminder') }}
      </span>
    </div>

    <div class="mt-[50px] w-full">
      <n-form ref="formRef" :model="model" :rules="rules" label-placement="top">
        <n-grid :cols="24">
          <n-form-item-gi :span="24" :label="$t('createWallet.walletPasswordLabel')" path="password">
            <n-input
              type="password"
              show-password-on="click"
              class="min-h-[44px] rounded-lg bg-[#E1EBE7] text-[#737373]"
              v-model:value="model.password"
              :placeholder="$t('createWallet.walletPasswordRule')"
            />
          </n-form-item-gi>
          <n-form-item-gi :span="24">
            <n-button
              class="w-full rounded-lg min-h-[48px]"
              color="#D7EDEB"
              round
              :loading="loading"
              @click="handleValidateButtonClick"
              :disabled="!model.password"
            >
              <span class="text-black text-lg"> {{ $t('createWallet.Create') }} </span>
            </n-button>
          </n-form-item-gi>
        </n-grid>
      </n-form>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive, onMounted } from 'vue'
import type { FormInst, FormRules } from 'naive-ui'
import { useRouter, useRoute } from 'vue-router'
import { useWallet } from '@/hooks/wallet/useWallet'
import { getNonce, getToken } from '@/api/token/index'
import { CreateSignature } from '@/utils/walletInfo'
const { createAndEncryptWallet } = useWallet()
import { ethers } from 'ethers'
import { useDeviceId } from '@/hooks/devices/useDeviceId'
import { useWalletTransfer } from '@/hooks/wallet/useWalletTransfer'
import { appStore } from '@/store/Modules/app'
const { registerDevice } = useDeviceId()

const app = appStore()
const { setWalletData } = useWalletTransfer()
const router = useRouter()
const route = useRoute()
const formRef = ref<FormInst | null>(null)
let loading = ref(false)
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

const handleValidateButtonClick = (e: MouseEvent) => {
  e.preventDefault()
  formRef.value?.validate(async (errors) => {
    if (!errors) {
      loading.value = true

      try {
        const { address, privateKey, mnemonic, keystore, createAndEncryptWallet } = useWallet()
        await createAndEncryptWallet(model.password)
        console.log(address.value, privateKey.value, mnemonic.value)
        // 获取nonce
        const { data: res } = await getNonce(address.value)
        const nonce = res.result ? res.result.nonce + 1 : 0
        console.log(nonce, 'noncenoncenonce')

        // 注册设备生成id

        await registerDevice()

        // 开始签名
        const { nonce: nonce1, signature } = await CreateSignature(
          nonce,
          keystore.value, // 传递 keystore JSON 字符串
          model.password,
          'json',
          'EVM'
        )
        console.log('签名结果:', nonce1, signature)
        const { data: tokenRes } = await getToken({
          device_id: app.deviceInfo.device_id, // 从 localStorage 或 appStore 获取
          user_id: address.value,
          nonce,
          signature,
        })
        if (tokenRes.result) {
          app.token = tokenRes.result.token
          const tokenPayload = JSON.parse(atob(tokenRes.result.token.split('.')[1]))
          console.log(tokenPayload, '解密')
          console.log(tokenRes, 'tokentokenRestokenRestokenResRes')
          setWalletData({
            address: address.value,
            privateKey: privateKey.value,
            mnemonic: mnemonic.value,
            keystore: keystore.value,
          })

          // 这里可以添加创建钱包的实际逻辑
          router.push({ name: 'walletSuccess' })
          loading.value = false
          window.$message?.success('钱包创建成功')
        }
      } catch (error) {
        console.log(error, '创建钱包失败')
        window.$message?.error('创建钱包失败')
      }
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
</style>
