import { users } from '../mock/user'
import type { User, UserQueryParams } from '../types/user'
import axios from 'axios'
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

export const updatePasswordAPI = async (
  userId: number,
  oldPassword: string,
  newPassword: string,
) => {
  await delay(500)
  const user = users.find((u) => u.id === userId)
  if (!user) throw new Error('用户不存在')
  if (user.password !== oldPassword) throw new Error('原密码错误')

  user.password = newPassword
  return true
}
export const updateUserInfoAPI = async (userId: number, updateData: Partial<User>) => {
  await delay(500)
  const userIndex = users.findIndex((u) => u.id === userId)
  if (userIndex === -1) throw new Error('用户不存在')

  // 用户名唯一性校验
  if (updateData.name && users.some((u) => u.id !== userId && u.name === updateData.name)) {
    throw new Error('用户名已存在')
  }

  users[userIndex] = { ...users[userIndex], ...updateData }
  return users[userIndex]
}

//获取用户列表
export const getUserListAPI = async (params: UserQueryParams) => {
  const { data } = await axios.get('/api/users/list', { params })
  return data
}

// 新增用户
export const addUserData = async (data: Omit<User, 'id' | 'createdAt' | 'avatar'>) => {
  return axios.post('/api/users', data)
}

// 编辑用户
export const editUserData = async (id: number, data: Partial<User>) => {
  return axios.put(`/api/users/${id}`, data)
}

// 删除用户
export const deleteUserData = async (id: number) => {
  return axios.delete(`/api/users/${id}`)
}

// 批量删除用户
export const deleteBatchUserData = async (ids: number[]) => {
  return axios.delete('/api/user/mes/batch', {
    params: { ids: ids.join(',') },
    paramsSerializer: { indexes: null },
  })
}
