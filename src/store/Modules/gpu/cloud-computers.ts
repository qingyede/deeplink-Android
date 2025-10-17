import { defineStore } from 'pinia'
import {
  getGps,
  getGpuType,
  getGpuList,
  rentSuccess,
  getGpuStatus,
  getGpuDetail,
  extendOrder,
  endOrder,
  extendNotify,
} from '@/api/gpu/index'
import { removeGeForceRTX } from '@/utils/common/removeGeForceRTX'
import { NGradientText } from 'naive-ui'
import { getContract, CONTRACT_ADDRESSES, CONTRACT_ABIS } from '@/utils/common/contracts'
import { getDbcProvider } from '@/utils/wallet/dbcProvider'
import { ethers } from 'ethers'
import { useWalletSigner } from '@/hooks/wallet/useSignTransaction'
import { useGetDlcPrice } from '@/hooks/store/useGetDlcPrice'
import { priceStore } from '@/store/Modules/price/index'
import { convertDlcToUsd } from '@/utils/common/transferToUsd'
import { appStore } from '@/store/Modules/app/index'
import { useDeviceListStore } from '@/store/Modules/deviceList/index'
import { useRouter, useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { useAppSocket } from '@/hooks/common/useAppSocket'
import { handleTxError } from './err'
import { ensureDbcForTx } from '@/utils/wallet/gas' // 你前面新建并导出的工具函数

export const useCloudComputersStore = defineStore('cloud-computers', () => {
  const price = priceStore()
  const app = appStore()
  const device = useDeviceListStore()
  const router = useRouter()
  const route = useRoute()
  const { t } = useI18n()
  const { connect, send, onMessage, waitForReady, onOpen, offMessage } = useAppSocket()

  // 强制重新加载组件
  let RouterViewKey = ref(0)

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

      const { data: res } = await getGpuType({
        distance: distance.value,
        longitude: longitude.value,
        latitude: latitude.value,
      })
      console.log(res, 'MMMMMMMMM')
      gpuTypeListLoading.value = false
      if (res.success) {
        gpuTypeList.value = res.content.map((item: any) => {
          return {
            title: () => h('div', { class: 'dark:text-white font-bold' }, removeGeForceRTX(item._id)),
            type: item._id,
            num: item.total,
            canRentTrue: item.canRentTrue,
            maxCalcPoint: item.maxCalcPoint,
            canRentIntotal: () => {},
          }
        })
      }
    } else {
      window.$message?.error(t('app.fetchCurrentLocationFailed2'))
    }
  }
  // gpu详情列表数据
  const gpuList = ref<any[]>([])
  // 根据 GPU 类型获取 GPU 列表loading
  const gpuListLoading = ref(true)

  // 根据 GPU 类型获取 GPU 列表
  const getGpuListH = async (data) => {
    gpuListLoading.value = true
    const { data: res } = await getGpuList({
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
          loading: false,
        }
      })
    } else {
      window.$message?.error(t('app.fetchGpuListFailed2'))
    }
  }

  // 租用前置弹窗
  // 表单数据
  const rentMachineDialogBeforeForm = reactive({
    duration: 600 as number | null,
    price: '',
    dLCNumber: 0,
    loading: false,
    dlcprice: 0,
    rentinfo: null as any,
  })

  // 在合约上查询租用dlc数量
  async function getRentPrice() {
    // 2. 查询价格与余额
    const provider = getDbcProvider()

    const rentContract = getContract('RENT', provider)
    const priceWei = await rentContract.getMachinePrice(
      rentMachineDialogBeforeForm.rentinfo.machine_id,
      rentMachineDialogBeforeForm.duration
    )
    const priceNumber = Number(ethers.formatEther(priceWei))

    // 使用 dlc_price 和等待数据准备
    const { dlc_price, waitReady } = useGetDlcPrice()
    await waitReady() // 等待 dlc_price 更新完成
    rentMachineDialogBeforeForm.dlcprice = dlc_price.value
    const resPrice = price.useLocalizedCurrency(convertDlcToUsd(priceNumber, dlc_price.value))
    console.log(resPrice, '价格', dlc_price.value, priceNumber)
    rentMachineDialogBeforeForm.dLCNumber = Number(priceNumber.toFixed(5))
    rentMachineDialogBeforeForm.price = resPrice
  }

  return {
    getGpsH,
    getGpuTypeH,
    gpuTypeList,
    gpuTypeListLoading,
    getGpuListH,
    distance,
    longitude,
    latitude,
    gpuList,
    gpuListLoading,
    rentMachineDialogBeforeForm,
    getRentPrice,
    RouterViewKey,
  }
})
