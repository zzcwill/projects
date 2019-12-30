import request from '@/utils/request'

export function partnerList(data) {
  return request({
    url: '/api/1.0/base/c201010partner/list',
    method: 'post',
    data
  })
}

export function partnerInfo(data) {
  return request({
    url: '/api/1.0/base/c201010partner/info',
    method: 'post',
    data
  })
}

export function addPartner(data) {
  return request({
    url: '/api/1.0/base/c201010partner/append',
    method: 'post',
    data
  })
}

export function editPartner(data) {
  return request({
    url: '/api/1.0/base/c201010partner/modify',
    method: 'post',
    data
  })
}

export function delPartner(data) {
  return request({
    url: '/api/1.0/base/c201010partner/discard',
    method: 'post',
    data
  })
}
