// src/hooks/useRemoteStream.ts
import { ref, onUnmounted } from 'vue'
import { useEventListener } from '@vueuse/core'

interface RemoteDevicePayload {
  id: string
  password: string
}

interface HeartbeatPayload {
  action: number
  data: any
}

/**
 * 用于控制远程设备连接与心跳维持
 * 包括生成 clientID、连接、心跳维护、断开等功能
 */
export function useRemoteStream() {
  /** 连接状态 */
  const isConnected = ref(false)

  /** 全局唯一 clientID，每次设备生成一次并持久化 */
  const clientID = ref(generateClientID())

  /** 心跳定时器句柄 */
  let heartbeatTimer: ReturnType<typeof setInterval> | null = null

  /**
   * 生成 9 位随机数 clientID，并持久化到 localStorage
   */
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

  /**
   * 发起远程连接请求
   * @param id 远程设备ID
   * @param password 密码
   */
  function connectToRemoteDevice({ id, password }: RemoteDevicePayload) {
    // if (!window.dlc?.toNative) {
    //   window.$message?.warning('未检测到 Native 桥接对象 window.dlc')
    //   throw new Error('未检测到 Native 桥接对象 window.dlc')
    // }

    const payload = {
      action: 1001,
      data: {
        name: id,
        password,
        clientID: clientID.value,
      },
    }
    console.log(payload, 'payloadpayloadpayload')
    window.dlc.toNative(JSON.stringify(payload))
    isConnected.value = true
    startHeartbeat()
  }

  /**
   * 定时发送心跳数据，保持连接状态
   */
  function sendHeartbeat() {
    const payload: HeartbeatPayload = {
      action: 3004,
      data: {
        clientID: clientID.value,
        timestamp: Date.now(),
        type: 'heartbeat',
      },
    }

    if (window.dlc?.toNative) {
      window.dlc.toNative(JSON.stringify(payload))
    } else {
      console.warn('❗️ 心跳发送失败，dlc 不存在')
    }
  }

  /**
   * 启动心跳定时器
   */
  function startHeartbeat() {
    stopHeartbeat() // 先停掉旧的
    heartbeatTimer = setInterval(() => {
      sendHeartbeat()
    }, 5000)
  }

  /**
   * 停止心跳定时器
   */
  function stopHeartbeat() {
    if (heartbeatTimer) {
      clearInterval(heartbeatTimer)
      heartbeatTimer = null
    }
  }

  /**
   * 自动处理 native 回调（如断开、错误）
   */
  useEventListener(window, 'toH5', (e: any) => {
    try {
      const raw = typeof e === 'string' ? e : e.detail
      const { action, data } = JSON.parse(raw)
      switch (action) {
        case 2001:
          console.log('[远程] 串流断开')
          isConnected.value = false
          stopHeartbeat()
          break
        case 2002:
          console.warn('[远程] 串流失败：', data?.message || data)
          isConnected.value = false
          stopHeartbeat()
          break
        case 2000:
          console.log('[远程] 串流成功')
          break
        default:
          break
      }
    } catch (err) {
      console.error('解析 window.toH5 数据失败', err)
    }
  })

  // 页面卸载时清理心跳
  onUnmounted(() => {
    stopHeartbeat()
  })

  return {
    isConnected,
    clientID,
    connectToRemoteDevice,
    sendHeartbeat,
    stopHeartbeat,
  }
}
