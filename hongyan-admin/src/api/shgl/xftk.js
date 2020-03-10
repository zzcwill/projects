import request from '@/utils/request'

export function listOrderTransport(data) {
  return request({
    url: '/api/1.0/base/u122120ordertransport/list',
    method: 'post',
    data
  })
}

export function infoOrderTransport(data) {
  return request({
    url: '/api/1.0/base/u122120ordertransport/info',
    method: 'post',
    data
  })
}

export function addOrderTransport(data) {
  return request({
    url: '/api/1.0/base/u122120ordertransport/append',
    method: 'post',
    data
  })
}

export function editOrderTransport(data) {
  return request({
    url: '/api/1.0/base/u122120ordertransport/modify',
    method: 'post',
    data
  })
}

export function delOrderTransport(data) {
  return request({
    url: '/api/1.0/base/u122120ordertransport/discard',
    method: 'post',
    data
  })
}
