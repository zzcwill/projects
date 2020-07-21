// 公用接口方法定义在这里
import request from '@/utils/request'

// post-demo
// export function login(data) {
//   return request({
//     url: '/api/1.0/manager/login',
//     method: 'post',
//     data
//   })
// }
// get-demo
// export function getInfo(token) {
//   return request({
//     url: '/api/1.0/manager/home/info',
//     method: 'get',
//     params: { token }
//   })
// }
// 图片上传
// export function getImage(data) {
//   return request({
//     url: '图片上传接口方法',
//     method: 'post',
//     transformRequest: [function(data) {
//       return data
//     }],
//     headers: {
//       "Content-type": "multipart/form-data"
//     },        
//     data
//   })
// }

//登录
export function login(data) {
  return request({
    url: '/login',
    method: 'post',
    data   
  })
}
//退出
export function logout() {
  return request({
    url: '/logout',
    method: 'post'
  })
}
//获取用户信息
export function getInfo() {
  return request({
    url: '/user/session/get',
    method: 'post'
  })
}
//获取路由
export function getRoutes() {
  return request({
    url: '/za/menu/list',
    method: 'post',
    data: {
      st: 'CLS_WEB_BEFORE'
    }
  })
}