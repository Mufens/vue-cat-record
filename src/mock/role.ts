import type { Role } from '@/types/role'

export const mockRoles: Role[] = [
  {
    id: 'd7e7cbf3-815c-450e-b6e2-20ef6ccba20d',
    name: '管理员',
    remark: '拥有系统最高权限,掌管力量的神',
    status: true,
    createdAt: '2023-01-01T10:00:00Z',
  },
  {
    id: '16f5cb6f-09c2-4b86-8b09-615e06ce5add',
    name: '金角大王',
    remark: '管理员的左膀，底池对彼此不得不差不多不得不',
    status: true,
    createdAt: '2023-01-02T11:00:00Z',
  },
  {
    id: 'd7d93e9a-16b8-4c10-b06d-c7db102d8b68',
    name: '银角大王',
    remark: '右臂,u出督促督促对比得出背单词ucus宿舍虚构',
    status: false,
    createdAt: '2023-01-03T12:00:00Z',
  },
  {
    id: 'aa550feb-3429-42bf-a558-7df10ec882f6',
    name: '爱喵用户',
    remark: '猫咪爱好者专属角色',
    status: true,
    createdAt: '2023-01-04T13:00:00Z',
  },
]

// 模拟GET请求的分页和过滤
interface RoleListParams {
  name?: string
  status?: boolean
  page?: number
  pageSize?: number
}

export const getRoleListMock = (params: RoleListParams) => {
  let filtered = [...mockRoles]

  // 按名称过滤
  if (params.name) {
    filtered = filtered.filter((item) =>
      item.name.toLowerCase().includes((params.name ?? '').toLowerCase()),
    )
  }

  // 按状态过滤
  if (params.status !== undefined) {
    filtered = filtered.filter((item) => item.status === params.status)
  }

  // 分页逻辑
  const page = params.page || 1
  const pageSize = params.pageSize || 10
  const start = (page - 1) * pageSize
  const end = page * pageSize

  return {
    code: 200,
    message: 'success',
    data: {
      list: filtered.slice(start, end),
      total: filtered.length,
    },
  }
}
