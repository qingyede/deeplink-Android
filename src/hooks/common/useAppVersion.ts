// src/hooks/useAppVersion.ts
import { ref, onMounted, onUnmounted } from 'vue'

// 兼容安卓同步返回 + iOS 异步 toH5 回调
export function useAppVersion(t) {
  const version = ref('')
  let resolved = false
  let timer: any = null
  let originalToH5

  const finish = (ver) => {
    if (resolved) return
    version.value = ver || t('app.unknownVersion')
    resolved = true
    cleanup()
  }

  const cleanup = () => {
    if (timer) clearTimeout(timer)
    timer = null
    if (typeof originalToH5 === 'function') {
      window.toH5 = originalToH5
      originalToH5 = undefined
    }
  }

  // iOS 异步回包：action: 4001
  function onToH5Wrapped(json) {
    try {
      const payload = JSON.parse(json || '{}')
      if (payload && payload.action === 4001) {
        const d = payload.data || {}
        finish(d.ver || d.version || d.appVersion || '')
      }
    } catch {}
    if (typeof originalToH5 === 'function') {
      try {
        originalToH5(json)
      } catch {}
    }
  }

  // 尝试从安卓同步返回中取版本（字符串/JSON/对象都兼容一下）
  function extractSyncVersion(ret) {
    if (ret == null) return
    if (typeof ret === 'string' && !ret.trim().startsWith('{')) return ret.trim()
    if (typeof ret === 'string') {
      try {
        const obj = JSON.parse(ret)
        const d = obj?.data ?? obj
        return d?.ver || d?.version || d?.appVersion
      } catch {}
    }
    if (typeof ret === 'object') {
      const d = ret.data ?? ret
      return d?.ver || d?.version || d?.appVersion
    }
  }

  onMounted(() => {
    // 先包裹，避免 iOS 回包丢失
    originalToH5 = typeof window.toH5 === 'function' ? window.toH5 : undefined
    window.toH5 = onToH5Wrapped

    try {
      if (window.dlc && window.dlc.toNative) {
        const ret = window.dlc.toNative(JSON.stringify({ action: 4001 })) // 安卓可能同步返回
        const syncVer = extractSyncVersion(ret)
        if (syncVer) finish(syncVer)
      } else {
        version.value = t('app.cannotFetchVersion')
      }
    } catch {
      version.value = t('app.fetchVersionFailed')
    }

    // 超时兜底（可按需替换文案）
    timer = setTimeout(() => {
      if (!resolved) {
        version.value = t('app.fetchVersionFailed')
        cleanup()
      }
    }, 5000)
  })

  onUnmounted(cleanup)

  return { version }
}
