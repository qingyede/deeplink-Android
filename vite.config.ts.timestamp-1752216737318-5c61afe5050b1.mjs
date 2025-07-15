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
    reportCompressedSize: false,
    sourcemap: false,
    minify: "esbuild",
    // 关键配置开始
    target: "es2015",
    // 降级目标语法
    rollupOptions: {
      output: {
        // 禁用哈希文件名
        entryFileNames: `[name].js`,
        chunkFileNames: `[name].js`,
        assetFileNames: `[name].[ext]`,
        // 内联动态导入（解决 import() 报错）
        inlineDynamicImports: true,
        // 手动分包规则（保留你的原有逻辑）
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
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiLCAiYnVpbGQvcGx1Z2lucy9pbmRleC50cyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIkM6XFxcXFVzZXJzXFxcXDI4NjM5XFxcXERlc2t0b3BcXFxcREJDXFxcXERlZXBMaW5rQXBwXFxcXGRlZXBsaW5rLWg1LWFwcC0yXFxcXG5haXZldWktdGFpbHdpbmRjc3NcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkM6XFxcXFVzZXJzXFxcXDI4NjM5XFxcXERlc2t0b3BcXFxcREJDXFxcXERlZXBMaW5rQXBwXFxcXGRlZXBsaW5rLWg1LWFwcC0yXFxcXG5haXZldWktdGFpbHdpbmRjc3NcXFxcdml0ZS5jb25maWcudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0M6L1VzZXJzLzI4NjM5L0Rlc2t0b3AvREJDL0RlZXBMaW5rQXBwL2RlZXBsaW5rLWg1LWFwcC0yL25haXZldWktdGFpbHdpbmRjc3Mvdml0ZS5jb25maWcudHNcIjtpbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tICd2aXRlJ1xuaW1wb3J0IHsgVVJMLCBmaWxlVVJMVG9QYXRoIH0gZnJvbSAndXJsJ1xuaW1wb3J0IHsgY3JlYXRlVml0ZVBsdWdpbnMsIGNyZWF0ZVZpdGVCdWlsZCwgY3JlYXRlVml0ZVNlcnZlciB9IGZyb20gJy4vYnVpbGQvcGx1Z2lucy9pbmRleCdcbmltcG9ydCBBdXRvSW1wb3J0IGZyb20gJ3VucGx1Z2luLWF1dG8taW1wb3J0L3ZpdGUnXG5pbXBvcnQgQ29tcG9uZW50cyBmcm9tICd1bnBsdWdpbi12dWUtY29tcG9uZW50cy92aXRlJ1xuaW1wb3J0IHsgTmFpdmVVaVJlc29sdmVyIH0gZnJvbSAndW5wbHVnaW4tdnVlLWNvbXBvbmVudHMvcmVzb2x2ZXJzJ1xuXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoe1xuICBiYXNlOiAnLi8nLFxuICByZXNvbHZlOiB7XG4gICAgYWxpYXM6IHtcbiAgICAgICd+JzogZmlsZVVSTFRvUGF0aChuZXcgVVJMKCcuLycsIGltcG9ydC5tZXRhLnVybCkpLFxuICAgICAgJ0AnOiBmaWxlVVJMVG9QYXRoKG5ldyBVUkwoJy4vc3JjJywgaW1wb3J0Lm1ldGEudXJsKSksXG4gICAgfSxcbiAgfSxcbiAgcGx1Z2luczogW1xuICAgIGNyZWF0ZVZpdGVQbHVnaW5zKCksXG4gICAgQXV0b0ltcG9ydCh7XG4gICAgICBpbXBvcnRzOiBbXG4gICAgICAgICd2dWUnLFxuICAgICAgICB7XG4gICAgICAgICAgJ25haXZlLXVpJzogWyd1c2VEaWFsb2cnLCAndXNlTWVzc2FnZScsICd1c2VOb3RpZmljYXRpb24nLCAndXNlTG9hZGluZ0JhciddLFxuICAgICAgICB9LFxuICAgICAgXSxcbiAgICB9KSxcbiAgICBDb21wb25lbnRzKHtcbiAgICAgIHJlc29sdmVyczogW05haXZlVWlSZXNvbHZlcigpXSxcbiAgICB9KSxcbiAgXSxcbiAgY3NzOiB7XG4gICAgcHJlcHJvY2Vzc29yT3B0aW9uczoge1xuICAgICAgc2Nzczoge1xuICAgICAgICBhZGRpdGlvbmFsRGF0YTogYEB1c2UgXCIvc3JjL3N0eWxlcy9zY3NzL2dsb2JhbC5zY3NzXCIgYXMgKjsgQGltcG9ydCBcIi9zcmMvc3R5bGVzL3Njc3MvbWl4aW5zLnNjc3NcIjtgLFxuICAgICAgICBhcGk6ICdtb2Rlcm4nLFxuICAgICAgfSxcbiAgICB9LFxuICB9LFxuICAvLyBcdTUxNjhcdTVDNDBcdTczQUZcdTU4ODNcdTUzRDhcdTkxQ0ZcblxuICBkZWZpbmU6IHtcbiAgICBCVUlMRF9USU1FOiBKU09OLnN0cmluZ2lmeShuZXcgRGF0ZSgpLnRvTG9jYWxlU3RyaW5nKCkpLCAvLyBcdTVDMDYgYnVpbGRUaW1lIFx1NEY1Q1x1NEUzQVx1NTE2OFx1NUM0MFx1NTNEOFx1OTFDRlx1NkNFOFx1NTE2NVxuICB9LFxuICBzZXJ2ZXI6IGNyZWF0ZVZpdGVTZXJ2ZXIoKSxcbiAgYnVpbGQ6IGNyZWF0ZVZpdGVCdWlsZCgpLFxufSlcbiIsICJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiQzpcXFxcVXNlcnNcXFxcMjg2MzlcXFxcRGVza3RvcFxcXFxEQkNcXFxcRGVlcExpbmtBcHBcXFxcZGVlcGxpbmstaDUtYXBwLTJcXFxcbmFpdmV1aS10YWlsd2luZGNzc1xcXFxidWlsZFxcXFxwbHVnaW5zXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFwyODYzOVxcXFxEZXNrdG9wXFxcXERCQ1xcXFxEZWVwTGlua0FwcFxcXFxkZWVwbGluay1oNS1hcHAtMlxcXFxuYWl2ZXVpLXRhaWx3aW5kY3NzXFxcXGJ1aWxkXFxcXHBsdWdpbnNcXFxcaW5kZXgudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0M6L1VzZXJzLzI4NjM5L0Rlc2t0b3AvREJDL0RlZXBMaW5rQXBwL2RlZXBsaW5rLWg1LWFwcC0yL25haXZldWktdGFpbHdpbmRjc3MvYnVpbGQvcGx1Z2lucy9pbmRleC50c1wiOy8vIHZpdGUucGx1Z2lucy50c1xuaW1wb3J0IHZ1ZSBmcm9tICdAdml0ZWpzL3BsdWdpbi12dWUnXG5pbXBvcnQgdHlwZSB7IFBsdWdpbk9wdGlvbiwgQnVpbGRPcHRpb25zLCBTZXJ2ZXJPcHRpb25zIH0gZnJvbSAndml0ZSdcbmltcG9ydCBwcm9ncmVzcyBmcm9tICd2aXRlLXBsdWdpbi1wcm9ncmVzcydcbmltcG9ydCB7IGNyZWF0ZVN2Z0ljb25zUGx1Z2luIH0gZnJvbSAndml0ZS1wbHVnaW4tc3ZnLWljb25zJ1xuaW1wb3J0IFZ1ZURldnRvb2xzIGZyb20gJ3ZpdGUtcGx1Z2luLXZ1ZS1kZXZ0b29scydcbmltcG9ydCBwYXRoIGZyb20gJ3BhdGgnXG4vLyBAdHMtaWdub3JlXG5pbXBvcnQgbGVnYWN5IGZyb20gJ0B2aXRlanMvcGx1Z2luLWxlZ2FjeSdcblxuLy8gXHU2M0QyXHU0RUY2XG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlVml0ZVBsdWdpbnMoKTogUGx1Z2luT3B0aW9uW10ge1xuICByZXR1cm4gW1xuICAgIHZ1ZSgpLFxuICAgIHByb2dyZXNzKCksXG4gICAgVnVlRGV2dG9vbHMoKSxcbiAgICBjcmVhdGVTdmdJY29uc1BsdWdpbih7XG4gICAgICAvLyBcdTYzMDdcdTVCOUFcdTk3MDBcdTg5ODFcdTdGMTNcdTVCNThcdTc2ODRcdTU2RkVcdTY4MDdcdTY1ODdcdTRFRjZcdTU5MzkoXHU4REVGXHU1Rjg0XHU0RTNBXHU1QjU4XHU2NTNFXHU2MjQwXHU2NzA5c3ZnXHU1NkZFXHU2ODA3XHU3Njg0XHU2NTg3XHU0RUY2XHU1OTM5XHU0RTBEXHU1MzU1XHU0RTJBc3ZnXHU1NkZFXHU2ODA3KVxuICAgICAgaWNvbkRpcnM6IFtwYXRoLnJlc29sdmUocHJvY2Vzcy5jd2QoKSwgJ3NyYy9hc3NldHMvaWNvbnMnKV0sXG4gICAgICAvLyBcdTYzMDdcdTVCOUFzeW1ib2xJZFx1NjgzQ1x1NUYwRlxuICAgICAgc3ltYm9sSWQ6ICdpY29uLVtkaXJdLVtuYW1lXScsXG4gICAgfSksXG4gICAgbGVnYWN5KHtcbiAgICAgIHRhcmdldHM6IFsnZGVmYXVsdHMnLCAnbm90IElFIDExJ10sXG4gICAgfSksXG4gIF1cbn1cblxuLy8gYnVpbGRcbi8vIGV4cG9ydCBmdW5jdGlvbiBjcmVhdGVWaXRlQnVpbGQoKTogQnVpbGRPcHRpb25zIHwgdW5kZWZpbmVkIHtcbi8vICAgcmV0dXJuIHtcbi8vICAgICByZXBvcnRDb21wcmVzc2VkU2l6ZTogZmFsc2UsXG4vLyAgICAgc291cmNlbWFwOiBmYWxzZSxcbi8vICAgICBjb21tb25qc09wdGlvbnM6IHtcbi8vICAgICAgIGlnbm9yZVRyeUNhdGNoOiBmYWxzZSxcbi8vICAgICB9LFxuLy8gICAgIG1pbmlmeTogJ2VzYnVpbGQnLFxuLy8gICAgIC8vIFx1NjI0Qlx1NTJBOFx1NTIwNlx1NTMwNVxuLy8gICAgIHJvbGx1cE9wdGlvbnM6IHtcbi8vICAgICAgIC8vIGlucHV0OiAnaDUuaHRtbCcsXG4vLyAgICAgICBvdXRwdXQ6IHtcbi8vICAgICAgICAgbWFudWFsQ2h1bmtzKGlkKSB7XG4vLyAgICAgICAgICAgaWYgKGlkLmluY2x1ZGVzKCdub2RlX21vZHVsZXMnKSkge1xuLy8gICAgICAgICAgICAgcmV0dXJuIGlkLnRvU3RyaW5nKCkuc3BsaXQoJ25vZGVfbW9kdWxlcy8nKVsxXS5zcGxpdCgnLycpWzBdLnRvU3RyaW5nKClcbi8vICAgICAgICAgICB9XG4vLyAgICAgICAgIH0sXG4vLyAgICAgICB9LFxuLy8gICAgIH0sXG4vLyAgIH1cbi8vIH1cblxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZVZpdGVCdWlsZCgpOiBCdWlsZE9wdGlvbnMge1xuICByZXR1cm4ge1xuICAgIHJlcG9ydENvbXByZXNzZWRTaXplOiBmYWxzZSxcbiAgICBzb3VyY2VtYXA6IGZhbHNlLFxuICAgIG1pbmlmeTogJ2VzYnVpbGQnLFxuICAgIC8vIFx1NTE3M1x1OTUyRVx1OTE0RFx1N0Y2RVx1NUYwMFx1NTlDQlxuICAgIHRhcmdldDogJ2VzMjAxNScsIC8vIFx1OTY0RFx1N0VBN1x1NzZFRVx1NjgwN1x1OEJFRFx1NkNENVxuICAgIHJvbGx1cE9wdGlvbnM6IHtcbiAgICAgIG91dHB1dDoge1xuICAgICAgICAvLyBcdTc5ODFcdTc1MjhcdTU0QzhcdTVFMENcdTY1ODdcdTRFRjZcdTU0MERcbiAgICAgICAgZW50cnlGaWxlTmFtZXM6IGBbbmFtZV0uanNgLFxuICAgICAgICBjaHVua0ZpbGVOYW1lczogYFtuYW1lXS5qc2AsXG4gICAgICAgIGFzc2V0RmlsZU5hbWVzOiBgW25hbWVdLltleHRdYCxcbiAgICAgICAgLy8gXHU1MTg1XHU4MDU0XHU1MkE4XHU2MDAxXHU1QkZDXHU1MTY1XHVGRjA4XHU4OUUzXHU1MUIzIGltcG9ydCgpIFx1NjJBNVx1OTUxOVx1RkYwOVxuICAgICAgICBpbmxpbmVEeW5hbWljSW1wb3J0czogdHJ1ZSxcbiAgICAgICAgLy8gXHU2MjRCXHU1MkE4XHU1MjA2XHU1MzA1XHU4OUM0XHU1MjE5XHVGRjA4XHU0RkREXHU3NTU5XHU0RjYwXHU3Njg0XHU1MzlGXHU2NzA5XHU5MDNCXHU4RjkxXHVGRjA5XG4gICAgICAgIG1hbnVhbENodW5rcyhpZCkge1xuICAgICAgICAgIGlmIChpZC5pbmNsdWRlcygnbm9kZV9tb2R1bGVzJykpIHtcbiAgICAgICAgICAgIHJldHVybiBpZC50b1N0cmluZygpLnNwbGl0KCdub2RlX21vZHVsZXMvJylbMV0uc3BsaXQoJy8nKVswXS50b1N0cmluZygpXG4gICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgfSxcbiAgICB9LFxuICB9XG59XG4vLyBzZXJ2ZXJcbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVWaXRlU2VydmVyKCk6IFNlcnZlck9wdGlvbnMgfCB1bmRlZmluZWQge1xuICByZXR1cm4ge1xuICAgIGhvc3Q6ICcwLjAuMC4wJyxcbiAgICBwb3J0OiA1MTczLFxuICAgIG9wZW46ICcvaDUuaHRtbCcsXG4gICAgZnM6IHtcbiAgICAgIGNhY2hlZENoZWNrczogZmFsc2UsXG4gICAgfSxcbiAgfVxufVxuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUFzYSxTQUFTLG9CQUFvQjtBQUNuYyxTQUFTLEtBQUsscUJBQXFCOzs7QUNBbkMsT0FBTyxTQUFTO0FBRWhCLE9BQU8sY0FBYztBQUNyQixTQUFTLDRCQUE0QjtBQUNyQyxPQUFPLGlCQUFpQjtBQUN4QixPQUFPLFVBQVU7QUFFakIsT0FBTyxZQUFZO0FBR1osU0FBUyxvQkFBb0M7QUFDbEQsU0FBTztBQUFBLElBQ0wsSUFBSTtBQUFBLElBQ0osU0FBUztBQUFBLElBQ1QsWUFBWTtBQUFBLElBQ1oscUJBQXFCO0FBQUE7QUFBQSxNQUVuQixVQUFVLENBQUMsS0FBSyxRQUFRLFFBQVEsSUFBSSxHQUFHLGtCQUFrQixDQUFDO0FBQUE7QUFBQSxNQUUxRCxVQUFVO0FBQUEsSUFDWixDQUFDO0FBQUEsSUFDRCxPQUFPO0FBQUEsTUFDTCxTQUFTLENBQUMsWUFBWSxXQUFXO0FBQUEsSUFDbkMsQ0FBQztBQUFBLEVBQ0g7QUFDRjtBQXlCTyxTQUFTLGtCQUFnQztBQUM5QyxTQUFPO0FBQUEsSUFDTCxzQkFBc0I7QUFBQSxJQUN0QixXQUFXO0FBQUEsSUFDWCxRQUFRO0FBQUE7QUFBQSxJQUVSLFFBQVE7QUFBQTtBQUFBLElBQ1IsZUFBZTtBQUFBLE1BQ2IsUUFBUTtBQUFBO0FBQUEsUUFFTixnQkFBZ0I7QUFBQSxRQUNoQixnQkFBZ0I7QUFBQSxRQUNoQixnQkFBZ0I7QUFBQTtBQUFBLFFBRWhCLHNCQUFzQjtBQUFBO0FBQUEsUUFFdEIsYUFBYSxJQUFJO0FBQ2YsY0FBSSxHQUFHLFNBQVMsY0FBYyxHQUFHO0FBQy9CLG1CQUFPLEdBQUcsU0FBUyxFQUFFLE1BQU0sZUFBZSxFQUFFLENBQUMsRUFBRSxNQUFNLEdBQUcsRUFBRSxDQUFDLEVBQUUsU0FBUztBQUFBLFVBQ3hFO0FBQUEsUUFDRjtBQUFBLE1BQ0Y7QUFBQSxJQUNGO0FBQUEsRUFDRjtBQUNGO0FBRU8sU0FBUyxtQkFBOEM7QUFDNUQsU0FBTztBQUFBLElBQ0wsTUFBTTtBQUFBLElBQ04sTUFBTTtBQUFBLElBQ04sTUFBTTtBQUFBLElBQ04sSUFBSTtBQUFBLE1BQ0YsY0FBYztBQUFBLElBQ2hCO0FBQUEsRUFDRjtBQUNGOzs7QURuRkEsT0FBTyxnQkFBZ0I7QUFDdkIsT0FBTyxnQkFBZ0I7QUFDdkIsU0FBUyx1QkFBdUI7QUFMK08sSUFBTSwyQ0FBMkM7QUFPaFUsSUFBTyxzQkFBUSxhQUFhO0FBQUEsRUFDMUIsTUFBTTtBQUFBLEVBQ04sU0FBUztBQUFBLElBQ1AsT0FBTztBQUFBLE1BQ0wsS0FBSyxjQUFjLElBQUksSUFBSSxNQUFNLHdDQUFlLENBQUM7QUFBQSxNQUNqRCxLQUFLLGNBQWMsSUFBSSxJQUFJLFNBQVMsd0NBQWUsQ0FBQztBQUFBLElBQ3REO0FBQUEsRUFDRjtBQUFBLEVBQ0EsU0FBUztBQUFBLElBQ1Asa0JBQWtCO0FBQUEsSUFDbEIsV0FBVztBQUFBLE1BQ1QsU0FBUztBQUFBLFFBQ1A7QUFBQSxRQUNBO0FBQUEsVUFDRSxZQUFZLENBQUMsYUFBYSxjQUFjLG1CQUFtQixlQUFlO0FBQUEsUUFDNUU7QUFBQSxNQUNGO0FBQUEsSUFDRixDQUFDO0FBQUEsSUFDRCxXQUFXO0FBQUEsTUFDVCxXQUFXLENBQUMsZ0JBQWdCLENBQUM7QUFBQSxJQUMvQixDQUFDO0FBQUEsRUFDSDtBQUFBLEVBQ0EsS0FBSztBQUFBLElBQ0gscUJBQXFCO0FBQUEsTUFDbkIsTUFBTTtBQUFBLFFBQ0osZ0JBQWdCO0FBQUEsUUFDaEIsS0FBSztBQUFBLE1BQ1A7QUFBQSxJQUNGO0FBQUEsRUFDRjtBQUFBO0FBQUEsRUFHQSxRQUFRO0FBQUEsSUFDTixZQUFZLEtBQUssV0FBVSxvQkFBSSxLQUFLLEdBQUUsZUFBZSxDQUFDO0FBQUE7QUFBQSxFQUN4RDtBQUFBLEVBQ0EsUUFBUSxpQkFBaUI7QUFBQSxFQUN6QixPQUFPLGdCQUFnQjtBQUN6QixDQUFDOyIsCiAgIm5hbWVzIjogW10KfQo=
