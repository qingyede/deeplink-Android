// src/hooks/devices/useDeviceId.ts
import { appStore } from '@/store/Modules/app/index'
import { getDeviceName } from '@/utils/common/getDeviceName'
import { useAppSocket } from '@/hooks/common/useAppSocket'

export function useDeviceId() {
  const app = appStore()
  const { connect, send, onMessage, cleanup } = useAppSocket()

  const registerDevice = async () => {
    connect()

    const device_name = getDeviceName()

    send({
      id: 1,
      method: 'registerDevice',
      token: '',
      params: {
        device_name: device_name,
        mac: 'E0-D4-E8-47-5C-D9',
      },
    })

    return new Promise<string>((resolve, reject) => {
      onMessage((event) => {
        try {
          const message = JSON.parse(event.data)
          if (message.method === 'registerDevice') {
            if (message.result?.device_id) {
              console.log('[WS] 设备注册成功:', message.result)
              app.deviceInfo = message.result
              resolve(message.result.device_id)
            } else {
              reject('registerDevice failed: no device_id')
            }
          }
        } catch (err) {
          reject(err)
        }
      })
    })
  }

  return {
    registerDevice,
    cleanup,
  }
}
