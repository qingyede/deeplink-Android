import { defineStore } from 'pinia'
import { getUserDeviceList } from '@/api/deviceList/index'
import { appStore } from '@/store/Modules/app/index'
import { getDeviceIcon } from '@/utils/common/getDeviceIcon'
import { useI18n } from 'vue-i18n'

export const useDeviceListStore = defineStore('deviceList', () => {
  const deviceList = ref<any>([])
  let loading = ref(false)
  const app = appStore()
  const { t } = useI18n()

  // 用户的租用详情数据
  const userDeviceDetail: any = ref(null)

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
      window.$message?.error(t('app.fetchUserRentalListFailed'))
    }
  }

  return {
    deviceList,
    getUserDeviceListH,
    loading,
    userDeviceDetail,
  }
})
