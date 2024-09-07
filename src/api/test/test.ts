import http from '@/utils/request'
import { SignUpCodeRequest } from './type'

// GET 请求 - 获取用户数据
export const fetchUserData = (d: string) => {
  return http({
    url: `/application/showUser?a=${d}`,
  })
}

/**
 * 请求验证码的函数，必须提供正确的 phone 属性
 * @param data 包含 phone 属性的对象
 */
export const signUpCode = (data: SignUpCodeRequest) => {
  return http({
    url: '/CaptchaCode',
    method: 'post',
    data,
  })
}

/**
 * 上传文件的函数，必须提供一个已经处理好的 FormData 对象
 * @param data 包含文件和其他相关信息的 FormData 对象
 */
export const uploadFile = (data: FormData) => {
  return http({
    url: '/upload', // 上传文件的 API 地址
    method: 'post',
    data: data, // 直接传递 FormData 对象,并且不需要写'Content-Type': 'multipart/form-data',axios会为我处理好
  })
}
