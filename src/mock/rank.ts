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
    value: 13200,
    percent: 45,
    color: '#E6A23C',
  },
  {
    title: '疫苗',
    value: 18900,
    percent: 65,
    color: '#67C23A',
  },
  {
    title: '驱虫',
    value: 15450,
    percent: 53,
    color: '#409EFF',
  },

  {
    title: '食品',
    value: 9800,
    percent: 34,
    color: '#909399',
  },
  {
    title: '用具',
    value: 12000,
    percent: 27,
    color: '#eaeeba',
  },
]

export const getMockRankData = (): RankResponse => ({
  success: true,
  data: mockRankData,
})
