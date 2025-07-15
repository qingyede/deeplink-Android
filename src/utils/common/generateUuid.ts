// src/utils/generateUuid.ts
import { v4 as uuidv4 } from 'uuid'

/**
 * 生成指定长度的随机字符串（基于 uuid 去除连接符）
 * @param length 生成的字符串长度（建议范围：1 ~ 32）
 * @returns 随机字符串
 */
export function generateRandomId(length: number): string {
  if (length <= 0) return ''
  const uuid = uuidv4().replace(/-/g, '') // 移除连字符，总共32位
  if (length <= 32) {
    return uuid.slice(0, length)
  } else {
    // 超过32位则递归拼接
    return (uuid + generateRandomId(length - 32)).slice(0, length)
  }
}
