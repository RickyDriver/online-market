import type { RouteRecordRaw } from 'vue-router'

// 定义小仓库数据state类型

export interface UserState {
    token: String | null
    menu_routes: RouteRecordRaw[]
}
