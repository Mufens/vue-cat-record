import type { MockMethod } from 'vite-plugin-mock'
import type { CreateRoleDTO } from '@/types/role'
import { mockRoles, allPermissions } from './role-mock-data' // 将原有mock数据分离

export default [
  // 获取角色列表（带分页和过滤）
  {
    url: '/api/roles/list',
    method: 'get',
    response: ({
      query,
    }: {
      query: { pagenum?: number; pagesize?: number; name?: string; status?: string }
    }) => {
      const { pagenum = 1, pagesize = 10, name, status } = query

      let filtered = [...mockRoles]

      // 过滤逻辑
      if (name) {
        filtered = filtered.filter((item) => item.name.toLowerCase().includes(name.toLowerCase()))
      }
      if (status !== undefined) {
        filtered = filtered.filter((item) => item.status === (status === 'true'))
      }

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

  // 新增角色
  {
    url: '/api/roles',
    method: 'post',
    response: ({ body }: { body: CreateRoleDTO }) => {
      const newRole = {
        ...body,
        id: `role-${Date.now()}`,
        createdAt: new Date().toISOString(),
        permissions: body.permissions || [],
      }
      mockRoles.push(newRole)
      return { code: 200, data: newRole }
    },
  },

  // 修改角色
  {
    url: '/api/roles/:id',
    method: 'put',
    response: (req: { params: { id: string }; body: Partial<CreateRoleDTO> }) => {
      const { id } = req.params
      const body = req.body
      const index = mockRoles.findIndex((r) => r.id === id)
      if (index > -1) {
        mockRoles[index] = {
          ...mockRoles[index],
          ...body,
          permissions: body.permissions || mockRoles[index].permissions,
        }
        return { code: 200, data: mockRoles[index] }
      }
      return { code: 404, message: '角色不存在' }
    },
  },

  // 删除角色
  {
    url: '/api/roles/:id',
    method: 'delete',
    response: ({ params }: { params: { id: string } }) => {
      const index = mockRoles.findIndex((r) => r.id === params.id)
      if (index > -1) {
        mockRoles.splice(index, 1)
        return { code: 200 }
      }
      return { code: 404 }
    },
  },

  // 获取所有权限
  {
    url: '/api/permissions/all',
    method: 'get',
    response: () => ({
      code: 200,
      data: allPermissions,
    }),
  },
  // 根据角色名称获取权限
  {
    url: '/api/roles/permissions',
    method: 'get',
    response: ({ query }: { query: { roleName: string } }) => {
      const role = mockRoles.find((r) => r.name === query.roleName)
      return {
        code: 200,
        data: role?.permissions || [],
      }
    },
  },
] as MockMethod[]
