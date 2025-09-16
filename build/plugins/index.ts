// vite.plugins.ts
import vue from '@vitejs/plugin-vue'
import type { PluginOption, BuildOptions, ServerOptions } from 'vite'
import progress from 'vite-plugin-progress'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import VueDevtools from 'vite-plugin-vue-devtools'
import path from 'path'

// 插件
export function createVitePlugins(): PluginOption[] {
  return [
    vue(),
    progress(),
    VueDevtools(),
    createSvgIconsPlugin({
      // 指定需要缓存的图标文件夹(路径为存放所有svg图标的文件夹不单个svg图标)
      iconDirs: [path.resolve(process.cwd(), 'src/assets/icons')],
      // 指定symbolId格式
      symbolId: 'icon-[dir]-[name]',
    }),
  ]
}

export function createViteBuild(): BuildOptions | undefined {
  return {
    target: 'es2015',
    outDir: 'dist-http',
    assetsDir: 'assets',
    rollupOptions: {
      input: 'index.html', // 👈 用 index.html
    },
  }
}

// server
export function createViteServer(): ServerOptions | undefined {
  return {
    host: '0.0.0.0',
    port: 5173,
    open: '/index.html', // 开发/预览走 http 的入口
    fs: {
      cachedChecks: false,
    },
  }
}
