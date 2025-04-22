import type { User } from '@/types/user'
import type { MockMethod } from 'vite-plugin-mock'
export const users: User[] = [
  {
    id: 1111111,
    name: 'admin',
    password: '123456',
    status: true,
    role: '管理员',
    email: 'admin@123.com',
    avatar: '/images/avatar.jpg',
    createdAt: '2024-03-27T22:38:06Z',
  },
  {
    id: 21111,
    name: 'golden',
    password: 'golden123',
    status: true,
    role: '金角大王',
    email: 'golden@example.com',
    avatar: '/images/avatar.jpg',
    createdAt: '2023-01-02T00:00:00Z',
  },
  {
    id: 333333,
    name: '银角大王',
    password: 'silver123',
    status: true,
    role: '银角大王',
    email: 'silver@333.com',
    avatar: '/images/avatar.jpg',
    createdAt: '2023-01-02T08:00:00Z',
  },
  {
    id: 412222,
    name: '猫',
    password: '123456',
    status: true,
    role: '爱喵用户',
    email: 'cat@666.com',
    avatar: '',
    createdAt: '2023-02-02T08:00:00Z',
  },
  {
    id: 5222222,
    name: '猫将来你和我会在一起吗',
    password: '123456',
    status: true,
    role: '爱喵用户特等生',
    email: 'cat@666.com',
    avatar: '',
    createdAt: '2023-02-02T08:00:00Z',
  },
  {
    id: 6345341236865,
    name: '爱爱爱安安',
    password: '123456',
    status: false,
    role: '爱喵用户',
    email: 'cat@333.com',
    avatar: '',
    createdAt: '2023-02-02T08:00:00Z',
  },
  {
    id: 6345341236866,
    name: '翠芬',
    password: '123456',
    status: true,
    role: '爱喵用户',
    email: 'cat@663.com',
    avatar: '',
    createdAt: '2023-02-02T08:00:00Z',
  },
  {
    id: 6345341236867,
    name: '小白',
    password: '123456789',
    status: true,
    role: '爱喵用户',
    email: 'cat@888.com',
    avatar: '',
    createdAt: '2023-02-05T08:00:00Z',
  },
  {
    id: 6345341236888,
    name: '小黑',
    password: '123456qq',
    status: true,
    role: '爱喵用户特等生',
    email: 'cat@123456.com',
    avatar: '',
    createdAt: '2023-02-07T08:00:00Z',
  },
  {
    id: 63453412362238,
    name: 'w(ﾟДﾟ)w',
    password: '123456qq',
    status: true,
    role: '爱喵用户',
    email: 'cat@1234567.com',
    avatar: '',
    createdAt: '2023-02-09T08:00:00Z',
  },
  {
    id: 63453412362788,
    name: 'www',
    password: '123456',
    status: true,
    role: '使者',
    email: 'cat@aass.com',
    avatar: '',
    createdAt: '2025-03-10T08:00:00Z',
  },
]
export default [
  // 获取用户列表
  {
    url: '/api/users/list',
    method: 'get',
    response: ({
      query,
    }: {
      query: {
        pagenum?: number
        pagesize?: number
        name?: string
        email?: string
        status?: string
        role?: string
      }
    }) => {
      const { pagenum = 1, pagesize = 10, name, email, status, role } = query

      let filtered = [...users]

      // 过滤逻辑
      if (name) filtered = filtered.filter((u) => u.name.includes(name))
      if (email) filtered = filtered.filter((u) => u.email.includes(email))
      if (status !== undefined) filtered = filtered.filter((u) => u.status === (status === 'true'))
      if (role) filtered = filtered.filter((u) => u.role === role)

      // 分页计算
      const start = (pagenum - 1) * pagesize
      const end = start + Number(pagesize)

      return {
        code: 200,
        data: {
          list: filtered.slice(start, end),
          total: filtered.length,
        },
      }
    },
  },
  //新增用户
  {
    url: '/api/users',
    method: 'post',
    response: ({ body }: { body: Partial<User> }) => {
      const exists = users.some((u) => u.name === body.name || u.email === body.email)
      if (exists) return { code: 400, message: '用户名或邮箱已存在' }

      const newUser = {
        ...body,
        id: Date.now(),
        createdAt: new Date().toISOString(),
        status: body.status ?? true,
        avatar: body.avatar || '',
        role: body.role || '爱喵用户',
        name: body.name || '',
        password: body.password || '',
        email: body.email || '',
      }
      users.push(newUser)
      return { code: 200, data: newUser }
    },
  },

  // 编辑用户
  {
    url: '/api/users/:id',
    method: 'put',
    response: ({ url, body }: { url: string; body: Partial<User> }) => {
      const id = url.split('/').pop()
      const index = users.findIndex((u) => u.id === Number(id))

      if (index === -1) return { code: 404, message: '用户不存在' }

      // 唯一性校验
      const exists = users.some(
        (u) => u.id !== Number(id) && (u.name === body.name || u.email === body.email),
      )
      if (exists) return { code: 400, message: '用户名或邮箱已存在' }

      users[index] = { ...users[index], ...body }
      return { code: 200, data: users[index] }
    },
  },

  // 删除用户
  {
    url: '/api/users/:id',
    method: 'delete',
    response: ({ url }: { url: string }) => {
      const id = Number(url.split('/').pop())
      const index = users.findIndex((u) => u.id === id)
      if (index > -1) {
        users.splice(index, 1)
        return { success: true }
      }
      return { success: false }
    },
  },
  {
    url: '/api/user/mes/batch',
    method: 'delete',
    response: ({ query }: { query: { ids: string } }) => {
      const ids = query.ids.split(',').map(Number)
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
    },
  },
] as MockMethod[]
