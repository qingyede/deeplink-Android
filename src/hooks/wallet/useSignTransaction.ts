// hooks/wallet/useWalletSigner.ts
import { ref, h } from 'vue'
import exportWalletDialog from '@/components/common/exportWalletDialog.vue'
import { decryptKeystore } from '@/utils/decryptKeystore'
import { appStore } from '@/store/Modules/app'
import { createSignerFromPrivateKey } from '@/utils/wallet/creatSiger'
import { ethers } from 'ethers'

const signerRef = ref<ethers.Wallet | null>(null)
const addressRef = ref<string>('')

export function useWalletSigner() {
  const ensureWallet = async (): Promise<{ signer: ethers.Wallet; address: string; dialog: any } | null> => {
    if (signerRef.value && addressRef.value) {
      return {
        signer: signerRef.value as any,
        address: addressRef.value,
      } as any
    }

    const dialogComponentRef = ref<any>(null) // ✅ 用 ref 正确引用组件

    return new Promise((resolve) => {
      const dialog: any = window.$dialog?.warning({
        title: '钱包解锁',
        content: () => h(exportWalletDialog, { ref: dialogComponentRef }), // ✅ 绑定 ref
        positiveText: '确认',
        negativeText: '取消',
        class: 'rounded-2xl',
        onPositiveClick: async () => {
          dialog.loading = true
          dialog.positiveText = '处理中...'

          try {
            const component = dialogComponentRef.value
            const formRef = component?.formRef
            const model = component?.model

            if (!formRef || !model) {
              window.$message?.error('组件未正确加载')
              dialog.loading = false
              dialog.positiveText = '确认'
              resolve(null)
              return
            }

            const isValid = await new Promise<boolean>((res) => {
              formRef.validate((err: any) => res(!err))
            })

            if (!isValid) {
              window.$message?.error('密码错误，请重试')
              dialog.loading = false
              dialog.positiveText = '确认'
              resolve(null)
              return
            }

            const { privateKey, address } = await decryptKeystore(appStore().keystore, model.password)
            const signer = createSignerFromPrivateKey(privateKey)

            signerRef.value = signer
            addressRef.value = address

            window.$message?.success('钱包签名成功')
            resolve({
              signer,
              address,
              dialog,
            })
          } catch (err) {
            dialog.loading = false
            dialog.positiveText = '确认'
            resolve(null)
          } finally {
            return false
          }
        },
        onNegativeClick: () => resolve(null),
      })
    })
  }

  return {
    ensureWallet,
  }
}
