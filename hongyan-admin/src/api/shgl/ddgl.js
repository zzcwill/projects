import request from '@/utils/request'

export function listOrder(data) {
  return request({
    url: '/api/1.0/base/u122010order/list',
    method: 'post',
    data
  })
}

export function infoOrder(data) {
  return request({
    url: '/api/1.0/base/u122010order/info',
    method: 'post',
    data
  })
}

export function addOrder(data) {
  return request({
    url: '/api/1.0/base/u122010order/append',
    method: 'post',
    data
  })
}

export function editOrder(data) {
  return request({
    url: '/api/1.0/base/u122010order/modify',
    method: 'post',
    data
  })
}

export function delOrder(data) {
  return request({
    url: '/api/1.0/base/u122010order/discard',
    method: 'post',
    data
  })
}

export function fullRefund(data) {
  return request({
    url: '/api/1.0/ddgl/order/fullRefund',
    method: 'post',
    data
  })
}

export function rebates(data) {
  return request({
    url: '/api/1.0/ddgl/order/rebates',
    method: 'post',
    data
  })
}
