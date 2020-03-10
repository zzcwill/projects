import request from '@/utils/request'

export function listDepot(data) {
  return request({
    url: '/api/1.0/base/p3230a0depot/list',
    method: 'post',
    data
  })
}

export function infoDepot(data) {
  return request({
    url: '/api/1.0/base/p3230a0depot/info',
    method: 'post',
    data
  })
}

export function addDepot(data) {
  return request({
    url: '/api/1.0/base/p3230a0depot/append',
    method: 'post',
    data
  })
}

export function editDepot(data) {
  return request({
    url: '/api/1.0/base/p3230a0depot/modify',
    method: 'post',
    data
  })
}

export function delDepot(data) {
  return request({
    url: '/api/1.0/base/p3230a0depot/discard',
    method: 'post',
    data
  })
}
