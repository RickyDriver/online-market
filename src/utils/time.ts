// 判断时间生成问候语
export const get_time = () => {
  const hours = new Date().getHours()
  if (hours <= 12) {
    return '早上好'
  } else if (hours > 12 && hours <= 19) {
    return '下午好'
  } else {
    return '晚上好'
  }
}
