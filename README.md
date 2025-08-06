```markdown
# DeepLink 安卓端

**DeepLink 安卓端** 是 DBC（DeepBrain Chain）生态下的一款 Web3 移动应用，旨在通过区块链技术打通个人计算资源与游戏娱乐之间的边界。该应用支持 DBC 原生代币 **DLC**，为用户提供以下核心功能：

- **DLC 快捷转账与交易**：内置便捷的 Web3 钱包功能，用户可直接通过手机完成 DLC 资产的管理与转账操作。
- **远程租用算力设备**：通过 DLC 支付，用户可远程租用网吧或个人电脑资源，实现高性能算力接入，轻松在手机端运行大型 3A 游戏和高负载应用。
- **共享闲置设备获取收益**：设备拥有者可将闲置主机接入平台，通过出租资源赚取 DLC，实现资源变现。

DeepLink 致力于打造一个高效、安全、去中心化的算力资源共享平台，重构传统云计算和游戏体验方式，为用户带来真正的 Web3 游戏与算力服务体验。

# 项目配置说明

本项目采用了 Vite 作为构建工具，并对 Vite 配置进行了模块化管理。此文档将介绍如何使用和扩展这些配置。

## 目录结构

项目的 Vite 配置被拆分为以下几个部分：

- **`vite.config.ts`**: 主要的 Vite 配置文件，负责加载其他配置模块。
- **`build/plugins/index.ts`**: 包含了插件、构建和服务相关的配置模块。
```

├── build/
│ └── plugins/
│ ├── index.ts # 插件、构建和服务的配置入口
├── src/ # 项目源代码
├── vite.config.ts # Vite 主配置文件
└── README.md # 项目文档

````

## `vite.config.ts`

此文件是 Vite 的主配置文件，通过 `defineConfig` 函数加载并组合了其他模块的配置：

```typescript
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
        additionalData: `@use "./src/styles/scss/global.scss" as *;`,
      },
    },
  },
  server: createViteServer(),
  build: createViteBuild(),
})
````

## `build/plugins/index.ts`

该文件包含了以下三个配置模块：

### 1. `createVitePlugins`

定义了项目中使用的 Vite 插件。当前使用的插件包括：

- `@vitejs/plugin-vue`
- `vite-plugin-progress`
- `vite-plugin-vue-devtools`
- `vite-plugin-svg-icons`

可以根据需要在此处添加或删除插件。

```typescript
import vue from '@vitejs/plugin-vue'
import type { PluginOption } from 'vite'
import progress from 'vite-plugin-progress'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import VueDevtools from 'vite-plugin-vue-devtools'
import path from 'path'

export function createVitePlugins(): PluginOption[] {
  return [
    vue(),
    progress(),
    VueDevtools(),
    createSvgIconsPlugin({
      iconDirs: [path.resolve(process.cwd(), 'src/assets/icons')],
      symbolId: 'icon-[dir]-[name]',
    }),
  ]
}
```

### 2. `createViteBuild`

配置了 Vite 的构建选项，包括打包优化和手动分包设置。

```typescript
import type { BuildOptions } from 'vite'

export function createViteBuild(): BuildOptions | undefined {
  return {
    reportCompressedSize: false,
    sourcemap: false,
    commonjsOptions: {
      ignoreTryCatch: false,
    },
    minify: 'esbuild',
    rollupOptions: {
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
```

### 3. `createViteServer`

配置了开发服务器选项，包括代理设置、端口、自动打开浏览器等。

```typescript
import type { ServerOptions } from 'vite'

export function createViteServer(): ServerOptions | undefined {
  return {
    host: '0.0.0.0',
    port: 9527,
    open: true,
    proxy: {
      '/api': {
        target: 'https://api.example.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
    fs: {
      cachedChecks: false,
    },
  }
}
```

## 如何扩展

### 添加新的插件

1. 在 `build/plugins/index.ts` 中的 `createVitePlugins` 函数中引入并添加新的插件。
2. 在项目的 `vite.config.ts` 中，插件将自动加载，无需额外操作。

### 修改构建配置

在 `build/plugins/index.ts` 中的 `createViteBuild` 函数内进行修改，可以调整构建行为，比如手动分包、压缩方式等。

### 修改开发服务器配置

在 `build/plugins/index.ts` 中的 `createViteServer` 函数内进行修改，可以调整开发服务器的行为，比如代理设置、端口等。

## 总结

这种模块化的配置方式有助于项目的维护和扩展。通过将不同的配置拆分到独立的文件中，使得配置项更加直观和易于管理。如果需要对项目进行配置更新，只需在相关模块中进行修改即可，主配置文件依旧保持简洁和清晰。

# MyIcon 组件文档

`MyIcon` 组件是一个灵活的图标组件，支持从远程图标库（如 Iconify）和本地图标（SVG 文件）中加载图标。它提供了简洁的接口来控制图标的大小、颜色和其他样式属性，使得在 Vue 项目中使用图标变得非常简单。

## 功能特性

- **远程图标支持**：通过 Iconify 库加载远程图标，支持多种图标库。
- **本地图标支持**：通过本地 SVG 文件加载图标，便于使用自定义图标。
- **样式控制**：支持自定义图标的宽度、高度、字体大小和颜色。
- **简洁设计**：去除了复杂的功能，专注于核心的图标渲染需求。

## 使用方法

### 1. 安装依赖

确保项目中已经安装了 `@iconify/vue` 库。

```bash
pnpm install @iconify/vue
```

### 2. 引入组件

在需要使用图标的地方，引入并注册 `MyIcon` 组件。

```vue
<template>
  <div>
    <!-- 使用远程图标 -->
    <MyIcon name="mdi:home" size="48px" c="blue" />

    <!-- 使用本地图标 -->
    <MyIcon name="custom-icon" size="48px" c="green" local />
  </div>
</template>

<script setup>
import MyIcon from './components/MyIcon.vue'
</script>
```

### 3. 属性（Props）

| 属性名  | 类型      | 默认值    | 说明                                                     |
| ------- | --------- | --------- | -------------------------------------------------------- |
| `name`  | `String`  | 必填      | 图标的名称（远程图标使用 Iconify 名称，或本地 SVG 名称） |
| `size`  | `String`  | `inherit` | 图标的字体大小，可以是任何合法的 CSS 尺寸单位            |
| `c`     | `String`  | `inherit` | 图标的颜色                                               |
| `w`     | `String`  | `100%`    | 图标的宽度                                               |
| `h`     | `String`  | `100%`    | 图标的高度                                               |
| `local` | `Boolean` | `false`   | 是否使用本地图标（SVG 文件）                             |

### 4. 使用示例

#### 远程图标示例

```vue
<MyIcon name="mdi:home" size="24px" c="blue" />
```

#### 本地图标示例

```vue
<MyIcon name="custom-icon" size="24px" c="green" local />
```

### 5. 组件实现细节

`MyIcon` 组件根据 `local` 属性的值来决定是渲染远程图标还是本地图标：

- 当 `local` 为 `false` 时，使用 `Iconify` 库渲染远程图标。
- 当 `local` 为 `true` 时，使用 SVG 的 `<use>` 元素来引用本地 SVG 图标。

### 6. 注意事项

- **本地图标路径**：本地 SVG 图标应放置在项目的 `assets/icons/` 目录中，并且名称需要与传递给 `name` 属性的值相匹配。
- **远程图标库支持**：确保项目中已经安装并配置了 `@iconify/vue` 以便加载远程图标。

### 7. 扩展性

如果将来需要为图标添加更多的自定义功能（如旋转、翻转、响应式支持等），可以很容易地扩展此组件。

# 集成了 git 规范化提交

git cz 代替 git commit
