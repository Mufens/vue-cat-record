export interface Role {
  id: string
  name: string
  remark: string
  status: boolean
  createdAt: string
}

export interface RoleQueryParams {
  page?: number
  pageSize?: number
  name?: string
  status?: boolean
}
