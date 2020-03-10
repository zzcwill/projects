import request from '@/utils/request'


export function setInfo() {
  return request({
    url: '/api/1.0/base/s901010config/list',
    method: 'post'
  })
}

export function modifyItem(data) {
  return request({
    url: '/api/1.0/base/s901010config/modify',
    method: 'post',
    data
  })
}