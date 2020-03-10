import request from '@/utils/request'

export function listDsAmbient(data) {
  return request({
    url: '/api/1.0/base/w31a011dsambient/list',
    method: 'post',
    data
  })
}

export function infoDsAmbient(data) {
  return request({
    url: '/api/1.0/base/w31a011dsambient/info',
    method: 'post',
    data
  })
}

export function addDsAmbient(data) {
  return request({
    url: '/api/1.0/base/w31a011dsambient/append',
    method: 'post',
    data
  })
}

export function editDsAmbient(data) {
  return request({
    url: '/api/1.0/base/w31a011dsambient/modify',
    method: 'post',
    data
  })
}

export function delDsAmbient(data) {
  return request({
    url: '/api/1.0/base/w31a011dsambient/discard',
    method: 'post',
    data
  })
}
