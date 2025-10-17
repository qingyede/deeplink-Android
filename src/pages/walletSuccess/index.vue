<template>
  <div class="px-[16px]">
    <!-- 创建钱包 -->
    <h1 class="text-[24px] font-bold mb-2">{{ $t('walletSuccess.newWallet') }}</h1>
    <div class="flex flex-col flex-wrap gap-3">
      <span class="text-[14px] leading-[22px]">
        {{ $t('walletSuccess.privateKeyStorageTip') }}
      </span>
    </div>

    <div class="mt-[50px] w-full">
      <n-form ref="formRef" :model="model" label-placement="top">
        <n-grid :cols="24">
          <n-form-item-gi :span="24" :label="$t('walletSuccess.privateKey')">
            <n-input type="textarea" readonly class="min-h-[44px] rounded-lg" v-model:value="model.privateKey">
              <template #suffix> <Icon @click="copyH" icon="mdi:content-copy" class="text-[16px]" /> </template>
            </n-input>
          </n-form-item-gi>

          <n-form-item-gi :span="24">
            <div class="text-[14px] leading-[26px]">
              <span class="font-bold">{{ $t('walletSuccess.doNot') }}</span>
              {{ $t('walletSuccess.doNotLoseIt') }} <br />
              <span class="font-bold">{{ $t('walletSuccess.doNot') }}</span>
              {{ $t('walletSuccess.doNotShareIt') }}
              <!-- <span class="font-bold ">{{ $t('walletSuccess.doNot') }}</span -->
              {{ $t('walletSuccess.doNotSendIt') }}
              <br />

              {{ $t('walletSuccess.backupReminder') }}
              <!-- <span class="font-bold "> USD</span> -->
            </div>
          </n-form-item-gi>

          <n-form-item-gi :span="24">
            <n-button class="w-full rounded-lg min-h-[48px]" type="primary" round @click="handleValidateButtonClick">
              <span class="text-lg"> {{ $t('walletSuccess.complete') }} </span>
            </n-button>
          </n-form-item-gi>
        </n-grid>
      </n-form>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive, onUnmounted, onMounted } from 'vue'
import type { FormInst, FormRules } from 'naive-ui'
import { useClipboard } from '@vueuse/core'
import { appStore } from '@/store/Modules/app/index'
import { useRouter, useRoute } from 'vue-router'
import { useWalletTransfer } from '@/hooks/wallet/useWalletTransfer'
import { useWallet } from '@/hooks/wallet/useWallet'
const { importFromPrivateKey } = useWallet()
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const { walletData, clearWalletData } = useWalletTransfer()
// 离开页面时清除敏感数据
onUnmounted(() => {
  clearWalletData()
})

const router = useRouter()
const route = useRoute()
const app = appStore()
const { copy } = useClipboard()
const formRef = ref<FormInst | null>(null)

const model = reactive({
  privateKey: '',
})

watchEffect(() => {
  if (walletData.value === null) return
  model.privateKey = walletData.value.privateKey
})
const copyH = () => {
  copy(model.privateKey)
  window.$message?.success(t('app.copySuccess2'))
}

const handleValidateButtonClick = async () => {
  // router.push({ name: 'openWallet' })
  console.log(model.privateKey, walletData.value?.pwd)
  const result = await importFromPrivateKey(model.privateKey, walletData.value?.pwd as string)
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
    window.$message?.error(t('app.importFailed2'))
  }
}
</script>

<style lang="scss" scoped>
:deep(.n-input__input-el) {
  height: 100% !important;
}

:deep(.n-input .n-input__textarea-el) {
  padding-right: 6px;
}
</style>
