export interface Role {
  id: string
  name: string
  remark: string
  status: boolean
  createdAt: string
  permissions?: string[]
}

export interface RoleQueryParams {
  pagenum?: number
  pagesize?: number
  name?: string
  status?: boolean
}
export interface PermissionNode {
  label: string
  value: string
  children?: PermissionNode[]
}
export interface CreateRoleDTO extends Omit<Role, 'id' | 'createdAt'> {
  permissions: string[]
}
