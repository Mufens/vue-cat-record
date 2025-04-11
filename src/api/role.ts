import axios from 'axios' // 假设已封装axios实例
import type { RoleQueryParams } from '@/types/role'
import { getRoleListMock } from '@/mock/role'

// 真实环境调用
export const getRoleListAPI = async (params: RoleQueryParams) => {
  // 开发环境使用Mock数据
  if (import.meta.env.DEV) {
    const res = await getRoleListMock(params)
    return res.data
  }

  // 生产环境调用真实API（GET请求）
  const { data } = await axios.get('/api/roles', { params })
  return data
}
