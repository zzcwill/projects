import request from '@/utils/request'

export function getCnode(data) {
  return request({
    url: '/topics',
    method: 'get',
    params: data,
    baseURL: '/cnode'
  })
}