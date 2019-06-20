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

export function wechatLoginApi (data) {
  return http({
    url: 'wechat/login',
    method: 'get',
    params: data,
  })
}

export function wechatBindApi (data) {
  return http({
    url: 'wechat/bind',
    method: 'get',
    params: data,   
  })
}

export function smsSendMsgApi (data) {
  return http({
    url: 'sms/sendMsg',
    method: 'post',
    data: data,
  })
}