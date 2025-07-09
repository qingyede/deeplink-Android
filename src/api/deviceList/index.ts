import axios from 'axios'
import { baseUrl } from '@/constant/API'

// 获取用户的租用列表
export const getUserDeviceList = (data) => {
  return axios({
    method: 'post',
    url: `${baseUrl}/api/cyc/getWalletRent`,
    data,
  })
}
