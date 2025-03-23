export interface ChartResponse<T> {
  success: boolean
  data: T
}

// 折线图数据类型
export interface LineData {
  xData: string[]
  seriesData: number[]
  xAxisType: 'category' | 'value' | 'time' | 'log'
}

// 饼图数据类型
export interface PieData {
  value: number
  name: string
}

// 柱状图数据类型
export interface BarData {
  xData: string[]
  seriesData: number[]
  color?: string
}
