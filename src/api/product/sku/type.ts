interface response_head {
  code: number
  message: string
  ok: boolean
}
export interface single_sku {
  id?: number | string
  createTime?: string
  updateTime?: string
  spuId: number | string
  price: number | string
  skuName: string
  skuDesc: string
  weight: string
  tmId: number
  category3Id: number
  skuDefaultImg: string
  isSale: number
  skuImageList?: null | sku_img_list
  skuAttrValueList?: null | sku_attr_value_list
  skuSaleAttrValueList?: null | sku_sale_attr_value_list
}

export interface sku_img_list {
  createTime?: string
  id?: number
  imgName: string
  imgUrl: string
  isDefault: string | number
  skuId: number
  spuImgId?: number
  updateTime?: string
}
export interface sku_attr_value_list {
  attrId?: number
  attrName: string
  createTime?: string
  id?: number
  skuId: number
  updateTime?: string
  valueId: number
  valueName: string
}
export interface sku_sale_attr_value_list {
  createTime?: string
  id?: number
  saleAttrId: number
  saleAttrName: string
  saleAttrValueId: number
  saleAttrValueName: string
  skuId: number
  spuId: number
  updateTime?: string
}
export interface sku_data_list {
  records: single_sku[]
  total: number
  size: number
  current: number
  orders?: any
  optimizeCountSql: boolean
  hitCount: boolean
  countId?: any
  maxLimit?: any
  searchCount: boolean
  pages: number
}

// sku列表集合的类型
export interface sku_response_data extends response_head {
  data: sku_data_list
}
// 单个sku详情的类型
export interface sku_info_data extends response_head {
  data: single_sku
}
