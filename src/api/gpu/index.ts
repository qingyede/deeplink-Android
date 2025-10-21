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
