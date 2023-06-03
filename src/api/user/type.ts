// 登录接口需要携带参数ts类型
// interface即ts在vue中的接口
export interface login_form {
    username: String
    password: String
}
// 登录接口返回数据类型
interface data_type {
    token?: String
    message?:string
}

export interface login_responce_data {
    code: number
    data: data_type
}

// 定义服务器返回用户信息相关的数据类型
interface user_info {
    userId: number
    avatar: String
    username: String
    password: String
    desc: String
    roles: String[]
    buttons: String[]
    routes: String[]
    token: String
}
interface user {
    checkUser: user_info
}
export interface user_response_data {
    code: number
    data: user
}
