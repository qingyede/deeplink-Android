import axios from 'axios'
import { baseUrl } from '@/constant/API'

// 获取当前经纬度
export const getGps = () => {
  return axios({
    method: 'get',
    url: `${baseUrl}/api/cyc/getDeviceIpInfo`,
  })
}
// 获取当前经纬度的gpu类型-云电脑
export const getGpuType = (data) => {
  return axios({
    method: 'post',
    url: `${baseUrl}/api/cyc/getPersonGPUType`,
    data,
  })
}
// 获取当前经纬度的gpu类型-云网吧
export const getGpuTypeCafe = (data) => {
  return axios({
    method: 'post',
    url: `${baseUrl}/api/cyc/getCycGPUType`,
    data,
  })
}

// 根据gpu类型获取gpu列表
export const getGpuList = (data) => {
  return axios({
    method: 'post',
    url: `${baseUrl}/api/cyc/getPersonGPUList`,
    data,
  })
}

// 根据gpu类型获取gpu列表网吧
export const getGpuListCafe = (data) => {
  return axios({
    method: 'post',
    url: `${baseUrl}/api/cyc/getCycGPUList`,
    data,
  })
}

// 租用成功后存储数据到数据库
export const rentSuccess = (data) => {
  return axios({
    method: 'post',
    url: `${baseUrl}/api/cyc/saveRentMac`,
    data,
  })
}

// 获取机器在线状态
export const getGpuStatus = (data) => {
  return axios({
    method: 'post',
    url: `${baseUrl}/api/cyc/getMacOnline`,
    data,
  })
}

// 获取单个机器的出租详细信息
export const getGpuDetail = (data) => {
  return axios({
    method: 'post',
    url: `${baseUrl}/api/cyc/getRentGpuInfo`,
    data,
  })
}

// 续租机器订单数据存储
export const extendOrder = (data) => {
  return axios({
    method: 'post',
    url: `${baseUrl}/api/cyc/saveRenewMac`,
    data,
  })
}

// 提前结束租用
export const endOrder = (data) => {
  return axios({
    method: 'post',
    url: `${baseUrl}/api/cyc/endRentMac`,
    data,
  })
}

// 续租后通知
export const extendNotify = (data) => {
  return axios({
    method: 'post',
    url: `https://go.deeplink.cloud/send_rent_info`,
    data,
  })
}
// 积分租用
export const rentByPoint = (data) => {
  return axios({
    method: 'post',
    url: `${baseUrl}/api/point/PointPaymentRentMacInfo`,
    data,
  })
}
// 积分续租
export const extendByPoint = (data) => {
  return axios({
    method: 'post',
    url: `${baseUrl}/api/point/PointPaymentRenewMacInfo`,
    data,
  })
}
