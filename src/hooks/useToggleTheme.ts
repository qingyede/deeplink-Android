import { watchEffect } from 'vue'
// import { appStore } from '@/store/Modules/app/index'

export function toggleTheme() {
  // 切换主题
  watchEffect(() => {
    // // document.documentElement.dataset.theme = appStore().theme
    // console.log(appStore().theme)
  })
}
