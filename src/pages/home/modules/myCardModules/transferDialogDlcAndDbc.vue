<template>
  <n-tabs type="segment" animated v-model:value="activeTab">
    <!-- DLC 表单 -->
    <n-tab-pane name="DLC" tab="DLC">
      <n-form ref="dlcFormRef" :model="model.DLC" :rules="rules.DLC" label-placement="top">
        <n-grid :cols="24" :y-gap="8">
          <n-form-item-gi :span="24" label="目标地址" path="address">
            <n-input v-model:value="model.DLC.address" placeholder="请输入目标地址" class="min-h-[44px] rounded-lg" />
          </n-form-item-gi>

          <n-form-item-gi :span="24" label="数量" path="amount">
            <n-input v-model:value="model.DLC.amount" placeholder="请输入转账数量" class="min-h-[44px] rounded-lg">
              <template #suffix>
                <n-button text type="primary" class="text-xs font-medium" @click="setMaxAmount('DLC')">最大</n-button>
              </template>
            </n-input>
          </n-form-item-gi>

          <n-form-item-gi :span="24" label="密码" path="password">
            <n-input
              type="password"
              show-password-on="click"
              v-model:value="model.DLC.password"
              placeholder="请输入密码"
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
          <n-form-item-gi :span="24" label="目标地址" path="address">
            <n-input v-model:value="model.DBC.address" placeholder="请输入目标地址" class="min-h-[44px] rounded-lg" />
          </n-form-item-gi>

          <n-form-item-gi :span="24" label="数量" path="amount">
            <n-input v-model:value="model.DBC.amount" placeholder="请输入转账数量" class="min-h-[44px] rounded-lg">
              <template #suffix>
                <n-button text type="primary" class="text-xs font-medium" @click="setMaxAmount('DBC')">最大</n-button>
              </template>
            </n-input>
          </n-form-item-gi>

          <n-form-item-gi :span="24" label="密码" path="password">
            <n-input
              type="password"
              show-password-on="click"
              v-model:value="model.DBC.password"
              placeholder="请输入密码"
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
    address: [{ required: true, message: '请输入目标地址', trigger: ['blur', 'input'] }],
    amount: [
      { required: true, message: '请输入转账数量', trigger: ['blur', 'input'] },
      {
        validator: (_, value) => {
          const input = parseFloat(value)
          if (isNaN(input)) return new Error('请输入合法数字')
          if (input <= 0) return new Error('数量必须大于 0')
          if (input > realDlcBalance.value) {
            return new Error(`转账数量不能超过可用余额 ${realDlcBalance.value}`)
          }
          return true
        },
        trigger: ['blur', 'input'],
      },
    ],
    password: [{ required: true, message: '请输入密码', trigger: ['blur', 'input'] }],
  },
  DBC: {
    address: [{ required: true, message: '请输入目标地址', trigger: ['blur', 'input'] }],
    amount: [
      { required: true, message: '请输入转账数量', trigger: ['blur', 'input'] },
      {
        validator: (_, value) => {
          const input = parseFloat(value)
          if (isNaN(input)) return new Error('请输入合法数字')
          if (input <= 0) return new Error('数量必须大于 0')
          if (input > realDbcBalance.value) {
            return new Error(`转账数量不能超过可用余额 ${realDbcBalance.value}`)
          }
          return true
        },
        trigger: ['blur', 'input'],
      },
    ],
    password: [{ required: true, message: '请输入密码', trigger: ['blur', 'input'] }],
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
