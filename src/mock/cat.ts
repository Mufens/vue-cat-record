import type { MockMethod } from 'vite-plugin-mock'
import type { CatItem } from '@/types/cat'
const data: CatItem[] = [
  {
    id: 111,
    name: '大宝',
    breed: '橘猫',
    age: '12岁',
    gender: '公',
    healthStatus: '健康',
    adoptionStatus: '未领养',
    area: '生活服务中心',
    friendliness: 5,
    createTime: '2024-03-27T22:38:06',
    catImg: '/images/111.jpg',
  } as CatItem,
  {
    id: 112,
    name: '海参',
    breed: '梨花猫',
    age: '8岁',
    gender: '公',
    healthStatus: '生病',
    adoptionStatus: '未领养',
    area: '东区12栋',
    friendliness: 3,
    createTime: '2024-08-27T22:38:06',
    catImg: '/images/113.jpg',
  },
  {
    id: 113,
    name: '年糕',
    breed: '白猫',
    age: '2岁',
    gender: '公',
    healthStatus: '喵星',
    adoptionStatus: '未领养',
    area: '东区操场',
    friendliness: 3,
    createTime: '2024-08-27T22:38:06',
    catImg: '',
  },
  {
    id: 114,
    name: '来财',
    breed: '奶牛猫',
    age: '五个月',
    gender: '母',
    healthStatus: '健康',
    adoptionStatus: '已领养',
    area: '南区11栋',
    friendliness: 5,
    createTime: '2024-08-27T22:38:06',
    catImg: '/images/113.jpg',
  },
  {
    id: 115,
    name: '胖虎',
    breed: '橘猫',
    age: '3岁',
    gender: '公',
    healthStatus: '健康',
    adoptionStatus: '未领养',
    area: '梦月湖旁',
    friendliness: 2,
    createTime: '2024-08-27T22:38:06',
    catImg: '',
  },
  {
    id: 116,
    name: '13号',
    breed: '奶牛猫',
    age: '2岁',
    gender: '母',
    healthStatus: '健康',
    adoptionStatus: '未领养',
    area: '东区12栋',
    friendliness: 1,
    createTime: '2024-08-27T22:38:06',
    catImg: '',
  },
  {
    id: 117,
    name: '大喵',
    breed: '黑猫',
    age: '三个月',
    gender: '公',
    healthStatus: '健康',
    adoptionStatus: '未领养',
    area: '生活服务中心',
    friendliness: 4,
    createTime: '2024-08-27T22:38:06',
    catImg: '',
  },
  {
    id: 118,
    name: '八八波一',
    breed: '雀猫',
    age: '2岁',
    gender: '母',
    healthStatus: '健康',
    adoptionStatus: '未领养',
    area: '志敏大道222号十字路口绿化带旁',
    friendliness: 5,
    createTime: '2024-08-27T22:38:06',
    catImg: '',
  },
  {
    id: 119,
    name: '土豆',
    breed: '橘猫',
    age: '六个月',
    gender: '母',
    healthStatus: '健康',
    adoptionStatus: '未领养',
    area: '北区食堂',
    friendliness: 5,
    createTime: '2024-08-27T22:38:06',
    catImg: '/images/113.jpg',
  },
]

export default [
  {
    url: '/api/cat/mes/list',
    method: 'get',
    response: ({
      query,
    }: {
      query: { pagenum?: number; pagesize?: number; breed?: string; adoptionStatus?: string }
    }) => {
      const { pagenum = 1, pagesize = 6, breed, adoptionStatus } = query

      // 创建过滤后的副本避免污染原始数据
      let filteredData = [...data]

      if (breed) filteredData = filteredData.filter((item) => item.breed === breed)
      if (adoptionStatus)
        filteredData = filteredData.filter((item) => item.adoptionStatus === adoptionStatus)

      const start = (pagenum - 1) * Number(pagesize)
      const end = start + Number(pagesize)

      return {
        success: true,
        data: {
          data: filteredData.slice(start, end),
          total: filteredData.length,
        },
      }
    },
  },
  //POST 添加猫咪
  {
    url: '/api/cat/mes',
    method: 'post',
    response: ({ body }: { body: Partial<CatItem> }) => {
      const newCat: CatItem = {
        id: Date.now(),
        ...body,
        name: body.name || '未命名',
        breed: body.breed || '未知品种',
        age: body.age || '未知年龄',
        gender: body.gender || '公',
        healthStatus: body.healthStatus || '健康',
        adoptionStatus: body.adoptionStatus || '未领养',
        area: body.area || '未知区域',
        friendliness: body.friendliness ?? 3,
        createTime: body.createTime || new Date().toISOString(),
        catImg: body.catImg || '',
      }
      data.push(newCat)
      return { success: true, data: newCat }
    },
  },
  // PUT 修改猫咪
  {
    url: '/api/cat/mes/:id',
    method: 'put',
    response: ({ body, query }: { body: Partial<CatItem>; query: { id: string } }) => {
      const index = data.findIndex((item) => item.id === Number(query.id))
      if (index >= 0) {
        data[index] = {
          ...data[index],
          ...body,
          catImg: body.catImg || data[index].catImg,
        }
        return { success: true, data: data[index] }
      }
      return { success: false }
    },
  },
  // DELETE 删除猫咪
  {
    url: '/api/cat/mes/:id',
    method: 'delete',
    response: ({ query }: { query: { id: string } }) => {
      const index = data.findIndex((item) => item.id === Number(query.id))
      if (index >= 0) {
        data.splice(index, 1)
        return { success: true }
      }
      return { success: false }
    },
  },
] as MockMethod[]
