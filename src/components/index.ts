// 引入项目中全部的全局组件
import svg_icon from './svg-icon/index.vue'
import type { App, Component } from 'vue'
const components: { [name: string]: Component } = { svg_icon }
// 引入eleplus的图标组件
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

export default {
  install(app: App) {
    Object.keys(components).forEach((key: string) => {
      app.component(key, components[key])
    })
    // 将element-plus的图标组件注册为全局
    for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
      app.component(key, component)
    }
  },
}
