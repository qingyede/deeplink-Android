// vite.config.ts
import { defineConfig } from "file:///C:/Users/28639/Desktop/DBC/DeepLinkApp/deeplink-h5-app-2/naiveui-tailwindcss/node_modules/.pnpm/vite@5.4.1_@types+node@22.7_45cfd70f96226893919a51e491b5190a/node_modules/vite/dist/node/index.js";
import { URL, fileURLToPath } from "url";

// build/plugins/index.ts
import vue from "file:///C:/Users/28639/Desktop/DBC/DeepLinkApp/deeplink-h5-app-2/naiveui-tailwindcss/node_modules/.pnpm/@vitejs+plugin-vue@5.1.3_vi_d71762d10795e7113db59e0aa43b1eab/node_modules/@vitejs/plugin-vue/dist/index.mjs";
import progress from "file:///C:/Users/28639/Desktop/DBC/DeepLinkApp/deeplink-h5-app-2/naiveui-tailwindcss/node_modules/.pnpm/vite-plugin-progress@0.0.7__c93a4fde1728012e55fa8059b5c40ec8/node_modules/vite-plugin-progress/dist/index.mjs";
import { createSvgIconsPlugin } from "file:///C:/Users/28639/Desktop/DBC/DeepLinkApp/deeplink-h5-app-2/naiveui-tailwindcss/node_modules/.pnpm/vite-plugin-svg-icons@2.0.1_584d178011e0e71b95b5cda0454ffdab/node_modules/vite-plugin-svg-icons/dist/index.mjs";
import VueDevtools from "file:///C:/Users/28639/Desktop/DBC/DeepLinkApp/deeplink-h5-app-2/naiveui-tailwindcss/node_modules/.pnpm/vite-plugin-vue-devtools@7._f5062ab55f23604604892169f2d3b409/node_modules/vite-plugin-vue-devtools/dist/vite.mjs";
import path from "path";
import legacy from "file:///C:/Users/28639/Desktop/DBC/DeepLinkApp/deeplink-h5-app-2/naiveui-tailwindcss/node_modules/.pnpm/@vitejs+plugin-legacy@7.0.0_72c858ede92384e3cc444e5200761481/node_modules/@vitejs/plugin-legacy/dist/index.js";
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
    }),
    legacy({
      targets: ["defaults", "not IE 11"]
    })
  ];
}
function createViteBuild() {
  return {
    target: "es2015",
    // 👈 兼容大部分 Android WebView
    outDir: "dist",
    assetsDir: "assets",
    rollupOptions: {
      input: "h5.html",
      output: {
        format: "iife",
        // 👈 非模块格式（关键）
        entryFileNames: `assets/[name].js`,
        chunkFileNames: `assets/[name].js`,
        assetFileNames: `assets/[name].[ext]`
      }
    }
  };
}
function createViteServer() {
  return {
    host: "0.0.0.0",
    port: 5173,
    open: "/h5.html",
    fs: {
      cachedChecks: false
    }
  };
}

// vite.config.ts
import AutoImport from "file:///C:/Users/28639/Desktop/DBC/DeepLinkApp/deeplink-h5-app-2/naiveui-tailwindcss/node_modules/.pnpm/unplugin-auto-import@0.18.2_63c038a48779a0f3a6f0f1a78d64a8f1/node_modules/unplugin-auto-import/dist/vite.js";
import Components from "file:///C:/Users/28639/Desktop/DBC/DeepLinkApp/deeplink-h5-app-2/naiveui-tailwindcss/node_modules/.pnpm/unplugin-vue-components@0.2_f981772e4d527ed24120794134215146/node_modules/unplugin-vue-components/dist/vite.js";
import { NaiveUiResolver } from "file:///C:/Users/28639/Desktop/DBC/DeepLinkApp/deeplink-h5-app-2/naiveui-tailwindcss/node_modules/.pnpm/unplugin-vue-components@0.2_f981772e4d527ed24120794134215146/node_modules/unplugin-vue-components/dist/resolvers.js";
var __vite_injected_original_import_meta_url = "file:///C:/Users/28639/Desktop/DBC/DeepLinkApp/deeplink-h5-app-2/naiveui-tailwindcss/vite.config.ts";
var vite_config_default = defineConfig({
  base: "./",
  esbuild: {
    target: "es2015"
  },
  resolve: {
    alias: {
      "~": fileURLToPath(new URL("./", __vite_injected_original_import_meta_url)),
      "@": fileURLToPath(new URL("./src", __vite_injected_original_import_meta_url))
    }
  },
  plugins: [
    createVitePlugins(),
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
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiLCAiYnVpbGQvcGx1Z2lucy9pbmRleC50cyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIkM6XFxcXFVzZXJzXFxcXDI4NjM5XFxcXERlc2t0b3BcXFxcREJDXFxcXERlZXBMaW5rQXBwXFxcXGRlZXBsaW5rLWg1LWFwcC0yXFxcXG5haXZldWktdGFpbHdpbmRjc3NcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkM6XFxcXFVzZXJzXFxcXDI4NjM5XFxcXERlc2t0b3BcXFxcREJDXFxcXERlZXBMaW5rQXBwXFxcXGRlZXBsaW5rLWg1LWFwcC0yXFxcXG5haXZldWktdGFpbHdpbmRjc3NcXFxcdml0ZS5jb25maWcudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0M6L1VzZXJzLzI4NjM5L0Rlc2t0b3AvREJDL0RlZXBMaW5rQXBwL2RlZXBsaW5rLWg1LWFwcC0yL25haXZldWktdGFpbHdpbmRjc3Mvdml0ZS5jb25maWcudHNcIjtpbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tICd2aXRlJ1xuaW1wb3J0IHsgVVJMLCBmaWxlVVJMVG9QYXRoIH0gZnJvbSAndXJsJ1xuaW1wb3J0IHsgY3JlYXRlVml0ZVBsdWdpbnMsIGNyZWF0ZVZpdGVCdWlsZCwgY3JlYXRlVml0ZVNlcnZlciB9IGZyb20gJy4vYnVpbGQvcGx1Z2lucy9pbmRleCdcbmltcG9ydCBBdXRvSW1wb3J0IGZyb20gJ3VucGx1Z2luLWF1dG8taW1wb3J0L3ZpdGUnXG5pbXBvcnQgQ29tcG9uZW50cyBmcm9tICd1bnBsdWdpbi12dWUtY29tcG9uZW50cy92aXRlJ1xuaW1wb3J0IHsgTmFpdmVVaVJlc29sdmVyIH0gZnJvbSAndW5wbHVnaW4tdnVlLWNvbXBvbmVudHMvcmVzb2x2ZXJzJ1xuXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoe1xuICBiYXNlOiAnLi8nLFxuICBlc2J1aWxkOiB7XG4gICAgdGFyZ2V0OiAnZXMyMDE1JyxcbiAgfSxcbiAgcmVzb2x2ZToge1xuICAgIGFsaWFzOiB7XG4gICAgICAnfic6IGZpbGVVUkxUb1BhdGgobmV3IFVSTCgnLi8nLCBpbXBvcnQubWV0YS51cmwpKSxcbiAgICAgICdAJzogZmlsZVVSTFRvUGF0aChuZXcgVVJMKCcuL3NyYycsIGltcG9ydC5tZXRhLnVybCkpLFxuICAgIH0sXG4gIH0sXG4gIHBsdWdpbnM6IFtcbiAgICBjcmVhdGVWaXRlUGx1Z2lucygpLFxuICAgIEF1dG9JbXBvcnQoe1xuICAgICAgaW1wb3J0czogW1xuICAgICAgICAndnVlJyxcbiAgICAgICAge1xuICAgICAgICAgICduYWl2ZS11aSc6IFsndXNlRGlhbG9nJywgJ3VzZU1lc3NhZ2UnLCAndXNlTm90aWZpY2F0aW9uJywgJ3VzZUxvYWRpbmdCYXInXSxcbiAgICAgICAgfSxcbiAgICAgIF0sXG4gICAgfSksXG4gICAgQ29tcG9uZW50cyh7XG4gICAgICByZXNvbHZlcnM6IFtOYWl2ZVVpUmVzb2x2ZXIoKV0sXG4gICAgfSksXG4gIF0sXG4gIGNzczoge1xuICAgIHByZXByb2Nlc3Nvck9wdGlvbnM6IHtcbiAgICAgIHNjc3M6IHtcbiAgICAgICAgYWRkaXRpb25hbERhdGE6IGBAdXNlIFwiL3NyYy9zdHlsZXMvc2Nzcy9nbG9iYWwuc2Nzc1wiIGFzICo7IEBpbXBvcnQgXCIvc3JjL3N0eWxlcy9zY3NzL21peGlucy5zY3NzXCI7YCxcbiAgICAgICAgYXBpOiAnbW9kZXJuJyxcbiAgICAgIH0sXG4gICAgfSxcbiAgfSxcbiAgLy8gXHU1MTY4XHU1QzQwXHU3M0FGXHU1ODgzXHU1M0Q4XHU5MUNGXG5cbiAgZGVmaW5lOiB7XG4gICAgQlVJTERfVElNRTogSlNPTi5zdHJpbmdpZnkobmV3IERhdGUoKS50b0xvY2FsZVN0cmluZygpKSwgLy8gXHU1QzA2IGJ1aWxkVGltZSBcdTRGNUNcdTRFM0FcdTUxNjhcdTVDNDBcdTUzRDhcdTkxQ0ZcdTZDRThcdTUxNjVcbiAgfSxcbiAgc2VydmVyOiBjcmVhdGVWaXRlU2VydmVyKCksXG4gIGJ1aWxkOiBjcmVhdGVWaXRlQnVpbGQoKSxcbn0pXG4iLCAiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIkM6XFxcXFVzZXJzXFxcXDI4NjM5XFxcXERlc2t0b3BcXFxcREJDXFxcXERlZXBMaW5rQXBwXFxcXGRlZXBsaW5rLWg1LWFwcC0yXFxcXG5haXZldWktdGFpbHdpbmRjc3NcXFxcYnVpbGRcXFxccGx1Z2luc1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiQzpcXFxcVXNlcnNcXFxcMjg2MzlcXFxcRGVza3RvcFxcXFxEQkNcXFxcRGVlcExpbmtBcHBcXFxcZGVlcGxpbmstaDUtYXBwLTJcXFxcbmFpdmV1aS10YWlsd2luZGNzc1xcXFxidWlsZFxcXFxwbHVnaW5zXFxcXGluZGV4LnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9DOi9Vc2Vycy8yODYzOS9EZXNrdG9wL0RCQy9EZWVwTGlua0FwcC9kZWVwbGluay1oNS1hcHAtMi9uYWl2ZXVpLXRhaWx3aW5kY3NzL2J1aWxkL3BsdWdpbnMvaW5kZXgudHNcIjsvLyB2aXRlLnBsdWdpbnMudHNcbmltcG9ydCB2dWUgZnJvbSAnQHZpdGVqcy9wbHVnaW4tdnVlJ1xuaW1wb3J0IHR5cGUgeyBQbHVnaW5PcHRpb24sIEJ1aWxkT3B0aW9ucywgU2VydmVyT3B0aW9ucyB9IGZyb20gJ3ZpdGUnXG5pbXBvcnQgcHJvZ3Jlc3MgZnJvbSAndml0ZS1wbHVnaW4tcHJvZ3Jlc3MnXG5pbXBvcnQgeyBjcmVhdGVTdmdJY29uc1BsdWdpbiB9IGZyb20gJ3ZpdGUtcGx1Z2luLXN2Zy1pY29ucydcbmltcG9ydCBWdWVEZXZ0b29scyBmcm9tICd2aXRlLXBsdWdpbi12dWUtZGV2dG9vbHMnXG5pbXBvcnQgcGF0aCBmcm9tICdwYXRoJ1xuLy8gQHRzLWlnbm9yZVxuaW1wb3J0IGxlZ2FjeSBmcm9tICdAdml0ZWpzL3BsdWdpbi1sZWdhY3knXG5cbi8vIFx1NjNEMlx1NEVGNlxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZVZpdGVQbHVnaW5zKCk6IFBsdWdpbk9wdGlvbltdIHtcbiAgcmV0dXJuIFtcbiAgICB2dWUoKSxcbiAgICBwcm9ncmVzcygpLFxuICAgIFZ1ZURldnRvb2xzKCksXG4gICAgY3JlYXRlU3ZnSWNvbnNQbHVnaW4oe1xuICAgICAgLy8gXHU2MzA3XHU1QjlBXHU5NzAwXHU4OTgxXHU3RjEzXHU1QjU4XHU3Njg0XHU1NkZFXHU2ODA3XHU2NTg3XHU0RUY2XHU1OTM5KFx1OERFRlx1NUY4NFx1NEUzQVx1NUI1OFx1NjUzRVx1NjI0MFx1NjcwOXN2Z1x1NTZGRVx1NjgwN1x1NzY4NFx1NjU4N1x1NEVGNlx1NTkzOVx1NEUwRFx1NTM1NVx1NEUyQXN2Z1x1NTZGRVx1NjgwNylcbiAgICAgIGljb25EaXJzOiBbcGF0aC5yZXNvbHZlKHByb2Nlc3MuY3dkKCksICdzcmMvYXNzZXRzL2ljb25zJyldLFxuICAgICAgLy8gXHU2MzA3XHU1QjlBc3ltYm9sSWRcdTY4M0NcdTVGMEZcbiAgICAgIHN5bWJvbElkOiAnaWNvbi1bZGlyXS1bbmFtZV0nLFxuICAgIH0pLFxuICAgIGxlZ2FjeSh7XG4gICAgICB0YXJnZXRzOiBbJ2RlZmF1bHRzJywgJ25vdCBJRSAxMSddLFxuICAgIH0pLFxuICBdXG59XG5cbi8vIGJ1aWxkXG4vLyBleHBvcnQgZnVuY3Rpb24gY3JlYXRlVml0ZUJ1aWxkKCk6IEJ1aWxkT3B0aW9ucyB8IHVuZGVmaW5lZCB7XG4vLyAgIHJldHVybiB7XG4vLyAgICAgcmVwb3J0Q29tcHJlc3NlZFNpemU6IGZhbHNlLFxuLy8gICAgIHNvdXJjZW1hcDogZmFsc2UsXG4vLyAgICAgY29tbW9uanNPcHRpb25zOiB7XG4vLyAgICAgICBpZ25vcmVUcnlDYXRjaDogZmFsc2UsXG4vLyAgICAgfSxcbi8vICAgICBtaW5pZnk6ICdlc2J1aWxkJyxcbi8vICAgICAvLyBcdTYyNEJcdTUyQThcdTUyMDZcdTUzMDVcbi8vICAgICByb2xsdXBPcHRpb25zOiB7XG4vLyAgICAgICAvLyBpbnB1dDogJ2g1Lmh0bWwnLFxuXG4vLyAgICAgICBvdXRwdXQ6IHtcbi8vICAgICAgICAgbWFudWFsQ2h1bmtzKGlkKSB7XG4vLyAgICAgICAgICAgaWYgKGlkLmluY2x1ZGVzKCdub2RlX21vZHVsZXMnKSkge1xuLy8gICAgICAgICAgICAgcmV0dXJuIGlkLnRvU3RyaW5nKCkuc3BsaXQoJ25vZGVfbW9kdWxlcy8nKVsxXS5zcGxpdCgnLycpWzBdLnRvU3RyaW5nKClcbi8vICAgICAgICAgICB9XG4vLyAgICAgICAgIH0sXG4vLyAgICAgICB9LFxuLy8gICAgIH0sXG4vLyAgIH1cbi8vIH1cblxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZVZpdGVCdWlsZCgpOiBCdWlsZE9wdGlvbnMgfCB1bmRlZmluZWQge1xuICByZXR1cm4ge1xuICAgIHRhcmdldDogJ2VzMjAxNScsIC8vIFx1RDgzRFx1REM0OCBcdTUxN0NcdTVCQjlcdTU5MjdcdTkwRThcdTUyMDYgQW5kcm9pZCBXZWJWaWV3XG4gICAgb3V0RGlyOiAnZGlzdCcsXG4gICAgYXNzZXRzRGlyOiAnYXNzZXRzJyxcbiAgICByb2xsdXBPcHRpb25zOiB7XG4gICAgICBpbnB1dDogJ2g1Lmh0bWwnLFxuICAgICAgb3V0cHV0OiB7XG4gICAgICAgIGZvcm1hdDogJ2lpZmUnLCAvLyBcdUQ4M0RcdURDNDggXHU5NzVFXHU2QTIxXHU1NzU3XHU2ODNDXHU1RjBGXHVGRjA4XHU1MTczXHU5NTJFXHVGRjA5XG4gICAgICAgIGVudHJ5RmlsZU5hbWVzOiBgYXNzZXRzL1tuYW1lXS5qc2AsXG4gICAgICAgIGNodW5rRmlsZU5hbWVzOiBgYXNzZXRzL1tuYW1lXS5qc2AsXG4gICAgICAgIGFzc2V0RmlsZU5hbWVzOiBgYXNzZXRzL1tuYW1lXS5bZXh0XWAsXG4gICAgICB9LFxuICAgIH0sXG4gIH1cbn1cblxuLy8gc2VydmVyXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlVml0ZVNlcnZlcigpOiBTZXJ2ZXJPcHRpb25zIHwgdW5kZWZpbmVkIHtcbiAgcmV0dXJuIHtcbiAgICBob3N0OiAnMC4wLjAuMCcsXG4gICAgcG9ydDogNTE3MyxcbiAgICBvcGVuOiAnL2g1Lmh0bWwnLFxuICAgIGZzOiB7XG4gICAgICBjYWNoZWRDaGVja3M6IGZhbHNlLFxuICAgIH0sXG4gIH1cbn1cbiJdLAogICJtYXBwaW5ncyI6ICI7QUFBc2EsU0FBUyxvQkFBb0I7QUFDbmMsU0FBUyxLQUFLLHFCQUFxQjs7O0FDQW5DLE9BQU8sU0FBUztBQUVoQixPQUFPLGNBQWM7QUFDckIsU0FBUyw0QkFBNEI7QUFDckMsT0FBTyxpQkFBaUI7QUFDeEIsT0FBTyxVQUFVO0FBRWpCLE9BQU8sWUFBWTtBQUdaLFNBQVMsb0JBQW9DO0FBQ2xELFNBQU87QUFBQSxJQUNMLElBQUk7QUFBQSxJQUNKLFNBQVM7QUFBQSxJQUNULFlBQVk7QUFBQSxJQUNaLHFCQUFxQjtBQUFBO0FBQUEsTUFFbkIsVUFBVSxDQUFDLEtBQUssUUFBUSxRQUFRLElBQUksR0FBRyxrQkFBa0IsQ0FBQztBQUFBO0FBQUEsTUFFMUQsVUFBVTtBQUFBLElBQ1osQ0FBQztBQUFBLElBQ0QsT0FBTztBQUFBLE1BQ0wsU0FBUyxDQUFDLFlBQVksV0FBVztBQUFBLElBQ25DLENBQUM7QUFBQSxFQUNIO0FBQ0Y7QUEwQk8sU0FBUyxrQkFBNEM7QUFDMUQsU0FBTztBQUFBLElBQ0wsUUFBUTtBQUFBO0FBQUEsSUFDUixRQUFRO0FBQUEsSUFDUixXQUFXO0FBQUEsSUFDWCxlQUFlO0FBQUEsTUFDYixPQUFPO0FBQUEsTUFDUCxRQUFRO0FBQUEsUUFDTixRQUFRO0FBQUE7QUFBQSxRQUNSLGdCQUFnQjtBQUFBLFFBQ2hCLGdCQUFnQjtBQUFBLFFBQ2hCLGdCQUFnQjtBQUFBLE1BQ2xCO0FBQUEsSUFDRjtBQUFBLEVBQ0Y7QUFDRjtBQUdPLFNBQVMsbUJBQThDO0FBQzVELFNBQU87QUFBQSxJQUNMLE1BQU07QUFBQSxJQUNOLE1BQU07QUFBQSxJQUNOLE1BQU07QUFBQSxJQUNOLElBQUk7QUFBQSxNQUNGLGNBQWM7QUFBQSxJQUNoQjtBQUFBLEVBQ0Y7QUFDRjs7O0FENUVBLE9BQU8sZ0JBQWdCO0FBQ3ZCLE9BQU8sZ0JBQWdCO0FBQ3ZCLFNBQVMsdUJBQXVCO0FBTCtPLElBQU0sMkNBQTJDO0FBT2hVLElBQU8sc0JBQVEsYUFBYTtBQUFBLEVBQzFCLE1BQU07QUFBQSxFQUNOLFNBQVM7QUFBQSxJQUNQLFFBQVE7QUFBQSxFQUNWO0FBQUEsRUFDQSxTQUFTO0FBQUEsSUFDUCxPQUFPO0FBQUEsTUFDTCxLQUFLLGNBQWMsSUFBSSxJQUFJLE1BQU0sd0NBQWUsQ0FBQztBQUFBLE1BQ2pELEtBQUssY0FBYyxJQUFJLElBQUksU0FBUyx3Q0FBZSxDQUFDO0FBQUEsSUFDdEQ7QUFBQSxFQUNGO0FBQUEsRUFDQSxTQUFTO0FBQUEsSUFDUCxrQkFBa0I7QUFBQSxJQUNsQixXQUFXO0FBQUEsTUFDVCxTQUFTO0FBQUEsUUFDUDtBQUFBLFFBQ0E7QUFBQSxVQUNFLFlBQVksQ0FBQyxhQUFhLGNBQWMsbUJBQW1CLGVBQWU7QUFBQSxRQUM1RTtBQUFBLE1BQ0Y7QUFBQSxJQUNGLENBQUM7QUFBQSxJQUNELFdBQVc7QUFBQSxNQUNULFdBQVcsQ0FBQyxnQkFBZ0IsQ0FBQztBQUFBLElBQy9CLENBQUM7QUFBQSxFQUNIO0FBQUEsRUFDQSxLQUFLO0FBQUEsSUFDSCxxQkFBcUI7QUFBQSxNQUNuQixNQUFNO0FBQUEsUUFDSixnQkFBZ0I7QUFBQSxRQUNoQixLQUFLO0FBQUEsTUFDUDtBQUFBLElBQ0Y7QUFBQSxFQUNGO0FBQUE7QUFBQSxFQUdBLFFBQVE7QUFBQSxJQUNOLFlBQVksS0FBSyxXQUFVLG9CQUFJLEtBQUssR0FBRSxlQUFlLENBQUM7QUFBQTtBQUFBLEVBQ3hEO0FBQUEsRUFDQSxRQUFRLGlCQUFpQjtBQUFBLEVBQ3pCLE9BQU8sZ0JBQWdCO0FBQ3pCLENBQUM7IiwKICAibmFtZXMiOiBbXQp9Cg==
