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
export interface BasePermissionNode {
  id: number
  label: string
  icon?: string
  value: string
}
export interface ParentPermissionNode extends BasePermissionNode {
  children: PermissionNode[]
  isPenultimate?: boolean
}
export type PermissionNode = ParentPermissionNode | BasePermissionNode
export interface CreateRoleDTO extends Omit<Role, 'id' | 'createdAt'> {
  permissions: string[]
}
