import http from '@/utils/http'
//import Qs from 'qs'

// export function loginApi (data) {
//   return http({
//     url: '/login',
//     method: 'post',
//     data: data,
//     baseURL: '/mock/',
//   })
// }

export function topicsApi (data) {
  return http({
    url: '/topics',
    method: 'get',
    params: data,
  })
}