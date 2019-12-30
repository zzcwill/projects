import request from '@/utils/request'

export function listDeviceModel(data) {
  return request({
    url: '/api/1.0/base/n311040devicemodel/list',
    method: 'post',
    data
  })
}

export function infoDeviceModel(data) {
  return request({
    url: '/api/1.0/base/n311040devicemodel/info',
    method: 'post',
    data
  })
}

export function addDeviceModel(data) {
  return request({
    url: '/api/1.0/base/n311040devicemodel/append',
    method: 'post',
    data
  })
}

export function editDeviceModel(data) {
  return request({
    url: '/api/1.0/base/n311040devicemodel/modify',
    method: 'post',
    data
  })
}

export function delDeviceModel(data) {
  return request({
    url: '/api/1.0/base/n311040devicemodel/discard',
    method: 'post',
    data
  })
}
