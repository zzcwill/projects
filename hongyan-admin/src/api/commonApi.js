// 公用接口方法定义在这里
import request from '@/utils/request'
export function searchAll(type, data) {
  return request({
    url: '/api/1.0/common/search/' + type,
    method: 'post',
    data
  })
}

export function cascader(type, data) {
  return request({
    url: '/api/1.0/common/cascader/' + type,
    method: 'post',
    data
  })
}

export function uploadFile(url, params) {
  let data = {
    data: params,
    type: 'file'
  }
  return request({
    url: url,
    method: 'post',
    data
  })
}
