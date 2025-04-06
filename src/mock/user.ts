import type { User } from '@/types/user'

export const users: User[] = [
  {
    id: 1,
    name: 'admin',
    password: '123456',
    status: true,
    role: '管理员',
    email: 'admin@123.com',
    avatar: '/images/avatar.jpg',
    createdAt: '2024-03-27T22:38:06',
  },
  {
    id: 2,
    name: 'golden',
    password: 'golden123',
    status: true,
    role: '金角大王',
    email: 'golden@example.com',
    avatar: '/images/avatar.jpg',
    createdAt: '2023-01-02T00:00:00Z',
  },
  {
    id: 3,
    name: '银角大王',
    password: 'silver123',
    status: true,
    role: '银角大王',
    email: 'silver@333.com',
    avatar: '/images/avatar.jpg',
    createdAt: '2023-01-02T08:00:00Z',
  },
  {
    id: 4,
    name: '猫',
    password: '123456',
    status: true,
    role: '爱喵用户',
    email: 'cat@666.com',
    avatar: '',
    createdAt: '2023-02-02T08:00:00Z',
  },
]
