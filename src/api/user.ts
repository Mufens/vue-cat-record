import { users } from '../mock/user'
import type { User, UserQueryParams } from '../types/user'

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

// 获取用户列表（纯前端，适配 GitHub Pages）
// 返回结构与原 axios + mock 接口保持一致：{ code, data: { list, total } }
export const getUserListAPI = async (params: UserQueryParams) => {
  const { pagenum, pagesize, name, email, status, role } = params

  let filtered = [...users]

  if (name) filtered = filtered.filter((u) => u.name.includes(name))
  if (email) filtered = filtered.filter((u) => u.email.includes(email))
  if (status !== undefined) filtered = filtered.filter((u) => u.status === status)
  if (role) filtered = filtered.filter((u) => u.role === role)

  const page = pagenum || 1
  const size = pagesize || 10
  const start = (page - 1) * size
  const end = start + Number(size)

  return {
    code: 200,
    data: {
      list: filtered.slice(start, end),
      total: filtered.length,
    },
  }
}

// 新增用户
export const addUserData = async (data: Omit<User, 'id' | 'createdAt' | 'avatar'>) => {
  const exists = users.some((u) => u.name === data.name || u.email === data.email)
  if (exists) {
    return {
      code: 400,
      message: '用户名或邮箱已存在',
    }
  }

  const newUser: User = {
    ...data,
    id: Date.now(),
    createdAt: new Date().toISOString(),
    status: (data as Partial<User>).status ?? true,
    avatar: (data as Partial<User>).avatar || '',
  }
  users.push(newUser)

  return {
    code: 200,
    data: newUser,
  }
}

// 编辑用户
export const editUserData = async (id: number, payload: Partial<User>) => {
  const index = users.findIndex((u) => u.id === id)
  if (index === -1) {
    return {
      code: 404,
      message: '用户不存在',
    }
  }

  const exists = users.some(
    (u) => u.id !== id && (u.name === payload.name || u.email === payload.email),
  )
  if (exists) {
    return {
      code: 400,
      message: '用户名或邮箱已存在',
    }
  }

  users[index] = { ...users[index], ...payload }
  return {
    code: 200,
    data: users[index],
  }
}

// 删除用户
export const deleteUserData = async (id: number) => {
  const index = users.findIndex((u) => u.id === id)
  if (index > -1) {
    users.splice(index, 1)
    return { success: true }
  }
  return { success: false }
}

// 批量删除用户
export const deleteBatchUserData = async (ids: number[]) => {
  let deleteCount = 0
  ids.forEach((id) => {
    const index = users.findIndex((u) => u.id === id)
    if (index > -1) {
      users.splice(index, 1)
      deleteCount++
    }
  })

  return {
    success: deleteCount > 0,
    message: deleteCount > 0 ? `成功删除${deleteCount}个用户` : '未找到匹配用户',
  }
}
