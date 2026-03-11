import type { RoleQueryParams, Role, CreateRoleDTO } from '@/types/role'
import { mockRoles, allPermissions } from '@/mock/role-mock-data'

// 使用前端内存中的 mock 数据，适配 GitHub Pages 等纯静态部署环境

// 获取角色列表（带分页、筛选）
// 返回结构保持与 axios + mock 接口一致：{ code, data: { list, total } }
export const getRoleListAPI = async (params: RoleQueryParams) => {
  const { pagenum = 1, pagesize = 10, name, status } = params

  let filtered: Role[] = [...mockRoles]

  if (name) {
    filtered = filtered.filter((item) => item.name.toLowerCase().includes(name.toLowerCase()))
  }

  if (status !== undefined) {
    filtered = filtered.filter((item) => item.status === status)
  }

  const start = (pagenum - 1) * pagesize
  const end = start + Number(pagesize)

  return {
    code: 200,
    data: {
      list: filtered.slice(start, end),
      total: filtered.length,
    },
  }
}

// 新增角色
export const addRoleAPI = async (roleData: CreateRoleDTO) => {
  const newRole: Role = {
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
    remark: roleData.remark,
    status: roleData.status,
    name: roleData.name,
    permissions: roleData.permissions,
  }
  mockRoles.push(newRole)

  return {
    data: {
      code: 200,
      data: newRole,
    },
  }
}

// 编辑角色
export const editRoleAPI = async (roleId: string, roleData: Partial<Role>) => {
  const index = mockRoles.findIndex((r) => r.id === roleId)
  if (index === -1) {
    return {
      data: {
        code: 404,
        message: '角色不存在',
      },
    }
  }

  mockRoles[index] = {
    ...mockRoles[index],
    ...roleData,
    permissions: roleData.permissions ?? mockRoles[index].permissions,
  }

  return {
    data: {
      code: 200,
      data: mockRoles[index],
    },
  }
}

// 删除角色
export const deleteRoleAPI = async (roleId: string) => {
  const index = mockRoles.findIndex((r) => r.id === roleId)
  if (index > -1) {
    mockRoles.splice(index, 1)
    return {
      data: {
        code: 200,
      },
    }
  }
  return {
    data: {
      code: 404,
    },
  }
}

// 获取所有菜单和按钮权限列表
export const getAllPermissionAPI = async () => {
  return {
    data: {
      code: 200,
      data: allPermissions,
    },
  }
}

// 根据角色名称获取权限
// 返回结构保持与 axios + mock 接口一致：{ code, data: string[] }
export const getRolePermissionsAPI = async (roleName: string) => {
  const role = mockRoles.find((r) => r.name === roleName)

  if (role && !role.status) {
    const defaultRole = mockRoles.find((r) => r.name === '爱喵用户')
    return {
      code: 200,
      data: defaultRole?.permissions || [],
    }
  }

  return {
    code: 200,
    data: role?.permissions || [],
  }
}
