// src/hooks/app/useTheme.ts
// 三态主题：light / dark / auto
// 依赖：@vueuse/core、naive-ui（用于 currentTheme）
// 兼容 iOS/WKWebView：增加 visibility/pageshow 兜底，保证 auto 跟随系统

import { computed, watchEffect, onMounted, onBeforeUnmount } from 'vue'
import { darkTheme, lightTheme, type GlobalThemeOverrides } from 'naive-ui'
import { usePreferredDark, useStorage } from '@vueuse/core'

export type ThemeMode = 'light' | 'dark' | 'auto'

export interface UseThemeOptions {
  /** Naive UI 的主题覆盖（可选） */
  lightOverrides?: GlobalThemeOverrides
  darkOverrides?: GlobalThemeOverrides
  /** localStorage 键名（默认 'theme'），值为 'auto' | 'light' | 'dark' */
  storageKeyMode?: string
  /** 写到 <html> 的属性（默认 'data-theme'） */
  htmlAttribute?: string
  /** 是否在 <head> 注入 <meta name="color-scheme" content="light dark">（默认 true） */
  injectColorSchemeMeta?: boolean
}

export function useTheme(opts: UseThemeOptions = {}) {
  const {
    lightOverrides = {} as GlobalThemeOverrides,
    darkOverrides = {} as GlobalThemeOverrides,
    storageKeyMode = 'theme', // localStorage: { theme: 'auto' | 'light' | 'dark' }
    htmlAttribute = 'data-theme',
    injectColorSchemeMeta = true,
  } = opts

  // 1) 三态模式持久化：首次进入默认 'auto'
  const mode = useStorage<ThemeMode>(storageKeyMode, 'auto')

  // 2) 系统偏好（用户选择为 'auto' 时使用）
  const prefersDark = usePreferredDark()

  // 3) 最终是否暗色
  const isDark = computed<boolean>(() => {
    if (mode.value === 'dark') return true
    if (mode.value === 'light') return false
    // auto
    return prefersDark.value
  })

  // 4) Naive UI 主题 & 覆盖
  const currentTheme = computed(() => (isDark.value ? darkTheme : lightTheme))
  const currentOverrides = computed<GlobalThemeOverrides>(() => (isDark.value ? darkOverrides : lightOverrides))

  // 5) 将最终态写入 <html data-theme="light|dark">，并保证 <meta name="color-scheme"> 存在
  watchEffect(() => {
    if (typeof document !== 'undefined') {
      document.documentElement.setAttribute(htmlAttribute, isDark.value ? 'dark' : 'light')
      if (injectColorSchemeMeta) ensureColorSchemeMeta()
    }
  })

  // 6) iOS/WKWebView 兜底：有时系统切换不触发 matchMedia('prefers-color-scheme').change
  //    我们在页面再次可见/回前台时复查一次。
  onMounted(() => {
    const media = safeMatchMedia('(prefers-color-scheme: dark)')

    // 标准浏览器：系统外观变化时回调（Chromium/Safari 桌面大多正常）
    const onMediaChange = () => {
      // 读取 media.matches 即可触发依赖更新（usePreferredDark 内部会感知）
      void media?.matches
      // 触发一个 resize 促使潜在的计算依赖更新（对部分环境更保险）
      try {
        window.dispatchEvent(new Event('resize'))
      } catch {}
    }

    // iOS/WKWebView 兜底：回前台或页面变可见时复查一次
    const onVisible = () => {
      console.log(mode.value, 'mode')
      if (mode.value !== 'auto') return
      onMediaChange()
    }

    media?.addEventListener?.('change', onMediaChange)
    // 旧内核兼容（Safari 旧版 / 一些内置 WebView）
    media?.addListener?.(onMediaChange)

    document.addEventListener('visibilitychange', onVisible)
    window.addEventListener('pageshow', onVisible) // iOS 从后台回前台
    window.addEventListener('orientationchange', onVisible) // 旋转也顺便复查一次

    // 初次挂载时也来一发，确保与系统对齐
    onMediaChange()

    onBeforeUnmount(() => {
      media?.removeEventListener?.('change', onMediaChange)
      media?.removeListener?.(onMediaChange)
      document.removeEventListener('visibilitychange', onVisible)
      window.removeEventListener('pageshow', onVisible)
      window.removeEventListener('orientationchange', onVisible)
    })
  })

  // 7) 便捷 API
  const setMode = (v: ThemeMode) => {
    mode.value = v
  }
  const setLight = () => setMode('light')
  const setDark = () => setMode('dark')
  const setAuto = () => setMode('auto')
  const cycleMode = () => {
    mode.value = mode.value === 'auto' ? 'light' : mode.value === 'light' ? 'dark' : 'auto'
  }

  return {
    // state
    mode, // 'auto' | 'light' | 'dark'
    isDark, // boolean：最终暗色与否
    currentTheme,
    currentOverrides,
    prefersDark, // 可用于 UI 显示系统偏好

    // actions
    setMode,
    setLight,
    setDark,
    setAuto,
    cycleMode,
  }
}

/** 安全的 matchMedia（老旧/特殊 WebView 下返回 undefined 而不是抛错） */
function safeMatchMedia(query: string): MediaQueryList | undefined {
  try {
    if (typeof window !== 'undefined' && 'matchMedia' in window) {
      return window.matchMedia(query)
    }
  } catch {}
  return undefined
}

/** 注入 <meta name="color-scheme" content="light dark">，帮助 iOS/Safari 绘制滚动条/控件的明暗 */
function ensureColorSchemeMeta() {
  const name = 'color-scheme'
  let el = document.head.querySelector<HTMLMetaElement>(`meta[name="${name}"]`)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute('name', name)
    el.setAttribute('content', 'light dark')
    document.head.appendChild(el)
  } else if (el.content !== 'light dark') {
    el.setAttribute('content', 'light dark')
  }
}
