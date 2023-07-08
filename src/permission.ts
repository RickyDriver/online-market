// 路由鉴权:鉴权,项目中路由能不能被权限的设置(某一个路由什么条件下可以访问,什么条件下不能访问)
import router from '@/router'
import setting from './setting'
// 引入进度条组件,样式
import nprogress from 'nprogress'
import 'nprogress/nprogress.css'
// 引入用户仓库,注意在外面使用小仓库的时候还需要有大仓库
import pinia from './store'
import use_user_store from './store/modules/user'
const user_store = use_user_store(pinia)

// 登录后发送请求获取用户信息(保证没有token也可以发送请求获取)

// 全局前置守卫:项目中任意路由切换都会触发的钩子
router.beforeEach(async (to: any, from: any, next: any) => {
  document.title = `${setting.title} - ${to.meta.title}`
  // 访问某一个路由之前的守卫
  // to:将要访问哪个路由
  // from:从哪个路由而来
  // next:路由的放行函数
  nprogress.start()
  const token = user_store.token
  const user_name = user_store.user_name
  // 用户登录判断
  if (token) {
    // 登陆成功判断
    if (to.path == '/login') {
      next({ path: '/' })
    } else {
      if (user_name) {
        next()
      } else {
        // 如果没有用户信息,在守卫处发请求获取用户信息
        try {
          await user_store.user_info()
          next()
        } catch (err) {
          // token过期或者用户手动地修改了本地的token
          await user_store.user_logout()
          next({ path: '/login', query: { redirect: to.path } })
        }
      }
    }
  } else {
    // 用户未登录判断
    if (to.path == '/login') next()
    else {
      next({ path: '/login', query: { redirect: to.path } })
    }
  }
})
// 全局后置守卫
router.afterEach((to: any, from: any) => {
  nprogress.done()
})

// 问题1:任意路由切换实现进度条业务
// 问题2:路由鉴权(路由组件访问权限的设置)
// 问题3:全部路由组件 登录|404|任意路由|首页|数据大屏|权限管理|权限管理(三个子路由)|商品管理(四个子路由)

// 用户未登录,始终指向登录页,登陆成功之后其余路由可以访问,登录页面不可访问
