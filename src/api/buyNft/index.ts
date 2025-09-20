import axios from 'axios'
import { baseUrl } from '@/constant/API'

// 获取购买nft的列表数据
export const getNftList = () => {
  return axios({
    method: 'get',
    url: `${baseUrl}/api/cyc/getCrownInfo`,
  })
}

// 购买nft之后存储数据到数据库
export const buyNftSuccess = (data) => {
  return axios({
    method: 'post',
    url: `${baseUrl}/api/cyc/saveBuyDLCOrder`,
    data,
  })
}
// 获取积分购买链接
export const getPointBuyLink = (data) => {
  return axios({
    method: 'post',
    url: `${baseUrl}/api/paypal/getBuyLink`,
    data,
  })
}

// 积分购买nft
export const buyNftByPoint = (data) => {
  return axios({
    method: 'post',
    url: `${baseUrl}/api/point/saveBuyPointOrder`,
    data,
  })
}
