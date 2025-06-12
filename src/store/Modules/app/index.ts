import { defineStore } from 'pinia'
import { ref } from 'vue'

export const appStore = defineStore(
  'app',
  () => {
    // 判断是否注册了钱包
    let isWalletRegistered = ref(false)

    return { isWalletRegistered }
  },
  { persist: true }
)
