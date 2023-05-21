import { createApp } from 'vue'

import App from './App.vue'

createApp(App)
// 引用elementplus插件和样式
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
//@ts-ignore忽略当前文件ts类型的检测否则有红色提示(打包会失败)
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'

const app = createApp(App)
// 安装element-plus插件
app.use(ElementPlus, {
    locale: zhCn, //elementplus国际化设置
})
// svg文件需要的配置代码
import 'virtual:svg-icons-register'

// 引入自定义插件对象，注册整个项目全局组件
import global_component from '@/components/index.ts'
app.use(global_component)
// 引入模板的全局的样式
import './styles/index.scss'




// 将应用挂载到挂载点上
app.mount('#app')
