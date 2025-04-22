import type { Menus } from '@/types/menu'

export const menuData: Menus[] = [
  {
    id: '0',
    title: '首页',
    index: '/overview',
    icon: 'icon-shouye',
    permiss: 'overview:view',
  },
  {
    id: '1',
    title: '记录',
    index: '/record',
    icon: 'icon-jilu',
    permiss: 'record:view',
  },
  {
    id: '2',
    title: '系统管理',
    index: '/system',
    icon: 'icon-Gc_120_line-Menu',
    children: [
      {
        id: '21',
        pid: '2',
        index: '/system/cat',
        title: '猫猫管理',
        icon: 'icon-claw',
        permiss: 'cat:view',
      },
      {
        id: '22',
        pid: '2',
        index: '/system/user',
        title: '用户管理',
        icon: 'icon-Gc_32_line-UserManagement',
        permiss: 'user:view',
      },
      {
        id: '23',
        pid: '3',
        index: '/system/role',
        title: '角色管理',
        icon: 'icon-a-jiaoseguanli2',
        permiss: 'role:view',
      },
      {
        id: '24',
        pid: '4',
        index: '/system/menu',
        title: '菜单管理',
        icon: 'icon-caidan',
        permiss: 'menu:view',
      },
    ],
  },
  {
    id: '3',
    title: '留言板',
    index: '/message-board',
    icon: 'icon-maojiazhengchangx',
    permiss: 'message:view',
  },
  {
    id: '4',
    title: '个人中心',
    index: '/user',
    icon: 'icon-personalcenter',
    permiss: 'user:view',
  },
]
