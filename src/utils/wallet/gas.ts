import { ethers } from 'ethers'
import i18n from '@/plugins/lang'

type EnsureParams = {
  provider: ethers.Provider
  signerOrFrom: ethers.Signer | string
  to: string
  data: string
  /** 预留比例（百分比整数），默认 20% */
  bufferPct?: number
}

/**
 * 估算一笔交易需要的 DBC 矿工费，并与账户余额比对。
 * - 余额不足时抛出带 code = 'INSUFFICIENT_FUNDS' 的错误（便于统一错误处理）。
 * - 返回估算的 gasLimit / maxFeePerGas 等信息（你可以选择忽略或使用）。
 */
export async function ensureDbcForTx({ provider, signerOrFrom, to, data, bufferPct = 20 }: EnsureParams): Promise<{
  from: string
  gasLimit: bigint
  maxFeePerGas: bigint
  maxPriorityFeePerGas: bigint
  estCost: bigint
  balance: bigint
}> {
  const { t } = i18n.global

  // 1) 解析 from
  const from = typeof signerOrFrom === 'string' ? signerOrFrom : await (signerOrFrom as ethers.Signer).getAddress()

  // 2) 取费用参数
  const fee = await provider.getFeeData()
  const maxFeePerGas = (fee.maxFeePerGas as bigint | null) ?? (fee.gasPrice as bigint | null) ?? BigInt(0)
  const maxPriorityFeePerGas = (fee.maxPriorityFeePerGas as bigint | null) ?? BigInt(0)

  // 3) 估算 gas
  const txReq = { to, data, from }
  let estGas: bigint
  if (typeof (signerOrFrom as any)?.estimateGas === 'function') {
    // 有 Signer 的情况下用 Signer 估算（更贴近真实）
    estGas = await (signerOrFrom as ethers.Signer).estimateGas(txReq)
  } else {
    estGas = await provider.estimateGas(txReq)
  }

  // 4) 加 buffer（整型计算，避免 BigInt 字面量；适配 ES2015 目标）
  const factor = BigInt(100 + bufferPct) // 如 120
  const gasLimit = (estGas * factor) / BigInt(100)

  // 5) 计算成本并比对余额
  const estCost = gasLimit * maxFeePerGas
  const balance = await provider.getBalance(from)

  if (balance < estCost) {
    const err: any = new Error(t('errors.insufficientDbc'))
    err.code = 'INSUFFICIENT_FUNDS'
    err.txMeta = {
      to,
      from,
      estGas: estGas.toString(),
      gasLimit: gasLimit.toString(),
      maxFeePerGas: maxFeePerGas.toString(),
    }
    throw err
  }

  return {
    from,
    gasLimit,
    maxFeePerGas,
    maxPriorityFeePerGas,
    estCost,
    balance,
  }
}
