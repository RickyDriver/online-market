// 封装本地存储数据与读取数据的方法
const SET_TOKEN = (token: string) => {
    // 本地存储持久token
    localStorage.setItem('TOKEN', token)
}
const GET_TOKEN = () => {
    return localStorage.getItem('TOKEN')
}

export { SET_TOKEN, GET_TOKEN }
