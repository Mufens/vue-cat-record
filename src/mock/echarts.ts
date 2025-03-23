import type { MockMethod } from 'vite-plugin-mock'
import type { LineData, PieData, BarData } from '@/types/echarts'

// 模拟数据
const mockLineData: LineData = {
  xData: ['一月', '二月', '三月', '四月', '五月', '六月'],
  seriesData: [120, 200, 150, 80, 70, 110],
  xAxisType: 'category',
}

const mockBreedPieData: PieData[] = [
  { value: 22, name: '奶牛猫' },
  { value: 55, name: '狸花猫' },
  { value: 99, name: '橘猫' },
  { value: 27, name: '玳瑁猫' },
  { value: 50, name: '三花猫' },
  { value: 11, name: '白猫' },
  { value: 5, name: '金色传说' },
  { value: 17, name: '黑猫' },
]

const mockAgeBarData: BarData = {
  xData: ['幼猫 (<1岁)', '青年猫 (1-2岁)', '状年猫 (3-6岁)', '中年猫(7-10岁)', '老年猫 (>11岁)'],
  seriesData: [20, 70, 90, 55, 18],
}

export default [
  {
    url: '/api/chart/line',
    method: 'get',
    response: () => ({
      success: true,
      data: mockLineData,
    }),
  },
  {
    url: '/api/chart/breed',
    method: 'get',
    response: () => ({
      success: true,
      data: mockBreedPieData,
    }),
  },
  {
    url: '/api/chart/age',
    method: 'get',
    response: () => ({
      success: true,
      data: mockAgeBarData,
    }),
  },
] as MockMethod[]
