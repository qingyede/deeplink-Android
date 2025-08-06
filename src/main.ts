import { createApp } from 'vue'
import router from '@/router/index'
import pinia from '@/store/index'
import './plugins/assets'
import { Icon, addCollection } from '@iconify/vue'
import { initI18n } from '@/plugins/lang'
import { MotionPlugin } from '@vueuse/motion'
import App from './App.vue'
import i18n from '@/plugins/lang'

// 导入本地 JSON
// import mdiIcons from '@iconify-json/mdi/icons.json'
// import logosIcons from '@iconify-json/logos/icons.json'
// import mdiIcons from '@iconify-json/mdi/icons.json'
// import logosIcons from '@/plugins/logos.json'

// if (import.meta.env.MODE === 'development') {
//   import('vconsole').then((VConsoleModule) => {
//     const vConsole = new VConsoleModule.default()
//     console.log('[VConsole] ready')
//   })
// }
// import('vconsole').then((VConsoleModule) => {
//   const vConsole = new VConsoleModule.default()
//   console.log('[VConsole] ready')
// })
function setupApp() {
  const app = createApp(App)
  // 注册所有本地图标集合
  // addCollection(mdiIcons)
  // addCollection(logosIcons as any)
  initI18n()
  app.use(router).use(pinia).use(i18n)
  app.component('Icon', Icon)
  app.use(MotionPlugin)
  app.mount('#app')
}

setupApp()
