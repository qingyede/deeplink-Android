<template>
  <n-tabs type="segment" animated v-model:value="activeTab">
    <!-- DLC 表单 -->
    <n-tab-pane name="DLC" tab="DLC">
      <n-form ref="dlcFormRef" :model="model.DLC" :rules="rules.DLC" label-placement="top">
        <n-grid :cols="24" :y-gap="8">
          <n-form-item-gi :span="24" :label="$t('home.targetAddress')" path="address">
            <n-input
              v-model:value="model.DLC.address"
              :placeholder="$t('home.enterTargetAddress')"
              class="min-h-[44px] rounded-lg"
            />
          </n-form-item-gi>

          <n-form-item-gi :span="24" :label="$t('home.amount')" path="amount">
            <n-input
              v-model:value="model.DLC.amount"
              :placeholder="$t('home.enterTransferAmount')"
              class="min-h-[44px] rounded-lg"
            >
              <template #suffix>
                <n-button text type="primary" class="text-xs font-medium" @click="setMaxAmount('DLC')">{{
                  $t('home.max')
                }}</n-button>
              </template>
            </n-input>
          </n-form-item-gi>

          <n-form-item-gi :span="24" :label="$t('home.password')" path="password">
            <n-input
              type="password"
              show-password-on="click"
              v-model:value="model.DLC.password"
              :placeholder="$t('home.enterPassword')"
              class="min-h-[44px] rounded-lg"
            />
          </n-form-item-gi>
        </n-grid>
      </n-form>
    </n-tab-pane>

    <!-- DBC 表单 -->
    <n-tab-pane name="DBC" tab="DBC">
      <n-form ref="dbcFormRef" :model="model.DBC" :rules="rules.DBC" label-placement="top">
        <n-grid :cols="24" :y-gap="8">
          <n-form-item-gi :span="24" :label="$t('home.targetAddress')" path="address">
            <n-input
              v-model:value="model.DBC.address"
              :placeholder="$t('home.enterTargetAddress')"
              class="min-h-[44px] rounded-lg"
            />
          </n-form-item-gi>

          <n-form-item-gi :span="24" :label="$t('home.amount')" path="amount">
            <n-input
              v-model:value="model.DBC.amount"
              :placeholder="$t('home.enterTransferAmount')"
              class="min-h-[44px] rounded-lg"
            >
              <template #suffix>
                <n-button text type="primary" class="text-xs font-medium" @click="setMaxAmount('DBC')">{{
                  $t('home.max')
                }}</n-button>
              </template>
            </n-input>
          </n-form-item-gi>

          <n-form-item-gi :span="24" :label="$t('home.password')" path="password">
            <n-input
              type="password"
              show-password-on="click"
              v-model:value="model.DBC.password"
              :placeholder="$t('home.enterPassword')"
              class="min-h-[44px] rounded-lg"
            />
          </n-form-item-gi>
        </n-grid>
      </n-form>
    </n-tab-pane>
  </n-tabs>
</template>

<script lang="ts" setup>
import { ref, reactive, computed, onMounted } from 'vue'
import type { FormInst, FormRules } from 'naive-ui'
import { getAvailableDbcBalance, getAvailableDlcBalance } from '@/utils/wallet/dbcProvider'
import { appStore } from '@/store/Modules/app'
import { useI18n } from 'vue-i18n'
const { t } = useI18n()

const app = appStore()
const activeTab = ref<'DLC' | 'DBC'>('DLC')

const dlcFormRef = ref<FormInst | null>(null)
const dbcFormRef = ref<FormInst | null>(null)

// 表单模型
const model = reactive({
  DLC: { address: '', amount: '', password: '' },
  DBC: { address: '', amount: '', password: '' },
})

// 实时余额（非 UI 卡片余额）
const realDlcBalance = ref(0)
const realDbcBalance = ref(0)

// 初始化余额
onMounted(async () => {
  if (app.address) {
    realDlcBalance.value = await getAvailableDlcBalance(app.address)
    realDbcBalance.value = await getAvailableDbcBalance(app.address)
  }
})

// 表单校验规则
const rules: Record<'DLC' | 'DBC', FormRules> = {
  DLC: {
    address: [{ required: true, message: t('home.enterTargetAddress'), trigger: ['blur', 'input'] }],
    amount: [
      { required: true, message: t('home.enterTransferAmount'), trigger: ['blur', 'input'] },
      {
        validator: (_, value) => {
          const input = parseFloat(value)
          if (isNaN(input)) return new Error(t('home.invalidNumber'))
          if (input <= 0) return new Error(t('home.amountMustBePositive'))
          if (input > realDlcBalance.value) {
            return new Error(`${t('home.exceedBalance')} ${realDlcBalance.value}`)
          }
          return true
        },
        trigger: ['blur', 'input'],
      },
    ],
    password: [{ required: true, message: t('home.enterPassword'), trigger: ['blur', 'input'] }],
  },
  DBC: {
    address: [{ required: true, message: t('home.enterTargetAddress'), trigger: ['blur', 'input'] }],
    amount: [
      { required: true, message: t('home.enterTransferAmount'), trigger: ['blur', 'input'] },
      {
        validator: (_, value) => {
          const input = parseFloat(value)
          if (isNaN(input)) return new Error(t('home.invalidNumber'))
          if (input <= 0) return new Error(t('home.amountMustBePositive'))
          if (input > realDbcBalance.value) {
            return new Error(`${t('home.exceedBalance')} ${realDbcBalance.value}`)
          }
          return true
        },
        trigger: ['blur', 'input'],
      },
    ],
    password: [{ required: true, message: t('home.enterPassword'), trigger: ['blur', 'input'] }],
  },
}

// 设置最大金额
const setMaxAmount = (coin: 'DLC' | 'DBC') => {
  if (coin === 'DLC') {
    model.DLC.amount = realDlcBalance.value.toString()
  } else {
    model.DBC.amount = realDbcBalance.value.toString()
  }
}

// 当前 formRef
const currentFormRef = computed(() => {
  return activeTab.value === 'DLC' ? dlcFormRef.value : dbcFormRef.value
})

// 表单校验暴露
const validateForm = async () => {
  if (!currentFormRef.value) return Promise.reject(new Error('表单未挂载'))
  return await currentFormRef.value.validate()
}

defineExpose({
  activeTab,
  model,
  validateForm,
})
</script>

<style scoped>
.n-input .n-input__input-el {
  height: 100% !important;
}
</style>
