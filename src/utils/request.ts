import axios from 'axios'
import { useUserStore } from '@/stores'
// 创建axios实例
const instance = axios.create({
  timeout: 5000,
})

// 添加请求拦截器
instance.interceptors.request.use(
  (config) => {
    // 在发送请求之前做些什么
    const useStore = useUserStore()
    if (useStore.token) {
      config.headers.Authorization = `Bearer ${useStore.token}`
    }
    return config
  },
  (err) => Promise.reject(err),
)

// 添加响应拦截器
instance.interceptors.response.use(
  (res) => {
    // 2xx 范围内的状态码都会触发该函数。
    // 对响应数据做点什么

    return res.data
  },
  (e) => {
    // 超出 2xx 范围的状态码都会触发该函数。
    // 对响应错误做点什么
    return Promise.reject(e)
  },
)
export default instance
