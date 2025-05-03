import avatar4 from '@/assets/images/avatar/avatar4.jpg'
import avatar2 from '@/assets/images/avatar/avatar2.jpg'
import avatar3 from '@/assets/images/avatar/avatar3.jpg'
import avatar1 from '@/assets/images/avatar/avatar1.jpg'
import card from '@/assets/images/card/card.png'
import cat from '@/assets/images/cat.jpg'
import one from '@/assets/images/card/111.jpg'

export interface MessageItem {
  id: number
  pictures: string
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
    pictures: one,
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
    pictures: card,
    title: '🐱全网征集！猫猫的名字，由你来定！✨',
    content:
      '12345678a巍峨为筹备变成常被崇拜二u共渡厄成本二u的u初步调查u额度额成都ueiw期望获得剫uu我给耽误',
    avatar: avatar3,
    author: '潇洒',
    view: '111',
    time: '2025-1-01',
    comment: [],
  },
  {
    id: 3,
    pictures: cat,
    title: '🐱全网征集！猫猫的名字，由你来定！✨',
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
  },
  {
    id: 4,
    pictures: card,
    title: '3',
    content: '12345678',
    avatar: avatar1,
    author: '啊',
    view: '111',
  },

  {
    id: 5,
    pictures: cat,
    title: '5',
    content: '12345678',
    avatar: avatar2,
    author: 'xxbb',
    view: '111',
    ratio: '3/4',
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
    id: 6,
    pictures: card,
    title: '6',
    content: '12345678',
    avatar: avatar3,
    author: '潇洒',
    view: '111',
  },

  {
    id: 7,
    pictures: cat,
    title: '7',
    content: '12345678',
    avatar: avatar2,
    author: 'xxbb',
    view: '111',
  },
  {
    id: 8,
    pictures: cat,
    title: '8',
    content: '啊啊还是我也希望业务关系',
    avatar: avatar2,
    author: 'xxbb',
    view: '111',
    ratio: '10/9',
  },
  {
    id: 9,
    pictures: cat,
    title: '9',
    content: 'eid我i的hi等我弄完ICi为皇帝维持我i和我IC',
    avatar: avatar2,
    author: 'xxbb',
    view: '111',
    ratio: '16/9',
  },
]
