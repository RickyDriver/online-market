// 创建用户相关的小仓库
import { defineStore } from 'pinia'
// 引入接口
import { api_req_login } from '@/api/user'

// 引入ts数据类型
import type { login_form } from '@/api/user/type'

// 创建用户小仓库
let use_user_store = defineStore('User', {
    // 小仓库处理数据的地方
    state() {
        return {
            // 存储用户的唯一标识token
            token: localStorage.getItem('TOKEN'),
        }
    },
    // 异步，逻辑的地方
    actions: {
        // 用户登录的方法
        // 给data数据定义ts数据类型，之前已经写好
        async user_login(data: login_form) {
            let result: any = await api_req_login(data)
            // 登录请求：成功200->拿到token
            // 登录请求：失败201->失败信息
            if (result.code === 200) {
                this.token = result.data.token as string
                // 本地存储持久token
                localStorage.setItem('TOKEN', result.data.token as string)
                // 保证当前async函数能够返回一个成功的promise
                return 'ok'
            } else {
                return Promise.reject(new Error(result.data.message))
            }
        },
    },
    getters: {},
})
// 对外暴露获取小仓库的方法
export default use_user_store
