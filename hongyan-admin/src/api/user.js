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

export function login(data) {
  return request({
    url: '/api/1.0/manager/login',
    method: 'post',
    data
  })
}

export function getInfo() {
  return request({
    url: '/api/1.0/manager/home/info',
    method: 'post'
  })
}

export function logout() {
  return request({
    url: '/api/1.0/manager/logout',
    method: 'post'
  })
}
