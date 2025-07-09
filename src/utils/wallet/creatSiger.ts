// utils/wallet/createSigner.ts
import { ethers } from 'ethers'
import { getDbcProvider } from './dbcProvider'

export function createSignerFromPrivateKey(privateKey: string): ethers.Wallet {
  const provider = getDbcProvider()
  return new ethers.Wallet(privateKey, provider)
}
