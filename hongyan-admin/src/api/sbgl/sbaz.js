import request from '@/utils/request'

export function listDeviceAreaInstall(data) {
  return request({
    url: '/api/1.0/base/p312011deviceareainstall/list',
    method: 'post',
    data
  })
}

export function infoDeviceAreaInstall(data) {
  return request({
    url: '/api/1.0/base/p312011deviceareainstall/info',
    method: 'post',
    data
  })
}

export function addDeviceAreaInstall(data) {
  return request({
    url: '/api/1.0/base/p312011deviceareainstall/append',
    method: 'post',
    data
  })
}

export function editDeviceAreaInstall(data) {
  return request({
    url: '/api/1.0/base/p312011deviceareainstall/modify',
    method: 'post',
    data
  })
}

export function delDeviceAreaInstall(data) {
  return request({
    url: '/api/1.0/base/p312011deviceareainstall/discard',
    method: 'post',
    data
  })
}
