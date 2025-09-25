// src/utils/evm/errors.ts
import { ethers } from 'ethers'
import i18n from '@/plugins/lang'

/** 通用 RPC 错误归一化（转成简短、人话提示） */
export function normalizeRpcError(err: any): { message: string; detail?: string } {
  const { t } = i18n.global
  const raw = (err?.message || err?.error?.message || '').toLowerCase()
  const detail = JSON.stringify(err, null, 2)

  if (raw.includes('already known') || raw.includes('already imported')) {
    return { message: t('errors.alreadyKnown'), detail }
  }
  if (raw.includes('insufficient funds for gas') || raw.includes('insufficient funds')) {
    // 统一指向“矿工费不足（DBC）”
    return { message: t('errors.insufficientDbc'), detail }
  }
  if (raw.includes('nonce too low')) {
    return { message: t('errors.nonceTooLow'), detail }
  }
  if (raw.includes('replacement fee too low') || raw.includes('fee too low')) {
    return { message: t('errors.feeTooLow'), detail }
  }
  if (raw.includes('underpriced') || raw.includes('max fee per gas less than block base fee')) {
    return { message: t('errors.gasUnderpriced'), detail }
  }
  if (raw.includes('execution reverted')) {
    return { message: t('errors.executionReverted'), detail }
  }
  if (raw.includes('timeout') || raw.includes('deadline')) {
    return { message: t('errors.timeout'), detail }
  }
  return { message: t('errors.genericTxFailed'), detail }
}

/** 尝试解析合约自定义错误（传入 ABI） */
export function parseCustomRevert(err: any, abi: readonly string[] | any): string | null {
  const revertData = err?.data || err?.error?.data
  if (!revertData) return null
  try {
    const iface = new ethers.Interface(abi)
    const parsed = iface.parseError(revertData)
    return parsed?.name || null
  } catch {
    return null
  }
}
/** 统一错误处理入口 */
export function handleTxError(
  err: any,
  options?: {
    abiForCustomError?: readonly string[] | any
    nameToMessage?: (name: string | null) => string | null
    destroyPreviousToasts?: boolean
  }
) {
  if (options?.destroyPreviousToasts && (window as any)?.$message?.destroyAll) {
    try {
      ;(window as any).$message.destroyAll()
    } catch {}
  }

  // ✅ A. 业务侧错误优先（带 isAppError 或 APP_* code）
  if (err?.isAppError || (typeof err?.code === 'string' && err.code.startsWith('APP_'))) {
    window.$message?.error(String(err.message || ''))
    console.warn('[detail]', JSON.stringify(err, null, 2))
    return
  }

  // ✅ B. 合约自定义错误（revert 自定义错误）
  if (options?.abiForCustomError) {
    const name = parseCustomRevert(err, options.abiForCustomError)
    if (options?.nameToMessage) {
      const human = options.nameToMessage(name)
      if (human) {
        window.$message?.error(human)
        console.warn('[detail]', JSON.stringify(err, null, 2))
        return
      }
    } else if (name) {
      window.$message?.error(`合约拒绝执行（${name}）`)
      console.warn('[detail]', JSON.stringify(err, null, 2))
      return
    }
  }

  // ✅ C. 普通业务 Error（无链上 data），直接透传 message
  // 避免把“余额不足”等业务提示误判为 RPC 错误
  if (err && err.message && !err?.data && !err?.error?.data) {
    window.$message?.error(String(err.message))
    console.warn('[detail]', JSON.stringify(err, null, 2))
    return
  }

  // ✅ D. 最后再走 RPC 归一化
  const ui = normalizeRpcError(err)
  window.$message?.error(ui.message)
  console.warn('[detail]', ui.detail)
}
