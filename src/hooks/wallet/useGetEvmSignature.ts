import { ref, h } from 'vue'
import exportWalletDialog from '@/components/common/exportWalletDialog.vue'
import { decryptKeystore } from '@/utils/decryptKeystore'
import { appStore } from '@/store/Modules/app'
import { createSignerFromPrivateKey } from '@/utils/wallet/creatSiger'
import { ethers } from 'ethers'
import { generateRandomId } from '@/utils//common/generateUuid'
import { CreateSignatureEVM } from '@/utils/wallet/dbcProvider'

export function useGetEvmSignature(t) {
  const getEvmSignature = async (): Promise<any> => {
    const dialogComponentRef = ref<any>(null) // ✅ 用 ref 正确引用组件

    return new Promise((resolve) => {
      const dialog: any = window.$dialog?.warning({
        title: t('app.walletUnlock'),
        content: () => h(exportWalletDialog, { ref: dialogComponentRef }), // ✅ 绑定 ref
        positiveText: t('app.confirm'),
        negativeText: t('app.cancel'),
        class: 'rounded-2xl dark:bg-[#1a1a1a] dark:text-white',
        negativeButtonProps: { color: '#3CD8A6', size: 'medium' },
        positiveButtonProps: { color: '#03C188', size: 'medium' },

        onPositiveClick: async () => {
          dialog.loading = true
          dialog.positiveText = t('app.processing')

          try {
            const component = dialogComponentRef.value
            const formRef = component?.formRef
            const model = component?.model

            if (!formRef || !model) {
              dialog.loading = false
              dialog.positiveText = t('app.confirm')
              resolve(null)
              return
            }

            const isValid = await new Promise<boolean>((res) => {
              formRef.validate((err: any) => res(!err))
            })

            if (!isValid) {
              window.$message?.error(t('app.passwordError'))
              dialog.loading = false
              dialog.positiveText = t('app.confirm')
              resolve(false)
              return
            }

            const { privateKey, address } = await decryptKeystore(appStore().keystore, model.password, t)
            const id8 = generateRandomId(8)
            const { nonce, signature } = await CreateSignatureEVM(id8, privateKey)

            resolve({
              nonce,
              signature,
            })
          } catch (err) {
            dialog.loading = false
            dialog.positiveText = t('app.confirm')
            resolve(false)
          }
        },
        onNegativeClick: () => resolve(null),
      })
    })
  }

  return {
    getEvmSignature,
  }
}
