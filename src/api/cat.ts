import axios from '@/utils/request'
import type { CatItem } from '@/types/cat'

export const fetchCatData = (params?: Record<string, string | number | boolean>) => {
  return axios.get<{ data: CatItem[]; total: number }>('/api/cat/mes/list', { params })
}
// 新增猫咪
export const addCatData = (data: Partial<CatItem>) => {
  return axios.post('/api/cat/mes', data)
}
// 编辑猫咪
export const editCatData = (id: number, data: Partial<CatItem>) => {
  return axios.put(`/api/cat/mes/${id}`, data)
}

// 删除猫咪
export const deleteCatData = (id: number) => {
  return axios.delete(`/api/cat/mes/${id}`)
}

//批量删除猫咪
export const deleteBatchCatData = (ids: number[]) => {
  return axios.delete('/api/cat/mes/batch', {
    params: { ids: ids.join(',') },
    paramsSerializer: { indexes: null },
  })
}
