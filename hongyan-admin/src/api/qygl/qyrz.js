import request from '@/utils/request'

export function listCmpentry(data) {
  return request({
    url: '/api/1.0/base/w301110cmpentry/list',
    method: 'post',
    data
  })
}

export function infoCmpentry(data) {
  return request({
    url: '/api/1.0/base/w301110cmpentry/info',
    method: 'post',
    data
  })
}

export function addCmpentry(data) {
  return request({
    url: '/api/1.0/qygl/company/append',
    method: 'post',
    data
  })
}

export function editCmpentry(data) {
  return request({
    url: '/api/1.0/base/w301110cmpentry/modify',
    method: 'post',
    data
  })
}

export function delCmpentry(data) {
  return request({
    url: '/api/1.0/base/w301110cmpentry/discard',
    method: 'post',
    data
  })
}
