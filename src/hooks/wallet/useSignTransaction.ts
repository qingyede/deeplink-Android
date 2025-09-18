// hooks/wallet/useWalletSigner.ts
import { ref, h } from 'vue'
import type { Ref } from 'vue'
import exportWalletDialog from '@/components/common/exportWalletDialog.vue'
import { decryptKeystore } from '@/utils/decryptKeystore'
import { appStore } from '@/store/Modules/app'
import { createSignerFromPrivateKey } from '@/utils/wallet/creatSiger'
import { getDbcProvider } from '@/utils/wallet/dbcProvider'
import { ethers } from 'ethers'
import { NGradientText } from 'naive-ui'

type EnsureWalletResult = {
  signer: ethers.Wallet
  address: string
  dialog: any
} | null

export function useWalletSigner(t: (key: string) => string) {
  const ensureWallet = async (): Promise<EnsureWalletResult> => {
    const dialogComponentRef: Ref<any> = ref(null)

    return new Promise<EnsureWalletResult>((resolve) => {
      const dialog: any = window.$dialog?.warning({
        title: () =>
          h(NGradientText, { size: 24, type: 'success', class: 'font-bold' }, { default: () => t('app.walletUnlock') }),
        content: () => h(exportWalletDialog, { ref: dialogComponentRef }),
        positiveText: t('app.confirm'),
        negativeText: t('app.cancel'),
        class: 'rounded-2xl dark:bg-[#1a1a1a] dark:text-white',
        negativeButtonProps: { color: '#3CD8A6', size: 'medium' },
        positiveButtonProps: { color: '#03C188', size: 'medium' },
        showIcon: false,

        async onPositiveClick() {
          dialog.loading = true
          dialog.positiveText = t('app.processing')

          try {
            // 校验弹窗表单
            const ok = await new Promise<boolean>((res) => {
              dialogComponentRef.value?.formRef?.validate((errors: any) => {
                if (!errors) res(true)
                else {
                  window.$message?.error(t('app.passwordError'))
                  res(false)
                }
              })
            })
            if (!ok) {
              dialog.loading = false
              dialog.positiveText = t('app.confirm')
              return false // 阻止 NaiveUI 自动关闭
            }

            // 解密 keystore
            const pwd: string = dialogComponentRef.value?.model?.password ?? ''
            const { privateKey, address } = await decryptKeystore(appStore().keystore, pwd, t)
            if (!privateKey) throw new Error(t('app.keystoreDecryptFailed'))

            // 生成 signer 并挂上链上 provider（关键）
            const raw = createSignerFromPrivateKey(privateKey) // ethers.Wallet (未连接)
            const signer = raw.connect(getDbcProvider()) // 连接到 DBC RPC

            // 及时清理内存中的明文密码
            if (dialogComponentRef.value?.model) {
              dialogComponentRef.value.model.password = ''
            }

            resolve({ signer, address, dialog })
          } catch (err) {
            console.error('[ensureWallet] decrypt or build signer failed:', err)
            window.$message?.error(t('app.keystoreDecryptFailed'))
            dialog.loading = false
            dialog.positiveText = t('app.confirm')
            dialog.destroy?.()
            resolve(null)
          }

          return false // 阻止 NaiveUI 自动关闭，由业务自己在成功后 dialog.destroy()
        },

        onNegativeClick() {
          resolve(null)
        },

        // 用户点右上角 X
        onClose() {
          resolve(null)
        },
      })
    })
  }

  return { ensureWallet }
}
