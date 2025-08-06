# DeepLink Android App

**DeepLink Android** is a Web3 mobile application built within the DBC (DeepBrain Chain) ecosystem. It bridges the gap between decentralized computing power and gaming by leveraging the native token **DLC**. The app provides a seamless user experience for managing assets and accessing high-performance computing resources.

## Core Features

- **DLC Transfers & Trading**: Integrated Web3 wallet functionality allows users to manage and transfer their DLC tokens directly from their phone.
- **Remote Hardware Rental**: Users can rent powerful PCs or internet café machines using DLC, enabling them to play high-end AAA games or run heavy workloads on mobile.
- **Earn by Sharing Idle Devices**: PC owners can share unused computing resources and earn DLC tokens in return.

DeepLink aims to create a secure, efficient, and decentralized platform for computing power exchange, redefining traditional cloud gaming and remote desktop usage.

---

# Project Configuration Overview

This project uses **Vite** as its build tool, with a modular configuration structure for maintainability and scalability. This documentation outlines how to use and extend the Vite configurations.

## Directory Structure

Vite-related configuration files are organized as follows:

- **`vite.config.ts`**: Main Vite configuration entry point.
- **`build/plugins/index.ts`**: Central module for build, plugin, and dev server settings.

```
├── build/
│   └── plugins/
│       └── index.ts          # Entry point for plugins and server/build config
├── src/                      # Source code
├── vite.config.ts            # Main Vite configuration
└── README.md                 # Project documentation
```

## `vite.config.ts`

This is the primary Vite config file. It uses `defineConfig` to load and merge other configuration modules:

```ts
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
```

## `build/plugins/index.ts`

This file exports three configuration methods:

### 1. `createVitePlugins`

Defines the list of Vite plugins used in the project:

- `@vitejs/plugin-vue`
- `vite-plugin-progress`
- `vite-plugin-vue-devtools`
- `vite-plugin-svg-icons`

```ts
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

Build options for Vite, including manual chunking and optimization:

```ts
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

Dev server configuration, including proxy rules and port settings:

```ts
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

## How to Extend

### Add New Plugins

1. Import the plugin in `build/plugins/index.ts`.
2. Add it to the `createVitePlugins()` return array — no need to modify `vite.config.ts`.

### Modify Build Config

Update the `createViteBuild()` method to customize optimization, chunk splitting, etc.

### Modify Dev Server Settings

Update the `createViteServer()` method to change ports, proxies, CORS settings, and more.

## Summary

This modular configuration approach improves project maintainability. By isolating Vite plugins, build logic, and dev server settings, changes are easier to manage and understand. The main config remains clean and minimal.

---

# MyIcon Component Documentation

The `MyIcon` component is a flexible icon wrapper that supports both remote (Iconify) and local SVG icons. It provides an easy interface to control icon size, color, and more.

## Features

- **Remote Icon Support**: Uses Iconify to load icons from remote collections.
- **Local Icon Support**: Loads local SVG icons from the project directory.
- **Style Customization**: Customize width, height, font size, and color.
- **Minimal API**: Focused on clean rendering and style flexibility.

## Usage

### 1. Install Dependencies

Make sure `@iconify/vue` is installed:

```bash
pnpm install @iconify/vue
```

### 2. Import the Component

```vue
<template>
  <div>
    <!-- Remote icon -->
    <MyIcon name="mdi:home" size="48px" c="blue" />

    <!-- Local SVG icon -->
    <MyIcon name="custom-icon" size="48px" c="green" local />
  </div>
</template>

<script setup>
import MyIcon from './components/MyIcon.vue'
</script>
```

### 3. Props

| Prop    | Type      | Default   | Description                                                    |
| ------- | --------- | --------- | -------------------------------------------------------------- |
| `name`  | `String`  | Required  | Icon name. For remote: Iconify name. For local: SVG file name. |
| `size`  | `String`  | `inherit` | Font size or dimension of the icon (any valid CSS unit).       |
| `c`     | `String`  | `inherit` | Color of the icon.                                             |
| `w`     | `String`  | `100%`    | Width of the icon.                                             |
| `h`     | `String`  | `100%`    | Height of the icon.                                            |
| `local` | `Boolean` | `false`   | Whether to load the icon from local SVG assets.                |

### 4. Examples

#### Remote Icon Example

```vue
<MyIcon name="mdi:home" size="24px" c="blue" />
```

#### Local Icon Example

```vue
<MyIcon name="custom-icon" size="24px" c="green" local />
```

### 5. How It Works

- If `local` is `false`, it renders a remote icon using `@iconify/vue`.
- If `local` is `true`, it uses the `<use>` tag to reference a local SVG from the `/assets/icons` directory.

### 6. Notes

- **Local SVGs** must be placed under `src/assets/icons/` and their filenames must match the `name` prop.
- Make sure `vite-plugin-svg-icons` is properly configured for local SVGs to work.

### 7. Extendability

You can easily extend this component to support animations, rotations, responsive sizing, etc.

---

# Git Conventional Commits

The project supports **Conventional Commit** standards using `git cz` for structured commit messages.

## Usage

```bash
pnpm install -g commitizen
git cz
```

### Example Commit

```bash
feat: prepare for production deployment
```

Use this format to improve clarity in commit history and ensure compatibility with automated changelogs and CI/CD pipelines.
