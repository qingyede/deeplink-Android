import { defineConfig } from 'vite'
import { URL, fileURLToPath } from 'node:url'
import { createVitePlugins, createViteBuild, createViteServer } from './build/plugins/index'

export default defineConfig({
  resolve: {
    alias: {
      '~': fileURLToPath(new URL('./', import.meta.url)),
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  plugins: [createVitePlugins()],
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@use "./src/styles/scss/global.scss" as *; @import "./src/styles/scss/mixins.scss";`,
      },
    },
  },
  server: createViteServer(),
  build: createViteBuild(),
})
