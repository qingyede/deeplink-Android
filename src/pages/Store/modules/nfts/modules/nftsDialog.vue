<template>
  <div class="flex flex-col">
    <h1 class="flex flex-col gap-2 justify-between mb-2">
      <span class="text-primary-500"
        >{{ $t('Store.walletBalance') }}： {{ formatNumber(dlcNumber) }}
        <span class="text-error-500" v-show="showBalanceIsOk">（{{ $t('Store.insufficientBalance') }}）</span>
      </span>
    </h1>
    <n-card class="rounded-lg mb-8 transition-colors duration-300">
      <div class="flex flex-col gap-2 items-center">
        <n-button
          type="primary"
          class="w-[70%] h-[50px] rounded-[12px] text-[20px] text-white border-none *:"
          style="background: linear-gradient(to right, #8000ff, #00ffd1)"
        >
          {{ props.data.price }}
        </n-button>
        <span class="font-bold text-[20px]">{{ props.data.vertion }}</span>
        <!-- 价格与等值说明（弱化说明性文字） -->
        <div class="text-xs text-gray-500 flex items-center flex-wrap gap-1">
          <span
            >{{ $t('Store.equivalent') }} {{ map3[props.data.type] }}

            {{ app.mode ? $t('app.point') : 'DLC' }}
          </span>
          <span v-if="!app.mode">（{{ $t('Store.currentDlcPrice') }}：</span>
          <span v-if="!app.mode" class="text-primary-300">
            {{ price.useLocalizedCurrency(dlc_price, 6) ?? '0.00' }}
          </span>
          <span v-if="!app.mode">）</span>
        </div>
      </div>
    </n-card>
    <h5 class="-mt-5 text-xs text-gray-400 leading-5">{{ $t('Store.nftDelayTip') }}：service@deeplink.cloud</h5>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import type { FormInst, FormRules } from 'naive-ui'
import { useGetDlcPrice } from '@/hooks/store/useGetDlcPrice'
import { priceStore } from '@/store/Modules/price/index'
import { useGetDbcAndDlcNumber } from '@/hooks/wallet/useGetDbcAndDlcNumber'
import { formatNumber } from '@/utils/common/formatNumber'
import { useI18n } from 'vue-i18n'
import { appStore } from '@/store/Modules/app'
import { useGetUserPoints } from '@/hooks/wallet/useGetUserPoint'

const { dbcNumber, dlcNumber, homeCardLoading } = useGetDbcAndDlcNumber()
const { points } = useGetUserPoints()
const app = appStore()

const { t } = useI18n()
const price = priceStore()
const { dlc_price } = useGetDlcPrice()
const props = defineProps({
  data: {
    type: Object,
    default: null,
  },
})
const map3 = computed(() => {
  if (app.mode) {
    if (dlc_price.value) {
      return {
        0: (props.data.value * 1000).toFixed(5),
        1: (props.data.value * 1000).toFixed(5),
        2: (props.data.value * 1000).toFixed(5),
        3: (props.data.value * 1000).toFixed(5),
      }
    }
    // ❗ dlc_price 还没就绪时返回默认空对象，避免 undefined
    return {}
  } else {
    return {
      0: (props.data.value / dlc_price.value).toFixed(5),
      1: (props.data.value / dlc_price.value).toFixed(5),
      2: (props.data.value / dlc_price.value).toFixed(5),
      3: (props.data.value / dlc_price.value).toFixed(5),
    }
  }
})

const map4 = {
  0: 0,
  1: 1,
  2: 2,
  3: 3,
}

// 是否显示余额不足
const showBalanceIsOk = computed(() => {
  if (!app.mode) {
    const have = Number(dlcNumber.value ?? 0)
    const need = Number(map3.value[props.data?.type as keyof typeof map3] ?? 0)
    return have < need
  } else {
    const have = Number(points.value ?? 0)
    console.log(have, 'havehave')
    const need = Number(map3.value[props.data?.type as keyof typeof map3] ?? 0)
    return have < need
  }
})

const formRef = ref<FormInst | null>(null)

const model = reactive({
  password: '',
})

const exposedNumber = computed(() => map3.value?.[props.data?.type] ?? undefined)
const exposedEndTime = computed(() => map4[props.data?.type as 0 | 1 | 2 | 3])

defineExpose({
  model,
  formRef,
  number: exposedNumber, // ✅ 暴露 ref/computed，外面拿到的是响应式
  endTime: exposedEndTime,
  showBalanceIsOk,
})
</script>

<style lang="scss" scoped></style>
