// composables/useWalletTransfer.ts
import { ref } from 'vue'

interface WalletTransferData {
  address: string
  privateKey: string
  mnemonic: string
  keystore: string
  pwd?: string
}

const walletData = ref<WalletTransferData | null>(null)

export function useWalletTransfer() {
  const setWalletData = (data: WalletTransferData) => {
    walletData.value = data
  }

  const clearWalletData = () => {
    walletData.value = null
  }

  return {
    walletData,
    setWalletData,
    clearWalletData,
  }
}
