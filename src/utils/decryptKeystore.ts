import { ethers } from 'ethers'

/**
 * 通过 keystore JSON + 密码解密出钱包信息
 * @param keystoreJson 加密后的 keystore 字符串
 * @param password 用户输入的密码
 * @returns { address, privateKey, mnemonic? } 或抛出错误
 */
export async function decryptKeystore(keystoreJson: string, password: string) {
  try {
    const wallet: any = await ethers.Wallet.fromEncryptedJson(keystoreJson, password)

    return {
      address: wallet.address,
      privateKey: wallet.privateKey,
      mnemonic: wallet.mnemonic?.phrase ?? '',
    }
  } catch (error) {
    window.$message?.error('Keystore 解密失败，请检查密码是否正确')
    return {
      address: '',
      privateKey: '',
      mnemonic: '',
    }
  }
}
