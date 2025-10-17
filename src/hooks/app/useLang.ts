// src/hooks/app/useLang.ts
import { watch } from 'vue'
import { useStorage } from '@vueuse/core'
import { useI18n } from 'vue-i18n'
import { initI18n } from '@/plugins/lang'

export interface UseLangOptions {
  storageKey?: string
  fallback?: string
}

export function useLang(options: UseLangOptions = {}) {
  const { storageKey = 'lang', fallback = 'en' } = options
  const { locale } = useI18n()

  // 初始化：优先 localStorage，否则走浏览器语言
  const initialLang = localStorage.getItem(storageKey) || initI18n() || fallback
  const lang = useStorage<string>(storageKey, initialLang)

  // 保证 locale 同步
  locale.value = lang.value

  watch(
    () => locale.value,
    (val) => {
      if (val && lang.value !== val) lang.value = val
    }
  )
  watch(lang, (v) => {
    if (v && locale.value !== v) locale.value = v
  })

  const setLocale = (v: string) => {
    locale.value = v
  }

  return { locale, setLocale }
}
