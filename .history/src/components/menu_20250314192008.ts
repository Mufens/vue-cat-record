import type { Menus } from '@/types/menu'

export const menuData: Menus[] = [
  {
    id: '0',
    title: '首页',
    index: '/overview',
    icon: 'Oicon-shouyer',
  },
  {
    id: '1',
    title: '记录',
    index: '1',
    icon: 'icon-jilu',
    children: [
      {
        id: '11',
        pid: '1',
        index: '/system-user',
        title: '用户管理',
      },
      {
        id: '12',
        pid: '1',
        index: '/system-role',
        title: '角色管理',
      },
      {
        id: '13',
        pid: '1',
        index: '/system-menu',
        title: '菜单管理',
      },
    ],
  },
]
