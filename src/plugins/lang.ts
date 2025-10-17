import en from '@/locales/lang/en.json'
import zh from '@/locales/lang/zh.json'
import ko from '@/locales/lang/ko.json'
import ja from '@/locales/lang/ja.json'
import ru from '@/locales/lang/ru.json'
import vn from '@/locales/lang/vn.json'
import { createI18n } from 'vue-i18n'

const i18n = createI18n({
  legacy: false,
  locale: 'en', // 默认显示语言
  messages: {
    en,
    zh,
    ko,
    ja,
    ru,
    vn,
  },
})

export default i18n

// 语言简写映射
const languageMap: Record<string, string> = {
  en: 'en',
  'en-US': 'en',
  'en-GB': 'en',

  zh: 'zh',
  'zh-CN': 'zh',
  'zh-SG': 'zh',
  'zh-HK': 'zh',
  'zh-TW': 'zh',

  ko: 'ko',
  'ko-KR': 'ko',

  ja: 'ja',
  'ja-JP': 'ja',

  ru: 'ru',
  'ru-RU': 'ru',

  vn: 'vn',
  vi: 'vn',
  'vi-VN': 'vn',

  es: 'es',
  'es-ES': 'es',
  'es-MX': 'es',

  fr: 'fr',
  'fr-FR': 'fr',
  'fr-CA': 'fr',

  de: 'de',
  'de-DE': 'de',

  tr: 'tr',
  'tr-TR': 'tr',
}

// 根据用户本地设置的语言初始化用户语言
export const initI18n = () => {
  const savedLang = localStorage.getItem('lang')
  if (savedLang && Object.values(languageMap).includes(savedLang)) {
    console.log(`[i18n] 使用用户已设置语言: ${savedLang}`)
    return savedLang
  }

  const browserLang = navigator.language || 'en'
  const mappedLang = languageMap[browserLang] || 'en'

  // 设置到缓存中
  localStorage.setItem('lang', mappedLang)
  console.log(`[i18n] 使用系统语言映射: ${browserLang} → ${mappedLang}`)

  return mappedLang
}
