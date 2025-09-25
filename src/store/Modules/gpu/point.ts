import { rentByPoint } from '@/api/gpu/index'
import i18n from '@/plugins/lang'
import { appStore } from '@/store/Modules/app/index'
import { getErc20Contract } from '@/utils/wallet/token'
import { ethers } from 'ethers'
import { getContract, DLCP_TOKEN_ADDRESS, DLCP_RECEIVER, CONTRACT_ABIS } from '@/utils/common/contracts'
import { handleTxError } from './err'
import { useGetDlcPrice } from '@/hooks/store/useGetDlcPrice'
import { priceStore } from '@/store/Modules/price/index'
import { useWalletSigner } from '@/hooks/wallet/useSignTransaction'
import { ensureDbcForTx } from '@/utils/wallet/gas' // 你前面新建并导出的工具函数

export const rentMachineFlowWithPoints = async (item: any, machine_id: string, rent_time: number, notify: any) => {
  const { t } = i18n.global
  const { ensureWallet } = useWalletSigner(t)

  // 解锁钱包
  const result = await ensureWallet()
  if (!result) return

  const { signer, address: userAddress, dialog } = result
  const app = appStore()
  const price = priceStore()

  // 汇率准备（DLC -> USD）
  if (!price.exchangeRateValue) {
    try {
      await price.getExchangeRateH()
    } catch {}
  }

  // —— 辅助：BigInt 版 10 的幂（避免在 WebView 中用 BigInt 的 ** 运算）——
  const powBI10 = (decimals: number): bigint => {
    let r = BigInt(1)
    const TEN = BigInt(10)
    for (let i = 0; i < decimals; i++) r *= TEN
    return r
  }

  try {
    // ✅ 统一使用 signer.provider，避免 RPC/nonce/feeData 差异
    const provider = signer.provider!
    // 合约实例
    const rentContract = getContract('RENT', provider)
    const dlcTokenRead = getContract('DLC_TOKEN', provider) // 只读取 DLC 的 decimals
    const dlcpTokenRead = getErc20Contract(DLCP_TOKEN_ADDRESS, provider) // DLCP 读
    const dlcpTokenWrite = getErc20Contract(DLCP_TOKEN_ADDRESS, signer) // DLCP 写

    // 1) 可租校验
    const canRent: boolean = await rentContract.canRent(machine_id)
    if (!canRent) throw new Error(t('app.rent.notRentable'))

    // 2) 获取 DLC 价格（wei）
    const priceWei: bigint = await rentContract.getMachinePrice(machine_id, rent_time)

    // 精度
    const dlcDecimals = Number((await dlcTokenRead.decimals?.()) ?? 18)
    const dlcpDecimals = Number(await dlcpTokenRead.decimals())

    // 3) DLC → USD → 积分（1 USD = 1000 积分），全程 BigInt 定点
    const { dlc_price, waitReady } = useGetDlcPrice()
    await waitReady()

    // 分离 number/bigint 的标度，避免 Number(BigInt) 抛错
    const USD_SCALE_NUM = 1000000 // 用于 Math.round
    const USD_SCALE_BI = BigInt('1000000') // 用于后续 BigInt 计算

    const priceUsdScaled = BigInt(Math.round(Number(dlc_price.value) * USD_SCALE_NUM))

    // 10^decimals：用循环乘法，避免 BigInt 的 ** 运算
    const pow10_dlcp = powBI10(dlcpDecimals)
    const pow10_dlc = powBI10(dlcDecimals)

    // pointsWei = priceWei * priceUsd * 1000 * 10^dlcpDecimals / 10^dlcDecimals / USD_SCALE
    const pointsWei = (priceWei * priceUsdScaled * BigInt(1000) * pow10_dlcp) / pow10_dlc / USD_SCALE_BI

    // 4) DLCP 余额校验
    const balanceWei: bigint = await dlcpTokenRead.balanceOf(userAddress)
    if (balanceWei < pointsWei) throw new Error(t('app.rent.insufficientBalance') || 'DLCP 余额不足')

    // 5) 预检矿工费（统一工具）
    const receiver = DLCP_RECEIVER
    const data = dlcpTokenWrite.interface.encodeFunctionData('transfer', [receiver, pointsWei])
    await ensureDbcForTx({
      provider,
      signerOrFrom: signer, // ✅ 传 signer 更稳（也兼容传地址）
      to: DLCP_TOKEN_ADDRESS, // ✅ ERC20 合约地址（tx.to）
      data, // ✅ transfer 编码
      bufferPct: 20,
    })

    // 6) 转账 DLCP 到固定地址
    const tx = await dlcpTokenWrite.transfer(DLCP_RECEIVER, pointsWei)
    const receipt = await tx.wait()
    if (!receipt || receipt.status !== 1) throw new Error(t('app.transferFailed') || '转账失败')

    const txHash = receipt.hash
    const blockNumber = receipt.blockNumber

    // 7) 仅用于展示/存库的派生字段（不参与校验）
    const dlcAmountStr = ethers.formatUnits(priceWei, dlcDecimals) // DLC 数量
    const rentUsdStr = (Number(dlcAmountStr) * Number(dlc_price.value)).toString()
    const rentPointStr = ethers.formatUnits(pointsWei, dlcpDecimals) // 与链上金额一致的字符串

    // 8) 签名（你已保证小写）
    const signature = await signer.signMessage(String(app.address))

    // 9) 上报（字段名不变；建议 rent_point 传字符串避免精度问题）
    const payload: any = {
      rent_wallet: app.address,
      rent_satrtime: Date.now(),
      rent_time, // 若后端要“分钟→秒”，再自行改为 rent_time * 60
      os_release: item.os_release,
      device_id: item.device_id,
      machine_id,
      rent_dlc: Number(dlcAmountStr),
      rent_usdt: Number(rentUsdStr),
      machine_info: item.machineInfo,
      rent_status: 1,
      rent_point: rentPointStr, // ✅ 精确等于链上转账金额（按 dlcpDecimals 格式化）
      purchase_path: 'Android_Point',
      is_bind: false,
      rent_hash: txHash, // 本次 DLCP transfer hash
      rent_block_num: blockNumber, // 该交易块高
      signature,
    }

    const { data: res } = await rentByPoint(payload)
    if (!res?.success) throw new Error(res?.message || t('app.rent.rentFailed'))

    window.$message?.success(t('app.rent.rentSuccess') || '租用成功')
    notify?.()

    return {
      txHash,
      blockNumber,
      dlcAmount: Number(dlcAmountStr),
      rentUsd: Number(rentUsdStr),
      rentPoint: rentPointStr, // 返回字符串，和上报一致
      res: true,
    }
  } catch (err: any) {
    console.error('[积分租用流程出错]', err)
    handleTxError(err, {
      abiForCustomError: CONTRACT_ABIS.RENT, // 统一入口；解析不到则走通用归一化
    })
  } finally {
    dialog.destroy()
  }
}
