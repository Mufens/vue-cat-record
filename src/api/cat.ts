import type { CatItem, CatQueryParams } from '@/types/cat'
import { cats } from '@/mock/cat'

// 适配 GitHub Pages：全部使用前端内存中的猫咪数据，避免请求 /api/*

// 获取猫咪列表（带筛选与分页）
// 返回结构与原 axios + mock 接口保持一致：{ success, data: { data, total } }
export const fetchCatData = async (params?: CatQueryParams) => {
  const { pagenum = 1, pagesize = 10, breed, adoptionStatus } = params || {
    pagenum: 1,
    pagesize: 10,
  }

  let filtered: CatItem[] = [...cats]

  if (breed) filtered = filtered.filter((item) => item.breed === breed)
  if (adoptionStatus) filtered = filtered.filter((item) => item.adoptionStatus === adoptionStatus)

  const start = (pagenum - 1) * pagesize
  const end = start + Number(pagesize)

  const res = {
    success: true,
    data: {
      data: filtered.slice(start, end),
      total: filtered.length,
    },
  }

  // 原来 axios 实例拦截器返回的是后端对象本身（res.data）
  return Promise.resolve(res)
}

// 新增猫咪
export const addCatData = async (payload: Partial<CatItem>) => {
  const newCat: CatItem = {
    id: Date.now(),
    name: payload.name || '未命名',
    breed: payload.breed || '未知品种',
    age: payload.age || '未知年龄',
    gender: (payload.gender as CatItem['gender']) || '公',
    healthStatus: (payload.healthStatus as CatItem['healthStatus']) || '健康',
    adoptionStatus: (payload.adoptionStatus as CatItem['adoptionStatus']) || '未领养',
    area: payload.area || '未知区域',
    friendliness: payload.friendliness ?? 3,
    createTime: payload.createTime || new Date().toISOString(),
    catImg: payload.catImg || '',
  }

  cats.push(newCat)

  return Promise.resolve({
    data: {
      success: true,
      data: newCat,
    },
  })
}

// 编辑猫咪
export const editCatData = async (id: number, payload: Partial<CatItem>) => {
  const index = cats.findIndex((item) => item.id === id)
  if (index >= 0) {
    cats[index] = {
      ...cats[index],
      ...payload,
      catImg: payload.catImg || cats[index].catImg,
    }
    return Promise.resolve({
      data: {
        success: true,
        data: cats[index],
      },
    })
  }

  return Promise.resolve({
    data: {
      success: false,
    },
  })
}

// 删除猫咪
export const deleteCatData = async (id: number) => {
  const index = cats.findIndex((item) => item.id === id)
  if (index >= 0) {
    cats.splice(index, 1)
    return Promise.resolve({
      data: {
        success: true,
      },
    })
  }

  return Promise.resolve({
    data: {
      success: false,
    },
  })
}

// 批量删除猫咪
export const deleteBatchCatData = async (ids: number[]) => {
  if (!ids.length) {
    return Promise.resolve({
      data: {
        success: false,
      },
    })
  }

  const idSet = new Set(ids)
  for (let i = cats.length - 1; i >= 0; i--) {
    if (idSet.has(cats[i].id)) {
      cats.splice(i, 1)
    }
  }

  return Promise.resolve({
    data: {
      success: true,
    },
  })
}
