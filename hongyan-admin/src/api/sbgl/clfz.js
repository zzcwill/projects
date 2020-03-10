import request from '@/utils/request'

export function listDsGroup(data) {
  return request({
    url: '/api/1.0/base/w31a010dsgroup/list',
    method: 'post',
    data
  })
}

export function infoDsGroup(data) {
  return request({
    url: '/api/1.0/base/w31a010dsgroup/info',
    method: 'post',
    data
  })
}

export function addDsGroup(data) {
  return request({
    url: '/api/1.0/base/w31a010dsgroup/append',
    method: 'post',
    data
  })
}

export function editDsGroup(data) {
  return request({
    url: '/api/1.0/base/w31a010dsgroup/modify',
    method: 'post',
    data
  })
}

export function delDsGroup(data) {
  return request({
    url: '/api/1.0/base/w31a010dsgroup/discard',
    method: 'post',
    data
  })
}
