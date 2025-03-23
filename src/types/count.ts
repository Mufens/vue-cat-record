export interface CardData {
  name: string
  count: number
  iconClass: string
  icon: string
}

export interface CountResponse {
  success: boolean
  data: CardData[]
}
