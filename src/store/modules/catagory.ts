// 小仓库:用于存储已选中的一级分类\二级分类\三级分类
import { defineStore } from 'pinia'
import { api_get_c1url, api_get_c2url, api_get_c3url } from '@/api/product/attr'

const use_catagory_store = defineStore('catagory_store', {
    state: () => {
        return {
            // c=catagory c1代表一级分类

            // 存储各菜单的数据
            c1_arr: [],
            c2_arr: [],
            c3_arr: [],
            c1_id: '',
            c2_id: '',
            c3_id: '',
        }
    },
    actions: {
        async getc1() {
            const res: any = await api_get_c1url()
            if (res.code == 200) {
                this.c1_arr = res.data
            }
        },

        async getc2() {
            const res: any = await api_get_c2url(this.c1_id)
            if (res.code == 200) {
                this.c2_arr = res.data
            }
        },
        async getc3() {
            // 由于更改c1_id会被监听c2_id的侦听器探测到,所以要在这里设置如果c2_id没有值的时候,不发送请求
            if (this.c2_id === '') {
                return
            } else {
                const res: any = await api_get_c3url(this.c2_id)
                if (res.code == 200) {
                    this.c3_arr = res.data
                }
            }
        },
    },
})
export default use_catagory_store
