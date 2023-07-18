import request from '@/utils/request'
import type { sku_response_data, sku_info_data } from './type'
enum API {
  GET_SKU_LIST = '/admin/product/list',
  SKU_ON_SALE = '/admin/product/onSale',
  SKU_CANCEL_SALE = '/admin/product/cancelSale',
  GET_SKU_INFO = '/admin/product/getSkuInfo',
  DELETE_SKU = '/admin/product/deleteSku',
}
export const api_get_sku_list = (page: number, limit: number) => {
  return request.get<any, sku_response_data>(
    API.GET_SKU_LIST + `/${page}/${limit}`,
  )
}

export const api_sku_on_sale = (skuid: number) => {
  return request.get<any>(API.SKU_ON_SALE + `/${skuid}`)
}
export const api_sku_cancel_sale = (skuid: number) => {
  return request.get<any>(API.SKU_CANCEL_SALE + `/${skuid}`)
}

// 获取单个sku详情
export const api_get_sku_info = (skuid: number) => {
  return request.get<any, sku_info_data>(API.GET_SKU_INFO + `/${skuid}`)
}

// 删除单个sku
export const api_delete_sku = (skuid: number) => {
  return request.delete<any>(API.DELETE_SKU + `/${skuid}`)
}
