<template>
  <div
    class="flex flex-col gap-3 min-h-[192px] w-full bg-[linear-gradient(to_right,_#017543_0%,_#017543_26%,_#03FF91_100%)] rounded-lg text-white p-[27px]"
  >
    <h1 class="text-[20px] font-bold">Wallet Balance</h1>
    <h1 class="flex items-center gap-3">
      <span class="text-[16px] font-bold">{{ showBalance ? model.realBalance : '********' }}</span>
      <Icon :icon="showBalance ? 'mdi:eye' : 'mdi:eye-off'" class="cursor-pointer text-[20px]" @click="toggleBalance" />
    </h1>
    <h1 class="flex items-center gap-3">
      <span class="text-[12px]">{{ model.address }} </span>
      <Icon @click="copyH" icon="mdi:content-copy" class="cursor-pointer text-[18px]" />
    </h1>
    <h1 class="flex items-center gap-3">
      <n-button secondary class="text-white rounded-lg">
        <template #icon>
          <Icon icon="mdi:wallet" class="text-[18px]" />
        </template>
        Transfer</n-button
      >
      <n-button secondary class="text-white rounded-lg">Export Wallet</n-button>
    </h1>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

// Balance visibility state
const showBalance = ref(false)

// Toggle balance visibility
const toggleBalance = () => {
  showBalance.value = !showBalance.value
}

// 点击复制
const copyH = () => {
  window.$message?.success('复制成功')
}

// 钱包数据
const model = ref({
  realBalance: '100.50 ETH',
  address: '0x6F2a9D...2dB38D0A1',
})
</script>

<style lang="scss" scoped></style>
