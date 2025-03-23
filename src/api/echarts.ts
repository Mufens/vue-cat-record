import axios from 'axios'
import type { ChartResponse, LineData, PieData, BarData } from '@/types/echarts'

export const fetchLineData = () => {
  return axios.get<ChartResponse<LineData>>('/api/chart/line')
}

export const fetchBreedPieData = () => {
  return axios.get<ChartResponse<PieData[]>>('/api/chart/breed')
}

export const fetchAgeBarData = () => {
  return axios.get<ChartResponse<BarData>>('/api/chart/age')
}
