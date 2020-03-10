import request from '@/utils/request'

export function listReturnVisit(data) {
  return request({
    url: '/api/1.0/base/r3a1040returnvisit/list',
    method: 'post',
    data
  })
}

export function infoReturnVisit(data) {
  return request({
    url: '/api/1.0/base/r3a1040returnvisit/info',
    method: 'post',
    data
  })
}

export function addReturnVisit(data) {
  return request({
    url: '/api/1.0/base/r3a1040returnvisit/append',
    method: 'post',
    data
  })
}

export function editReturnVisit(data) {
  return request({
    url: '/api/1.0/base/r3a1040returnvisit/modify',
    method: 'post',
    data
  })
}

export function delReturnVisit(data) {
  return request({
    url: '/api/1.0/base/r3a1040returnvisit/discard',
    method: 'post',
    data
  })
}
