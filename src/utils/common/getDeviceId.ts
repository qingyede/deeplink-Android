import { appStore } from '@/store/Modules/app'

/**
 * 获取或生成设备 ID（格式为 9 位随机整数字符串，如 876852922）
 * 如果 appapp 中已有 deviceId，则直接返回并打印
 */
export function getOrGenerateDeviceId() {
  const app = appStore()

  // 如果已存在 deviceId，则直接返回
  if (app.deviceId) {
    console.log('已有设备 ID:', app.deviceId)
    return false
  }

  // 生成新的 9 位随机数字作为 deviceId
  const deviceId = generateNumericDeviceId()

  // 存入 app（你可视情况决定是否保存）
  app.deviceId = deviceId
  console.log('生成新的设备 ID:', deviceId)
}

/**
 * 生成 9 位随机数字字符串（类似设备 ID）
 * 示例：876852922
 */
function generateNumericDeviceId(): string {
  const min = 100_000_000 // 最小 9 位数
  const max = 999_999_999 // 最大 9 位数
  return Math.floor(Math.random() * (max - min + 1)) + min + ''
}
