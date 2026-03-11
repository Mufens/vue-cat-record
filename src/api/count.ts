import type { CountResponse, CardData } from '@/types/count'

// 适配 GitHub Pages：直接使用前端内置 mock 数据，而不是请求 /api/cards
const mockCards: CardData[] = [
  {
    name: '用户访问量',
    count: 999,
    change: '+20%',
    iconClass: 'first',
    icon: 'icon-fangwenliang',
  },
  {
    name: '领养数量',
    count: 142,
    change: '+5%',
    iconClass: 'second',
    icon: 'icon-maozhao',
  },
  {
    name: '猫咪数量',
    count: 256,
    change: '-10%',
    iconClass: 'third',
    icon: 'icon-xiaomao',
  },
  {
    name: '救助数量',
    count: 189,
    change: '+2%',
    iconClass: 'fourth',
    icon: 'icon-jiuzhuicon',
  },
]

export const fetchCardData = () => {
  const res: CountResponse = {
    success: true,
    data: mockCards,
  }

  // 保持与 axios.get 返回结构一致：{ data: CountResponse }
  return Promise.resolve({ data: res })
}
