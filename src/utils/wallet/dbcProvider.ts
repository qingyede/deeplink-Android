// utils/dbcProvider.ts
import { ethers } from 'ethers'

// ✅ 链基本信息
export const DBC_CHAIN_ID = 19880818
export const DBC_RPC_URL = 'https://rpc1.dbcwallet.io'
export const DBC_NATIVE_SYMBOL = 'DBC'
export const DLC_TOKEN_ADDRESS = '0x6f8F70C74FE7d7a61C8EAC0f35A4Ba39a51E1BEe'

// ✅ 1. 获取公共 provider（只读）
export const getDbcProvider = () => {
  return new ethers.JsonRpcProvider(DBC_RPC_URL)
}

// ✅ 2. 获取原生币余额（DBC）
export const getDbcBalance = async (address: string) => {
  const provider = getDbcProvider()
  const balance = await provider.getBalance(address)
  return ethers.formatEther(balance) // DBC 18 decimals
}

export async function fetchDlcBalance(USER_ADDRESS) {
  try {
    const result = await getTokenBalance(DLC_TOKEN_ADDRESS, USER_ADDRESS)
    console.log(result.balance, 'dlc余额')
    return result.balance
  } catch (error) {
    console.error('Error fetching DLC balance:', error)
    throw error
  }
}

// ✅ 3. 获取 ERC20 合约实例（如 DLC 代币）
export const getErc20Contract = (tokenAddress: string, providerOrSigner: ethers.Provider | ethers.Signer) => {
  const ERC20_ABI = [
    'function name() view returns (string)',
    'function symbol() view returns (string)',
    'function decimals() view returns (uint8)',
    'function balanceOf(address) view returns (uint256)',
    'function transfer(address,uint256) returns (bool)',
  ]
  return new ethers.Contract(tokenAddress, ERC20_ABI, providerOrSigner)
}

// ✅ 4. 创建 signer（用于写操作）
export const getSignerFromPrivateKey = (privateKey: string) => {
  const provider = getDbcProvider()
  const wallet = new ethers.Wallet(privateKey, provider)
  return wallet
}

// ✅ 5. 查询某个代币余额
export const getTokenBalance = async (tokenAddress: string, userAddress: string) => {
  const contract = getErc20Contract(tokenAddress, getDbcProvider())
  const [balance, decimals, symbol] = await Promise.all([
    contract.balanceOf(userAddress),
    contract.decimals(),
    contract.symbol(),
  ])
  return {
    symbol,
    balance: parseFloat(ethers.formatUnits(balance, decimals)),
  }
}

// 错误处理
function handleTxError(error: any) {
  // 提取错误信息
  const code = error?.code
  const message = error?.error?.message || error?.message || '未知错误'
  const reason = error?.reason
  const tx = error?.transaction
  const data = error?.data

  // 按错误类型处理
  if (code === 'INSUFFICIENT_FUNDS') {
    window.$message?.error('余额不足，请确保钱包中有足够的 DBC 用于支付转账金额和矿工费')
  } else if (code === 'NETWORK_ERROR') {
    window.$message?.error('网络错误，请检查您的网络连接或重试')
  } else if (code === 'INVALID_ARGUMENT') {
    window.$message?.error('参数错误，请检查地址或金额格式')
  } else if (code === 'CALL_EXCEPTION' && reason === null) {
    window.$message?.error('转账失败：合约执行失败（可能余额不足 / 权限问题 / 黑名单）')
  } else {
    // 通用错误提示
    window.$message?.error(`转账失败：${message}`, { duration: 8000 })
  }
}

// ✅ DBC 原生币转账
export const transferDbc = async (to: string, amount: string, privateKey: string) => {
  const signer = getSignerFromPrivateKey(privateKey)
  try {
    const tx = await signer.sendTransaction({
      to,
      value: ethers.parseEther(amount),
    })
    await tx.wait()
    return tx
  } catch (error: any) {
    handleTxError(error)
    throw error
  }
}

// ✅ DLC 代币转账
export const transferDlc = async (to: string, amount: string, privateKey: string) => {
  const signer = getSignerFromPrivateKey(privateKey)
  const contract = getErc20Contract(DLC_TOKEN_ADDRESS, signer)
  try {
    const decimals = await contract.decimals()
    const parsedAmount = ethers.parseUnits(amount, decimals)
    const tx = await contract.transfer(to, parsedAmount)
    await tx.wait()
    return tx
  } catch (error: any) {
    handleTxError(error)
    throw error
  }
}

/**
 * 通用转账 hook
 */
export function useTransfer() {
  /**
   * 发起转账
   * @param coin 'DBC' | 'DLC'
   * @param toAddress 收款地址
   * @param amount 金额（字符串，如 "1.5"）
   * @param privateKey 用户私钥
   */
  const transfer = async (coin: 'DBC' | 'DLC', toAddress: string, amount: string, privateKey: string) => {
    if (coin === 'DBC') {
      return await transferDbc(toAddress, amount, privateKey)
    } else if (coin === 'DLC') {
      return await transferDlc(toAddress, amount, privateKey)
    } else {
      throw new Error('不支持的币种类型')
    }
  }

  return {
    transfer,
  }
}
/**
 * 获取可转账 DBC 余额（free - feeFrozen）
 */
export const getAvailableDbcBalance = async (wallet: string) => {
  const provider = getDbcProvider()
  const raw = await provider.getBalance(wallet)
  return parseFloat(ethers.formatEther(raw)) - 2 // ✅ 可转余额，减 2 保留 gas
}
/**
 * 获取 DLC 可用余额（ERC20 合约）
 */
export const getAvailableDlcBalance = async (wallet: string) => {
  const contract = getErc20Contract(DLC_TOKEN_ADDRESS, getDbcProvider())
  const decimals = await contract.decimals()
  const raw = await contract.balanceOf(wallet)
  return parseFloat(ethers.formatUnits(raw, decimals)) - 2 // ✅ 保守预留
}

// import { ApiPromise, WsProvider } from '@polkadot/api'

// let api: ApiPromise | null = null

// const GetApi = async () => {
//   if (!api) {
//     const provider = new WsProvider('wss://info1.dbcwallet.io') // ✅ 正式链地址
//     api = await ApiPromise.create({ provider })
//   }
//   return api
// }

// /**
//  * 获取可转账 DBC 余额（free - feeFrozen）
//  */
// export const getAvailableDbcBalance = async (wallet: string): Promise<number> => {
//   const api = await GetApi()
//   const account = await api.query.system.account(wallet)
//   const data = account.toJSON() as any

//   const free = Number(data.data.free)
//   const feeFrozen = Number(data.data.feeFrozen)

//   const transferable = (free - feeFrozen) / Math.pow(10, 18)
//   return Math.max(transferable, 0)
// }

// /**
//  * 获取 DLC 可用余额（ERC20 合约）
//  */
// export const getAvailableDlcBalance = async (wallet: string): Promise<number> => {
//   const provider = getDbcProvider()
//   const contract = getErc20Contract(DLC_TOKEN_ADDRESS, provider)
//   const [rawBalance, decimals] = await Promise.all([contract.balanceOf(wallet), contract.decimals()])
//   return parseFloat(ethers.formatUnits(rawBalance, decimals))
// }

// 生成签名
export const CreateSignatureEVM = async (nonce, privateKey) => {
  const wallet = new ethers.Wallet(privateKey)
  const signature = await wallet.signMessage(String(nonce))
  return { nonce, signature }
}
