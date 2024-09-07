import { watchEffect } from 'vue'
import app from '@/store/Modules/app/app'
export function toggleTheme() {
  // 切换主题
  watchEffect(() => {
    document.documentElement.dataset.theme = app().theme
    console.log(app().theme)
  })
}
