import request from '@/utils/request'

export function listDeviceProduct(data) {
  return request({
    url: '/api/1.0/base/n311030deviceproduct/list',
    method: 'post',
    data
  })
}

export function infoDeviceProduct(data) {
  return request({
    url: '/api/1.0/base/n311030deviceproduct/info',
    method: 'post',
    data
  })
}

export function addDeviceProduct(data) {
  return request({
    url: '/api/1.0/base/n311030deviceproduct/append',
    method: 'post',
    data
  })
}

export function editDeviceProduct(data) {
  return request({
    url: '/api/1.0/base/n311030deviceproduct/modify',
    method: 'post',
    data
  })
}

export function delDeviceProduct(data) {
  return request({
    url: '/api/1.0/base/n311030deviceproduct/discard',
    method: 'post',
    data
  })
}
