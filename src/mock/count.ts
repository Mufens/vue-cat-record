import type { MockMethod } from 'vite-plugin-mock'
import type { CardData } from '@/types/count'

export default [
  {
    url: '/api/cards',
    method: 'get',
    response: () => ({
      success: true,
      data: [
        {
          name: '用户访问量',
          count: 999,
          change: '+20%',
          iconClass: 'first',
          icon: 'icon-fangwenliang',
        } as CardData,
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
      ],
    }),
  },
] as MockMethod[]
