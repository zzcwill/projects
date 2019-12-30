import request from '@/utils/request'

export function listDeviceParameter(data) {
  return request({
    url: '/api/1.0/base/n311030deviceparameter/list',
    method: 'post',
    data
  })
}

export function infoDeviceParameter(data) {
  return request({
    url: '/api/1.0/base/n311030deviceparameter/info',
    method: 'post',
    data
  })
}

export function addDeviceParameter(data) {
  return request({
    url: '/api/1.0/base/n311030deviceparameter/append',
    method: 'post',
    data
  })
}

export function editDeviceParameter(data) {
  return request({
    url: '/api/1.0/base/n311030deviceparameter/modify',
    method: 'post',
    data
  })
}

export function delDeviceParameter(data) {
  return request({
    url: '/api/1.0/base/n311030deviceparameter/discard',
    method: 'post',
    data
  })
}
