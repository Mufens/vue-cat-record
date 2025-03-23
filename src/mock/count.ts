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
          iconClass: 'first',
          icon: 'icon-fangwenliang',
        } as CardData,
        {
          name: '系统消息',
          count: 42,
          iconClass: 'second',
          icon: 'icon-xitongxiaoxi',
        },
        {
          name: '猫咪数量',
          count: 256,
          iconClass: 'third',
          icon: 'icon-xiaomao',
        },
        {
          name: '救助数量',
          count: 89,
          iconClass: 'fourth',
          icon: 'icon-jiuzhuicon',
        },
      ],
    }),
  },
] as MockMethod[]
