import request from '@/utils/request'

export function apiYJJL(data, type = 'list') {
  return request({
    url: `/api/1.0/base/k321091inspect/${type}`,
    method: 'post',
    data
  })
}

export function apiYJJLLIST(data) {
  return request({
    url: '/api/1.0/wygl/inspect/list',
    method: 'post',
    data
  })
}