import type { RouteRecordRaw } from 'vue-router'

// 定义小仓库数据state类型

export interface UserState {
    token: string | null
    menu_routes: RouteRecordRaw[]
    user_name: string
    user_avatar_url: string
}
