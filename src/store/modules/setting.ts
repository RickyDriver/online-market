// 小仓库:用于控制layout组件之间的配置
import { defineStore } from 'pinia'

const use_layout_setting_store = defineStore('setting_store', {
    state: () => {
        return {
            fold: false, //控制用户菜单折起展开
            refsh: false, //用于控制是否刷新
        }
    },
})
export default use_layout_setting_store
