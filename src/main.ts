import { createApp } from 'vue'
import router from '@/router/index'
import pinia from '@/store/index'
import './plugins/assets'
import { Icon, addCollection } from '@iconify/vue'
import mdiIcons from '@iconify-json/mdi/icons.json'
// import 'amfe-flexible/index.js'
import App from './App.vue'

function setupApp() {
  const app = createApp(App)
  addCollection(mdiIcons)
  app.use(pinia).use(router)
  app.component('Icon', Icon)
  app.mount('#app')
}

setupApp()
