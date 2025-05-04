import avatar4 from '@/assets/images/avatar/avatar4.jpg'
import avatar2 from '@/assets/images/avatar/avatar2.jpg'
import avatar3 from '@/assets/images/avatar/avatar3.jpg'
import avatar1 from '@/assets/images/avatar/avatar1.jpg'
import card from '@/assets/images/card/card.png'
import card2 from '@/assets/images/card/card2.jpg'
import cat from '@/assets/images/cat.jpg'
import one from '@/assets/images/card/111.jpg'
import meme from '@/assets/images/card/meme.jpg'
import q1 from '@/assets/images/card/q1.jpg'
import q2 from '@/assets/images/card/q2.jpg'
import q3 from '@/assets/images/card/q3.jpg'
import my from '@/assets/images/card/my.png'
import a1 from '@/assets/images/card/a1.jpg'
import a2 from '@/assets/images/card/a2.jpg'
import a3 from '@/assets/images/card/a3.jpg'

export interface MessageItem {
  id: number
  pictures: string[]
  title?: string
  content: string
  avatar: string
  author: string
  view: string
  time?: string
  ratio?: string
  originalIndex?: number
  comment?: Array<{
    avatar: string
    user: string
    content: string
    time: string
    replies?: Array<{
      avatar: string
      user: string
      content: string
      time: string
    }>
  }>
}

export const messageList: MessageItem[] = [
  {
    id: 1,
    pictures: [one],
    title: '这是大宝',
    content: '黄白布丁',
    avatar: avatar4,
    author: '豚鼠',
    view: '111',
    time: '2023-10-01',
    comment: [
      {
        avatar: avatar3,
        user: '小白',
        content: '好可爱',
        time: '2023-10-01 ',
        replies: [
          {
            avatar: avatar4,
            user: '小黑',
            content: 'yesyes',
            time: '2023-10-03 ',
          },
        ],
      },
      {
        avatar: avatar1,
        user: 'aa',
        content: '可爱',
        time: '2023-10-03 ',
      },
    ],
  },
  {
    id: 2,
    pictures: [q1, q2, q3],
    title: '🐱全网征集！猫猫的名字，由你来定！✨',
    content:
      '12345678a巍峨为筹备变成常被崇拜二u共渡厄成本二u的u初步调查u额度额成都ueiw期望获得剫uu我给耽误',
    avatar: avatar3,
    author: '潇洒',
    view: '111',
    time: '2024-1-01',
    comment: [
      {
        avatar: avatar3,
        user: '小白',
        content: '1',
        time: '2024-1-03 ',
      },
      {
        avatar: avatar1,
        user: 'aa',
        content: '2',
        time: '2024-1-03 ',
      },
    ],
  },
  {
    id: 3,
    pictures: [a1, a2, a3],
    title: '普通人如何救助流浪猫',
    content: `不知不觉，小黑猫和小白猫已经陪伴大家好久啦～你是不是还在问我们叫什么名字呢？猫猫也觉得，是时候给我们起一个正式的新名字了！✍️
但是起什么名字好呢？猫猫思来想去，最终决定，这么重要的任务，还是交给大家一起来选择最好啦！
⚡现在！猫猫的命名权交到你们手里！⚡
👉 猫猫1号：小黑
👉 猫猫2号：小白
🌟规则超简单🌟
1️⃣ 评论区留言【名字1+名字2】，还可以聊一聊起名的理由哦！
2️⃣ 名字一经采纳，将会送上猫了么毛绒挂件（最终版）一对！🎁
尽情发挥你们的想象力吧！⏰3月18日截止，速来赐名！👇`,
    avatar: avatar2,
    author: 'xxbb',
    view: '111',
    time: '2024-10-01',
    ratio: '3/4',
  },
  {
    id: 4,
    pictures: [meme],
    title: 'meme全明星阵容',
    content: '12345678',
    avatar: avatar1,
    author: '啊',
    view: '111',
    ratio: '3/4',
    comment: [
      {
        avatar: avatar3,
        user: '小白',
        content: 'oioioi',
        time: '2023-10-03 ',
        replies: [
          {
            avatar: avatar4,
            user: '小黑',
            content: 'yesyes',
            time: '2023-10-03 ',
          },
        ],
      },
      {
        avatar: avatar1,
        user: 'aa',
        content: 'hhhhhhh',
        time: '2023-10-01 ',
      },
    ],
  },

  {
    id: 5,
    pictures: [my],
    title: '猫',
    content:
      '其实我的未完成我i测i万磁王为耕地高低温动物和我等会我我踩我踩我我国i我国i我u给i刚才广东我国给我个大概为耕地给',
    avatar: avatar4,
    author: '豚鼠',
    view: '111',
    ratio: '',
    time: '2024-12-01',
    comment: [
      {
        avatar: avatar3,
        user: '小白',
        content: 'oioioi',
        time: '2023-10-03 ',
        replies: [
          {
            avatar: avatar4,
            user: '小黑',
            content: 'yesyes',
            time: '2023-10-03 ',
          },
        ],
      },
      {
        avatar: avatar1,
        user: 'aa',
        content: 'hhhhhhh',
        time: '2023-10-01 ',
      },
    ],
  },
  {
    id: 6,
    pictures: [card],
    title: '6',
    content: '12345678',
    avatar: avatar3,
    author: '潇洒',
    view: '111',
  },

  {
    id: 7,
    pictures: [cat],
    title: '7',
    content: '12345678',
    avatar: avatar2,
    author: 'xxbb',
    view: '111',
  },
  {
    id: 8,
    pictures: [cat],
    title: '8',
    content: '啊啊还是我也希望业务关系',
    avatar: avatar2,
    author: 'xxbb',
    view: '111',
  },
  {
    id: 9,
    pictures: [card2],
    title: '本月流浪猫绝育情况公示',
    content:
      '截止4月12号为止，本月已绝育流浪猫16只。本月流浪猫免费绝育名额全部已申请完。需要名额的可以等5月份申请，或者按照流浪猫绝育优惠价格自费带去合作医院进行绝育！',
    avatar: avatar2,
    author: 'xxbb',
    view: '111',
    ratio: '10/12',
    time: '4-13',
  },
]
