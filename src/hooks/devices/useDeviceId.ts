// src/hooks/devices/useDeviceId.ts
import { appStore } from '@/store/Modules/app/index'
import { getDeviceName } from '@/utils/common/getDeviceName'
import { useAppSocket } from '@/hooks/common/useAppSocket'
import { getOrGenerateDeviceId } from '@/utils/common/getDeviceId'

export function useDeviceId() {
  const app = appStore()
  const { connect, send, onMessage, cleanup, waitForReady } = useAppSocket()

  const registerDevice = async (): Promise<string> => {
    getOrGenerateDeviceId()
    connect()

    let resolved = false

    while (!resolved) {
      try {
        await waitForReady()
      } catch {
        console.warn('[WS] 等待连接失败，重试中...')
        await sleep(1000)
        continue
      }

      const device_name = getDeviceName()

      // 每次注册都需监听响应
      const deviceId = await new Promise<string | null>((resolve) => {
        send({
          id: 1,
          method: 'registerDevice',
          token: '',
          params: {
            device_name,
            mac: app.deviceId,
          },
        })

        const timer = setTimeout(() => {
          resolve(null)
        }, 8000)

        const handler = (event: MessageEvent) => {
          try {
            const msg = JSON.parse(event.data)
            if (msg.method === 'registerDevice') {
              clearTimeout(timer)
              if (msg.result?.device_id) {
                app.deviceInfo = msg.result
                resolve(msg.result.device_id)
              } else {
                resolve(null)
              }
            }
          } catch {
            resolve(null)
          }
        }

        onMessage(handler)
      })

      if (deviceId) {
        resolved = true
        return deviceId
      }

      console.warn('[WS] registerDevice 失败，重试中...')
      await sleep(1000)
    }

    // 理论上不会走到这
    throw new Error('注册设备失败')
  }

  return {
    registerDevice,
    cleanup,
  }
}

function sleep(ms: number) {
  return new Promise((res) => setTimeout(res, ms))
}
