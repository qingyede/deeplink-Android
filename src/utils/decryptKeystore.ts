import { ethers } from 'ethers'

/**
 * 通过 keystore JSON + 密码解密出钱包信息
 * @param keystoreJson 加密后的 keystore 字符串
 * @param password 用户输入的密码
 * @returns { address, privateKey, mnemonic? } 或抛出错误
 */
export async function decryptKeystore(keystoreJson: string, password: string, t: any) {
  console.log(password, 'passwordpassword22222222222')
  try {
    const wallet: any = await ethers.Wallet.fromEncryptedJson(keystoreJson, password)
    console.log(wallet, 'walletwalletwallet')
    return {
      address: wallet.address,
      privateKey: wallet.privateKey,
      mnemonic: wallet.mnemonic?.phrase ?? '',
    }
  } catch (error) {
    console.log(error, '直接抛出错误，不要返回空数据直接抛出错误，不要返回空数据')
    window.$message?.error(t('app.keystoreDecryptFailed'))

    // ❗直接抛出错误，不要返回空数据
    throw new Error(t('app.keystoreDecryptFailed'))
  }
}
