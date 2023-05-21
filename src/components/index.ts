// 引入项目中全部的全局组件
import svg_icon from './svg-icon/index.vue'
import type { App, Component } from 'vue'
const components: { [name: string]: Component } = { svg_icon }

export default {
    install(app: App) {
        Object.keys(components).forEach((key: string) => {
            app.component(key, components[key])
        })
    },
}
