// vite.config.ts
import { defineConfig } from "file:///D:/mydev/vue%E6%A8%A1%E6%9D%BF/vue%E6%A8%A1%E6%9D%BF/Vue3%E6%A8%A1%E6%9D%BF/%E9%9B%86%E6%88%90tailwindcss%E7%9A%84vue3%E6%A8%A1%E6%9D%BF/%E5%9F%BA%E7%A1%80%E6%A8%A1%E6%9D%BF%EF%BC%88%E9%9B%86%E6%88%90naiveui%20tailwindcss%EF%BC%89/node_modules/.pnpm/vite@5.4.1_@types+node@10.17.60_sass-embedded@1.79.5_sass@1.78.0_terser@5.32.0/node_modules/vite/dist/node/index.js";
import { URL, fileURLToPath } from "url";

// build/plugins/index.ts
import vue from "file:///D:/mydev/vue%E6%A8%A1%E6%9D%BF/vue%E6%A8%A1%E6%9D%BF/Vue3%E6%A8%A1%E6%9D%BF/%E9%9B%86%E6%88%90tailwindcss%E7%9A%84vue3%E6%A8%A1%E6%9D%BF/%E5%9F%BA%E7%A1%80%E6%A8%A1%E6%9D%BF%EF%BC%88%E9%9B%86%E6%88%90naiveui%20tailwindcss%EF%BC%89/node_modules/.pnpm/@vitejs+plugin-vue@5.1.3_vite@5.4.1_@types+node@10.17.60_sass-embedded@1.79.5_sass@1.78.0_ter_2azoun42ukbvq6zuqhhg42g37y/node_modules/@vitejs/plugin-vue/dist/index.mjs";
import progress from "file:///D:/mydev/vue%E6%A8%A1%E6%9D%BF/vue%E6%A8%A1%E6%9D%BF/Vue3%E6%A8%A1%E6%9D%BF/%E9%9B%86%E6%88%90tailwindcss%E7%9A%84vue3%E6%A8%A1%E6%9D%BF/%E5%9F%BA%E7%A1%80%E6%A8%A1%E6%9D%BF%EF%BC%88%E9%9B%86%E6%88%90naiveui%20tailwindcss%EF%BC%89/node_modules/.pnpm/vite-plugin-progress@0.0.7_vite@5.4.1_@types+node@10.17.60_sass-embedded@1.79.5_sass@1.78.0_terser@5.32.0_/node_modules/vite-plugin-progress/dist/index.mjs";
import { createSvgIconsPlugin } from "file:///D:/mydev/vue%E6%A8%A1%E6%9D%BF/vue%E6%A8%A1%E6%9D%BF/Vue3%E6%A8%A1%E6%9D%BF/%E9%9B%86%E6%88%90tailwindcss%E7%9A%84vue3%E6%A8%A1%E6%9D%BF/%E5%9F%BA%E7%A1%80%E6%A8%A1%E6%9D%BF%EF%BC%88%E9%9B%86%E6%88%90naiveui%20tailwindcss%EF%BC%89/node_modules/.pnpm/vite-plugin-svg-icons@2.0.1_vite@5.4.1_@types+node@10.17.60_sass-embedded@1.79.5_sass@1.78.0_terser@5.32.0_/node_modules/vite-plugin-svg-icons/dist/index.mjs";
import VueDevtools from "file:///D:/mydev/vue%E6%A8%A1%E6%9D%BF/vue%E6%A8%A1%E6%9D%BF/Vue3%E6%A8%A1%E6%9D%BF/%E9%9B%86%E6%88%90tailwindcss%E7%9A%84vue3%E6%A8%A1%E6%9D%BF/%E5%9F%BA%E7%A1%80%E6%A8%A1%E6%9D%BF%EF%BC%88%E9%9B%86%E6%88%90naiveui%20tailwindcss%EF%BC%89/node_modules/.pnpm/vite-plugin-vue-devtools@7.3.9_rollup@4.21.2_vite@5.4.1_@types+node@10.17.60_sass-embedded@1._oftk3n4cnpooetvtgg53ajmiqm/node_modules/vite-plugin-vue-devtools/dist/vite.mjs";
import path from "path";
import { createHtmlPlugin } from "file:///D:/mydev/vue%E6%A8%A1%E6%9D%BF/vue%E6%A8%A1%E6%9D%BF/Vue3%E6%A8%A1%E6%9D%BF/%E9%9B%86%E6%88%90tailwindcss%E7%9A%84vue3%E6%A8%A1%E6%9D%BF/%E5%9F%BA%E7%A1%80%E6%A8%A1%E6%9D%BF%EF%BC%88%E9%9B%86%E6%88%90naiveui%20tailwindcss%EF%BC%89/node_modules/.pnpm/vite-plugin-html@3.2.2_vite@5.4.1_@types+node@10.17.60_sass-embedded@1.79.5_sass@1.78.0_terser@5.32.0_/node_modules/vite-plugin-html/dist/index.mjs";
function createVitePlugins() {
  return [
    vue(),
    progress(),
    VueDevtools(),
    createSvgIconsPlugin({
      // 指定需要缓存的图标文件夹(路径为存放所有svg图标的文件夹不单个svg图标)
      iconDirs: [path.resolve(process.cwd(), "src/assets/icons")],
      // 指定symbolId格式
      symbolId: "icon-[dir]-[name]"
    })
  ];
}
function createHtmlPluginH() {
  return createHtmlPlugin({
    minify: false,
    // 是否压缩index.html文件，这里选择不压缩
    pages: [
      {
        template: "index.html",
        filename: "index.html",
        injectOptions: {
          data: {
            buildTime: (/* @__PURE__ */ new Date()).toLocaleString()
            // 这里就是记录的当前打包的时间。前面的键位名称‘buildTime’需要个index.html文件中的相对应
          }
        }
      }
    ]
  });
}
function createViteBuild() {
  return {
    reportCompressedSize: false,
    sourcemap: false,
    commonjsOptions: {
      ignoreTryCatch: false
    },
    minify: "esbuild",
    // 手动分包
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("node_modules")) {
            return id.toString().split("node_modules/")[1].split("/")[0].toString();
          }
        }
      }
    }
  };
}
function createViteServer() {
  return {
    host: "0.0.0.0",
    port: 9527,
    open: true,
    // proxy: {
    //   // 代理所有以api开头的请求
    //   '/api': {
    //     target: 'https://api.example.com',
    //     changeOrigin: true,
    //     rewrite: (path) => path.replace(/^\/api/, ''),
    //   },
    // },
    fs: {
      cachedChecks: false
    }
  };
}

// vite.config.ts
import AutoImport from "file:///D:/mydev/vue%E6%A8%A1%E6%9D%BF/vue%E6%A8%A1%E6%9D%BF/Vue3%E6%A8%A1%E6%9D%BF/%E9%9B%86%E6%88%90tailwindcss%E7%9A%84vue3%E6%A8%A1%E6%9D%BF/%E5%9F%BA%E7%A1%80%E6%A8%A1%E6%9D%BF%EF%BC%88%E9%9B%86%E6%88%90naiveui%20tailwindcss%EF%BC%89/node_modules/.pnpm/unplugin-auto-import@0.18.2_@vueuse+core@11.0.3_vue@3.4.38_typescript@5.5.4___rollup@4.21.2/node_modules/unplugin-auto-import/dist/vite.js";
import Components from "file:///D:/mydev/vue%E6%A8%A1%E6%9D%BF/vue%E6%A8%A1%E6%9D%BF/Vue3%E6%A8%A1%E6%9D%BF/%E9%9B%86%E6%88%90tailwindcss%E7%9A%84vue3%E6%A8%A1%E6%9D%BF/%E5%9F%BA%E7%A1%80%E6%A8%A1%E6%9D%BF%EF%BC%88%E9%9B%86%E6%88%90naiveui%20tailwindcss%EF%BC%89/node_modules/.pnpm/unplugin-vue-components@0.27.4_@babel+parser@7.25.6_rollup@4.21.2_vue@3.4.38_typescript@5.5.4_/node_modules/unplugin-vue-components/dist/vite.js";
import { NaiveUiResolver } from "file:///D:/mydev/vue%E6%A8%A1%E6%9D%BF/vue%E6%A8%A1%E6%9D%BF/Vue3%E6%A8%A1%E6%9D%BF/%E9%9B%86%E6%88%90tailwindcss%E7%9A%84vue3%E6%A8%A1%E6%9D%BF/%E5%9F%BA%E7%A1%80%E6%A8%A1%E6%9D%BF%EF%BC%88%E9%9B%86%E6%88%90naiveui%20tailwindcss%EF%BC%89/node_modules/.pnpm/unplugin-vue-components@0.27.4_@babel+parser@7.25.6_rollup@4.21.2_vue@3.4.38_typescript@5.5.4_/node_modules/unplugin-vue-components/dist/resolvers.js";
var __vite_injected_original_import_meta_url = "file:///D:/mydev/vue%E6%A8%A1%E6%9D%BF/vue%E6%A8%A1%E6%9D%BF/Vue3%E6%A8%A1%E6%9D%BF/%E9%9B%86%E6%88%90tailwindcss%E7%9A%84vue3%E6%A8%A1%E6%9D%BF/%E5%9F%BA%E7%A1%80%E6%A8%A1%E6%9D%BF%EF%BC%88%E9%9B%86%E6%88%90naiveui%20tailwindcss%EF%BC%89/vite.config.ts";
var vite_config_default = defineConfig({
  resolve: {
    alias: {
      "~": fileURLToPath(new URL("./", __vite_injected_original_import_meta_url)),
      "@": fileURLToPath(new URL("./src", __vite_injected_original_import_meta_url))
    }
  },
  plugins: [
    createVitePlugins(),
    createHtmlPluginH(),
    AutoImport({
      imports: [
        "vue",
        {
          "naive-ui": ["useDialog", "useMessage", "useNotification", "useLoadingBar"]
        }
      ]
    }),
    Components({
      resolvers: [NaiveUiResolver()]
    })
  ],
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@use "/src/styles/scss/global.scss" as *; @import "/src/styles/scss/mixins.scss";`,
        api: "modern"
      }
    }
  },
  // 全局环境变量
  define: {
    BUILD_TIME: JSON.stringify((/* @__PURE__ */ new Date()).toLocaleString())
    // 将 buildTime 作为全局变量注入
  },
  server: createViteServer(),
  build: createViteBuild()
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiLCAiYnVpbGQvcGx1Z2lucy9pbmRleC50cyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIkQ6XFxcXG15ZGV2XFxcXHZ1ZVx1NkEyMVx1Njc3RlxcXFx2dWVcdTZBMjFcdTY3N0ZcXFxcVnVlM1x1NkEyMVx1Njc3RlxcXFxcdTk2QzZcdTYyMTB0YWlsd2luZGNzc1x1NzY4NHZ1ZTNcdTZBMjFcdTY3N0ZcXFxcXHU1N0ZBXHU3ODQwXHU2QTIxXHU2NzdGXHVGRjA4XHU5NkM2XHU2MjEwbmFpdmV1aSB0YWlsd2luZGNzc1x1RkYwOVwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiRDpcXFxcbXlkZXZcXFxcdnVlXHU2QTIxXHU2NzdGXFxcXHZ1ZVx1NkEyMVx1Njc3RlxcXFxWdWUzXHU2QTIxXHU2NzdGXFxcXFx1OTZDNlx1NjIxMHRhaWx3aW5kY3NzXHU3Njg0dnVlM1x1NkEyMVx1Njc3RlxcXFxcdTU3RkFcdTc4NDBcdTZBMjFcdTY3N0ZcdUZGMDhcdTk2QzZcdTYyMTBuYWl2ZXVpIHRhaWx3aW5kY3NzXHVGRjA5XFxcXHZpdGUuY29uZmlnLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9EOi9teWRldi92dWUlRTYlQTglQTElRTYlOUQlQkYvdnVlJUU2JUE4JUExJUU2JTlEJUJGL1Z1ZTMlRTYlQTglQTElRTYlOUQlQkYvJUU5JTlCJTg2JUU2JTg4JTkwdGFpbHdpbmRjc3MlRTclOUElODR2dWUzJUU2JUE4JUExJUU2JTlEJUJGLyVFNSU5RiVCQSVFNyVBMSU4MCVFNiVBOCVBMSVFNiU5RCVCRiVFRiVCQyU4OCVFOSU5QiU4NiVFNiU4OCU5MG5haXZldWklMjB0YWlsd2luZGNzcyVFRiVCQyU4OS92aXRlLmNvbmZpZy50c1wiO2ltcG9ydCB7IGRlZmluZUNvbmZpZyB9IGZyb20gJ3ZpdGUnXG5pbXBvcnQgeyBVUkwsIGZpbGVVUkxUb1BhdGggfSBmcm9tICd1cmwnXG5pbXBvcnQgeyBjcmVhdGVWaXRlUGx1Z2lucywgY3JlYXRlVml0ZUJ1aWxkLCBjcmVhdGVWaXRlU2VydmVyLCBjcmVhdGVIdG1sUGx1Z2luSCB9IGZyb20gJy4vYnVpbGQvcGx1Z2lucy9pbmRleCdcbmltcG9ydCBBdXRvSW1wb3J0IGZyb20gJ3VucGx1Z2luLWF1dG8taW1wb3J0L3ZpdGUnXG5pbXBvcnQgQ29tcG9uZW50cyBmcm9tICd1bnBsdWdpbi12dWUtY29tcG9uZW50cy92aXRlJ1xuaW1wb3J0IHsgTmFpdmVVaVJlc29sdmVyIH0gZnJvbSAndW5wbHVnaW4tdnVlLWNvbXBvbmVudHMvcmVzb2x2ZXJzJ1xuXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoe1xuICByZXNvbHZlOiB7XG4gICAgYWxpYXM6IHtcbiAgICAgICd+JzogZmlsZVVSTFRvUGF0aChuZXcgVVJMKCcuLycsIGltcG9ydC5tZXRhLnVybCkpLFxuICAgICAgJ0AnOiBmaWxlVVJMVG9QYXRoKG5ldyBVUkwoJy4vc3JjJywgaW1wb3J0Lm1ldGEudXJsKSksXG4gICAgfSxcbiAgfSxcbiAgcGx1Z2luczogW1xuICAgIGNyZWF0ZVZpdGVQbHVnaW5zKCksXG4gICAgY3JlYXRlSHRtbFBsdWdpbkgoKSxcbiAgICBBdXRvSW1wb3J0KHtcbiAgICAgIGltcG9ydHM6IFtcbiAgICAgICAgJ3Z1ZScsXG4gICAgICAgIHtcbiAgICAgICAgICAnbmFpdmUtdWknOiBbJ3VzZURpYWxvZycsICd1c2VNZXNzYWdlJywgJ3VzZU5vdGlmaWNhdGlvbicsICd1c2VMb2FkaW5nQmFyJ10sXG4gICAgICAgIH0sXG4gICAgICBdLFxuICAgIH0pLFxuICAgIENvbXBvbmVudHMoe1xuICAgICAgcmVzb2x2ZXJzOiBbTmFpdmVVaVJlc29sdmVyKCldLFxuICAgIH0pLFxuICBdLFxuICBjc3M6IHtcbiAgICBwcmVwcm9jZXNzb3JPcHRpb25zOiB7XG4gICAgICBzY3NzOiB7XG4gICAgICAgIGFkZGl0aW9uYWxEYXRhOiBgQHVzZSBcIi9zcmMvc3R5bGVzL3Njc3MvZ2xvYmFsLnNjc3NcIiBhcyAqOyBAaW1wb3J0IFwiL3NyYy9zdHlsZXMvc2Nzcy9taXhpbnMuc2Nzc1wiO2AsXG4gICAgICAgIGFwaTogJ21vZGVybicsXG4gICAgICB9LFxuICAgIH0sXG4gIH0sXG4gIC8vIFx1NTE2OFx1NUM0MFx1NzNBRlx1NTg4M1x1NTNEOFx1OTFDRlxuXG4gIGRlZmluZToge1xuICAgIEJVSUxEX1RJTUU6IEpTT04uc3RyaW5naWZ5KG5ldyBEYXRlKCkudG9Mb2NhbGVTdHJpbmcoKSksIC8vIFx1NUMwNiBidWlsZFRpbWUgXHU0RjVDXHU0RTNBXHU1MTY4XHU1QzQwXHU1M0Q4XHU5MUNGXHU2Q0U4XHU1MTY1XG4gIH0sXG4gIHNlcnZlcjogY3JlYXRlVml0ZVNlcnZlcigpLFxuICBidWlsZDogY3JlYXRlVml0ZUJ1aWxkKCksXG59KVxuIiwgImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJEOlxcXFxteWRldlxcXFx2dWVcdTZBMjFcdTY3N0ZcXFxcdnVlXHU2QTIxXHU2NzdGXFxcXFZ1ZTNcdTZBMjFcdTY3N0ZcXFxcXHU5NkM2XHU2MjEwdGFpbHdpbmRjc3NcdTc2ODR2dWUzXHU2QTIxXHU2NzdGXFxcXFx1NTdGQVx1Nzg0MFx1NkEyMVx1Njc3Rlx1RkYwOFx1OTZDNlx1NjIxMG5haXZldWkgdGFpbHdpbmRjc3NcdUZGMDlcXFxcYnVpbGRcXFxccGx1Z2luc1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiRDpcXFxcbXlkZXZcXFxcdnVlXHU2QTIxXHU2NzdGXFxcXHZ1ZVx1NkEyMVx1Njc3RlxcXFxWdWUzXHU2QTIxXHU2NzdGXFxcXFx1OTZDNlx1NjIxMHRhaWx3aW5kY3NzXHU3Njg0dnVlM1x1NkEyMVx1Njc3RlxcXFxcdTU3RkFcdTc4NDBcdTZBMjFcdTY3N0ZcdUZGMDhcdTk2QzZcdTYyMTBuYWl2ZXVpIHRhaWx3aW5kY3NzXHVGRjA5XFxcXGJ1aWxkXFxcXHBsdWdpbnNcXFxcaW5kZXgudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0Q6L215ZGV2L3Z1ZSVFNiVBOCVBMSVFNiU5RCVCRi92dWUlRTYlQTglQTElRTYlOUQlQkYvVnVlMyVFNiVBOCVBMSVFNiU5RCVCRi8lRTklOUIlODYlRTYlODglOTB0YWlsd2luZGNzcyVFNyU5QSU4NHZ1ZTMlRTYlQTglQTElRTYlOUQlQkYvJUU1JTlGJUJBJUU3JUExJTgwJUU2JUE4JUExJUU2JTlEJUJGJUVGJUJDJTg4JUU5JTlCJTg2JUU2JTg4JTkwbmFpdmV1aSUyMHRhaWx3aW5kY3NzJUVGJUJDJTg5L2J1aWxkL3BsdWdpbnMvaW5kZXgudHNcIjsvLyB2aXRlLnBsdWdpbnMudHNcbmltcG9ydCB2dWUgZnJvbSAnQHZpdGVqcy9wbHVnaW4tdnVlJ1xuaW1wb3J0IHR5cGUgeyBQbHVnaW5PcHRpb24sIEJ1aWxkT3B0aW9ucywgU2VydmVyT3B0aW9ucyB9IGZyb20gJ3ZpdGUnXG5pbXBvcnQgcHJvZ3Jlc3MgZnJvbSAndml0ZS1wbHVnaW4tcHJvZ3Jlc3MnXG5pbXBvcnQgeyBjcmVhdGVTdmdJY29uc1BsdWdpbiB9IGZyb20gJ3ZpdGUtcGx1Z2luLXN2Zy1pY29ucydcbmltcG9ydCBWdWVEZXZ0b29scyBmcm9tICd2aXRlLXBsdWdpbi12dWUtZGV2dG9vbHMnXG5pbXBvcnQgcGF0aCBmcm9tICdwYXRoJ1xuaW1wb3J0IHsgY3JlYXRlSHRtbFBsdWdpbiB9IGZyb20gJ3ZpdGUtcGx1Z2luLWh0bWwnXG5cbi8vIFx1NjNEMlx1NEVGNlxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZVZpdGVQbHVnaW5zKCk6IFBsdWdpbk9wdGlvbltdIHtcbiAgcmV0dXJuIFtcbiAgICB2dWUoKSxcbiAgICBwcm9ncmVzcygpLFxuICAgIFZ1ZURldnRvb2xzKCksXG4gICAgY3JlYXRlU3ZnSWNvbnNQbHVnaW4oe1xuICAgICAgLy8gXHU2MzA3XHU1QjlBXHU5NzAwXHU4OTgxXHU3RjEzXHU1QjU4XHU3Njg0XHU1NkZFXHU2ODA3XHU2NTg3XHU0RUY2XHU1OTM5KFx1OERFRlx1NUY4NFx1NEUzQVx1NUI1OFx1NjUzRVx1NjI0MFx1NjcwOXN2Z1x1NTZGRVx1NjgwN1x1NzY4NFx1NjU4N1x1NEVGNlx1NTkzOVx1NEUwRFx1NTM1NVx1NEUyQXN2Z1x1NTZGRVx1NjgwNylcbiAgICAgIGljb25EaXJzOiBbcGF0aC5yZXNvbHZlKHByb2Nlc3MuY3dkKCksICdzcmMvYXNzZXRzL2ljb25zJyldLFxuICAgICAgLy8gXHU2MzA3XHU1QjlBc3ltYm9sSWRcdTY4M0NcdTVGMEZcbiAgICAgIHN5bWJvbElkOiAnaWNvbi1bZGlyXS1bbmFtZV0nLFxuICAgIH0pLFxuICBdXG59XG4vLyBcdTdFRDlodG1sXHU2QTIxXHU3MjQ4XHU2REZCXHU1MkEwXHU2MjUzXHU1MzA1XHU3Njg0XHU2NUY2XHU5NUY0XG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlSHRtbFBsdWdpbkgoKSB7XG4gIHJldHVybiBjcmVhdGVIdG1sUGx1Z2luKHtcbiAgICBtaW5pZnk6IGZhbHNlLCAvLyBcdTY2MkZcdTU0MjZcdTUzOEJcdTdGMjlpbmRleC5odG1sXHU2NTg3XHU0RUY2XHVGRjBDXHU4RkQ5XHU5MUNDXHU5MDA5XHU2MkU5XHU0RTBEXHU1MzhCXHU3RjI5XG4gICAgcGFnZXM6IFtcbiAgICAgIHtcbiAgICAgICAgdGVtcGxhdGU6ICdpbmRleC5odG1sJyxcbiAgICAgICAgZmlsZW5hbWU6ICdpbmRleC5odG1sJyxcbiAgICAgICAgaW5qZWN0T3B0aW9uczoge1xuICAgICAgICAgIGRhdGE6IHtcbiAgICAgICAgICAgIGJ1aWxkVGltZTogbmV3IERhdGUoKS50b0xvY2FsZVN0cmluZygpLCAvLyBcdThGRDlcdTkxQ0NcdTVDMzFcdTY2MkZcdThCQjBcdTVGNTVcdTc2ODRcdTVGNTNcdTUyNERcdTYyNTNcdTUzMDVcdTc2ODRcdTY1RjZcdTk1RjRcdTMwMDJcdTUyNERcdTk3NjJcdTc2ODRcdTk1MkVcdTRGNERcdTU0MERcdTc5RjBcdTIwMThidWlsZFRpbWVcdTIwMTlcdTk3MDBcdTg5ODFcdTRFMkFpbmRleC5odG1sXHU2NTg3XHU0RUY2XHU0RTJEXHU3Njg0XHU3NkY4XHU1QkY5XHU1RTk0XG4gICAgICAgICAgfSxcbiAgICAgICAgfSxcbiAgICAgIH0sXG4gICAgXSxcbiAgfSlcbn1cblxuLy8gYnVpbGRcbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVWaXRlQnVpbGQoKTogQnVpbGRPcHRpb25zIHwgdW5kZWZpbmVkIHtcbiAgcmV0dXJuIHtcbiAgICByZXBvcnRDb21wcmVzc2VkU2l6ZTogZmFsc2UsXG4gICAgc291cmNlbWFwOiBmYWxzZSxcbiAgICBjb21tb25qc09wdGlvbnM6IHtcbiAgICAgIGlnbm9yZVRyeUNhdGNoOiBmYWxzZSxcbiAgICB9LFxuICAgIG1pbmlmeTogJ2VzYnVpbGQnLFxuICAgIC8vIFx1NjI0Qlx1NTJBOFx1NTIwNlx1NTMwNVxuICAgIHJvbGx1cE9wdGlvbnM6IHtcbiAgICAgIG91dHB1dDoge1xuICAgICAgICBtYW51YWxDaHVua3MoaWQpIHtcbiAgICAgICAgICBpZiAoaWQuaW5jbHVkZXMoJ25vZGVfbW9kdWxlcycpKSB7XG4gICAgICAgICAgICByZXR1cm4gaWQudG9TdHJpbmcoKS5zcGxpdCgnbm9kZV9tb2R1bGVzLycpWzFdLnNwbGl0KCcvJylbMF0udG9TdHJpbmcoKVxuICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgIH0sXG4gICAgfSxcbiAgfVxufVxuLy8gc2VydmVyXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlVml0ZVNlcnZlcigpOiBTZXJ2ZXJPcHRpb25zIHwgdW5kZWZpbmVkIHtcbiAgcmV0dXJuIHtcbiAgICBob3N0OiAnMC4wLjAuMCcsXG4gICAgcG9ydDogOTUyNyxcbiAgICBvcGVuOiB0cnVlLFxuICAgIC8vIHByb3h5OiB7XG4gICAgLy8gICAvLyBcdTRFRTNcdTc0MDZcdTYyNDBcdTY3MDlcdTRFRTVhcGlcdTVGMDBcdTU5MzRcdTc2ODRcdThCRjdcdTZDNDJcbiAgICAvLyAgICcvYXBpJzoge1xuICAgIC8vICAgICB0YXJnZXQ6ICdodHRwczovL2FwaS5leGFtcGxlLmNvbScsXG4gICAgLy8gICAgIGNoYW5nZU9yaWdpbjogdHJ1ZSxcbiAgICAvLyAgICAgcmV3cml0ZTogKHBhdGgpID0+IHBhdGgucmVwbGFjZSgvXlxcL2FwaS8sICcnKSxcbiAgICAvLyAgIH0sXG4gICAgLy8gfSxcbiAgICBmczoge1xuICAgICAgY2FjaGVkQ2hlY2tzOiBmYWxzZSxcbiAgICB9LFxuICB9XG59XG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQThqQixTQUFTLG9CQUFvQjtBQUMzbEIsU0FBUyxLQUFLLHFCQUFxQjs7O0FDQW5DLE9BQU8sU0FBUztBQUVoQixPQUFPLGNBQWM7QUFDckIsU0FBUyw0QkFBNEI7QUFDckMsT0FBTyxpQkFBaUI7QUFDeEIsT0FBTyxVQUFVO0FBQ2pCLFNBQVMsd0JBQXdCO0FBRzFCLFNBQVMsb0JBQW9DO0FBQ2xELFNBQU87QUFBQSxJQUNMLElBQUk7QUFBQSxJQUNKLFNBQVM7QUFBQSxJQUNULFlBQVk7QUFBQSxJQUNaLHFCQUFxQjtBQUFBO0FBQUEsTUFFbkIsVUFBVSxDQUFDLEtBQUssUUFBUSxRQUFRLElBQUksR0FBRyxrQkFBa0IsQ0FBQztBQUFBO0FBQUEsTUFFMUQsVUFBVTtBQUFBLElBQ1osQ0FBQztBQUFBLEVBQ0g7QUFDRjtBQUVPLFNBQVMsb0JBQW9CO0FBQ2xDLFNBQU8saUJBQWlCO0FBQUEsSUFDdEIsUUFBUTtBQUFBO0FBQUEsSUFDUixPQUFPO0FBQUEsTUFDTDtBQUFBLFFBQ0UsVUFBVTtBQUFBLFFBQ1YsVUFBVTtBQUFBLFFBQ1YsZUFBZTtBQUFBLFVBQ2IsTUFBTTtBQUFBLFlBQ0osWUFBVyxvQkFBSSxLQUFLLEdBQUUsZUFBZTtBQUFBO0FBQUEsVUFDdkM7QUFBQSxRQUNGO0FBQUEsTUFDRjtBQUFBLElBQ0Y7QUFBQSxFQUNGLENBQUM7QUFDSDtBQUdPLFNBQVMsa0JBQTRDO0FBQzFELFNBQU87QUFBQSxJQUNMLHNCQUFzQjtBQUFBLElBQ3RCLFdBQVc7QUFBQSxJQUNYLGlCQUFpQjtBQUFBLE1BQ2YsZ0JBQWdCO0FBQUEsSUFDbEI7QUFBQSxJQUNBLFFBQVE7QUFBQTtBQUFBLElBRVIsZUFBZTtBQUFBLE1BQ2IsUUFBUTtBQUFBLFFBQ04sYUFBYSxJQUFJO0FBQ2YsY0FBSSxHQUFHLFNBQVMsY0FBYyxHQUFHO0FBQy9CLG1CQUFPLEdBQUcsU0FBUyxFQUFFLE1BQU0sZUFBZSxFQUFFLENBQUMsRUFBRSxNQUFNLEdBQUcsRUFBRSxDQUFDLEVBQUUsU0FBUztBQUFBLFVBQ3hFO0FBQUEsUUFDRjtBQUFBLE1BQ0Y7QUFBQSxJQUNGO0FBQUEsRUFDRjtBQUNGO0FBRU8sU0FBUyxtQkFBOEM7QUFDNUQsU0FBTztBQUFBLElBQ0wsTUFBTTtBQUFBLElBQ04sTUFBTTtBQUFBLElBQ04sTUFBTTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxJQVNOLElBQUk7QUFBQSxNQUNGLGNBQWM7QUFBQSxJQUNoQjtBQUFBLEVBQ0Y7QUFDRjs7O0FEN0VBLE9BQU8sZ0JBQWdCO0FBQ3ZCLE9BQU8sZ0JBQWdCO0FBQ3ZCLFNBQVMsdUJBQXVCO0FBTDZPLElBQU0sMkNBQTJDO0FBTzlULElBQU8sc0JBQVEsYUFBYTtBQUFBLEVBQzFCLFNBQVM7QUFBQSxJQUNQLE9BQU87QUFBQSxNQUNMLEtBQUssY0FBYyxJQUFJLElBQUksTUFBTSx3Q0FBZSxDQUFDO0FBQUEsTUFDakQsS0FBSyxjQUFjLElBQUksSUFBSSxTQUFTLHdDQUFlLENBQUM7QUFBQSxJQUN0RDtBQUFBLEVBQ0Y7QUFBQSxFQUNBLFNBQVM7QUFBQSxJQUNQLGtCQUFrQjtBQUFBLElBQ2xCLGtCQUFrQjtBQUFBLElBQ2xCLFdBQVc7QUFBQSxNQUNULFNBQVM7QUFBQSxRQUNQO0FBQUEsUUFDQTtBQUFBLFVBQ0UsWUFBWSxDQUFDLGFBQWEsY0FBYyxtQkFBbUIsZUFBZTtBQUFBLFFBQzVFO0FBQUEsTUFDRjtBQUFBLElBQ0YsQ0FBQztBQUFBLElBQ0QsV0FBVztBQUFBLE1BQ1QsV0FBVyxDQUFDLGdCQUFnQixDQUFDO0FBQUEsSUFDL0IsQ0FBQztBQUFBLEVBQ0g7QUFBQSxFQUNBLEtBQUs7QUFBQSxJQUNILHFCQUFxQjtBQUFBLE1BQ25CLE1BQU07QUFBQSxRQUNKLGdCQUFnQjtBQUFBLFFBQ2hCLEtBQUs7QUFBQSxNQUNQO0FBQUEsSUFDRjtBQUFBLEVBQ0Y7QUFBQTtBQUFBLEVBR0EsUUFBUTtBQUFBLElBQ04sWUFBWSxLQUFLLFdBQVUsb0JBQUksS0FBSyxHQUFFLGVBQWUsQ0FBQztBQUFBO0FBQUEsRUFDeEQ7QUFBQSxFQUNBLFFBQVEsaUJBQWlCO0FBQUEsRUFDekIsT0FBTyxnQkFBZ0I7QUFDekIsQ0FBQzsiLAogICJuYW1lcyI6IFtdCn0K
