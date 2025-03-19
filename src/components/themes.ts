import type { ThemeConfig } from '@/types/themes'
// 集中管理所有主题配置
export const themes: ThemeConfig[] = [
  {
    name: 'default',
    label: '樱花粉',
    color: '#fcf2f0',
    className: 'default',
  },
  {
    name: 'grape',
    label: '葡萄紫',
    color: '#e9e5fa',
    className: 'grape',
  },
  {
    name: 'blusky',
    label: '孔雀蓝',
    color: '#356b9e',
    className: 'blusky',
  },
  {
    name: 'water',
    label: '薄荷绿',
    color: '#cce7e0',
    className: 'water',
  },
  {
    name: 'momo',
    label: '丁香棕',
    color: '#71361D',
    className: 'momo',
  },
  {
    name: 'dark',
    label: '经典黑',
    color: '#1a1a1a',
    className: 'dark',
  },
]
