import tinycolor from 'tinycolor2'
import { ref, watch } from 'vue'

export function useColorWithOpacity(primaryColor) {
  const rgbaColors = ref<string[]>([])
  const generateColors = () => {
    rgbaColors.value = Array.from({ length: 10 }, (_, i) => {
      // 设置透明度（从 0.1 到 1）
      const alpha = (i + 1) / 10
      return tinycolor(primaryColor).setAlpha(alpha).toRgbString()
    })
  }

  generateColors() // 初始化时生成颜色

  const createCssVariables = () => {
    const root = document.documentElement
    const variableNames = [
      '--primary-color', // 主要色
      '--secondary-color', // 次要色
      '--tertiary-color', // 次次要色
      '--quaternary-color', // 次次次要色
    ]

    // 根据颜色层次从 rgbaColors 数组中赋值

    root.style.setProperty(variableNames[0], rgbaColors.value[rgbaColors.value.length - 1]) // 主要色为数组的最后一个
    root.style.setProperty(variableNames[1], rgbaColors.value[5]) // 次要色
    root.style.setProperty(variableNames[2], rgbaColors.value[3]) // 次次要色
    root.style.setProperty(variableNames[3], rgbaColors.value[1]) // 次次次要色
  }

  return {
    rgbaColors,
    createCssVariables,
  }
}
