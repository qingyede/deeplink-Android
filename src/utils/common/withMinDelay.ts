// utils/withMinDelay.ts
import { promiseTimeout } from '@vueuse/core'

/**
 * 让异步任务至少执行 ms 毫秒后才 resolve（任务和计时谁慢等谁）
 */
export async function withMinDelay<T>(task: () => Promise<T>, ms = 600): Promise<T> {
  const [res] = await Promise.all([task(), promiseTimeout(ms)])
  return res
}
