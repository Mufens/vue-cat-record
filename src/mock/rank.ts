import type { RankResponse, RankItem } from '@/types/rank'

const mockRankData: RankItem[] = [
  {
    title: '绝育',
    value: 23330,
    percent: 80,
    color: '#f25e43',
  },
  {
    title: '医疗',
    value: 18900,
    percent: 65,
    color: '#E6A23C',
  },
  {
    title: '疫苗',
    value: 16900,
    percent: 57,
    color: '#67C23A',
  },
  {
    title: '驱虫',
    value: 12450,
    percent: 45,
    color: '#409EFF',
  },

  {
    title: '食品',
    value: 15000,
    percent: 55,
    color: '#f9e67a',
  },
  {
    title: '用具',
    value: 9800,
    percent: 27,
    color: '#909399',
  },
]

export const getMockRankData = (): RankResponse => ({
  success: true,
  data: mockRankData,
})
