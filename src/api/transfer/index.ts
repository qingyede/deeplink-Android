import axios from 'axios'
import { transactionUrl } from '@/constant/API'

// 获取交易历史记录
export const getTokenTransfers = (addresses: string) => {
  return axios({
    method: 'get',
    url: `${transactionUrl}/api/v2/addresses/${addresses}/token-transfers?type=`,
  })
}
