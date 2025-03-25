import axios from 'axios'
import type { RankResponse } from '@/types/rank'
import { getMockRankData } from '@/mock/rank'

// // 真实接口版本
// export const fetchRankData = () => {
//   return axios.get<RankResponse>('/api/rank')
// }
export const fetchRankData = import.meta.env.DEV
  ? () => Promise.resolve(getMockRankData())
  : () => axios.get<RankResponse>('/api/rank')
