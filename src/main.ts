import 'regenerator-runtime/runtime'
import { createApp } from 'vue'
import router from '@/router/index'
import pinia from '@/store/index'
import './plugins/assets'
import { Icon } from '@iconify/vue'
// import { initI18n } from '@/plugins/lang'
import { MotionPlugin } from '@vueuse/motion'
import App from './App.vue'
import i18n from '@/plugins/lang'

import('vconsole').then((VConsoleModule) => {
  const vConsole = new VConsoleModule.default()
  console.log('[VConsole] ready')
})

function setupApp() {
  const app = createApp(App)
  // initI18n()
  app.use(router).use(pinia).use(i18n)
  app.component('Icon', Icon)
  app.use(MotionPlugin)
  app.mount('#app')
}

setupApp()
