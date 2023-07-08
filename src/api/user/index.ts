//统一管理咱们项目用户相关的接口

import request from '@/utils/request'
import type {
  login_form_data,
  login_response_data,
  user_info_response_data,
} from './type'

// 项目用户相关的请求地址
enum API {
  LOGIN_URL = '/admin/acl/index/login',
  USER_INFO_URL = '/admin/acl/index/info',
  LOGOUT_URL = '/admin/acl/index/logout',
}

// 登录接口
export const api_req_login = (data: login_form_data) =>
  request.post<any, login_response_data>(API.LOGIN_URL, data)

// 获取用户信息接口
export const api_req_userInfo = () =>
  request.get<any, user_info_response_data>(API.USER_INFO_URL)
// 退出登录接口
export const api_req_logout = () => request.post<any, any>(API.LOGOUT_URL)
