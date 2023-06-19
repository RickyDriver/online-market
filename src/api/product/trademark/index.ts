import request from '@/utils/request'
import type { trademark_response_data, trademark } from './type'
enum API {
    //获取已有品牌接口
    TRADEMARK_URL = '/admin/product/baseTrademark/',
    //添加品牌
    ADDTRADEMARK_URL = '/admin/product/baseTrademark/save',
    //修改已有品牌
    UPDATETRADEMARK_URL = '/admin/product/baseTrademark/update',
    //删除已有品牌
    DELETE_URL = '/admin/product/baseTrademark/remove/',
}
export const api_has_trademark = (page: number, limit: number) =>
    request.get<any, trademark_response_data>(
        API.TRADEMARK_URL + `${page}/${limit}`,
    )

export const api_update_add_trademark = (banner: trademark) => {
    if (banner.id) {
        return request.put<any, any>(API.UPDATETRADEMARK_URL, banner)
    } else {
        return request.post<any, any>(API.ADDTRADEMARK_URL, banner)
    }
}

export const api_delete_trademark = (id: number) => {
    return request.delete<any, any>(API.DELETE_URL + `${id}`)
}
