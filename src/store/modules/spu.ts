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
import type { spu_state } from './type/type'

const use_spu_store = defineStore('spu_store', {
  state() {
    return <spu_state>{
      // 拿去可选择的品牌列表
      spu_trmark_arr: [],
      spu_sale_attr_arr: [],
      all_sale_attr: [],
      all_trade_mark: [],
      spu_img_list: [],
      spu_parmas: {},
      upload_filelist: [],
    }
  },
  actions: {
    // 获取当前spu可选择的品牌
    async find_spu_has_trmark(c3_id: number) {
      const res = await api_find_spu_has_trmark(c3_id)
      this.spu_trmark_arr = res.data
    },
    // 获取当前spu的销售属性
    async get_spu_info(spuId: number) {
      const res = await api_get_spu_info(spuId)
      this.spu_sale_attr_arr = res.data.spuSaleAttrList!
      this.spu_img_list = res.data.spuImageList!
      this.upload_filelist = this.spu_img_list!.map((item) => {
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
