/**
 * 脱敏中间字符串（如地址、哈希）
 * @param str 原始字符串
 * @param prefixLen 保留前缀长度，默认 6
 * @param suffixLen 保留后缀长度，默认 4
 * @param maskStr 中间替代符号，默认 '...'
 * @returns 脱敏后的字符串
 */
export function maskMiddle(str: string, prefixLen = 6, suffixLen = 4, maskStr = '...'): string {
  if (!str || typeof str !== 'string') return ''

  // 若总长度不足以脱敏，直接返回原字符串
  if (str.length <= prefixLen + suffixLen) return str

  const prefix = str.slice(0, prefixLen)
  const suffix = str.slice(-suffixLen)
  return `${prefix}${maskStr}${suffix}`
}
