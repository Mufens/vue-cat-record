import { getMockRankData } from '@/mock/rank'

// 排行榜数据统一使用前端 mock，避免 GitHub Pages 上 404
export const fetchRankData = () => Promise.resolve(getMockRankData())
