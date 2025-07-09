import axios from 'axios'
import { baseUrl } from '@/constant/API'

// 和我们一起玩
export const playWithUs = (params) => {
  return axios({
    method: 'get',
    url: `${baseUrl}/api/cyc/getPalylist`,
    params,
  })
}
