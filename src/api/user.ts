import { users } from '../mock/user'
import type { User } from '../types/user'

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

// 注册接口
export const registerAPI = async (userData: Omit<User, 'id' | 'status' | 'createdAt'>) => {
  await delay(500)

  // 检查用户名和邮箱是否已存在
  const exists = users.some((u) => u.name === userData.name || u.email === userData.email)
  if (exists) throw new Error('用户名或邮箱已被注册')

  const newUser: User = {
    ...userData,
    id: users.length + 1,
    status: true,
    createdAt: new Date().toISOString(),
  }
  users.push(newUser)
  return newUser
}

// 登录接口
export const loginAPI = async (credentials: { name: string; password: string }) => {
  await delay(500)
  const user = users.find((u) => u.name === credentials.name && u.password === credentials.password)
  if (!user) throw new Error('用户名或密码错误')
  if (!user.status) throw new Error('用户已被禁用')
  return user
}

// 获取用户信息接口
export const getUserInfoAPI = async (userId: number) => {
  await delay(500)
  const user = users.find((u) => u.id === userId)
  if (!user) throw new Error('用户不存在')
  return user
}
