// 10000   调用成功
// 20000   调用失败
// 30000   未登录
// 30001   token失效
// 40000   接口不存在
const resCodeArr = [
  [10000],
  [20000],
  [30000,30001],
  [40000]
]


let resOk = (data = {}, code = resCodeArr[0][0], msg = '调用成功') => {
  return {
    code,
    data,
    msg
  }
}

let resFail = (msg = '调用失败', code = resCodeArr[1][0], data = {}) => {
  return {
    code,
    data,
    msg
  }
}


module.exports = {
  resCodeArr,
  resOk,
  resFail
}
