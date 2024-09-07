import { createApp } from 'vue'
import router from '@/router/index'
import pinia from '@/store/index'
import './plugins/assets'
import 'virtual:svg-icons-register'
import { setupNProgress } from '@/plugins/nprogress'
import App from './App.vue'

function setupApp() {
  // 配置nprogress
  setupNProgress()

  const app = createApp(App)
  app.use(pinia).use(router)
  app.mount('#app')
}

setupApp()
