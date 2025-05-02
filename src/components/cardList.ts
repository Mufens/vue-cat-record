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

  style?: {
    left: string
    top: string
    width: string
    height: string
  }
}

export const messageList: MessageItem[] = [
  {
    id: 1,
    pictures: one,
    content: '这是大宝',
    avatar: avatar4,
    author: '豚鼠',
    view: '111',
    time: '2023-10-01',
    comment: [
      {
        avatar: '',
        user: '小白',
        content: '好可爱',
        time: '2023-10-01 12:00',
        replies: [
          {
            avatar: '',
            user: '小黑',
            content: '谢谢',
            time: '2023-10-01 12:00',
          },
        ],
      },
    ],
  },
  { id: 2, pictures: card, content: '12345678', avatar: avatar3, author: '潇洒', view: '111' },
  {
    id: 3,
    pictures: cat,
    content: '12345678',
    avatar: avatar2,
    author: 'xxbb',
    view: '111',
  },
  { id: 4, pictures: card, content: '12345678', avatar: avatar1, author: '啊', view: '111' },

  {
    id: 5,
    pictures: cat,
    content: '12345678',
    avatar: avatar2,
    author: 'xxbb',
    view: '111',
    ratio: '16/9',
  },
  { id: 6, pictures: card, content: '12345678', avatar: avatar3, author: '潇洒', view: '111' },

  {
    id: 7,
    pictures: cat,
    content: '12345678',
    avatar: avatar2,
    author: 'xxbb',
    view: '111',
  },
  {
    id: 8,
    pictures: cat,
    content: '12345678',
    avatar: avatar2,
    author: 'xxbb',
    view: '111',
    ratio: '16/9',
  },
  {
    id: 9,
    pictures: cat,
    content: '12345678',
    avatar: avatar2,
    author: 'xxbb',
    view: '111',
    ratio: '16/9',
  },
  { id: 10, pictures: card, content: '12345678', avatar: avatar3, author: '潇洒', view: '111' },
  { id: 11, pictures: card, content: '12345678', avatar: avatar1, author: '啊', view: '111' },
  { id: 12, pictures: card, content: '12345678', avatar: avatar2, author: 'xxbb', view: '111' },
]
