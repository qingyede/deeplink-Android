import axios from 'axios'
import { baseUrl } from '@/constant/API'

// 获取购买nft的列表数据
export const getNftList = () => {
  return axios({
    method: 'get',
    url: `${baseUrl}/api/cyc/getCrownInfo`,
  })
}
