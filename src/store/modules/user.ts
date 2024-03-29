// 创建用户相关的小仓库
import { defineStore } from 'pinia'
// 引入接口
import { api_req_login, api_req_userInfo, api_req_logout } from '@/api/user'
// 引入ts数据类型
import type {
  login_form_data,
  login_response_data,
  user_info_response_data,
} from '@/api/user/type.ts'
//引入路由(常量路由)
import { constant_route, async_route, any_route } from '@/router/routes'

// 引入小仓库的数据类型
import type { UserState } from './type/type.ts'

// 引入utils里的存取token方法
import { GET_TOKEN, SET_TOKEN, REMOVE_TOKEN } from '@/utils/token.ts'
// 引入lodash深拷贝方法
import colneDeep from 'lodash/cloneDeep'

import router from '@/router/index.ts'

// 创建用户小仓库
const use_user_store = defineStore('User', {
  // 小仓库处理数据的地方
  state: (): UserState => {
    return {
      // 存储用户的唯一标识token
      token: GET_TOKEN(),
      // 常量路由
      user_name: '',
      user_avatar_url: '',
      comfirmed_async_routes: [],
      menu_routes: [],
      botton: [],
    }
  },
  // 异步，逻辑的地方
  actions: {
    // 用户登录的方法
    // 给data数据定义ts数据类型，之前已经写好
    async user_login(data: login_form_data) {
      const result: login_response_data = await api_req_login(data)
      // 登录请求：成功200->拿到token
      // 登录请求：失败201->失败信息
      if (result.code === 200) {
        this.token = result.data as string
        // 存储token到本地
        SET_TOKEN(result.data as string)
        // 保证当前async函数能够返回一个成功的promise
        return 'ok'
      } else {
        return Promise.reject(new Error(result.data))
      }
    },
    // 递归过滤路由权限
    fliter_async_routes(async_routes, permission_routes: string[]) {
      return async_routes.filter((item: any) => {
        if (permission_routes.includes(item.name)) {
          if (item.children && item.children.length > 0) {
            item.children = this.fliter_async_routes(
              item.children,
              permission_routes,
            )
          }
          return true
        }
      })
    },
    // 获取用户信息的方法
    async user_info() {
      // 获取用户的的信息,存储与仓库之中[用户的头像\名字\权限]
      const result: user_info_response_data = await api_req_userInfo()
      if (result.code == 200) {
        console.log(result)
        this.user_name = result.data.name
        this.user_avatar_url = result.data.avatar
        this.comfirmed_async_routes = this.fliter_async_routes(
          colneDeep(async_route),
          result.data.routes,
        )
        this.menu_routes = [
          ...constant_route,
          ...this.comfirmed_async_routes,
          ...any_route,
        ]

        this.comfirmed_async_routes.forEach((item) => {
          router.addRoute(item)
        })

        this.botton = result.data.bottons
        return 'ok'
      } else {
        return Promise.reject(new Error(result.message))
      }
    },

    // 退出登录后,移除用户信息的方法
    async user_logout() {
      const result: any = await api_req_logout()
      if (result.code == 200) {
        this.token = ''
        this.user_name = ''
        this.user_avatar_url = ''
        REMOVE_TOKEN()
        return 'ok'
      } else {
        return Promise.reject(new Error(result.message))
      }
    },
  },
  getters: {},
})
// 对外暴露获取小仓库的方法
export default use_user_store
