import type { ChartResponse, LineData, PieData, BarData } from '@/types/echarts'

// 适配 GitHub Pages：直接使用内置 mock 数据，而不是请求 /api/chart/*
const mockLineData: LineData = {
  xData: ['一月', '三月', '五月', '七月', '九月', '十二月'],
  seriesData: [127, 111, 155, 180, 162, 150],
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

export const fetchLineData = () => {
  const res: ChartResponse<LineData> = {
    success: true,
    data: mockLineData,
  }
  return Promise.resolve({ data: res })
}

export const fetchBreedPieData = () => {
  const res: ChartResponse<PieData[]> = {
    success: true,
    data: mockBreedPieData,
  }
  return Promise.resolve({ data: res })
}

export const fetchAgeBarData = () => {
  const res: ChartResponse<BarData> = {
    success: true,
    data: mockAgeBarData,
  }
  return Promise.resolve({ data: res })
}
