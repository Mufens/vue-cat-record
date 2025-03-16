import type { ThemeConfig } from '@/types/themes'
// 集中管理所有主题配置
export const themes: ThemeConfig[] = [
  {
    name: 'default',
    label: '默认主题',
    color: '#819d60',
    className: 'default',
  },
  {
    name: 'grape',
    label: '葡萄紫',
    color: '#d04b8e',
    className: 'grape',
  },
  {
    name: 'blusky',
    label: '天空蓝',
    color: '#67a0c0',
    className: 'blusky',
  },
  {
    name: 'water',
    label: '清水绿',
    color: '#587589',
    className: 'water',
  },
  {
    name: 'momo',
    label: '墨水',
    color: '#587589',
    className: 'momo',
  },
  {
    name: 'dark',
    label: '暗黑主题',
    color: '#409eff',
    className: 'dark',
  },
]
