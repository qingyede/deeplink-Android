// vite.config.ts
import { defineConfig } from "file:///C:/Users/28639/Desktop/DBC/DeepLinkApp/deeplink-h5-app-2/naiveui-tailwindcss/node_modules/.pnpm/vite@5.4.1_@types+node@22.7_45cfd70f96226893919a51e491b5190a/node_modules/vite/dist/node/index.js";
import { URL, fileURLToPath } from "url";

// build/plugins/index.ts
import vue from "file:///C:/Users/28639/Desktop/DBC/DeepLinkApp/deeplink-h5-app-2/naiveui-tailwindcss/node_modules/.pnpm/@vitejs+plugin-vue@5.1.3_vi_d71762d10795e7113db59e0aa43b1eab/node_modules/@vitejs/plugin-vue/dist/index.mjs";
import progress from "file:///C:/Users/28639/Desktop/DBC/DeepLinkApp/deeplink-h5-app-2/naiveui-tailwindcss/node_modules/.pnpm/vite-plugin-progress@0.0.7__c93a4fde1728012e55fa8059b5c40ec8/node_modules/vite-plugin-progress/dist/index.mjs";
import { createSvgIconsPlugin } from "file:///C:/Users/28639/Desktop/DBC/DeepLinkApp/deeplink-h5-app-2/naiveui-tailwindcss/node_modules/.pnpm/vite-plugin-svg-icons@2.0.1_584d178011e0e71b95b5cda0454ffdab/node_modules/vite-plugin-svg-icons/dist/index.mjs";
import VueDevtools from "file:///C:/Users/28639/Desktop/DBC/DeepLinkApp/deeplink-h5-app-2/naiveui-tailwindcss/node_modules/.pnpm/vite-plugin-vue-devtools@7._fd1254b16ec68789a8579e1a35371b40/node_modules/vite-plugin-vue-devtools/dist/vite.mjs";
import path from "path";
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
function createViteBuild() {
  return {
    target: "es2015",
    // 👈 兼容大部分 Android WebView
    outDir: "dist",
    assetsDir: "assets",
    rollupOptions: {
      input: "h5.html"
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
import AutoImport from "file:///C:/Users/28639/Desktop/DBC/DeepLinkApp/deeplink-h5-app-2/naiveui-tailwindcss/node_modules/.pnpm/unplugin-auto-import@0.18.2_7c6933f6aa5b8b44075e4e29d572d8ab/node_modules/unplugin-auto-import/dist/vite.js";
import Components from "file:///C:/Users/28639/Desktop/DBC/DeepLinkApp/deeplink-h5-app-2/naiveui-tailwindcss/node_modules/.pnpm/unplugin-vue-components@0.2_9df53742062b1f76646b9c851b853345/node_modules/unplugin-vue-components/dist/vite.js";
import { NaiveUiResolver } from "file:///C:/Users/28639/Desktop/DBC/DeepLinkApp/deeplink-h5-app-2/naiveui-tailwindcss/node_modules/.pnpm/unplugin-vue-components@0.2_9df53742062b1f76646b9c851b853345/node_modules/unplugin-vue-components/dist/resolvers.js";
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
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiLCAiYnVpbGQvcGx1Z2lucy9pbmRleC50cyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIkM6XFxcXFVzZXJzXFxcXDI4NjM5XFxcXERlc2t0b3BcXFxcREJDXFxcXERlZXBMaW5rQXBwXFxcXGRlZXBsaW5rLWg1LWFwcC0yXFxcXG5haXZldWktdGFpbHdpbmRjc3NcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkM6XFxcXFVzZXJzXFxcXDI4NjM5XFxcXERlc2t0b3BcXFxcREJDXFxcXERlZXBMaW5rQXBwXFxcXGRlZXBsaW5rLWg1LWFwcC0yXFxcXG5haXZldWktdGFpbHdpbmRjc3NcXFxcdml0ZS5jb25maWcudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0M6L1VzZXJzLzI4NjM5L0Rlc2t0b3AvREJDL0RlZXBMaW5rQXBwL2RlZXBsaW5rLWg1LWFwcC0yL25haXZldWktdGFpbHdpbmRjc3Mvdml0ZS5jb25maWcudHNcIjtpbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tICd2aXRlJ1xuaW1wb3J0IHsgVVJMLCBmaWxlVVJMVG9QYXRoIH0gZnJvbSAndXJsJ1xuaW1wb3J0IHsgY3JlYXRlVml0ZVBsdWdpbnMsIGNyZWF0ZVZpdGVCdWlsZCwgY3JlYXRlVml0ZVNlcnZlciB9IGZyb20gJy4vYnVpbGQvcGx1Z2lucy9pbmRleCdcbmltcG9ydCBBdXRvSW1wb3J0IGZyb20gJ3VucGx1Z2luLWF1dG8taW1wb3J0L3ZpdGUnXG5pbXBvcnQgQ29tcG9uZW50cyBmcm9tICd1bnBsdWdpbi12dWUtY29tcG9uZW50cy92aXRlJ1xuaW1wb3J0IHsgTmFpdmVVaVJlc29sdmVyIH0gZnJvbSAndW5wbHVnaW4tdnVlLWNvbXBvbmVudHMvcmVzb2x2ZXJzJ1xuXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoe1xuICBiYXNlOiAnLi8nLFxuICByZXNvbHZlOiB7XG4gICAgYWxpYXM6IHtcbiAgICAgICd+JzogZmlsZVVSTFRvUGF0aChuZXcgVVJMKCcuLycsIGltcG9ydC5tZXRhLnVybCkpLFxuICAgICAgJ0AnOiBmaWxlVVJMVG9QYXRoKG5ldyBVUkwoJy4vc3JjJywgaW1wb3J0Lm1ldGEudXJsKSksXG4gICAgfSxcbiAgfSxcbiAgcGx1Z2luczogW1xuICAgIGNyZWF0ZVZpdGVQbHVnaW5zKCksXG4gICAgQXV0b0ltcG9ydCh7XG4gICAgICBpbXBvcnRzOiBbXG4gICAgICAgICd2dWUnLFxuICAgICAgICB7XG4gICAgICAgICAgJ25haXZlLXVpJzogWyd1c2VEaWFsb2cnLCAndXNlTWVzc2FnZScsICd1c2VOb3RpZmljYXRpb24nLCAndXNlTG9hZGluZ0JhciddLFxuICAgICAgICB9LFxuICAgICAgXSxcbiAgICB9KSxcbiAgICBDb21wb25lbnRzKHtcbiAgICAgIHJlc29sdmVyczogW05haXZlVWlSZXNvbHZlcigpXSxcbiAgICB9KSxcbiAgXSxcbiAgY3NzOiB7XG4gICAgcHJlcHJvY2Vzc29yT3B0aW9uczoge1xuICAgICAgc2Nzczoge1xuICAgICAgICBhZGRpdGlvbmFsRGF0YTogYEB1c2UgXCIvc3JjL3N0eWxlcy9zY3NzL2dsb2JhbC5zY3NzXCIgYXMgKjsgQGltcG9ydCBcIi9zcmMvc3R5bGVzL3Njc3MvbWl4aW5zLnNjc3NcIjtgLFxuICAgICAgICBhcGk6ICdtb2Rlcm4nLFxuICAgICAgfSxcbiAgICB9LFxuICB9LFxuICAvLyBcdTUxNjhcdTVDNDBcdTczQUZcdTU4ODNcdTUzRDhcdTkxQ0ZcblxuICBkZWZpbmU6IHtcbiAgICBCVUlMRF9USU1FOiBKU09OLnN0cmluZ2lmeShuZXcgRGF0ZSgpLnRvTG9jYWxlU3RyaW5nKCkpLCAvLyBcdTVDMDYgYnVpbGRUaW1lIFx1NEY1Q1x1NEUzQVx1NTE2OFx1NUM0MFx1NTNEOFx1OTFDRlx1NkNFOFx1NTE2NVxuICB9LFxuICBzZXJ2ZXI6IGNyZWF0ZVZpdGVTZXJ2ZXIoKSxcbiAgYnVpbGQ6IGNyZWF0ZVZpdGVCdWlsZCgpLFxufSlcbiIsICJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiQzpcXFxcVXNlcnNcXFxcMjg2MzlcXFxcRGVza3RvcFxcXFxEQkNcXFxcRGVlcExpbmtBcHBcXFxcZGVlcGxpbmstaDUtYXBwLTJcXFxcbmFpdmV1aS10YWlsd2luZGNzc1xcXFxidWlsZFxcXFxwbHVnaW5zXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFwyODYzOVxcXFxEZXNrdG9wXFxcXERCQ1xcXFxEZWVwTGlua0FwcFxcXFxkZWVwbGluay1oNS1hcHAtMlxcXFxuYWl2ZXVpLXRhaWx3aW5kY3NzXFxcXGJ1aWxkXFxcXHBsdWdpbnNcXFxcaW5kZXgudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0M6L1VzZXJzLzI4NjM5L0Rlc2t0b3AvREJDL0RlZXBMaW5rQXBwL2RlZXBsaW5rLWg1LWFwcC0yL25haXZldWktdGFpbHdpbmRjc3MvYnVpbGQvcGx1Z2lucy9pbmRleC50c1wiOy8vIHZpdGUucGx1Z2lucy50c1xuaW1wb3J0IHZ1ZSBmcm9tICdAdml0ZWpzL3BsdWdpbi12dWUnXG5pbXBvcnQgdHlwZSB7IFBsdWdpbk9wdGlvbiwgQnVpbGRPcHRpb25zLCBTZXJ2ZXJPcHRpb25zIH0gZnJvbSAndml0ZSdcbmltcG9ydCBwcm9ncmVzcyBmcm9tICd2aXRlLXBsdWdpbi1wcm9ncmVzcydcbmltcG9ydCB7IGNyZWF0ZVN2Z0ljb25zUGx1Z2luIH0gZnJvbSAndml0ZS1wbHVnaW4tc3ZnLWljb25zJ1xuaW1wb3J0IFZ1ZURldnRvb2xzIGZyb20gJ3ZpdGUtcGx1Z2luLXZ1ZS1kZXZ0b29scydcbmltcG9ydCBwYXRoIGZyb20gJ3BhdGgnXG5cbi8vIFx1NjNEMlx1NEVGNlxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZVZpdGVQbHVnaW5zKCk6IFBsdWdpbk9wdGlvbltdIHtcbiAgcmV0dXJuIFtcbiAgICB2dWUoKSxcbiAgICBwcm9ncmVzcygpLFxuICAgIFZ1ZURldnRvb2xzKCksXG4gICAgY3JlYXRlU3ZnSWNvbnNQbHVnaW4oe1xuICAgICAgLy8gXHU2MzA3XHU1QjlBXHU5NzAwXHU4OTgxXHU3RjEzXHU1QjU4XHU3Njg0XHU1NkZFXHU2ODA3XHU2NTg3XHU0RUY2XHU1OTM5KFx1OERFRlx1NUY4NFx1NEUzQVx1NUI1OFx1NjUzRVx1NjI0MFx1NjcwOXN2Z1x1NTZGRVx1NjgwN1x1NzY4NFx1NjU4N1x1NEVGNlx1NTkzOVx1NEUwRFx1NTM1NVx1NEUyQXN2Z1x1NTZGRVx1NjgwNylcbiAgICAgIGljb25EaXJzOiBbcGF0aC5yZXNvbHZlKHByb2Nlc3MuY3dkKCksICdzcmMvYXNzZXRzL2ljb25zJyldLFxuICAgICAgLy8gXHU2MzA3XHU1QjlBc3ltYm9sSWRcdTY4M0NcdTVGMEZcbiAgICAgIHN5bWJvbElkOiAnaWNvbi1bZGlyXS1bbmFtZV0nLFxuICAgIH0pLFxuICBdXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVWaXRlQnVpbGQoKTogQnVpbGRPcHRpb25zIHwgdW5kZWZpbmVkIHtcbiAgcmV0dXJuIHtcbiAgICB0YXJnZXQ6ICdlczIwMTUnLCAvLyBcdUQ4M0RcdURDNDggXHU1MTdDXHU1QkI5XHU1OTI3XHU5MEU4XHU1MjA2IEFuZHJvaWQgV2ViVmlld1xuICAgIG91dERpcjogJ2Rpc3QnLFxuICAgIGFzc2V0c0RpcjogJ2Fzc2V0cycsXG4gICAgcm9sbHVwT3B0aW9uczoge1xuICAgICAgaW5wdXQ6ICdoNS5odG1sJyxcbiAgICB9LFxuICB9XG59XG5cbi8vIHNlcnZlclxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZVZpdGVTZXJ2ZXIoKTogU2VydmVyT3B0aW9ucyB8IHVuZGVmaW5lZCB7XG4gIHJldHVybiB7XG4gICAgaG9zdDogJzAuMC4wLjAnLFxuICAgIHBvcnQ6IDUxNzMsXG4gICAgb3BlbjogJy9oNS5odG1sJyxcbiAgICBmczoge1xuICAgICAgY2FjaGVkQ2hlY2tzOiBmYWxzZSxcbiAgICB9LFxuICB9XG59XG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQXNhLFNBQVMsb0JBQW9CO0FBQ25jLFNBQVMsS0FBSyxxQkFBcUI7OztBQ0FuQyxPQUFPLFNBQVM7QUFFaEIsT0FBTyxjQUFjO0FBQ3JCLFNBQVMsNEJBQTRCO0FBQ3JDLE9BQU8saUJBQWlCO0FBQ3hCLE9BQU8sVUFBVTtBQUdWLFNBQVMsb0JBQW9DO0FBQ2xELFNBQU87QUFBQSxJQUNMLElBQUk7QUFBQSxJQUNKLFNBQVM7QUFBQSxJQUNULFlBQVk7QUFBQSxJQUNaLHFCQUFxQjtBQUFBO0FBQUEsTUFFbkIsVUFBVSxDQUFDLEtBQUssUUFBUSxRQUFRLElBQUksR0FBRyxrQkFBa0IsQ0FBQztBQUFBO0FBQUEsTUFFMUQsVUFBVTtBQUFBLElBQ1osQ0FBQztBQUFBLEVBQ0g7QUFDRjtBQUVPLFNBQVMsa0JBQTRDO0FBQzFELFNBQU87QUFBQSxJQUNMLFFBQVE7QUFBQTtBQUFBLElBQ1IsUUFBUTtBQUFBLElBQ1IsV0FBVztBQUFBLElBQ1gsZUFBZTtBQUFBLE1BQ2IsT0FBTztBQUFBLElBQ1Q7QUFBQSxFQUNGO0FBQ0Y7QUFHTyxTQUFTLG1CQUE4QztBQUM1RCxTQUFPO0FBQUEsSUFDTCxNQUFNO0FBQUEsSUFDTixNQUFNO0FBQUEsSUFDTixNQUFNO0FBQUEsSUFDTixJQUFJO0FBQUEsTUFDRixjQUFjO0FBQUEsSUFDaEI7QUFBQSxFQUNGO0FBQ0Y7OztBRHpDQSxPQUFPLGdCQUFnQjtBQUN2QixPQUFPLGdCQUFnQjtBQUN2QixTQUFTLHVCQUF1QjtBQUwrTyxJQUFNLDJDQUEyQztBQU9oVSxJQUFPLHNCQUFRLGFBQWE7QUFBQSxFQUMxQixNQUFNO0FBQUEsRUFDTixTQUFTO0FBQUEsSUFDUCxPQUFPO0FBQUEsTUFDTCxLQUFLLGNBQWMsSUFBSSxJQUFJLE1BQU0sd0NBQWUsQ0FBQztBQUFBLE1BQ2pELEtBQUssY0FBYyxJQUFJLElBQUksU0FBUyx3Q0FBZSxDQUFDO0FBQUEsSUFDdEQ7QUFBQSxFQUNGO0FBQUEsRUFDQSxTQUFTO0FBQUEsSUFDUCxrQkFBa0I7QUFBQSxJQUNsQixXQUFXO0FBQUEsTUFDVCxTQUFTO0FBQUEsUUFDUDtBQUFBLFFBQ0E7QUFBQSxVQUNFLFlBQVksQ0FBQyxhQUFhLGNBQWMsbUJBQW1CLGVBQWU7QUFBQSxRQUM1RTtBQUFBLE1BQ0Y7QUFBQSxJQUNGLENBQUM7QUFBQSxJQUNELFdBQVc7QUFBQSxNQUNULFdBQVcsQ0FBQyxnQkFBZ0IsQ0FBQztBQUFBLElBQy9CLENBQUM7QUFBQSxFQUNIO0FBQUEsRUFDQSxLQUFLO0FBQUEsSUFDSCxxQkFBcUI7QUFBQSxNQUNuQixNQUFNO0FBQUEsUUFDSixnQkFBZ0I7QUFBQSxRQUNoQixLQUFLO0FBQUEsTUFDUDtBQUFBLElBQ0Y7QUFBQSxFQUNGO0FBQUE7QUFBQSxFQUdBLFFBQVE7QUFBQSxJQUNOLFlBQVksS0FBSyxXQUFVLG9CQUFJLEtBQUssR0FBRSxlQUFlLENBQUM7QUFBQTtBQUFBLEVBQ3hEO0FBQUEsRUFDQSxRQUFRLGlCQUFpQjtBQUFBLEVBQ3pCLE9BQU8sZ0JBQWdCO0FBQ3pCLENBQUM7IiwKICAibmFtZXMiOiBbXQp9Cg==
