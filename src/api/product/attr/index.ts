// 书写属性相关扥而api文件
import request from '@/utils/request'

enum API {
    // 一到三级路由的接口url
    C1_URL = '/admin/product/getCategory1',
    C2_URL = '/admin/product/getCategory2',
    C3_URL = '/admin/product/getCategory3',
}
// 获取一二三级分类的接口方法
export const api_get_c1url = () => {
    return request.get<any, any>(API.C1_URL)
}
export const api_get_c2url = (c1_id) => {
    return request.get<any, any>(API.C2_URL + `/${c1_id}`)
}
export const api_get_c3url = (c2_id) => {
    return request.get<any, any>(API.C3_URL + `/${c2_id}`)
}
