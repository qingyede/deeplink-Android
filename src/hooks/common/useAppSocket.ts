import { ref, getCurrentInstance, onUnmounted } from 'vue'

const socket = ref<WebSocket | null>(null)

let pingInterval: ReturnType<typeof setInterval> | null = null
let pongTimeout: ReturnType<typeof setTimeout> | null = null

let reconnecting = false

const messageHandlers = new Set<(event: MessageEvent) => void>()
const openHandlers = new Set<() => void>() // ✅ 用于连接成功后执行逻辑

const WS_URL = 'wss://go.deeplink.cloud/websocket'

// ✅ WebSocket 准备状态 Promise 控制器
let readyPromise: Promise<void> | null = null
let readyResolve: (() => void) | null = null
let readyReject: ((err: any) => void) | null = null

const waitForReady = () => {
  if (!readyPromise) {
    readyPromise = new Promise<void>((resolve, reject) => {
      readyResolve = resolve
      readyReject = reject
    })
  }
  return readyPromise
}

const isConnected = () => socket.value?.readyState === WebSocket.OPEN

// ✅ 将 WebSocket 所有事件集中绑定
function bindSocketEvents(ws: WebSocket) {
  ws.onopen = () => {
    console.log('[WebSocket] ✅ 已连接')
    readyResolve?.()
    startPing()
    openHandlers.forEach((cb) => cb())
  }

  ws.onmessage = (event) => {
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

  ws.onerror = (err) => {
    console.error('[WebSocket] ❌ 出错:', err)
    readyReject?.(err)
    reconnect()
  }

  ws.onclose = () => {
    console.warn('[WebSocket] ⚠️ 已关闭')
    readyReject?.(new Error('WebSocket closed'))
    reconnect()
  }
}

function connect() {
  if (socket.value) return

  readyPromise = new Promise<void>((resolve, reject) => {
    readyResolve = resolve
    readyReject = reject
  })

  socket.value = new WebSocket(WS_URL)
  bindSocketEvents(socket.value)
}

function startPing() {
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

function reconnect() {
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

function send(data: object | string) {
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

function onMessage(handler: (event: MessageEvent) => void) {
  messageHandlers.add(handler)
}

function offMessage(handler: (event: MessageEvent) => void) {
  messageHandlers.delete(handler)
}

function onOpen(handler: () => void) {
  openHandlers.add(handler)
}

function cleanup() {
  socket.value?.close()
  clearInterval(pingInterval!)
  clearTimeout(pongTimeout!)
  // 不清空 messageHandlers / openHandlers
  readyPromise = null
  readyResolve = null
  readyReject = null
}

// ✅ 自动清理当前组件使用的 socket（可选）
if (getCurrentInstance()) {
  onUnmounted(() => {
    cleanup()
  })
}

export function useAppSocket() {
  return {
    socket,
    connect,
    send,
    onMessage,
    offMessage,
    onOpen,
    waitForReady,
    cleanup,
    isConnected,
  }
}
