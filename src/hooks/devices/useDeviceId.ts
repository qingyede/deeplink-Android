import { appStore } from '@/store/Modules/app/index'
import { getDeviceName } from '@/utils/common/getDeviceName'
import { useAppSocket } from '@/hooks/common/useAppSocket'
import { getOrGenerateDeviceId } from '@/utils/common/getDeviceId'

export function useDeviceId() {
  const app = appStore()
  const { connect, send, onMessage, offMessage, waitForReady } = useAppSocket()

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

      const deviceId = await new Promise<string | null>((resolve) => {
        const timer = setTimeout(() => {
          offMessage(handler) // ⛔ 超时也要解绑
          resolve(null)
        }, 8000)

        const handler = (event: MessageEvent) => {
          try {
            const msg = JSON.parse(event.data)
            if (msg.method === 'registerDevice') {
              clearTimeout(timer)
              offMessage(handler) // ✅ 响应到达时解绑
              if (msg.result?.device_id) {
                app.deviceInfo = msg.result
                resolve(msg.result.device_id)
              } else {
                resolve(null)
              }
            }
          } catch {
            clearTimeout(timer)
            offMessage(handler)
            resolve(null)
          }
        }

        onMessage(handler)

        send({
          id: 1,
          method: 'registerDevice',
          token: '',
          params: {
            device_name,
            mac: app.deviceId,
          },
        })
      })

      if (deviceId) {
        resolved = true
        return deviceId
      }

      console.warn('[WS] registerDevice 失败，重试中...')
      await sleep(1000)
    }

    throw new Error('注册设备失败')
  }

  return {
    registerDevice,
  }
}

function sleep(ms: number) {
  return new Promise((res) => setTimeout(res, ms))
}
