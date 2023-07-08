export interface common_res_data {
  code: number
  message: string
  ok: boolean
}
// 已有的品牌的数据类型
export interface trademark {
  id?: number | null
  createTime?: string
  updateTime?: string
  tmName: string
  logoUrl: string
}
// 包含全部品牌数据的ts类型
export type Records = trademark[]

// 获取的已有全部品牌的数据ts类型
export interface trademark_response_data extends common_res_data {
  data: {
    records: Records
    total: number
    size: number
    current: number
    orders: any[]
    optimizeCountSql: boolean
    hitCount: boolean
    countId: null
    maxLimit: null
    searchCount: boolean
    pages: number
  }
}
