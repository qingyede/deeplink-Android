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
  extendByPoint,
} from '@/api/gpu/index'
import { removeGeForceRTX } from '@/utils/common/removeGeForceRTX'
import { NGradientText } from 'naive-ui'
import { getContract, CONTRACT_ADDRESSES, CONTRACT_ABIS, DLCP_TOKEN_ADDRESS, DLCP_RECEIVER } from '@/utils/common/contracts'
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
import { useAppSocket } from '@/hooks/common/useAppSocket'
import { handleTxError } from './err'
import { ensureDbcForTx } from '@/utils/wallet/gas' // 你前面新建并导出的工具函数
import { rentMachineFlowWithPoints } from './point'
import { getErc20Contract, DLC_TOKEN_ADDRESS } from '@/utils/wallet/dbcProvider'

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
    rentMachineDialogBeforeForm.price = resPrice as any
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
        // 先判断是不是积分租用
        if (app.mode) {
          // 积分
          console.log('我是积分支付', item, rentMachineDialogBeforeForm.duration)
          const rs = await rentMachineFlowWithPoints(
            item,
            item.machine_id,
            rentMachineDialogBeforeForm.duration as any,
            // 通知
            notify
          )

          if (rs?.res) {
            router.push({ name: 'DeviceList' })
          }
        } else {
          rentMachineFlow({
            machineId: rentMachineDialogBeforeForm.rentinfo.machine_id,
            rentSeconds: rentMachineDialogBeforeForm.duration as any,
          })
        }
      },
    })
  }

  // 通知函数
  const notify = async () => {
    // 通知
    const { data: resx } = await extendNotify({
      user_id: app.address,
      device_id: rentMachineDialogBeforeForm.rentinfo.device_id,
      start_time: new Date().getTime(),
      rent_time: rentMachineDialogBeforeForm.duration,
      display: {
        width: 0,
        height: 0,
        fps: 0,
      },
    })
    send({
      id: 1,
      method: 'preconnect',
      token: app.token,
      params: {
        device_id: rentMachineDialogBeforeForm.rentinfo.device_id,
        display: { width: 1920, height: 1080, fps: 60 },
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
  // 顶部新增

  // 真正的租用
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
    if (!result) return

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

      // ✅ 在发送 approve 之前做一次 DBC 预检（不改你的发送方式）
      await ensureDbcForTx({
        provider,
        signerOrFrom: signer,
        to: approveTx.to!,
        data: approveTx.data!,
        bufferPct: 20, // 预留 20%，可按需调整
      })

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

      // ✅ 在发送 rent 之前再做一次 DBC 预检
      await ensureDbcForTx({
        provider,
        signerOrFrom: signer,
        to: rentTx.to!,
        data: rentTx.data!,
        bufferPct: 20,
      })

      console.log('🚀 发起 rentMachine 交易...')
      const txResp = await signer.sendTransaction(rentTx)
      const txReceipt: any = await txResp.wait()
      if (txReceipt.status !== 1) {
        throw new Error('租用交易失败，请稍后重试')
      }

      // 通知
      await notify()
      await rentSuccessH()
      dialog.destroy()

      return txReceipt.transactionHash
    } catch (err: any) {
      console.error('[租用流程出错]', err)

      dialog.loading = false
      dialog.positiveText = '确认'
      dialog.destroy()

      // ✅ 统一错误处理（优先解析合约自定义错误）
      handleTxError(err, {
        abiForCustomError: CONTRACT_ABIS.RENT,
        // 如需自定义特定错误名的人性化提示，再传 nameToMessage
        // nameToMessage: (name) => mapCustomErrorToMessage(name as any),
      })
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
      window.$message?.success(t('app.releaseSuccess'))

      // 关闭对话框
      dialog.destroy?.()
      device.getUserDeviceListH()
    } catch (err: any) {
      console.error('[退租失败]', err)

      dialog.loading = false
      dialog.positiveText = t('app.confirm') || '确认'

      // ✅ 统一错误处理（优先解析合约自定义错误）
      handleTxError(err, {
        abiForCustomError: CONTRACT_ABIS.RENT,
        // 如需覆盖默认中文，可传 nameToMessage: (name) => mapCustomErrorToMessage(name as any),
      })
    }
  }

  // 发起续租流程-代币模式
  // 续租loading
  let renewRentLoading = ref(false)
  async function renewRentFlow() {
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
        const NftsDialogRef = ref()
        console.log(rentMachineDialogBeforeForm, 'rentMachineDialogBeforeForm')
        await getRentPrice()

        console.log(rentMachineDialogBeforeForm, '我是关键信息')
        renewRentLoading.value = false

        const d = window.$dialog?.info({
          title: () => {
            return h(
              NGradientText,
              { size: 24, type: 'success', class: 'font-bold' },
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
              const provider = signer.provider || getDbcProvider()

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

              // ===== DBC 预检：approve 之前 =====
              const approveData = dlcContract.interface.encodeFunctionData('approve', [CONTRACT_ADDRESSES.RENT, priceWei])
              await ensureDbcForTx({
                provider,
                signerOrFrom: signer,
                to: CONTRACT_ADDRESSES.DLC_TOKEN,
                data: approveData,
                bufferPct: 20, // 预留 20% buffer
              })

              // 授权 approve（保持你原来的发送方式）
              const approveTx = {
                to: CONTRACT_ADDRESSES.DLC_TOKEN,
                data: approveData,
              }
              console.log('🚀 发起 approve 授权...')
              const approveResp = await signer.sendTransaction(approveTx)
              const approveReceipt: any = await approveResp.wait()
              if (approveReceipt.status !== 1) {
                throw new Error('授权失败，请稍后重试')
              }
              console.log('✅ 授权成功')

              // 构造续租交易
              const renewData = rentContract.interface.encodeFunctionData('renewRent', [
                rentMachineDialogBeforeForm.rentinfo.machine_id,
                rentMachineDialogBeforeForm.duration,
              ])

              // ===== DBC 预检：续租交易之前 =====
              await ensureDbcForTx({
                provider,
                signerOrFrom: signer,
                to: CONTRACT_ADDRESSES.RENT,
                data: renewData,
                bufferPct: 20,
              })

              const renewTx = {
                to: CONTRACT_ADDRESSES.RENT,
                data: renewData,
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

              // 通知
              await notify()

              window.$message?.success(t('app.renewSuccess'))
              dialog.destroy?.()
              device.getUserDeviceListH()
              return true
            } catch (err: any) {
              console.error('[续租失败]', err)
              dialog.loading = false
              dialog.positiveText = t('app.confirm')

              // ✅ 统一错误处理（优先解析合约自定义错误）
              handleTxError(err, {
                abiForCustomError: CONTRACT_ABIS.RENT,
              })
              return false
            }
          },
        })
      }
    } else {
      window.$message?.error(t('app.fetchRentalDetailsFailed'))
    }
  }

  /**
   * 积分续租流程
   * 返回 Promise<boolean>：
   * - true：链上转账 +（续租接口）+ 通知 成功
   * - false：失败/取消/异常
   */
  async function renewPointFlow(): Promise<boolean> {
    const app = appStore()
    const { dlc_price, waitReady } = useGetDlcPrice()

    let settle!: (ok: boolean) => void
    let settled = false
    const done = (ok: boolean) => {
      if (!settled) {
        settled = true
        settle(ok)
      }
    }
    const finalPromise = new Promise<boolean>((resolve) => (settle = resolve))

    try {
      // 前置 Loading
      renewRentLoading.value = true

      // 打开确认弹窗
      const d = window.$dialog?.info({
        title: () =>
          h(NGradientText, { size: 24, type: 'success', class: 'font-bold' }, { default: () => t('app.rent.renew') }),
        content: () => h(rentMachineDialog, { ref: ref() }),
        class: 'rounded-2xl dark:bg-[#1a1a1a] dark:text-white',
        showIcon: false,
        negativeButtonProps: { color: '#3CD8A6', size: 'medium' },
        positiveButtonProps: { color: '#03C188', size: 'medium' },
        positiveText: t('app.confirm'),
        negativeText: t('app.cancel'),

        onPositiveClick: async () => {
          const { ensureWallet } = useWalletSigner(t)
          const result: any = await ensureWallet()
          const { signer, dialog } = result
          if (!dialog) return

          try {
            dialog.loading = true
            dialog.positiveText = 'Loading...'

            // ✅ 统一用 signer.provider，避免 RPC/nonce/feeData 差异
            const provider = signer.provider!

            // 合约实例（read 与 write 分离）
            const rentContractRead = getContract('RENT', provider)
            const dlcTokenRead = getContract('DLC_TOKEN', provider) // 只取 DLC 的 decimals
            const dlcpRead = getErc20Contract(DLCP_TOKEN_ADDRESS, provider) // DLCP 读
            const dlcpWrite = getErc20Contract(DLCP_TOKEN_ADDRESS, signer) // DLCP 写

            // 从合约获取续租价格（单位：DLC 的最小单位）
            const priceWei: bigint = await rentContractRead.getMachinePrice(
              rentMachineDialogBeforeForm.rentinfo.machine_id,
              rentMachineDialogBeforeForm.duration
            )

            // 读取 decimals
            const dlcDecimals = Number((await dlcTokenRead.decimals?.()) ?? 18)
            const dlcpDecimals = Number(await dlcpRead.decimals()) // 当前链上为 18

            // DLC → USD → 积分（1 USD = 1000 积分），BigInt 定点
            await waitReady()
            const priceNum = Number(dlc_price.value)
            if (!Number.isFinite(priceNum) || priceNum <= 0) {
              throw new Error(t('app.rent.priceUnavailable') || '价格暂不可用')
            }
            const USD_SCALE = 1_000_000n
            const priceUsdScaled = BigInt(Math.round(priceNum * Number(USD_SCALE)))

            // pointsWei = priceWei * priceUsd * 1000 * 10^dlcpDecimals / 10^dlcDecimals
            const pointsWei =
              (priceWei * priceUsdScaled * 1000n * 10n ** BigInt(dlcpDecimals)) / 10n ** BigInt(dlcDecimals) / USD_SCALE

            // DLCP 余额检查
            const balanceWei: bigint = await dlcpRead.balanceOf(app.address)
            if (balanceWei < pointsWei) {
              throw new Error(t('app.rent.insufficientBalance') || 'DLCP 余额不足')
            }

            // ---- 小工具：转账前做 DBC 矿工费预检（避免重复广播 / already known / timeout）----
            const ensureDbcFor = async (to: string, data: string, from: string) => {
              const fee = await provider.getFeeData()
              const maxFeePerGas = fee.maxFeePerGas ?? fee.gasPrice
              if (!maxFeePerGas || maxFeePerGas === 0n) {
                const e = new Error('fee data unavailable')
                ;(e as any).code = 'FEE_DATA_UNAVAILABLE'
                throw e
              }
              const estGas = await signer.estimateGas({ to, data, from })
              const gasLimit = (estGas * 12n) / 10n // +20% buffer
              const need = gasLimit * maxFeePerGas
              const dbcBal = await provider.getBalance(from)
              if (dbcBal < need) {
                const e = new Error('insufficient funds for gas * price + value')
                ;(e as any).code = 'INSUFFICIENT_FUNDS'
                throw e
              }
            }

            // 在 transfer 前做 DBC 预检（重点）
            const from = app.address
            const to = DLCP_RECEIVER
            const data = dlcpWrite.interface.encodeFunctionData('transfer', [to, pointsWei])
            await ensureDbcFor(DLCP_TOKEN_ADDRESS, data, from)

            // 发起 DLCP 转账到固定地址
            const tx = await dlcpWrite.transfer(DLCP_RECEIVER, pointsWei)
            const receipt = await tx.wait()
            if (!receipt || receipt.status !== 1) {
              throw new Error(t('app.transferFailed') || '转账失败')
            }
            const txHash = receipt.hash
            const blockNumber = receipt.blockNumber

            // 展示/上报字段（与链上金额一致的字符串）
            const rentPointStr = ethers.formatUnits(pointsWei, dlcpDecimals)

            // 签名（rent_wallet 已小写）
            const signature = await signer.signMessage(String(app.address))

            // 调用【积分续租接口】（你已有的接口）
            const { data: renewRes } = await extendByPoint({
              wallet: app.address,
              renew_time: rentMachineDialogBeforeForm.duration,
              device_id: rentMachineDialogBeforeForm.rentinfo.device_id,
              machine_id: rentMachineDialogBeforeForm.rentinfo.machine_id,
              rent_dlc: rentMachineDialogBeforeForm.dLCNumber,
              rent_usdt: Number(rentMachineDialogBeforeForm.dLCNumber * rentMachineDialogBeforeForm.dlcprice),
              rent_hash: txHash,
              rent_block_num: blockNumber,
              rent_point: rentPointStr,
              purchase_path: 'Client_Point',
              signature,
            })
            if (!renewRes?.success) throw new Error(renewRes?.message || t('app.rent.renewStoreFailed'))

            window.$message?.success(t('app.rent.renewSuccess') || '续租成功')

            dialog.destroy?.()
            device.getUserDeviceListH?.()

            done(true)
            return true
          } catch (err: any) {
            console.error('[积分续租失败]', err)
            dialog.loading = false
            dialog.positiveText = t('app.confirm')

            handleTxError(err, {
              abiForCustomError: CONTRACT_ABIS.RENT, // 统一入口；解析不到则走通用归一化
            })

            done(false)
            return false
          }
        },

        onNegativeClick: () => done(false),
        onClose: () => done(false),
      })

      // 返回会在确认/取消/关闭时 resolve 的 Promise
      return finalPromise
    } catch (err) {
      console.error('[renewPointFlow 异常]', err)
      done(false)
      return finalPromise
    } finally {
      // 兜底，确保不悬挂（弹窗打开后会在 onPositiveClick 内再次设置 loading）
      renewRentLoading.value = false
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
    renewPointFlow,
  }
})
