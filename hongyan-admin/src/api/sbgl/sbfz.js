import request from '@/utils/request'

export function listDeviceGroup(data) {
  return request({
    url: '/api/1.0/base/p312010devicegroup/list',
    method: 'post',
    data
  })
}

export function infoDeviceGroup(data) {
  return request({
    url: '/api/1.0/base/p312010devicegroup/info',
    method: 'post',
    data
  })
}

export function addDeviceGroup(data) {
  return request({
    url: '/api/1.0/base/p312010devicegroup/append',
    method: 'post',
    data
  })
}

export function editDeviceGroup(data) {
  return request({
    url: '/api/1.0/base/p312010devicegroup/modify',
    method: 'post',
    data
  })
}

export function delDeviceGroup(data) {
  return request({
    url: '/api/1.0/base/p312010devicegroup/discard',
    method: 'post',
    data
  })
}
