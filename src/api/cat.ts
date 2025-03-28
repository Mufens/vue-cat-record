import axios from '@/utils/request'
import type { CatItem } from '@/types/cat'

export const fetchCatData = (params?: Record<string, string | number | boolean>) => {
  return axios.get<{ data: CatItem[]; total: number }>('/api/cat/mes/list', { params })
}
