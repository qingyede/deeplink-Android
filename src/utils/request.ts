import axios, { AxiosInstance, InternalAxiosRequestConfig, AxiosResponse, AxiosError } from 'axios'
import app from '@/store/Modules/app' // 引入你的 store 模块

// 配置枚举
enum RequestEnums {
  METHOD = 'get',
  TIMEOUT = 20000,
}

// 状态码枚举
enum StatusCodeEnum {
  Unauthorized = 401,
  Forbidden = 403,
  NotFound = 404,
  InternalServerError = 500,
}

// 创建 axios 实例
const http: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_APP_API_BASE, // 基础URL从环境变量中读取
  method: RequestEnums.METHOD as string,
  timeout: RequestEnums.TIMEOUT as number, // 请求超时时间，单位为毫秒
})

// 请求拦截器
http.interceptors.request.use(
  (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
    // 从 store 中获取 token 并添加到请求头中
    const token = app().token
    if (token) {
      config.headers!.Authorization = `Bearer ${token}`
    }

    return config // 返回修改后的配置
  },
  (error: AxiosError): Promise<AxiosError> => {
    // 请求错误处理
    console.error('请求错误：', error)
    return Promise.reject(error)
  }
)

// 响应拦截器
http.interceptors.response.use(
  (response: AxiosResponse): AxiosResponse => {
    // 响应成功时直接返回响应数据
    return response
  },
  (error: AxiosError): Promise<AxiosError> => {
    const { response } = error

    if (response) {
      // 根据不同的状态码处理不同的逻辑
      switch (response.status) {
        case StatusCodeEnum.Unauthorized:
          console.error('未授权，请重新登录')
          localStorage.removeItem('token')
          // 这里可以选择跳转到登录页面，例如：router.push('/login');
          break
        case StatusCodeEnum.Forbidden:
          console.error('拒绝访问，权限不足')
          // 这里可以选择跳转到权限不足页面
          break
        case StatusCodeEnum.NotFound:
          console.error('请求地址不存在')
          // 这里可以选择跳转到404页面
          break
        case StatusCodeEnum.InternalServerError:
          console.error('服务器错误，请稍后重试')
          break
        default:
          console.error('请求失败：', response.data || '未知错误')
      }
    } else {
      // 处理断网的情况
      if (!window.navigator.onLine) {
        console.error('网络异常，请检查您的网络连接')
      } else {
        console.error('请求失败：', error.message)
      }
    }

    return Promise.reject(error) // 返回错误，以便在组件中捕获
  }
)

export default http
