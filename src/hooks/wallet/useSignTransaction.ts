// hooks/wallet/useWalletSigner.ts
import { ref, h } from 'vue'
import exportWalletDialog from '@/components/common/exportWalletDialog.vue'
import { decryptKeystore } from '@/utils/decryptKeystore'
import { appStore } from '@/store/Modules/app'
import { createSignerFromPrivateKey } from '@/utils/wallet/creatSiger'
import { ethers } from 'ethers'

export function useWalletSigner(t) {
  const ensureWallet = async (): Promise<{ signer: ethers.Wallet; address: string; dialog: any } | null> => {
    const dialogComponentRef = ref<any>(null)

    return new Promise((resolve) => {
      const dialog: any = window.$dialog?.warning({
        title: t('app.walletUnlock'),
        content: () => h(exportWalletDialog, { ref: dialogComponentRef }),
        positiveText: t('app.confirm'),
        negativeText: t('app.cancel'),
        class: 'rounded-2xl',
        onPositiveClick: async () => {
          dialog.loading = true
          dialog.positiveText = t('app.processing')

          try {
            const component = dialogComponentRef.value
            const formRef = component?.formRef
            const model = component?.model

            if (!formRef || !model) throw new Error('组件加载失败')

            const isValid = await new Promise<boolean>((res) => {
              formRef.validate((err: any) => res(!err))
            })
            if (!isValid) throw new Error(t('app.passwordError'))

            const { privateKey, address } = await decryptKeystore(appStore().keystore, model.password)
            const signer = createSignerFromPrivateKey(privateKey)

            resolve({ signer, address, dialog })
          } catch (err) {
            window.$message?.error((err as any).message || '钱包解锁失败')
            dialog.loading = false
            dialog.positiveText = t('app.confirm')
            resolve(null)
          }

          return false // ❗❗ 阻止 Naive UI 自动关闭 Dialog
        },
        onNegativeClick: () => resolve(null),
      })
    })
  }

  return {
    ensureWallet,
  }
}
