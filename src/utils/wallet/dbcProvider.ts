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
    {
      inputs: [
        {
          internalType: 'address',
          name: 'caller',
          type: 'address',
        },
      ],
      name: 'getAvailableAmount',
      outputs: [
        {
          internalType: 'uint256',
          name: '',
          type: 'uint256',
        },
        {
          internalType: 'uint256',
          name: '',
          type: 'uint256',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
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
function handleTxError(error: any, t) {
  // 提取错误信息
  const code = error?.code
  const message = error?.error?.message || error?.message || '未知错误'
  const reason = error?.reason
  const tx = error?.transaction
  const data = error?.data

  // 按错误类型处理
  if (code === 'INSUFFICIENT_FUNDS') {
    window.$message?.error(t('app.insufficientBalance'))
  } else if (code === 'NETWORK_ERROR') {
    window.$message?.error(t('app.networkError'))
  } else if (code === 'INVALID_ARGUMENT') {
    window.$message?.error(t('app.invalidParams'))
  } else if (code === 'CALL_EXCEPTION' && reason === null) {
    window.$message?.error(t('app.transferContractError'))
  } else {
    // 通用错误提示
    window.$message?.error(`${t('app.transferFailed')}：${message}`, { duration: 8000 })
  }
}

// 生成签名
export const CreateSignatureEVM = async (nonce, privateKey) => {
  const wallet = new ethers.Wallet(privateKey)
  const signature = await wallet.signMessage(String(nonce))
  return { nonce, signature }
}
