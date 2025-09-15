// vite.file.config.ts —— 专供 file:// 的构建
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { NaiveUiResolver } from 'unplugin-vue-components/resolvers'
import path from 'path'

export default defineConfig({
  base: './',
  plugins: [
    vue(),
    // 这些插件与你正常构建一致（保证模板/自动导入能编译）
    AutoImport({
      imports: ['vue', { 'naive-ui': ['useDialog', 'useMessage', 'useNotification', 'useLoadingBar'] }],
    }),
    Components({ resolvers: [NaiveUiResolver()] }),
    // ⚠️ 不要用 legacy / devtools（没必要，且可能插入额外脚本）
  ],
  resolve: {
    alias: {
      '~': path.resolve(__dirname, './'),
      '@': path.resolve(__dirname, './src'),
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@use "/src/styles/scss/global.scss" as *; @import "/src/styles/scss/mixins.scss";`,
        api: 'modern',
      },
    },
  },
  define: {
    BUILD_TIME: JSON.stringify(new Date().toLocaleString()),
  },
  esbuild: { target: 'es2015' },
  build: {
    target: 'es2015',
    outDir: 'dist', // 和正常构建放同一个目录
    emptyOutDir: false, // ⚠️ 不要清空，上一步的 html/css 要保留
    assetsDir: 'assets',
    modulePreload: false, // file:// 下无意义，关闭
    rollupOptions: {
      input: 'src/main.ts', // 直接以入口 JS 打 IIFE（不再依赖 html 中的 module 标签）
      output: {
        format: 'iife', // 关键：非模块
        inlineDynamicImports: true, // 关键：合并所有 chunk/动态 import
        entryFileNames: 'assets/app.iife.js',
        assetFileNames: 'assets/[name][extname]',
        chunkFileNames: 'assets/_[name].js', // 理论不会产出
      },
    },
  },
})
