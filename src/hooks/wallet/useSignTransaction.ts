// hooks/wallet/useWalletSigner.ts
import { ref, h } from 'vue'
import exportWalletDialog from '@/components/common/exportWalletDialog.vue'
import { decryptKeystore } from '@/utils/decryptKeystore'
import { appStore } from '@/store/Modules/app'
import { createSignerFromPrivateKey } from '@/utils/wallet/creatSiger'
import { ethers } from 'ethers'

export function useWalletSigner(t) {
  const ensureWallet = async (): Promise<{ signer: ethers.Wallet; address: string; dialog: any } | null> => {
    const dialogComponentRef: any = ref(null)

    return new Promise((resolve) => {
      const dialog: any = window.$dialog?.warning({
        title: t('app.walletUnlock'),
        content: () => h(exportWalletDialog, { ref: dialogComponentRef }),
        positiveText: t('app.confirm'),
        negativeText: t('app.cancel'),
        class: 'rounded-2xl dark:bg-[#1a1a1a] dark:text-white',
        negativeButtonProps: { color: '#3CD8A6', size: 'medium' },
        positiveButtonProps: { color: '#03C188', size: 'medium' },

        onPositiveClick: async () => {
          dialog.loading = true
          dialog.positiveText = t('app.processing')
          console.log(dialogComponentRef.value, 'dialogComponentRef.value.formRefdialogComponentRef.value.formRef')

          try {
            const rs = await new Promise(async (resolve, reject) => {
              dialogComponentRef.value.formRef?.validate(async (errors) => {
                if (!errors) {
                  resolve(true)
                } else {
                  window.$message?.error(t('app.passwordError'))
                  resolve(false)
                }
              })
            })

            if (rs) {
              console.log(dialogComponentRef.value.model.password, 'dialogComponentRef.value.model.password')
              const { privateKey, address } = await decryptKeystore(
                appStore().keystore,
                dialogComponentRef.value.model.password,
                t
              )

              if (!privateKey) throw new Error(t('app.keystoreDecryptFailed'))

              const signer = createSignerFromPrivateKey(privateKey)

              resolve({ signer, address, dialog })
            } else {
              dialog.loading = false
              dialog.positiveText = t('app.confirm')
              return false // ❗❗ 阻止 Naive UI 自动关闭 Dialog
            }
          } catch (err) {
            dialog.loading = false
            dialog.positiveText = t('app.confirm')
            dialog.destroy?.()
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
