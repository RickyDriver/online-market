import type { RouteRecordRaw } from 'vue-router'
import type { catagory_attr, attr_data } from '@/api/product/attr/type'

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
