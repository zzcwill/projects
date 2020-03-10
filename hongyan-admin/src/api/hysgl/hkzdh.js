import request from '@/utils/request'

export function list(data) {
  return request({
    url: '/api/1.0/hysgl/conference/controlList',
    method: 'post',
    data
  })
}
