import NProgress from 'nprogress'

/** Setup plugin NProgress */
export function setupNProgress() {
  // 配置nprogress
  NProgress.configure({ showSpinner: false, easing: 'ease', speed: 520 })

  // mount on window
  window.NProgress = NProgress
}
