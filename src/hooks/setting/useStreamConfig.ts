// src/hooks/common/useStreamConfig.ts

export function useStreamConfig() {
  const sendStreamConfig = (config: any) => {
    console.log(config, 'configconfig')
    if (window?.dlc?.toNative) {
      window.dlc.toNative(
        JSON.stringify({
          action: 3003,
          data: config,
        })
      )
    } else {
      console.warn('[StreamConfig] 当前环境不支持 Native 调用')
    }
  }

  return {
    sendStreamConfig,
  }
}
