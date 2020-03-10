import request from '@/utils/request'

export function listDeviceFault(data) {
  return request({
    url: '/api/1.0/base/p312020devicefault/list',
    method: 'post',
    data
  })
}

export function infoDeviceFault(data) {
  return request({
    url: '/api/1.0/base/p312020devicefault/info',
    method: 'post',
    data
  })
}

export function addDeviceFault(data) {
  return request({
    url: '/api/1.0/base/p312020devicefault/append',
    method: 'post',
    data
  })
}

export function editDeviceFault(data) {
  return request({
    url: '/api/1.0/base/p312020devicefault/modify',
    method: 'post',
    data
  })
}

export function delDeviceFault(data) {
  return request({
    url: '/api/1.0/base/p312020devicefault/discard',
    method: 'post',
    data
  })
}

export function deviceFault(data) {
  return request({
    url: '/api/1.0/sbgl/device/modify',
    method: 'post',
    data
  })
}
