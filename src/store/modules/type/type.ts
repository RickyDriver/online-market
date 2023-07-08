import type { RouteRecordRaw } from 'vue-router'
import type { catagory_attr, attr_data } from '@/api/product/attr/type'

import type { trademark } from '@/api/product/trademark/type'
import type {
  spuImageList_item,
  single_spu_data,
  spuSaleAttrList_item,
} from '@/api/product/spu/type'

// 定义小仓库数据state类型

export interface UserState {
  token: string | null
  menu_routes: RouteRecordRaw[]
  user_name: string
  user_avatar_url: string
}
// 定义分类对象仓库的state数据类型
export interface catagory_state {
  c1_id: string | number
  c2_id: string | number
  c3_id: string | number
  c1_arr: catagory_attr[]
  c2_arr: catagory_attr[]
  c3_arr: catagory_attr[]
  attr_list: attr_data[]
}

// 定义新增/修改spu业务的ts数据类型
export interface spu_state {
  spu_trmark_arr: trademark[] | []
  spu_sale_attr_arr: spuSaleAttrList_item[] | []
  all_sale_attr: catagory_attr[] | []
  all_trade_mark: trademark[] | []
  spu_img_list: spuImageList_item[] | []
  spu_parmas: single_spu_data
  upload_filelist: upload_filelist[] | []
}
interface upload_filelist {
  name: string
  status?: string
  uid?: number
  url: string
}
