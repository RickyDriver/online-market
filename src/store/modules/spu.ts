// 小仓库:用于存储spu数据展示页面获取的spu属性值
import { defineStore } from 'pinia'
// 引入api接口
import {
    api_find_spu_has_trmark,
    api_get_spu_info,
    api_get_trademark,
    api_get_sale_attr,
} from '@/api/product/spu'
// 引入ts数据类型
import type {
    spu_trmark_res_data,
    spuSaleAttrList,
    spuImageList,
} from '@/api/product/spu/type'
const use_spu_store = defineStore('spu_store', {
    state() {
        return <any>{
            // 拿去可选择的品牌列表
            spu_trmark_arr: [] as spu_trmark_res_data,
            spu_sale_attr_arr: [] as spuSaleAttrList,
            all_sale_attr: [] as any, //TODO 修改any类型
            all_trade_mark: [] as any,
            spu_img_list: [] as spuImageList,
            spu_parmas: {},
            upload_filelist: [],
        }
    },
    actions: {
        // 获取当前spu可选择的品牌//TODO 这个地方与下面的获取所有品牌的值有矛盾,具体看后续视频讲解
        async find_spu_has_trmark(c3_id: number) {
            const res = await api_find_spu_has_trmark(c3_id)
            this.spu_trmark_arr = res.data
        },
        // 获取当前spu的销售属性
        async get_spu_info(spuId: number) {
            const res = await api_get_spu_info(spuId)
            this.spu_sale_attr_arr = res.data.spuSaleAttrList
            this.spu_img_list = res.data.spuImageList
            this.upload_filelist = this.spu_img_list.map((item) => {
                return {
                    name: item.imgName,
                    url: item.imgUrl,
                }
            })
        },
        // 获取所有的销售属性
        async get_sale_attr() {
            const res = await api_get_sale_attr()
            this.all_sale_attr = res.data
        },
        // 获取所有的商标
        async get_trmark() {
            const res = await api_get_trademark()
            this.all_trade_mark = res.data
        },
    },
})
export default use_spu_store
