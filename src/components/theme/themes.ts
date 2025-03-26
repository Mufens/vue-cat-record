import type { ThemeConfig } from '@/types/themes'
// 集中管理所有主题配置
export const themes: ThemeConfig[] = [
  {
    name: 'default',
    label: '樱花粉',
    color: '#fbced3',
    className: 'default',
  },
  {
    name: 'grape',
    label: '葡萄紫',
    color: '#d8d3f1',
    className: 'grape',
  },
  {
    name: 'blusky',
    label: '天空蓝',
    color: '#a7c7f1',
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
    color: '#bea78b',
    className: 'momo',
  },
  {
    name: 'gaoji',
    label: '拼接色',
    color: '#06b1bd',
    className: 'gaoji',
  },
  {
    name: 'dark',
    label: '经典黑',
    color: '#1a1a1a',
    className: 'dark',
  },
]
