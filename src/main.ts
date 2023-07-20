import { createApp } from 'vue'
import App from './App.vue'
// 引用elementplus插件和样式
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import 'element-plus/theme-chalk/dark/css-vars.css'

import zhCn from 'element-plus/dist/locale/zh-cn.mjs'

// svg文件需要的配置代码
import 'virtual:svg-icons-register'

// 引入自定义插件对象，注册整个项目全局组件
import global_component from '@/components/index.ts'

// 引入模板的全局的样式
import './styles/index.scss'

// 引入路由
import router from './router'

// 引入pinia仓库
import pinia from '@/store'

// 引入路由鉴权文件
import './permission'

createApp(App)

const app = createApp(App)
// 安装element-plus插件
app.use(ElementPlus, {
  locale: zhCn, //elementplus国际化设置
})

app.use(global_component)

// 注册模板的路由
app.use(router)
// 将应用挂载到挂载点上
app.mount('#app')
// 使用pinia仓库
app.use(pinia)
