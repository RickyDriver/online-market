import request from '@/utils/request'
import type { spu_res_data, get_spu_info_res, get_spu_trmark_res } from './type'

enum API {
    GET_HAS_SPU_LIST = '/admin/product',
    // 根据c3_id获取当前id下品牌的列表
    FIND_SPU_TRMARK_LIST = '/admin/product/baseCategoryTrademark/findCurrentTrademarkList',
    // 根据spuid(id)获取对应的spu的属性
    GET_SPU_INFO = '/admin/product/getSpuInfo',
    //获取整个项目全部的销售属性[颜色、版本、尺码]
    ALLSALEATTR_URL = '/admin/product/baseSaleAttrList',
    //获取全部品牌的数据
    ALLTRADEMARK_URL = '/admin/product/baseTrademark/getTrademarkList',
    // 修改spu属性
    UPDATE_SPU_ATTR = '/admin/product/updateSpuInfo',
    // 新增spu属性
    ADD_SPU_ATTR = '/admin/product/saveSpuInfo',
    // 删除spu属性
    DELETE_SPU = '/admin/product/deleteSpu',
}

// 获取已有的spu数据
export const api_get_has_spu_list = (
    page: number,
    limit: number,
    c3_id: number | string,
) => {
    return request.get<any, spu_res_data>(
        API.GET_HAS_SPU_LIST + `/${page}/${limit}?category3Id=${c3_id}`,
    )
}

// 请求1:根据spuid(id)获取对应的spu的属性,这个操作可以拿到spu的名字,图标,描述,销售属性
export const api_get_spu_info = (spuid: number) => {
    return request.get<any, get_spu_info_res>(API.GET_SPU_INFO + `/${spuid}`)
}
// 请求2:根据c3_id获取当前id下可选的品牌的列表,这个操作可以拿到当前c3_id下的所有可选的品牌
export const api_find_spu_has_trmark = (c3_id: number) => {
    return request.get<any, get_spu_trmark_res>(
        API.FIND_SPU_TRMARK_LIST + `/${c3_id}`,
    )
}
// 请求3:获取所有的品牌
export const api_get_trademark = () => {
    return request.get<any, any>(API.ALLTRADEMARK_URL)
}
// 请求4:获取所有的销售属性
export const api_get_sale_attr = () => {
    return request.get<any, any>(API.ALLSALEATTR_URL)
}

// 修改请求1:修改已有的spu品牌数据
// 如果请求头有id则启用修改接口,反之启用新增接口
export const api_update_spu_attr = (parmas) => {
    if (parmas.id) {
        return request.post<any, any>(API.UPDATE_SPU_ATTR, parmas)
    } else {
        return request.post<any, any>(API.ADD_SPU_ATTR, parmas)
    }
}

// 修改请求2:根据spuid(id)删除对应的spu
export const api_delete_spu = (spuid: number) => {
    return request.delete<any, any>(API.DELETE_SPU + `/${spuid}`)
}
