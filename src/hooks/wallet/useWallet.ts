// composables/useWallet.ts
import { ref } from 'vue'
import { ethers } from 'ethers'

export function useWallet() {
  const wallet = ref<ethers.Wallet | null>(null)
  const address = ref<string>('')
  const keystore = ref<string>('')
  const privateKey = ref<string>('')
  const mnemonic = ref<string>('')

  // 创建钱包并加密
  const createAndEncryptWallet = async (password: string) => {
    const newWallet: any = ethers.Wallet.createRandom()

    wallet.value = newWallet as any
    address.value = newWallet.address
    privateKey.value = newWallet.privateKey
    mnemonic.value = newWallet.mnemonic.phrase

    keystore.value = await newWallet.encrypt(password)

    return {
      address: address.value,
      privateKey: privateKey.value,
      mnemonic: mnemonic.value,
      keystore: keystore.value,
    }
  }

  // 从 keystore 导入钱包
  const importFromKeystore = async (keystoreJson: string, password: string) => {
    try {
      const importedWallet: any = await ethers.Wallet.fromEncryptedJson(keystoreJson, password)

      wallet.value = importedWallet as any
      address.value = importedWallet.address
      privateKey.value = importedWallet.privateKey
      mnemonic.value = importedWallet.mnemonic?.phrase ?? ''
      keystore.value = keystoreJson

      return true
    } catch (e) {
      return false
    }
  }

  // ✅ 新增：从明文私钥 + 密码 导入并加密
  const importFromPrivateKey = async (inputPrivateKey: string, password: string) => {
    try {
      const trimmed = inputPrivateKey.trim()
      // const isHex = /^0x[0-9a-fA-F]{64}$/.test(trimmed)
      // if (!isHex) throw new Error('私钥格式错误，必须是 64 位十六进制字符串（以 0x 开头）')

      const importedWallet = new ethers.Wallet(trimmed)

      wallet.value = importedWallet
      address.value = importedWallet.address
      privateKey.value = importedWallet.privateKey
      mnemonic.value = '' // 没有助记词

      keystore.value = await importedWallet.encrypt(password)

      return {
        address: address.value,
        privateKey: privateKey.value,
        keystore: keystore.value,
      }
    } catch (e) {
      console.error('❌ 私钥导入失败:', e)
      return null
    }
  }

  return {
    // state
    wallet,
    address,
    privateKey,
    mnemonic,
    keystore,

    // actions
    createAndEncryptWallet,
    importFromKeystore,
    importFromPrivateKey, // ✅ 导出新方法
  }
}
