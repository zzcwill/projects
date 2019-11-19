import http from '@/utils/http'
//import Qs from 'qs'

// export function loginApi (data) {
//   return http({
//     url: 'login',
//     method: 'post',
//     data: data,
//     headers: {
//       'Content-Type': 'application/x-www-form-urlencoded'     
//     },
//     transformRequest: [function (data) {
//       data = Qs.stringify(data)
//       return data
//     }],
//     baseURL: '/mock/',
//   })
// }

export function topicsApi (data) {
  return http({
    url: 'topics',
    method: 'get',
    params: data,
  })
}