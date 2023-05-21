//统一管理咱们项目用户相关的接口

import request from '../../../utils/request'

import type {
    login_form,
    login_responce_data,
    user_response_data,
} from './type'

//项目用户相关的请求地址

enum API {
    // 这里测试要写假接口的url地址，不然绝对报404
    LOGIN_URL = '/admin/acl/index/login',

    USERINFO_URL = '/admin/acl/index/info',

    LOGOUT_URL = '/admin/acl/index/logout',
}
//登录接口
export const req_login = (data: login_form) =>
    request.post<any, login_responce_data>(API.LOGIN_URL, data)
//获取用户信息

export const req_userInfo = () =>
    request.get<any, user_response_data>(API.USERINFO_URL)

//退出登录

export const req_logout = () => request.post<any, any>(API.LOGOUT_URL)
