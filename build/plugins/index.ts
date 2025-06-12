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

// build
export function createViteBuild(): BuildOptions | undefined {
  return {
    reportCompressedSize: false,
    sourcemap: false,
    commonjsOptions: {
      ignoreTryCatch: false,
    },
    minify: 'esbuild',
    // 手动分包
    rollupOptions: {
      input: 'h5.html',
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            return id.toString().split('node_modules/')[1].split('/')[0].toString()
          }
        },
      },
    },
  }
}
// server
export function createViteServer(): ServerOptions | undefined {
  return {
    host: '0.0.0.0',
    port: 5173,
    open: '/h5.html#/h5.html',
    fs: {
      cachedChecks: false,
    },
  }
}
