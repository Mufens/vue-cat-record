import type { MockMethod } from 'vite-plugin-mock'
import type { CreateRoleDTO } from '@/types/role'
import { mockRoles, allPermissions } from './role-mock-data'
function generateMockUUID() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0,
      v = c === 'x' ? r : (r & 0x3) | 0x8
    return v.toString(16)
  })
}

// 修改新增角色的代码
/**
 * Represents a newly created role object with additional properties.
 *
 * @property {string} id - A unique identifier for the role, generated using `generateMockUUID`.
 * @property {string} createdAt - The ISO string representation of the date and time when the role was created.
 * @property {any} body - The original body object spread into the new role.
 * @property {Array<any>} permissions - An array of permissions associated with the role. Defaults to an empty array if not provided in the body.
 */
const createNewRole = (body: CreateRoleDTO) => ({
  ...body,
  id: generateMockUUID(), // 使用生成的UUID
  createdAt: new Date().toISOString(),
  permissions: body.permissions || [],
})
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
      const newRole = createNewRole(body)
      mockRoles.push(newRole)
      return { code: 200, data: newRole }
    },
  },

  // 修改角色
  {
    url: '/api/roles/:id',
    method: 'put',
    response: (req: { url: string; body: Partial<CreateRoleDTO> }) => {
      const path = req.url.split('?')[0]
      const id = path.split('/').pop()
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
    response: (req: { url: string }) => {
      const path = req.url.split('?')[0]
      const id = path.split('/').pop()
      const index = mockRoles.findIndex((r) => r.id === id)
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
      if (role && !role.status) {
        // 角色被禁用，返回爱喵用户的权限
        const defaultRole = mockRoles.find((r) => r.name === '爱喵用户')
        return { code: 200, data: defaultRole?.permissions || [] }
      }
      return { code: 200, data: role?.permissions || [] }
    },
  },
] as MockMethod[]
