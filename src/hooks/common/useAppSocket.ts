// src/hooks/common/useAppSocket.ts
import { ref, getCurrentInstance, onUnmounted } from 'vue'

const socket = ref<WebSocket | null>(null)

let pingInterval: ReturnType<typeof setInterval> | null = null
let pongTimeout: ReturnType<typeof setTimeout> | null = null

let reconnecting = false

const messageHandlers = new Set<(event: MessageEvent) => void>()
const openHandlers = new Set<() => void>() // ✅ 用于连接成功后执行逻辑（如重新拉取数据）

const WS_URL = 'wss://go.deeplink.cloud/websocket'

// ✅ WebSocket 准备状态 Promise 控制器
let readyPromise: Promise<void> | null = null
let readyResolve: (() => void) | null = null
let readyReject: ((err: any) => void) | null = null

// ✅ 等待连接准备（组件调用 await waitForReady()）
const waitForReady = () => {
  if (!readyPromise) {
    readyPromise = new Promise<void>((resolve, reject) => {
      readyResolve = resolve
      readyReject = reject
    })
  }
  return readyPromise
}

// ✅ 是否已连接
const isConnected = () => socket.value?.readyState === WebSocket.OPEN

export function useAppSocket() {
  const connect = () => {
    if (socket.value) return

    // 重置 waitForReady 的 Promise
    readyPromise = new Promise<void>((resolve, reject) => {
      readyResolve = resolve
      readyReject = reject
    })

    socket.value = new WebSocket(WS_URL)

    socket.value.onopen = () => {
      console.log('[WebSocket] ✅ 已连接')
      readyResolve?.()
      startPing()

      // ✅ 执行所有连接成功回调
      openHandlers.forEach((cb) => cb())
    }

    socket.value.onmessage = (event) => {
      if (event.data === 'pong') {
        pongTimeout && clearTimeout(pongTimeout)
        return
      }

      try {
        const parsed = JSON.parse(event.data)

        if (parsed?.result?.error) {
          console.warn('[WebSocket] ⚠️ 错误:', parsed.result.error)
        }

        messageHandlers.forEach((cb) => cb(event))
      } catch (err: any) {
        console.error('[WebSocket] ❌ 消息解析失败:', err)
      }
    }

    socket.value.onerror = (err) => {
      console.error('[WebSocket] ❌ 出错:', err)
      readyReject?.(err)
      reconnect()
    }

    socket.value.onclose = () => {
      console.warn('[WebSocket] ⚠️ 已关闭')
      readyReject?.(new Error('WebSocket closed'))
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
          console.warn('[WebSocket] ❌ pong 未响应，主动关闭连接')
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
      console.log('[WebSocket] 🔄 正在重连...')
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

  // ✅ 注册消息监听回调
  const onMessage = (handler: (event: MessageEvent) => void) => {
    messageHandlers.add(handler)
  }

  // ✅ 注册连接成功回调（组件用于自动拉取数据）
  const onOpen = (handler: () => void) => {
    if (!openHandlers.has(handler)) {
      openHandlers.add(handler)
    }
  }

  // ✅ 清理 socket（但不清除 openHandlers，以保留组件回调）
  const cleanup = () => {
    socket.value?.close()
    clearInterval(pingInterval!)
    clearTimeout(pongTimeout!)
    // messageHandlers.clear()
    // ❗ 注意：不清空 openHandlers，避免 onOpen 注册失效
    readyPromise = null
    readyResolve = null
    readyReject = null
  }

  // ✅ 组件卸载自动清理（仅用于当前调用组件）
  if (getCurrentInstance()) {
    onUnmounted(() => {
      cleanup()
    })
  }

  return {
    socket,
    connect,
    send,
    onMessage,
    onOpen,
    waitForReady,
    cleanup,
    isConnected,
  }
}
