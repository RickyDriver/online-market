// 通过vue-router插件实现模板路由配置

import { createRouter, createWebHashHistory } from 'vue-router'
import { constant_route, any_route } from './routes'

const router = createRouter({
  // 路由模式hash模式
  history: createWebHashHistory(),
  routes: [...constant_route, ...any_route],
  scrollBehavior() {
    return {
      left: 0,
      top: 0,
    }
  },
})
export default router
