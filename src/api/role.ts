import axios from 'axios'

import type { RoleQueryParams, Role, CreateRoleDTO } from '@/types/role'

// 获取角色列表
export const getRoleListAPI = async (params: RoleQueryParams) => {
  const { data } = await axios.get('/api/roles/list', { params })
  return data
}
//新增角色
export const addRoleAPI = async (roleData: CreateRoleDTO) => {
  return axios.post('/api/roles', roleData)
}
//编辑角色
export const editRoleAPI = async (roleId: string, roleData: Partial<Role>) => {
  return axios.put(`/api/roles/${roleId}`, roleData)
}
// 删除角色
export const deleteRoleAPI = async (roleId: string) => {
  return axios.delete(`/api/roles/${roleId}`)
}
//获取所有菜单和按钮权限列表
export const getAllPermissionAPI = async () => {
  return axios.get('/api/permissions/all')
}

// 根据角色名称获取权限
export const getRolePermissionsAPI = async (roleName: string) => {
  const { data } = await axios.get(`/api/roles/permissions`, { params: { roleName } })
  return data
}
