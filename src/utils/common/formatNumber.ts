/**
 * 格式化数字为千分位
 *
 * @param input 数字或者字符串
 * @param options 可选参数
 *        decimals: 保留小数位数（默认保留原始位数）
 *        trimZeros: 是否去掉多余结尾 0（默认 false）
 * @returns 格式化字符串
 */
export function formatNumber(
  input: number | string,
  options?: {
    decimals?: number
    trimZeros?: boolean
  }
): string {
  if (input === null || input === undefined || input === '') {
    return '0'
  }

  let num = Number(input)
  if (isNaN(num)) {
    return String(input)
  }

  let decimals = options?.decimals ?? 2

  // 格式化小数位
  let parts: string[]
  if (decimals !== undefined) {
    parts = num.toFixed(decimals).split('.')
  } else {
    parts = num.toString().split('.')
  }

  const integerPart = parts[0]
  const decimalPart = parts[1]

  // 千分位
  const withCommas = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ',')

  if (decimalPart !== undefined) {
    let result = `${withCommas}.${decimalPart}`

    if (options?.trimZeros) {
      // 去掉结尾多余 0
      result = result.replace(/\.?0+$/, '')
    }

    return result
  } else {
    return withCommas
  }
}
