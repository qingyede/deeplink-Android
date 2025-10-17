import { NGradientText } from 'naive-ui'
import { useI18n } from 'vue-i18n'
import { appStore } from '@/store/Modules/app'
import { useRouter, useRoute } from 'vue-router'
import { useClipboard } from '@vueuse/core'
import { loginStore } from '@/store/Modules/login/login'

export const useWalletPoint = () => {
  const app = appStore()
  const { t, locale } = useI18n()
  const router = useRouter()
  const route = useRoute()
  const { copy } = useClipboard()
  const login = loginStore()

  // 点击复制
  const copyHPoint = () => {
    copy(login.walletAddress as any)
    window.$message?.success(t('home.copySuccess'))
  }

  // 卡片操作按钮
  const PointcardAction = ref([
    {
      icon: null,
      t: 'p.home.closeaccount',
      h: () => {
        const d = window.$dialog?.warning({
          title: () => {
            return h(
              NGradientText,
              {
                size: 24,
                type: 'success',
                class: 'font-bold',
              },
              { default: () => t('p.home.close') }
            )
          },
          content: () => t('p.home.closeConfirm'),
          class: 'rounded-2xl dark:bg-[#1a1a1a] dark:text-white',
          showIcon: false,
          negativeButtonProps: { color: '#3CD8A6', size: 'medium' },
          positiveButtonProps: { color: '#03C188', size: 'medium' },
          positiveText: t('app.confirm'),
          negativeText: t('app.cancel'),
          onPositiveClick: async () => {
            if (d) {
              d.loading = true
              d.positiveText = 'loading...'
              await new Promise((resolve, reject) => {
                setTimeout(() => {
                  d.loading = false
                  d.positiveText = t('app.confirm')
                  app.$reset()
                  router.push({ name: 'IsWallet' })
                  window.$message?.success(t('p.home.closedSuccess'))
                  resolve(true)
                }, 1000)
              })
            }
          },
        })
      },
    },
  ])
  return { PointcardAction, copyHPoint }
}
