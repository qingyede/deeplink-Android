import { ref, onMounted } from 'vue'

// 自定义hook用于获取应用版本
export function useAppVersion(t) {
  // 定义响应式版本状态
  const version = ref('')

  // 在组件挂载时获取版本
  onMounted(() => {
    try {
      // 检查window.dlc和toNative方法是否存在
      if (window.dlc && window.dlc.toNative) {
        const ver = window.dlc.toNative(
          JSON.stringify({
            action: 4001,
          })
        )
        // 更新版本状态
        version.value = ver || t('app.unknownVersion')
      } else {
        version.value = t('app.cannotFetchVersion')
      }
    } catch (error) {
      console.error('获取应用版本失败:', error)
      version.value = t('app.fetchVersionFailed')
    }
  })

  // 返回版本状态
  return { version }
}
