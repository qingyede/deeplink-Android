/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: ['class', '[data-theme="dark"]'], // 添加这一行！
  theme: {
    screens: {
      xs: '360px', // 最小适配：小屏安卓、极端低端机
      sm: '375px', // iPhone 6/7/8/SE 等老旧或小屏机
      md: '390px', // 主流新款手机：iPhone 13~15、小米14
      lg: '430px', // 大屏旗舰：Pro Max、华为 Mate、红米 K 系
      xl: '768px', // iPad 竖屏
      '2xl': '1024px', // iPad 横屏 或小笔电
    },
    extend: {
      colors: {
        // ✅ 文本颜色（明暗统一设定）
        text: {
          base: '#000', // 默认主文本
          secondary: '#7E7E7E', // 次文本（灰色）
          hint: '#9CA3AF', // 提示
          light: '#ffffff', // 暗色模式下文本
        },

        // ✅ 背景色定义（用于页面基础）
        background: {
          base: '#EFF2F6', // 主页面背景（light）
          soft: '#EFF1F0', // 弱背景块（light）
          dark: '#1C1D1D', // 暗模式下主背景
          darkSoft: '#2A2B2B', // 暗模式弱背景
        },

        // ✅ 主色调：亮青绿，主视觉
        primary: {
          DEFAULT: '#03C188',
          light: '#3CD8A6',
          dark: '#02946A',
          50: '#E6FBF5',
          100: '#C4F5E3',
          200: '#98EDD1',
          300: '#6BE4BF',
          400: '#3CD8A6',
          500: '#03C188',
          600: '#02AC78',
          700: '#02946A',
          800: '#02795A',
          900: '#015F4A',
        },
        secondary: {
          DEFAULT: '#E3F0EC',
          light: '#E3F0EC',
          dark: '#5FC4A8',
          50: '#F2F9F6',
          100: '#E3F0EC',
          200: '#C4E0D7',
          300: '#A5D0C2',
          400: '#84C2B0',
          500: '#5FC4A8',
          600: '#4FB297',
          700: '#429E85',
          800: '#368B73',
          900: '#256C58',
        },
        // 新增语义色：卡片/面板表面
        surface: {
          // 亮色下：主色轻度染色的浅雾面
          DEFAULT: '#EAF9F3', // = color-mix(#03C188 10%, #fff)
          // 暗黑下：深灰绿调，低亮度，不刺眼
          dark: '#263530', // = color-mix(#03C188 16%, #0D0F0E)
          // 可选层级
          1: '#EFFAF6',
          2: '#E6F6F1',
          3: '#DFF2EC',
          dark1: '#16201D',
          dark2: '#1D2825',
          dark3: '#23312E',
        },
        // ✅ 协调灰阶：比默认 Tailwind 更柔和
        gray: {
          50: '#F8FAF9',
          100: '#EFF1F0',
          200: '#E1E4E3',
          300: '#C8CDCC',
          400: '#A3A9A8',
          500: '#7B8180',
          600: '#5D6261',
          700: '#474B4A',
          800: '#2F3231',
          900: '#1C1D1D',
        },

        // ✅ 成功状态：偏深绿色，避免和主色冲突
        success: {
          DEFAULT: '#1DA674',
          light: '#71D3B0',
          dark: '#117552',
          50: '#E7F8F1',
          100: '#C7F0DF',
          200: '#A1E6C9',
          300: '#71D3B0',
          400: '#44C59B',
          500: '#1DA674',
          600: '#158D62',
          700: '#117552',
          800: '#0E5C42',
          900: '#0B4935',
        },

        // ✅ 警告状态：亮黄橙色，亲和易读
        warning: {
          DEFAULT: '#F59E0B',
          light: '#FCD34D',
          dark: '#B45309',
          50: '#FFFAEB',
          100: '#FFF3C7',
          200: '#FDE68A',
          300: '#FCD34D',
          400: '#FBBF24',
          500: '#F59E0B',
          600: '#D97706',
          700: '#B45309',
          800: '#92400E',
          900: '#78350F',
        },

        // ✅ 错误状态：经典错误红，无需调整
        error: {
          DEFAULT: '#EF4444',
          light: '#FCA5A5',
          dark: '#B91C1C',
          50: '#FEF2F2',
          100: '#FEE2E2',
          200: '#FECACA',
          300: '#FCA5A5',
          400: '#F87171',
          500: '#EF4444',
          600: '#DC2626',
          700: '#B91C1C',
          800: '#991B1B',
          900: '#7F1D1D',
        },
      },
    },
  },
  plugins: [],
}
