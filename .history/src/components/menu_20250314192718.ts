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
    index: '/record',
    icon: 'icon-jilu',
  },
  {
    id: '2',
    title: '管理',
    index: '2',
    icon: 'icon-jilu',
    children: [
      {
        id: '21',
        pid: '2',
        index: '/cat-manage',
        title: '猫猫管理',
        icon: 'icon-claw',
      },
      {
        id: '22',
        pid: '2',
        index: '/user-manage',
        title: '用户管理',
        icon: 'icon-Gc_32_line-UserManagement',
      },
    ],
  },
]
