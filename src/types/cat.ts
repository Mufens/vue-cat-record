// 猫咪基础信息
export interface CatItem {
  id: number
  name: string
  breed: string
  age: string
  gender: '公' | '母'
  healthStatus: '健康' | '生病' | '喵星'
  adoptionStatus: '已领养' | '未领养'
  area: string
  friendliness: number
  createTime: string
  catImg: string
}
export interface CatQueryParams {
  pagenum: number
  pagesize: number
  breed?: string
  adoptionStatus?: '已领养' | '未领养'
}
