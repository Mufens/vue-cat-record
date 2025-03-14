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
      },
      {
        id: '22',
        pid: '2',
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
