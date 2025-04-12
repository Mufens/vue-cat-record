import type { Role, PermissionNode } from '@/types/role'

export const mockRoles: Role[] = [
  {
    id: 'd7e7cbf3-815c-450e-b6e2-20ef6ccba20d',
    name: '管理员',
    remark: '拥有系统最高权限,掌管力量的神',
    status: true,
    createdAt: '2023-01-01T10:00:00Z',
    permissions: [
      '21',
      '22',
      '23',
      'cat:add',
      'cat:edit',
      'cat:delete',
      'user:add',
      'user:edit',
      'user:delete',
      'role:add',
      'role:edit',
      'role:delete',
    ],
  },
  {
    id: '16f5cb6f-09c2-4b86-8b09-615e06ce5add',
    name: '金角大王',
    remark: '管理员的左膀，底池对彼此不得不差不多不得不',
    status: true,
    createdAt: '2023-01-02T11:00:00Z',
    permissions: [
      '21',
      '22',
      'cat:add',
      'cat:edit',
      'cat:delete',
      'user:add',
      'user:edit',
      'user:delete',
    ],
  },
  {
    id: 'd7d93e9a-16b8-4c10-b06d-c7db102d8b68',
    name: '银角大王',
    remark: '右臂,u出督促督促对比得出背单词ucus宿舍虚构',
    status: false,
    createdAt: '2023-01-03T12:00:00Z',
    permissions: ['21', 'cat:add', 'cat:edit', 'cat:delete'],
  },
  {
    id: 'aa550feb-3429-42bf-a558-7df10ec882f6',
    name: '爱喵用户',
    remark: '猫咪爱好者专属角色',
    status: true,
    createdAt: '2023-01-04T13:00:00Z',
    permissions: [],
  },
]

export const allPermissions: PermissionNode[] = [
  {
    label: '首页',
    value: 'overview:view',
  },
  {
    label: '记录',
    value: 'record:view',
  },
  {
    label: '管理',
    value: 'manage',
    children: [
      {
        label: '猫猫管理',
        value: 'cat:view',
        children: [
          { label: '添加', value: 'cat:add' },
          { label: '修改', value: 'cat:edit' },
          { label: '删除', value: 'cat:delete' },
        ],
      },
      {
        label: '用户管理',
        value: 'user:view',
        children: [
          { label: '添加', value: 'user:add' },
          { label: '修改', value: 'user:edit' },
          { label: '删除', value: 'user:delete' },
        ],
      },
      {
        label: '角色管理',
        value: 'role:view',
        children: [
          { label: '添加', value: 'role:add' },
          { label: '修改', value: 'role:edit' },
          { label: '删除', value: 'role:delete' },
        ],
      },
    ],
  },
  {
    label: '留言板',
    value: 'message:view',
  },
  {
    label: '个人中心',
    value: 'user:view',
  },
]
