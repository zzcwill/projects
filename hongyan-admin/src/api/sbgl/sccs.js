import request from '@/utils/request'

export function listDeviceProducer(data) {
  return request({
    url: '/api/1.0/base/n311020deviceproducer/list',
    method: 'post',
    data
  })
}

export function infoDeviceProducer(data) {
  return request({
    url: '/api/1.0/base/n311020deviceproducer/info',
    method: 'post',
    data
  })
}

export function addDeviceProducer(data) {
  return request({
    url: '/api/1.0/base/n311020deviceproducer/append',
    method: 'post',
    data
  })
}

export function editDeviceProducer(data) {
  return request({
    url: '/api/1.0/base/n311020deviceproducer/modify',
    method: 'post',
    data
  })
}

export function delDeviceProducer(data) {
  return request({
    url: '/api/1.0/base/n311020deviceproducer/discard',
    method: 'post',
    data
  })
}
