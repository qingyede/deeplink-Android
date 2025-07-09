// src/plugins/lang/i18nOptions.ts

import en from '@/locales/lang/en.json'
import zh from '@/locales/lang/zh.json'
import ko from '@/locales/lang/ko.json'
import { createI18n } from 'vue-i18n'

const i18n = createI18n({
  legacy: false,
  locale: 'en', // 默认显示语言
  messages: {
    en,
    zh,
    ko,
  },
})

export default i18n
