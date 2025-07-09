<template>
  <div class="flex flex-col">
    <h1 class="flex flex-col gap-2 justify-between mb-2">
      <span>你选择购买的NFT:</span>
      <span class="text-primary-500"
        >钱包DLC余额： {{ formatNumber(dlcNumber) }}
        <span class="text-error-500" v-show="showBalanceIsOk">（余额不足）</span>
      </span>
    </h1>
    <n-card class="rounded-lg mb-8 !bg-[#efefef] dark:bg-[#1e1e1e] transition-colors duration-300">
      <div class="flex flex-col gap-2 items-center">
        <n-button
          type="primary"
          class="w-[70%] h-[50px] rounded-[12px] text-[20px] text-white border-none *:"
          style="background: linear-gradient(to right, #8000ff, #00ffd1)"
        >
          {{ props.data.v }} / {{ map1[props.data.type] }}
        </n-button>
        <span class="font-bold text-[20px]">{{ map0[props.data.type] }}</span>
        <span class="text-xs flex items-center flex-wrap">
          <span>等值 {{ map3[props.data.type] }} DLC (当前DLC的价格：</span>
          <span class="text-primary-300">{{ price.useLocalizedCurrency(dlc_price) || '0.00' }}</span> )</span
        >
      </div>
    </n-card>
    <h5 class="-mt-5 text-xs text-gray-400 leading-5">购买后十分钟内未收到NFT，请联系管理：service@deeplink.cloud</h5>
    <h5 class="mt-3">
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
        </n-grid>
      </n-form>
    </h5>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import type { FormInst, FormRules } from 'naive-ui'
import { useGetDlcPrice } from '@/hooks/store/useGetDlcPrice'
import { priceStore } from '@/store/Modules/price/index'
import { useGetDbcAndDlcNumber } from '@/hooks/wallet/useGetDbcAndDlcNumber'
const { dbcNumber, dlcNumber, homeCardLoading } = useGetDbcAndDlcNumber()
import { formatNumber } from '@/utils/common/formatNumber'

const price = priceStore()
const { dlc_price } = useGetDlcPrice()
const props = defineProps({
  data: {
    type: Object,
    default: null,
  },
})
// 定义map
const map0 = {
  0: '专业版皇冠NFT 1个月',
  1: '专业版皇冠NFT 3个月',
  2: '专业版皇冠NFT 6个月',
  3: '专业版皇冠NFT 12个月',
}
const map1 = {
  0: '1个月',
  1: '3个月',
  2: '6个月',
  3: '12个月',
}
const map3 = {
  0: '66666.67',
  1: '175000',
  2: '300000',
  3: '500000',
}

// 是否显示余额不足
const showBalanceIsOk = computed(() => {
  if (Number(dlcNumber.value < map3[props.data.type])) return true
  return false
})

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

defineExpose({
  model,
  formRef,
})
</script>

<style lang="scss" scoped></style>
