import request from '@/utils/request'

export function listDeviceType(data) {
  return request({
    url: '/api/1.0/base/n311010devicetype/list',
    method: 'post',
    data
  })
}

export function infoDeviceType(data) {
  return request({
    url: '/api/1.0/base/n311010devicetype/info',
    method: 'post',
    data
  })
}

export function addDeviceType(data) {
  return request({
    url: '/api/1.0/base/n311010devicetype/append',
    method: 'post',
    data
  })
}

export function editDeviceType(data) {
  return request({
    url: '/api/1.0/base/n311010devicetype/modify',
    method: 'post',
    data
  })
}

export function delDeviceType(data) {
  return request({
    url: '/api/1.0/base/n311010devicetype/discard',
    method: 'post',
    data
  })
}
