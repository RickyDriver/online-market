// 书写属性相关扥而api文件
import request from '@/utils/request'
import type { catagory_res_data, attr_res, attr_data } from './type'

enum API {
    // 一到三级路由的接口url
    C1_URL = '/admin/product/getCategory1',
    C2_URL = '/admin/product/getCategory2',
    C3_URL = '/admin/product/getCategory3',

    // 根据各级路由的id获取分类下已有的对应的商品数据
    ATTR_LIST = '/admin/product/attrInfoList',
    // 添加或者修改已有属性的接口
    ADD_OR_UPDATE_ATTR_URL = '/admin/product/saveAttrInfo',
    // 删除已有属性
    DELETE_ATTR = '/admin/product/deleteAttr',
}
// 获取一二三级分类的接口方法
export const api_get_c1url = () => {
    return request.get<any, catagory_res_data>(API.C1_URL)
}
export const api_get_c2url = (c1_id: string | number) => {
    return request.get<any, catagory_res_data>(API.C2_URL + `/${c1_id}`)
}
export const api_get_c3url = (c2_id: string | number) => {
    return request.get<any, catagory_res_data>(API.C3_URL + `/${c2_id}`)
}

// 获取商品数据的接口
export const api_get_attr_list = (
    c1_id: string | number,
    c2_id: string | number,
    c3_id: string | number,
) => {
    return request.get<any, attr_res>(
        API.ATTR_LIST + `/${c1_id}` + `/${c2_id}` + `/${c3_id}`,
    )
}
// 新增或者修改三级分类下的属性
export const api_add_or_update_attr = (header: attr_data) => {
    return request.post<any, any>(API.ADD_OR_UPDATE_ATTR_URL, header)
}
// 删除三级分类下的属性
export const api_delete_attr = (data: number) => {
    return request.delete<any, any>(API.DELETE_ATTR + `/${data}`)
}
