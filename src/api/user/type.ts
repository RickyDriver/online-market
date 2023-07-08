export interface login_form_data {
  username: string
  password: string
}

// 定义全部接口返回数据都拥有的ts类型
export interface response_data {
  code: number
  message: string
  ok: boolean
}
// 定义登录接口返回的数据的类型
export interface login_response_data extends response_data {
  data: string
}

// 定义获取用户信息返回的数据的类型
export interface user_info_response_data extends response_data {
  data: {
    name: string
    routes: string[]
    bottons: string[]
    roles: string[]
    avatar: string
  }
}
