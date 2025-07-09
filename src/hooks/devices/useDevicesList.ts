// src/hooks/device/useDeviceList.ts
import { ref, onMounted, onUnmounted } from 'vue'
import { useAppSocket } from '@/hooks/common/useAppSocket'
import { appStore } from '@/store/Modules/app'
import { getToken } from '@/api/test/test'

export function useDeviceList() {
  const { connect, send } = useAppSocket()
  const deviceList = ref<any[]>([])

  const fetchDeviceList = () => {
    const id = localStorage.getItem('android')
    const token = appStore().address
    // const {} = await getToken({})

    if (id) {
      send({
        id: 1,
        method: 'imOnline',
        token,
        params: { device_id: id },
      })

      send({
        id: 1,
        method: 'getDeviceList',
        token,
        params: {},
      })
    } else {
      const userAgent = navigator.userAgent
      const os_release = /iphone/i.test(userAgent) ? 'iphone' : /android/i.test(userAgent) ? 'android' : 'mobile'

      send({
        id: 1,
        method: 'registerDevice',
        token: '',
        params: {
          device_name: userAgent,
          os_releas: os_release,
        },
      })
    }
  }

  const onDeviceListUpdate = (e: Event) => {
    const list = (e as CustomEvent).detail
    deviceList.value = list || []
  }

  onMounted(() => {
    connect()
    fetchDeviceList()
    window.addEventListener('deviceList:update', onDeviceListUpdate)
  })

  onUnmounted(() => {
    window.removeEventListener('deviceList:update', onDeviceListUpdate)
  })

  return {
    deviceList,
    fetchDeviceList,
  }
}
