// src/utils/evm/token.ts
import { ethers } from 'ethers'
import { getDbcProvider, SCORE_ADDRESS } from './provider'

//  获取 ERC20 合约实例（如 DLC 代币）
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

// ✅ 3) 获取用户积分原始值（bigint，最小单位，不做格式化）
export async function getUserPointsRaw(wallet: string): Promise<string> {
  const provider = getDbcProvider()
  const contract = getErc20Contract(SCORE_ADDRESS, provider) as any
  const raw = await contract.balanceOf(wallet)

  const formatted = ethers.formatEther(raw)
  return formatted.toString()
}
