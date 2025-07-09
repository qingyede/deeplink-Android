import { createApp } from 'vue'
import router from '@/router/index'
import pinia from '@/store/index'
import './plugins/assets'
import { Icon, addCollection } from '@iconify/vue'

// 导入本地 JSON
import mdiIcons from '@iconify-json/mdi/icons.json'
import bxsIcons from '@iconify-json/bxs/icons.json'
import logosIcons from '@iconify-json/logos/icons.json'
import simpleIcons from '@iconify-json/simple-icons/icons.json'
import deviconIcons from '@iconify-json/devicon/icons.json'

import App from './App.vue'
import i18n from '@/plugins/lang'

if (import.meta.env.MODE === 'development') {
  import('vconsole').then((VConsoleModule) => {
    const vConsole = new VConsoleModule.default()
    console.log('[VConsole] ready')
  })
}

function setupApp() {
  const app = createApp(App)
  // 注册所有本地图标集合
  addCollection(mdiIcons)
  addCollection(bxsIcons)
  addCollection(logosIcons as any)
  addCollection(simpleIcons as any)
  addCollection(deviconIcons as any)

  app.use(router).use(pinia).use(i18n)
  app.component('Icon', Icon)
  app.mount('#app')
}

setupApp()
