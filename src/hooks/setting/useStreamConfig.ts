// src/hooks/common/useStreamConfig.ts

export function useStreamConfig() {
  const sendStreamConfig = (config: any = {}) => {
    const payload = {
      action: 3003,
      data: {
        // 固定默认分辨率 1920×1080
        resolution: { w: 1920, h: 1080 },
        ...config, // 允许业务覆盖
      },
    }

    console.log('[StreamConfig] 传递的配置:', payload)

    if (window?.dlc?.toNative) {
      try {
        window.dlc.toNative(JSON.stringify(payload))
      } catch (e) {
        console.warn('[StreamConfig] 调用 dlc.toNative 失败：', e, payload)
      }
    } else {
      console.warn('[StreamConfig] 当前环境不支持 Native 调用，payload=', payload)
    }
  }

  return {
    sendStreamConfig,
  }
}
