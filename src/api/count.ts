import axios from 'axios'
import type { CountResponse } from '@/types/count'

export const fetchCardData = () => {
  return axios.get<CountResponse>('/api/cards')
}
