import http from '@/utils/request'

// 获取nonce
export const getNonce = (params) => {
  return http({
    url: `/nonce/${params}`,
  })
}

// 签名
export const getToken = (data) => {
  return http({
    url: '/token',
    method: 'post',
    data,
  })
}
