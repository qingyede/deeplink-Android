import axios from 'axios'
import { priceUrl, baseUrl } from '@/constant/API'

// 获取DBC价格
export const dbcPriceOcw = () => {
  return axios({
    method: 'get',
    url: `${priceUrl}/query/dbc_info?language=CN`,
  })
}

// 获取DLC价格
export const dlcPriceOcw = () => {
  return axios({
    method: 'get',
    url: `${priceUrl}/query/dlc_info?language=CN`,
  })
}

// 获取国家汇率
export const exchangeRate = () => {
  return axios({
    method: 'get',
    url: `${baseUrl}/api/cyc/getExchangeRate`,
  })
}

// 获取钱包对应唯一ID
export const getWalletId = (data) => {
  return axios({
    method: 'post',
    url: `${baseUrl}/api/point/getWalletID`,
    data,
  })
}
