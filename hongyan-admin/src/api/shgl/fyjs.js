import request from '@/utils/request'

export function listOrderTotal(data) {
  return request({
    url: '/api/1.0/base/s221110ordertotal/list',
    method: 'post',
    data
  })
}

export function infoOrderTotal(data) {
  return request({
    url: '/api/1.0/base/s221110ordertotal/info',
    method: 'post',
    data
  })
}

export function addOrderTotal(data) {
  return request({
    url: '/api/1.0/base/s221110ordertotal/append',
    method: 'post',
    data
  })
}

export function editOrderTotal(data) {
  return request({
    url: '/api/1.0/base/s221110ordertotal/modify',
    method: 'post',
    data
  })
}

export function delOrderTotal(data) {
  return request({
    url: '/api/1.0/base/s221110ordertotal/discard',
    method: 'post',
    data
  })
}
