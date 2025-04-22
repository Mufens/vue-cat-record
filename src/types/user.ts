export interface User {
  id: number
  name: string
  password: string
  status: boolean
  role: string
  email: string
  avatar: string
  createdAt: string
  tags?: string[]
}
export interface UserQueryParams {
  pagenum: number
  pagesize: number
  name?: string
  email?: string
  status?: boolean
  role?: string
  createStart?: string
  createEnd?: string
}
