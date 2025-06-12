<template>
  <div class="px-[16px]">
    <!-- 创建钱包 -->
    <h1 class="text-black text-[24px] font-bold mb-2">New wallet</h1>
    <div class="flex flex-col flex-wrap gap-3">
      <span class="text-[14px] text-[#000]/60 leading-[22px]">
        Store your private key file in a safe place. Write it diwn with pen and paper and keep the piece of paper in a safe
        place.
      </span>
    </div>

    <div class="mt-[50px] w-full">
      <n-form ref="formRef" :model="model" label-placement="top">
        <n-grid :cols="24">
          <n-form-item-gi :span="24" label="private key">
            <n-input readonly class="min-h-[44px] rounded-lg" v-model:value="model.privateKey">
              <template #prefix> <span class="font-bold text-[14px]">Your private key:</span> </template>
              <template #suffix> <Icon @click="copyH" icon="mdi:content-copy" class="text-[16px]" /> </template>
            </n-input>
          </n-form-item-gi>

          <n-form-item-gi :span="24">
            <div class="text-[14px] text-[#000]/60 leading-[26px]">
              <span class="font-bold text-[#000]">DO NOT</span> lose it! If you lose it, is not recoverable <br />
              <span class="font-bold text-[#000]">DO NOT</span> share it!
              <span class="font-bold text-[#000]">DO NOT</span>send it on social media or communication software such as
              WeChat, QQ, Facebook, Line, KakaoTalk, WhatsApp. If you use this document on a malicious fishing website your
              asset <span class="font-bold text-[#000]"> WILL BE STOLEN!</span> <br />

              You must back up ypur file! Treat it as if it will one day worth millions in
              <span class="font-bold text-[#000]"> USD</span>
            </div>
          </n-form-item-gi>

          <n-form-item-gi :span="24">
            <n-button class="w-full rounded-lg min-h-[48px]" type="primary" round @click="handleValidateButtonClick">
              <span class="text-lg"> Complete </span>
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
import { useClipboard } from '@vueuse/core'
import { appStore } from '@/store/Modules/app/index'
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()
const app = appStore()
const { copy } = useClipboard()
const formRef = ref<FormInst | null>(null)

const model = reactive({
  privateKey: '0x326e7c83a7c48cf0d2f789d18895...',
})

const copyH = () => {
  copy(model.privateKey)
  window.$message?.success('复制成功')
}

const handleValidateButtonClick = () => {
  app.isWalletRegistered = true
  router.push({ name: 'openWallet' })
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
