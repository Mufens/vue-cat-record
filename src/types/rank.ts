export interface RankItem {
  title: string
  value: number
  percent: number
  color: string
}

// 完整响应数据结构
export interface RankResponse {
  success: boolean
  data: RankItem[]
}
