// 小仓库:用于存储spu数据展示页面获取的spu属性值
import { defineStore } from 'pinia'
// 引入api接口
import { api_find_spu_has_trmark, api_get_spu_info } from '@/api/product/spu'
// 引入ts数据类型
import type {
    spu_trmark_res_data,
    spuSaleAttrList,
    spuImageList,
} from '@/api/product/spu/type'

const use_spu_store = defineStore('spu_store', {
    state() {
        return {
            // 拿去可选择的品牌列表
            spu_trmark_arr: [] as spu_trmark_res_data,
            spu_sale_attr_arr: [] as spuSaleAttrList,
            spu_img_list: [] as spuImageList,
            spu_parmas: {},
        }
    },
    actions: {
        async find_spu_has_trmark(c3_id: number) {
            const res = await api_find_spu_has_trmark(c3_id)
            this.spu_trmark_arr = res.data
        },
        async get_spu_info(spuId: number) {
            const res = await api_get_spu_info(spuId)
            this.spu_sale_attr_arr = res.data.spuSaleAttrList
            this.spu_img_list = res.data.spuImageList
        },
    },
})
export default use_spu_store
