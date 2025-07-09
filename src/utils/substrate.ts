// utils/substrate.ts
import { ApiPromise, WsProvider } from '@polkadot/api'

// ✅ DBC 链的 websocket 地址（根据你的链来调整）
const WS_ENDPOINT = 'wss://info1.dbcwallet.io' // 或你自己的节点地址

// ✅ 创建并导出一个全局可复用的 API 实例
export const api = await ApiPromise.create({
  provider: new WsProvider(WS_ENDPOINT),
})
