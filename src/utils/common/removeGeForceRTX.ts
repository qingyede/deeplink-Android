/**
 * 移除字符串里的 "GeForce RTX"
 * @param str 原字符串
 * @returns 移除后的字符串
 */
export function removeGeForceRTX(str: string): string {
  const keyword = 'GeForce RTX'
  if (str.includes(keyword)) {
    return str.replace(keyword, '').trim()
  } else {
    return str
  }
}
