import request from '@/utils/request'

export function listOrder(data) {
  return request({
    url: '/api/1.0/base/u222010order/list',
    method: 'post',
    data
  })
}

export function infoOrder(data) {
  return request({
    url: '/api/1.0/base/u222010order/info',
    method: 'post',
    data
  })
}

export function addOrder(data) {
  return request({
    url: '/api/1.0/base/u222010order/append',
    method: 'post',
    data
  })
}

export function editOrder(data) {
  return request({
    url: '/api/1.0/base/u222010order/modify',
    method: 'post',
    data
  })
}

export function delOrder(data) {
  return request({
    url: '/api/1.0/base/u222010order/discard',
    method: 'post',
    data
  })
}
