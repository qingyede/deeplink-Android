// src/utils/evm/provider.ts
import { ethers } from 'ethers'

/** ===== DBC 链基本信息 ===== */
export const DBC_CHAIN_ID = 19880818
export const DBC_RPC_URL = 'https://rpc1.dbcwallet.io'
export const DBC_SYMBOL = 'DBC'
export const DLC_TOKEN_ADDRESS = '0x6f8F70C74FE7d7a61C8EAC0f35A4Ba39a51E1BEe'
// 积分合约地址
export const SCORE_ADDRESS = '0x9b09b4B7a748079DAd5c280dCf66428e48E38Cd6'

/** 获取只读 Provider（JsonRpcProvider） */
export function getDbcProvider(): ethers.JsonRpcProvider {
  return new ethers.JsonRpcProvider(DBC_RPC_URL)
}

/** 简单的链 ID 校验（可选） */
export async function assertOnDbc(provider?: ethers.Provider) {
  const p = provider ?? getDbcProvider()
  const net = await p.getNetwork()
  return Number(net.chainId) === Number(DBC_CHAIN_ID)
}
