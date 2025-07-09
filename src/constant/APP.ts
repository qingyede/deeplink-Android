// 主题方案
const themeColors: any = [
  {
    theme: 'app', // 主视觉色风格命名（你可自定义）
    light: {
      /* 亮色主题 */
      primaryColor: '#03C188', // 主色调，清新青绿
      primaryColorHover: '#3CD8A6', // 悬停时更轻盈的绿
      primaryColorPressed: '#02946A', // 按下时偏深，增强层次感
      primaryColorSuppl: '#E6FBF5', // 浅青绿色，组件弱背景用（如按钮边框、高亮背景）
    },
    dark: {
      /* 暗色主题 */
      primaryColor: '#03C188', // 依旧为核心主色
      primaryColorHover: '#4FD3AD', // 暗色下更清透的青绿增强亮度
      primaryColorPressed: '#02795A', // 按下时降低明度，提高对比度
      primaryColorSuppl: '#1C1D1D', // 用于暗色模式下的边框或背景弱高亮
    },
  },
  {
    theme: 'youth', // 青春风格
    light: {
      primaryColor: '#ff5c5c',
      primaryColorHover: '#ff7373',
      primaryColorPressed: '#e04c4c',
      primaryColorSuppl: '#ffe5e0',
    },
    dark: {
      primaryColor: '#ff6f61',
      primaryColorHover: '#ff856d',
      primaryColorPressed: '#e55b57',
      primaryColorSuppl: '#ffd7c1',
    },
  },
]

export const APP = {
  // 应用标题
  appTitle: '我是应用名',
  // 程序白天模式的主题色
  lightThemeOverrides: {
    common: {
      /* 亮色主题 */
      ...themeColors.find((t) => t.theme === 'app').light,
      fontSizeMedium: '16px',
    },
  },
  // 程序黑夜模式的主题色
  darkThemeOverrides: {
    common: {
      /* 暗色主题 */
      ...themeColors.find((t) => t.theme === 'app').dark,
      fontSizeMedium: '16px',
    },
  },
}

// 多语言配置
interface LanguageMap {
  [key: string]: { label: string; icon: string }
}
export const LANG_MAP: LanguageMap = {
  en: { label: 'English', icon: '🇺🇸' },
  zh: { label: '中文', icon: '🇨🇳' },
  ko: { label: '한국어', icon: '🇰🇷' },
  ja: { label: '日本語', icon: '🇯🇵' },
  ru: { label: 'Русский', icon: '🇷🇺' },
  vn: { label: 'Việt nam', icon: '🇻🇳' },
  es: { label: 'Español', icon: '🇪🇸' },
  fr: { label: 'Français', icon: '🇫🇷' },
  de: { label: 'Deutsch', icon: '🇩🇪' },
  tr: { label: 'Türkçe', icon: '🇹🇷' },
} as const

// 图标映射
export const iconMap: any = {
  windows: 'devicon:windows8', // Windows
  macos: 'logos:apple', // macOS
  ubuntu: 'logos:ubuntu', // Ubuntu
  debian: 'logos:debian', // Debian
  fedora: 'logos:fedora', // Fedora
  redhat: 'logos:redhat', // Red Hat
  centos: 'logos:centos-icon', // CentOS
  arch: 'logos:archlinux', // Arch Linux
  android: 'devicon:android', // Android
  ios: 'logos:apple', // iOS
  chromeos: 'simple-icons:googlechrome', // Chrome OS
  opensuse: 'logos:opensuse', // openSUSE
  manjaro: 'logos:manjaro', // Manjaro
  linuxmint: 'logos:linux-mint', // Linux Mint
  kali: 'simple-icons:kalilinux', // Kali Linux
  alpine: 'simple-icons:alpinelinux', // Alpine Linux
  oraclelinux: 'logos:oracle', // Oracle Linux
  raspbian: 'logos:raspberry-pi', // Raspbian
  solaris: 'logos:solarwinds', // Solaris (尝试使用 logos 库中的 sun 图标)
  freebsd: 'logos:freebsd', // FreeBSD

  // 新增移动设备
  iphone: 'logos:apple',
  huawei: 'simple-icons:huawei',
  androidPhone: 'logos:android-icon',

  // 未知类型
  unknown: 'mdi:help-circle',
}
