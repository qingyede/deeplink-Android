import { defineStore } from 'pinia'
import { getUserDeviceList } from '@/api/deviceList/index'
import { appStore } from '@/store/Modules/app/index'
import { iconMap } from '@/constant/APP'
import { getDeviceIcon } from '@/utils/common/getDeviceIcon'

export const useDeviceListStore = defineStore('deviceList', () => {
  const deviceList = ref<any>([])
  let loading = ref(false)
  const app = appStore()
  // 获取用户的租用列表
  const getUserDeviceListH = async () => {
    loading.value = true
    const { data: res } = await getUserDeviceList({
      wallet: app.address,
    })
    loading.value = false
    if (res.success) {
      console.log(res, 'JJJJJJJJJ')
      deviceList.value = res.content.map((item: any) => {
        return {
          name: item.os_release,
          icon: getDeviceIcon(item.os_release),
          loading: false,
          ...item,
        }
      })
    } else {
      window.$message?.error('获取用户的租用列表失败')
    }
  }
  return {
    deviceList,
    getUserDeviceListH,
    loading,
  }
})
