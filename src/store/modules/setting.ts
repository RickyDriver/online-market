// 小仓库:用于控制layout组件之间的配置
import { defineStore } from 'pinia'

let use_layout_setting_store = defineStore('setting_store', {
    state: () => {
        return {
            fold: false,
        }
    },
})
export default use_layout_setting_store
