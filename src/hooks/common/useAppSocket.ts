// src/hooks/common/useAppSocket.ts
import { ref, getCurrentInstance } from 'vue'

const socket = ref<WebSocket | null>(null)

let pingInterval: ReturnType<typeof setInterval> | null = null
let pongTimeout: ReturnType<typeof setTimeout> | null = null

let reconnecting = false

const messageHandlers = new Set<(event: MessageEvent) => void>()

const WS_URL = 'wss://go.deeplink.cloud/websocket'

export function useAppSocket() {
  const connect = () => {
    if (socket.value) return

    socket.value = new WebSocket(WS_URL)

    socket.value.onopen = () => {
      console.log('[WebSocket] 已连接')
      startPing()
    }

    socket.value.onmessage = (event) => {
      if (event.data === 'pong') {
        pongTimeout && clearTimeout(pongTimeout)
        return
      }

      try {
        const parsed = JSON.parse(event.data)

        if (parsed?.result?.error) {
          console.log('WebSocket 错误:', parsed.result.error)
        }

        messageHandlers.forEach((cb) => cb(event))
      } catch (err: any) {
        console.error('[WebSocket] 消息解析失败:', err)
      }
    }

    socket.value.onerror = (err) => {
      console.error('[WebSocket] 出错:', err)
      reconnect()
    }

    socket.value.onclose = () => {
      console.warn('[WebSocket] 已关闭')
      reconnect()
    }
  }

  const startPing = () => {
    pingInterval && clearInterval(pingInterval)
    pingInterval = setInterval(() => {
      if (socket.value?.readyState === WebSocket.OPEN) {
        socket.value.send('ping')
        pongTimeout && clearTimeout(pongTimeout)
        pongTimeout = setTimeout(() => {
          console.warn('[WebSocket] pong 未响应，主动关闭')
          socket.value?.close()
        }, 30000)
      }
    }, 10000)
  }

  const reconnect = () => {
    if (reconnecting) return
    reconnecting = true

    clearInterval(pingInterval!)
    clearTimeout(pongTimeout!)

    setTimeout(() => {
      console.log('[WebSocket] 正在重连...')
      socket.value = null
      connect()
      reconnecting = false
    }, 5000)
  }

  const send = (data: object | string) => {
    const payload = typeof data === 'string' ? data : JSON.stringify(data)

    const trySend = () => {
      if (socket.value?.readyState === WebSocket.OPEN) {
        socket.value.send(payload)
      } else {
        setTimeout(trySend, 1000)
      }
    }

    trySend()
  }

  const onMessage = (handler: (event: MessageEvent) => void) => {
    messageHandlers.add(handler)
  }

  const cleanup = () => {
    socket.value?.close()
    pingInterval && clearInterval(pingInterval)
    pongTimeout && clearTimeout(pongTimeout)
    messageHandlers.clear()
  }

  // 自动检测，如果在组件中使用，帮你绑定生命周期
  if (getCurrentInstance()) {
    import('vue').then(({ onUnmounted }) => {
      onUnmounted(() => {
        cleanup()
      })
    })
  }

  return {
    socket,
    connect,
    send,
    onMessage,
    cleanup,
  }
}
