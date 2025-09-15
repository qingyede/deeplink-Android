import { defineConfig } from 'vite'
import { URL, fileURLToPath } from 'url'
import { createVitePlugins, createViteBuild, createViteServer } from './build/plugins/index'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { NaiveUiResolver } from 'unplugin-vue-components/resolvers'

export default defineConfig({
  base: './',
  resolve: {
    alias: {
      '~': fileURLToPath(new URL('./', import.meta.url)),
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  plugins: [
    createVitePlugins(),
    AutoImport({
      imports: [
        'vue',
        {
          'naive-ui': ['useDialog', 'useMessage', 'useNotification', 'useLoadingBar'],
        },
      ],
    }),
    Components({
      resolvers: [NaiveUiResolver()],
    }),
  ],
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@use "/src/styles/scss/global.scss" as *; @import "/src/styles/scss/mixins.scss";`,
        api: 'modern',
      },
    },
  },
  // 全局环境变量

  define: {
    BUILD_TIME: JSON.stringify(new Date().toLocaleString()), // 将 buildTime 作为全局变量注入
  },
  server: createViteServer(),
  build: createViteBuild(),
})
