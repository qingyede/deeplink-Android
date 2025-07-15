import { defineStore } from 'pinia'
import { getGps, getGpuType, getGpuList, rentSuccess, getGpuStatus } from '@/api/gpu/index'
import { useDateFormat, useNow } from '@vueuse/core'
import { removeGeForceRTX } from '@/utils/common/removeGeForceRTX'
import { NGradientText } from 'naive-ui'
import { getContract, CONTRACT_ADDRESSES, CONTRACT_ABIS } from '@/utils/common/contracts'
import { getDbcProvider, getSignerFromPrivateKey } from '@/utils/wallet/dbcProvider'
import { ethers } from 'ethers'
import { useWalletSigner } from '@/hooks/wallet/useSignTransaction'
import rentMachineDialog from '@/components/common/rentMachineDialog.vue'
import { useGetDlcPrice } from '@/hooks/store/useGetDlcPrice'
import { priceStore } from '@/store/Modules/price/index'
import { convertDbcToUsd, convertDlcToUsd } from '@/utils/common/transferToUsd'
import { appStore } from '@/store/Modules/app/index'

import { useRouter, useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'

export const useCloudComputersStore = defineStore('cloud-computers', () => {
  const price = priceStore()
  const app = appStore()
  const router = useRouter()
  const route = useRoute()
  const { t } = useI18n()
  // 强制重新加载组件
  let RouterViewKey = ref(0)
  const forceUpdate = () => {
    RouterViewKey.value += 1
  }

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
            maxCalcPoint: item.maxCalcPoint,
            canRentIntotal: () => {},
          }
        })
      }
    } else {
      window.$message?.error('获取当前经纬度失败')
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
      window.$message?.error('获取 GPU 列表失败')
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

  // 获取机器在线状态
  const getMachineStatusH = async (machine_id, item) => {
    const { data: res } = await getGpuStatus({
      machine_id,
    })
    if (res.success) {
      console.log(res, '机器在线状态')
      if (!res.content) {
        window.$message?.warning(t('gpu.offline'))
        item.loading = false
        return false
      } else {
        return true
      }
    }
  }
  // 在合约上查询租用dlc数量
  async function getRentPrice(item) {
    item.loading = true
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
    item.loading = false
    rentMachineDialogBeforeForm.dLCNumber = Number(priceNumber.toFixed(5))
    rentMachineDialogBeforeForm.price = resPrice
  }
  const rentMachineDialogBefore = async (item) => {
    await getRentPrice(item)
    const NftsDialogRef = ref()
    const d = window.$dialog?.info({
      title: () => {
        return h(
          NGradientText,
          {
            size: 24,
            type: 'success',
            class: 'font-bold',
          },
          { default: () => t('gpu.rentalDetails') }
        )
      },
      content: () => h(rentMachineDialog, { ref: NftsDialogRef }),
      class: 'rounded-2xl dark:bg-[#1a1a1a] dark:text-white',
      showIcon: false,
      negativeButtonProps: { color: '#3CD8A6', size: 'medium' },
      positiveButtonProps: { color: '#03C188', size: 'medium' },
      positiveText: t('gpu.confirm'),
      negativeText: t('app.cancel'),
      onPositiveClick: async () => {
        rentMachineFlow({
          machineId: rentMachineDialogBeforeForm.rentinfo.machine_id,
          rentSeconds: rentMachineDialogBeforeForm.duration as any,
        })
      },
    })
  }

  // 租用后存储数据到数据库
  const rentSuccessH = async () => {
    const { data: res } = await rentSuccess({
      rent_wallet: app.address,
      rent_satrtime: new Date().getTime(),
      rent_time: rentMachineDialogBeforeForm.duration,
      os_release: 'Windows 10 Version 20H2',
      device_id: rentMachineDialogBeforeForm.rentinfo.device_id,
      machine_id: rentMachineDialogBeforeForm.rentinfo.machine_id,
      rent_dlc: rentMachineDialogBeforeForm.dLCNumber,
      rent_usdt: Number(rentMachineDialogBeforeForm.dLCNumber * rentMachineDialogBeforeForm.dlcprice),
      machine_info: rentMachineDialogBeforeForm.rentinfo.machineInfo,
      rent_status: 1,
      is_bind: false,
    })

    console.log(res, '租用后存储数据到数据库')
    if (res.success) {
      // cloudComputersStore.getGpuListH({
      //   type: route.query.type,
      //   longitude: route.query.longitude,
      //   latitude: route.query.latitude,
      //   distance: route.query.distance,
      // })
      forceUpdate()
      window.$message?.success(t('gpu.rentalSuccess'))
      router.push({ name: 'DeviceList' })
    }
  }
  // 真正的租用
  function mapCustomErrorToMessage(errorName: string): string {
    const map: Record<string, string> = {
      InvalidRentDuration: '租用时间无效，请检查输入时间是否符合要求',
      AddressEmptyCode: '合约调用地址无效，目标地址代码为空',
      Unauthorized: '您无权限执行此操作，请检查权限',
    }

    return map[errorName] || `合约拒绝执行（${errorName}）`
  }
  async function rentMachineFlow({
    machineId,
    rentSeconds,
  }: {
    machineId: string
    rentSeconds: number
  }): Promise<string | void> {
    const provider = getDbcProvider()
    const { ensureWallet } = useWalletSigner(t)

    // 解锁钱包
    const result = await ensureWallet()
    if (!result) {
      return
    }

    const { signer, address: userAddress, dialog } = result

    try {
      const rentContract = getContract('RENT', provider)
      const dlcContract = getContract('DLC_TOKEN', provider)

      // 1. 可租用校验
      const canRent = await rentContract.canRent(machineId)
      console.log('[canRent]', canRent)
      if (!canRent) {
        throw new Error(t('gpu.deviceUnavailable'))
      }

      // 2. 查询价格与余额
      const priceWei = await rentContract.getMachinePrice(machineId, rentSeconds)
      const price = Number(ethers.formatEther(priceWei))

      const balanceWei = await dlcContract.balanceOf(userAddress)
      const balance = Number(ethers.formatEther(balanceWei))

      console.log('[价格]', { priceWei: priceWei.toString(), price })
      console.log('[余额]', { balanceWei: balanceWei.toString(), balance })

      if (balance < price) {
        throw new Error(t('gpu.insufficientBalance'))
      }

      // 3. 授权 approve
      const approveTx = {
        to: CONTRACT_ADDRESSES.DLC_TOKEN,
        data: dlcContract.interface.encodeFunctionData('approve', [CONTRACT_ADDRESSES.RENT, priceWei]),
      }

      console.log('🚀 发起 approve 交易...')
      const approveResp = await signer.sendTransaction(approveTx)
      const approveReceipt: any = await approveResp.wait()
      if (approveReceipt.status !== 1) {
        throw new Error('授权失败，请稍后重试')
      }
      console.log('✅ 授权成功:', approveReceipt)

      // 4. 发起租用交易
      const rentTx = {
        to: CONTRACT_ADDRESSES.RENT,
        data: rentContract.interface.encodeFunctionData('rentMachine', [machineId, rentSeconds]),
      }

      console.log('🚀 发起 rentMachine 交易...')
      const txResp = await signer.sendTransaction(rentTx)
      const txReceipt: any = await txResp.wait()
      if (txReceipt.status !== 1) {
        throw new Error('租用交易失败，请稍后重试')
      }

      await rentSuccessH()
      dialog.destroy()

      return txReceipt.transactionHash
    } catch (err: any) {
      console.error('[租用流程出错]', err)

      dialog.loading = false
      dialog.positiveText = '确认'

      // ✅ 自定义错误优先解析
      const revertData = err?.data || err?.error?.data
      if (revertData) {
        try {
          const iface = new ethers.Interface(CONTRACT_ABIS.RENT)
          const parsed = iface.parseError(revertData)
          const friendlyError = mapCustomErrorToMessage(parsed?.name as any)
          window.$message?.error(friendlyError)
          return
        } catch (parseErr) {
          console.warn('⛔ 无法解析 Revert 错误:', parseErr)
        }
      }

      // ✅ 通用 JS 错误兜底提示
      window.$message?.error(err?.message || '交易失败，请稍后再试')
    }
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
    rentMachineFlow,
    rentMachineDialogBefore,
    rentMachineDialogBeforeForm,
    getRentPrice,
    getMachineStatusH,
    RouterViewKey,
  }
})
