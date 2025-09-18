// stores/login.ts
import { defineStore } from 'pinia'
import { getWalletId } from '@/api/price/index'
import { ref, computed } from 'vue'
import { appStore } from '../app'
import { useMaskAddress } from '@/hooks/common/useMaskAddress'

export const loginStore = defineStore('login', () => {
  // 仅内存保存，切页/刷新即丢失
  const app = appStore()
  const { maskAddress } = useMaskAddress()

  // 获取钱包对应的ID
  const walletId = ref('')
  const getWalletIdH = async () => {
    const { data: res } = await getWalletId({
      wallet: app.address,
    })
    if (res.success) {
      walletId.value = res.data
    }
  }
  // 自动监听钱包重新请求
  watchEffect(() => {
    if (app.address) {
      console.log('自动监听钱包重新请求')
      getWalletIdH()
    }
  })
  // 计算属性根据模式显示钱包地址
  const walletAddress = computed(() => {
    if (app.address) {
      if (!app.mode) {
        // 代币模式
        return maskAddress(app.address)
      } else {
        // DLC模式
        return walletId.value
      }
    }
  })

  return {
    getWalletIdH,
    walletId,
    walletAddress,
  }
})
