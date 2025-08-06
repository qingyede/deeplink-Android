import { decryptKeystore } from '@/utils/decryptKeystore'
import { generateRandomId } from '@/utils/common/generateUuid'
import { CreateSignatureEVM } from '@/utils/wallet/dbcProvider'

/**
 * 直接传 keystore 和密码，返回 nonce + signature
 * @param keystore 加密钱包数据
 * @param password 用户输入的密码
 */
export async function useEvmSignature(keystore: any, password: string) {
  try {
    // 解密 keystore，获取私钥与地址
    const { privateKey, address } = await decryptKeystore(keystore, password, null)

    // 生成随机 nonce（长度为 8）
    const nonce = generateRandomId(8)

    // 对 nonce 签名
    const { signature } = await CreateSignatureEVM(nonce, privateKey)

    return {
      privateKey,
      address,
      nonce,
      signature,
    }
  } catch (error) {
    console.error('签名失败:', error)
    window.$message?.error('私钥解密或签名失败，请检查密码是否正确')
  }
}
