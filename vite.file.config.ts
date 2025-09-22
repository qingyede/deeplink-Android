import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { NaiveUiResolver } from 'unplugin-vue-components/resolvers'
import path from 'path'

export default defineConfig({
  base: './', // ✅ file 协议必须相对
  plugins: [
    vue(),
    AutoImport({
      imports: ['vue', { 'naive-ui': ['useDialog', 'useMessage', 'useNotification', 'useLoadingBar'] }],
    }),
    Components({ resolvers: [NaiveUiResolver()] }),
    // ⚠️ 不要接入 devtools/legacy（file 包没必要且可能插额外脚本）
  ],
  resolve: {
    alias: {
      '~': path.resolve(__dirname, './'),
      '@': path.resolve(__dirname, './src'),
    },
  },
  define: {
    BUILD_TIME: JSON.stringify(new Date().toLocaleString()),
  },
  esbuild: { target: 'es2015' },
  build: {
    target: 'es2015',
    outDir: 'dist-file', // ✅ Android 包
    emptyOutDir: true, // 每次清空
    assetsDir: 'assets',
    modulePreload: false, // file:// 无意义
    rollupOptions: {
      input: 'src/main.ts', // ✅ 用 JS 入口打 IIFE
      output: {
        format: 'iife', // 非模块
        inlineDynamicImports: true, // 关闭分包/动态 import，合并成单 JS
        entryFileNames: 'assets/app.iife.js',
        assetFileNames: 'assets/[name][extname]',
        chunkFileNames: 'assets/_[name].js', // 理论不会产出
      },
    },
  },
})
