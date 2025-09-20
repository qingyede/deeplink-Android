import { defineStore } from 'pinia'
import { getGps, getGpuTypeCafe, getGpuListCafe } from '@/api/gpu/index'
import { removeGeForceRTX } from '@/utils/common/removeGeForceRTX'
import { useI18n } from 'vue-i18n'

export const useCloudCafeStore = defineStore('cloud-cafe', () => {
  const { t } = useI18n()

  // gpu类型数据loading
  const gpuTypeListLoading = ref(false)
  const distance = ref(500)
  const longitude = ref(0)
  const latitude = ref(0)
  // gpu类型数据
  const gpuTypeList = ref([
    {
      title: () => h('div', { class: 'dark:text-white font-bold' }, '暂无数据'),
      num: 0,
      canRentTrue: 0,
      maxCalcPoint: 0,
      minRentHour: 0,
    },
  ])

  // 获取当前经纬度
  const getGpsH = async () => {
    return await getGps()
  }

  // 获取当前经纬度的gpu类型
  const getGpuTypeH = async () => {
    gpuTypeListLoading.value = true
    const { data: res0 } = await getGpsH()
    console.log(res0, 'OOOOOOOOO')
    if (res0.success) {
      longitude.value = res0.content.geo.ll[1]
      latitude.value = res0.content.geo.ll[0]
      const { data: res } = await getGpuTypeCafe({
        distance: distance.value,
        longitude: longitude.value,
        latitude: latitude.value,
        type: 'gpu',
      })
      console.log(res, 'MMMMMMMMM')
      gpuTypeListLoading.value = false
      if (res.success) {
        gpuTypeList.value = res.content.map((item: any) => {
          return {
            title: () => h('div', { class: 'dark:text-white font-bold' }, removeGeForceRTX(item._id)),
            num: item.total,
            canRentTrue: item.canRentTrue,
            maxCalcPoint: item.maxCalcPoint,
            type: item._id,
            minRentHour: item.minRentHour,
          }
        })
      }
    } else {
      window.$message?.error(t('app.fetchCurrentLocationFailed'))
    }
  }

  // gpu详情列表数据
  const gpuList = ref<any[]>([])
  // 根据 GPU 类型获取 GPU 列表loading
  const gpuListLoading = ref(true)

  // 根据 GPU 类型获取 GPU 列表
  const getGpuListH = async (data) => {
    gpuListLoading.value = true
    const { data: res } = await getGpuListCafe({
      distance: data.distance === 'all' ? 'all' : Number(distance.value),
      longitude: data.longitude,
      latitude: data.latitude,
      gputype: data.type,
      pageSize: 99999,
      page: 1,
    })
    gpuListLoading.value = false
    if (res.success) {
      console.log(res, '根据gpu类型获取gpu列表')
      gpuList.value = res.content.map((item: any) => {
        // 计算 end_time（结束时间戳）
        const endTime = item.current_time + item.can_use_time * 60 * 60 * 1000 - +new Date()
        // 剩余毫秒数
        const canUseTime = `${(endTime / (1000 * 60 * 60)).toFixed(2)} h`
        // 状态文本

        const rsStatus = () => {
          if (item.can_rent && !item.is_rented) return 'vacant'
          if (!item.can_rent && !item.is_rented) return 'notRentable'
          return 'rented'
        }
        return {
          ...item,
          canUseTime,
          rsStatus,
        }
      })
    } else {
      window.$message?.error(t('app.fetchGpuListFailed'))
    }
  }

  return {
    getGpsH,
    getGpuTypeH,
    gpuTypeList,
    gpuTypeListLoading,
    getGpuListH,
    gpuList,
    gpuListLoading,

    distance,
    longitude,
    latitude,
  }
})
