// src/bridge/nativeBridge.ts
import { onUnmounted } from 'vue'

type AnyObj = Record<string, any>
type Handler = (payload: { action: number; data: any; raw: AnyObj }) => void

class Emitter {
  private map = new Map<string, Set<Handler>>()
  on(event: string, cb: Handler) {
    if (!this.map.has(event)) this.map.set(event, new Set())
    this.map.get(event)!.add(cb)
    return () => this.off(event, cb)
  }
  off(event: string, cb: Handler) {
    this.map.get(event)?.delete(cb)
  }
  emit(event: string, payload: any) {
    this.map.get(event)?.forEach((cb) => cb(payload))
  }
}

const emitter = new Emitter()
let initialized = false
let debug = false

// === 新增：就绪状态与等待队列 ===
let dlcReady = false
const pendingQueue: any[] = []
let warnedOnce = false
let readyResolvers: Array<() => void> = []

export function enableNativeBridgeDebug(v = true) {
  debug = v
}

/** 对外提供：等待 dlc 就绪（带超时） */
export function waitDlcReady(timeout = 8000) {
  if (dlcReady) return Promise.resolve()
  return new Promise<void>((resolve, reject) => {
    const timer = setTimeout(() => {
      // 超时仍未就绪，才提示一次
      if (!warnedOnce) {
        warnedOnce = true
        console.warn('[nativeBridge] dlc 未就绪（超过超时阈值）')
        window.$message?.warning?.('Native 通道未就绪，请稍后重试')
      }
      reject(new Error('dlc not ready'))
    }, timeout)
    readyResolvers.push(() => {
      clearTimeout(timer)
      resolve()
    })
  })
}

function markDlcReady() {
  if (dlcReady) return
  dlcReady = true
  if (debug) console.log('[nativeBridge] dlc ready, flushing', pendingQueue.length, 'messages')
  // 先把队列里缓存的消息发出去
  while (pendingQueue.length) {
    const payload = pendingQueue.shift()
    try {
      window.dlc!.toNative!(JSON.stringify(payload))
    } catch (e) {
      console.error('[nativeBridge] flush toNative failed:', e, payload)
    }
  }
  // 触发等待者
  readyResolvers.forEach((fn) => fn())
  readyResolvers = []
}

/** 只初始化一次：接入 toH5 事件流 + 兜底 wrap window.toH5 + 就绪探测 */
export function useNativeBridge() {
  if (!initialized) {
    initialized = true

    // 1) toH5 事件入口（来自 index.html / h5.html 的广播，或 wrap 的调用）
    window.addEventListener('toH5', (ev: any) => {
      if (!ev?.detail) return
      handleIncoming(ev.detail)
    })

    // 2) 兜底：原生直接调 window.toH5(json) 也能被处理
    try {
      const original = window.toH5
      window.toH5 = (json: any) => {
        handleIncoming(json)
        if (typeof original === 'function') {
          try {
            original(json)
          } catch (e) {
            console.error('[nativeBridge] original toH5 error:', e)
          }
        }
      }
    } catch (e) {
      if (debug) console.warn('[nativeBridge] wrap window.toH5 failed, rely on event only:', e)
    }

    // 3) 监听 “dlc-ready” 事件（由入口 h5.html 触发）
    window.addEventListener('dlc-ready', () => markDlcReady())

    // 4) 轮询探测：有些环境不会派发事件，这里兜底检测 window.dlc
    const iv = setInterval(() => {
      if (window.dlc?.toNative) {
        clearInterval(iv)
        markDlcReady()
      }
    }, 100)
    // 最长轮询 10s
    setTimeout(() => clearInterval(iv), 10000)

    // 5) 非 Qt 环境兜底：提供 mock 并标记就绪（避免页面一进来就警告）
    if (!window.dlc) {
      window.dlc = { toNative: (msg: string) => console.log('[dlc.toNative mock] ->', msg) }
      // 直接标记“就绪”，让前端流程跑起来（在浏览器里开发调试）
      markDlcReady()
    }
  }

  /** 统一向原生发送（未就绪时入队，避免一进来就告警） */
  function toNative(payload: any) {
    if (dlcReady && window.dlc?.toNative) {
      if (debug) console.log('[nativeBridge] -> toNative:', payload)
      try {
        window.dlc.toNative(JSON.stringify(payload))
      } catch (e) {
        console.error('[nativeBridge] toNative 调用失败：', e, payload)
      }
      return
    }
    // 尚未就绪：入队缓存，稍后统一 flush；此时不提示
    pendingQueue.push(payload)
  }

  function onAction(action: number, cb: Handler) {
    return emitter.on(`action:${action}`, cb)
  }
  function onActionMethod(action: number, method: string, cb: Handler) {
    return emitter.on(`action:${action}:method:${method}`, cb)
  }
  function useOnAction(action: number, cb: Handler) {
    const off = onAction(action, cb)
    onUnmounted(off)
  }
  function useOnActionMethod(action: number, method: string, cb: Handler) {
    const off = onActionMethod(action, method, cb)
    onUnmounted(off)
  }

  return { toNative, onAction, onActionMethod, useOnAction, useOnActionMethod, waitDlcReady }
}

function handleIncoming(jsonLike: any) {
  let outer: AnyObj = jsonLike
  try {
    if (typeof jsonLike === 'string') {
      try {
        outer = JSON.parse(jsonLike)
      } catch {
        // 兼容 data 是未转义 JSON 字符串
        const fixed = jsonLike.replace(
          /"data"\s*:\s*"(\\?{[\s\S]*?\\?})"\s*(?=[,}])/,
          (_m: any, inner: string) => `"data":${inner.replace(/\\"/g, '"')}`
        )
        outer = JSON.parse(fixed)
      }
    }

    const action = Number(outer?.action)
    const data = typeof outer?.data === 'string' ? safeParse(outer.data) : outer?.data
    const method = outer?.method ?? (typeof data === 'object' && data ? data.method : undefined)

    if (debug) console.log('[nativeBridge] <- toH5:', outer)

    emitter.emit(`action:${action}`, { action, data, raw: outer })
    if (method) {
      emitter.emit(`action:${action}:method:${method}`, { action, data, raw: outer })
    }
  } catch (e) {
    console.error('[nativeBridge] parse incoming failed:', e, 'raw:', jsonLike)
  }
}

function safeParse(str: string) {
  try {
    return JSON.parse(str)
  } catch {
    return str
  }
}
