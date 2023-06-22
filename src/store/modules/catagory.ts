// 小仓库:用于存储已选中的一级分类\二级分类\三级分类
import { defineStore } from 'pinia'
import {
    api_get_attr_list,
    api_get_c1url,
    api_get_c2url,
    api_get_c3url,
} from '@/api/product/attr'
// 引入ts数据类型
import type { catagory_res_data } from '@/api/product/attr/type'
import type { catagory_state } from './type/type'
import { ElNotification } from 'element-plus'

const use_catagory_store = defineStore('catagory_store', {
    state: (): catagory_state => {
        return {
            // c=catagory c1代表一级分类
            // 存储各菜单的数据
            c1_arr: [],
            c2_arr: [],
            c3_arr: [],
            c1_id: '',
            c2_id: '',
            c3_id: '',
            // 存储子菜单下的分类数据
            attr_list: [],
        }
    },
    actions: {
        async getc1() {
            const res: catagory_res_data = await api_get_c1url()
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

        // 获取对应c3列表下的数据
        async get_attr_list() {
            if (this.c3_id === '') {
                return
            } else {
                try {
                    const res: any = await api_get_attr_list(
                        this.c1_id,
                        this.c2_id,
                        this.c3_id,
                    )
                    if (res.code == 200) {
                        this.attr_list = res.data
                        console.log(this.attr_list)
                    }
                } catch (error) {
                    ElNotification({
                        type: 'error',
                        message: '该分类暂时没有属性值',
                    })
                }
            }
        },
    },
})
export default use_catagory_store
