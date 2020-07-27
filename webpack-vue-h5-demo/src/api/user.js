import http from '@/utils/http'

// post-demo
// export function login(data) {
//   return request({
//     url: '/login',
//     method: 'post',
//     data
//   })
// }
// get-demo
// export function getInfo(token) {
//   return request({
//     url: '/info',
//     method: 'get',
//     params: { token }
//   })
// }
// baseURL-demo
// export function login(data) {
//   return request({
//     url: '/api/1.0/manager/login',
//     method: 'post',
//     data,
//     baseURL: '/mock'
//   })
// }
// 
// upload-文件流-demo
// export function uploadNew(data) {
//   return request({
//     url: '/upload/new',
// 		 method: 'post',
//     data,
//     headers: {
//       'Content-Type': 'multipart/form-data'
//     },
//     transformRequest: [function(data) {
//       return data  
//     }]		
//   })
// }

export function topicsApi (data) {
  return http({
    url: '/topics',
    method: 'get',
    params: data,
  })
}