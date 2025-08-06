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
import rentMachineDialog from '@/components/common/rentMachineDialog.vue'
import { useGetDlcPrice } from '@/hooks/store/useGetDlcPrice'
import { priceStore } from '@/store/Modules/price/index'
import { convertDlcToUsd } from '@/utils/common/transferToUsd'
import { appStore } from '@/store/Modules/app/index'
import { useDeviceListStore } from '@/store/Modules/deviceList/index'
import { useRouter, useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'

export const useCloudComputersStore = defineStore('cloud-computers', () => {
  const price = priceStore()
  const app = appStore()
  const device = useDeviceListStore()
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
  const rentMachineDialogBefore = async (item) => {
    item.loading = true

    await getRentPrice()
    item.loading = false

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

  /**
   * 发起退租流程（统一为 encodeFunctionData + sendTransaction 格式）
   * @param machineId 租用的机器 ID
   */
  async function endRentFlow(machineId: string) {
    const { ensureWallet } = useWalletSigner(t)

    const result = await ensureWallet()
    if (!result) return

    const { signer, dialog } = result

    try {
      dialog.loading = true
      dialog.positiveText = t('app.rentingOut')

      // 获取租用合约
      const rentContract = getContract('RENT', signer)

      // 构造原始交易对象
      const endRentTx = {
        to: CONTRACT_ADDRESSES.RENT,
        data: rentContract.interface.encodeFunctionData('endRentMachine', [machineId]),
      }

      // 发起交易
      const txResp = await signer.sendTransaction(endRentTx)
      const txReceipt: any = await txResp.wait()

      if (txReceipt.status !== 1) {
        throw new Error('退租交易失败，请稍后重试')
      }
      const { data: res } = await endOrder({
        wallet: app.address,
        device_id: rentMachineDialogBeforeForm.rentinfo.device_id,
        machine_id: rentMachineDialogBeforeForm.rentinfo.machine_id,
      })
      if (!res.success) {
        throw new Error('提前结束租用api失败，请稍后重试')
      }
      // 成功提示
      window.$message?.success(t(t('app.releaseSuccess')))

      // 关闭对话框
      dialog.destroy?.()
      device.getUserDeviceListH()
    } catch (err: any) {
      console.error('[退租失败]', err)

      dialog.loading = false
      dialog.positiveText = t('app.confirm') || '确认'

      const revertData = err?.data || err?.error?.data
      if (revertData) {
        try {
          const iface = new ethers.Interface(CONTRACT_ABIS.RENT)
          const parsed = iface.parseError(revertData)
          const errorMsg = parsed?.name || '退租失败'
          window.$message?.error(`退租失败：${errorMsg}`)
          return
        } catch (parseErr) {
          console.warn('⛔ 无法解析 Revert 错误:', parseErr)
        }
      }

      window.$message?.error(err?.message || '退租失败，请稍后重试')
    }
  }

  // 发起续租流程
  // 续租loading
  let renewRentLoading = ref(false)
  async function renewRentFlow(info: any) {
    renewRentLoading.value = true

    // 先获取机器信息
    const { data: res } = await getGpuDetail({
      machine_id: rentMachineDialogBeforeForm.rentinfo.machine_id,
    })

    if (res.success) {
      console.log(res.content, '机器信息')
      // 计算 end_time（结束时间戳）
      const endTime = res.content.current_time + res.content.can_use_time * 60 * 60 * 1000 - +new Date()
      // 机器剩余可用时长
      const canUseTimeMinutes = Number((endTime / (1000 * 60)).toFixed(0)) // 四舍五入到整数分钟

      function getRemainingSeconds(startTime: number, rentSeconds: number): number {
        const now = Date.now()
        const endTime = startTime + rentSeconds * 1000
        const remainingMs = endTime - now
        return Math.max(Math.floor(remainingMs / 1000), 0) // 返回剩余秒数，最小为 0
      }
      // 当前用户租用的机器剩余可用时长
      const remainingSeconds = getRemainingSeconds(res.content.rent_satrtime, res.content.rent_time)
      if (canUseTimeMinutes < 60) {
        window.$message?.warning(t('app.availableTimeTooShort'))
        return
      } else if (remainingSeconds < 120) {
        window.$message?.warning(t('app.notEnoughTimeToRenew'))
        return
      } else {
        // 满足续租了可以续租
        console.log(info, 'info')
        const NftsDialogRef = ref()
        console.log(rentMachineDialogBeforeForm, 'rentMachineDialogBeforeForm')
        await getRentPrice()

        console.log(rentMachineDialogBeforeForm, '我是关键信息')
        renewRentLoading.value = false

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
            const { ensureWallet } = useWalletSigner(t)
            const result = await ensureWallet()
            if (!result) return

            const { signer, dialog, address: userAddress } = result

            try {
              dialog.loading = true
              dialog.positiveText = t('app.renewing')

              // 构造合约对象
              const rentContract = getContract('RENT', signer)
              const dlcContract = getContract('DLC_TOKEN', signer)

              // 获取续租价格（同租用流程）
              const priceWei = await rentContract.getMachinePrice(
                rentMachineDialogBeforeForm.rentinfo.machine_id,
                rentMachineDialogBeforeForm.duration
              )

              // 检查余额
              const balanceWei = await dlcContract.balanceOf(userAddress)
              if (balanceWei < priceWei) {
                throw new Error(t('gpu.insufficientBalance'))
              }

              // 授权 approve
              const approveTx = {
                to: CONTRACT_ADDRESSES.DLC_TOKEN,
                data: dlcContract.interface.encodeFunctionData('approve', [CONTRACT_ADDRESSES.RENT, priceWei]),
              }
              console.log('🚀 发起 approve 授权...')
              const approveResp = await signer.sendTransaction(approveTx)
              const approveReceipt: any = await approveResp.wait()
              if (approveReceipt.status !== 1) {
                throw new Error('授权失败，请稍后重试')
              }
              console.log('✅ 授权成功')

              // 构造续租交易
              const renewTx = {
                to: CONTRACT_ADDRESSES.RENT,
                data: rentContract.interface.encodeFunctionData('renewRent', [
                  rentMachineDialogBeforeForm.rentinfo.machine_id,
                  rentMachineDialogBeforeForm.duration,
                ]),
              }

              console.log('🚀 发起续租交易...')
              const txResp = await signer.sendTransaction(renewTx)
              const txReceipt: any = await txResp.wait()
              if (txReceipt.status !== 1) {
                throw new Error('续租交易失败，请稍后重试')
              }
              const { data: res } = await extendOrder({
                wallet: app.address,
                renew_time: rentMachineDialogBeforeForm.duration,
                device_id: rentMachineDialogBeforeForm.rentinfo.device_id,
                machine_id: rentMachineDialogBeforeForm.rentinfo.machine_id,
                rent_dlc: rentMachineDialogBeforeForm.dLCNumber,
                rent_usdt: Number(rentMachineDialogBeforeForm.dLCNumber * rentMachineDialogBeforeForm.dlcprice),
              })
              if (!res.success) {
                throw new Error('续租入库失败，请稍后重试')
              }

              //    https://go.deeplink.cloud/send_rent_info

              // 通知

              const { data: resx } = await extendNotify({
                user_id: app.address,
                device_id: rentMachineDialogBeforeForm.rentinfo.device_id,
                start_time: res.content.rent_satrtime,
                rent_time: res.content.rent_time,
                display: {
                  width: 0,
                  height: 0,
                  fps: 0,
                },
              })

              window.$message?.success(t('app.renewSuccess'))
              dialog.destroy?.()
              device.getUserDeviceListH()
            } catch (err: any) {
              console.error('[续租失败]', err)
              dialog.loading = false
              dialog.positiveText = t('app.confirm')

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

              window.$message?.error(err?.message || '续租失败，请稍后再试')
            }
          },
        })
      }
    } else {
      window.$message?.error(t('app.fetchRentalDetailsFailed'))
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
    endRentFlow,
    renewRentFlow,
    renewRentLoading,
  }
})
