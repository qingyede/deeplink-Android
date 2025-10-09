// src/hooks/useRemoteStream.ts
import { ref, onMounted, onUnmounted } from 'vue'
import { useNativeBridge } from '@/bridge/nativeBridge'

interface RemoteDevicePayload {
  id: string
  password: string
}

interface HeartbeatPayload {
  action: number
  data: any
}

export function useRemoteStream() {
  const { toNative, useOnAction, useOnActionMethod } = useNativeBridge()

  /** 连接状态 */
  const isConnected = ref(false)
  /** 全局唯一 clientID，每次设备生成一次并持久化 */
  const clientID = ref(generateClientID())
  /** 心跳定时器句柄 */
  let heartbeatTimer: ReturnType<typeof setInterval> | null = null

  function generateClientID(): string {
    const saved = localStorage.getItem('clientID')
    if (saved) return saved
    const id = `${Math.floor(Math.random() * 9 + 1)}${Array(8)
      .fill(0)
      .map(() => Math.floor(Math.random() * 10))
      .join('')}`
    localStorage.setItem('clientID', id)
    return id
  }

  /** 发起连接（⚠️ 不要立刻置 isConnected/startHeartbeat，等成功回调） */
  function connectToRemoteDevice({ id, password }: RemoteDevicePayload) {
    const payload = {
      action: 1001,
      data: {
        name: id,
        password,
        clientID: clientID.value,
      },
    }
    console.log('[远程连接] 发起:', payload)
    toNative(payload)
  }

  /** 安卓钱包透传版 */
  function connectToAndroidRemoteDevice(data: any) {
    const fullPayload = { action: 1001, data }
    console.log('[安卓远程连接] 发起:', fullPayload)
    toNative(fullPayload)
  }

  /** 心跳发送（只有连接成功后才会被启动） */
  function sendHeartbeat() {
    const payload: HeartbeatPayload = {
      action: 3004,
      data: {
        clientID: clientID.value,
        timestamp: Date.now(),
        type: 'heartbeat',
      },
    }
    toNative(payload)
  }

  function startHeartbeat() {
    stopHeartbeat()
    heartbeatTimer = setInterval(sendHeartbeat, 5000)
  }

  function stopHeartbeat() {
    if (heartbeatTimer) {
      clearInterval(heartbeatTimer)
      heartbeatTimer = null
    }
  }

  onMounted(() => {
    // ========= 订阅连接结果（示例：2000/2001/2002；如你们协议不同，请改成真实 action） =========
    useOnAction(2000, ({ data }) => {
      console.log('[远程连接] 成功:', data)
      isConnected.value = true
      startHeartbeat()
    })

    useOnAction(2001, ({ data }) => {
      console.warn('[远程连接] 失败:', data)
      isConnected.value = false
      stopHeartbeat()
    })

    useOnAction(2002, ({ data }) => {
      console.warn('[远程连接] 被拒绝或中断:', data)
      isConnected.value = false
      stopHeartbeat()
    })

    // ========= 订阅 3004/authAck（你原有逻辑） =========
    useOnActionMethod(3004, 'authAck', ({ data }) => {
      const payload = data?.data ?? data
      const { version, nft_enabled, cafe_selfuse } = payload || {}
      console.log('[远程] 收到 authAck:', { version, nft_enabled, cafe_selfuse })

      if (cafe_selfuse === true) {
        // window.$message?.warning?.('该设备为网吧内部自用（禁止自动挖矿），禁止被远程。', { duration: 0, closable: true })
        console.log('该设备为网吧内部自用（禁止自动挖矿），禁止被远程。')
      } else if (nft_enabled === false) {
        // window.$message?.error?.('被控端未启用 NFT，来自 Android/H5 的远程认证不通过。', { duration: 0, closable: true })
        console.log('被控端未启用 NFT，来自 Android/H5 的远程认证不通过。')
      }
    })
  })

  onUnmounted(() => {
    stopHeartbeat()
  })

  return {
    isConnected,
    clientID,
    connectToRemoteDevice,
    connectToAndroidRemoteDevice,
    sendHeartbeat,
    stopHeartbeat,
  }
}
