import request from '@/utils/request'

export function listMerchant(data) {
  return request({
    url: '/api/1.0/base/s221010merchant/list',
    method: 'post',
    data
  })
}

export function infoMerchant(data) {
  return request({
    url: '/api/1.0/base/s221010merchant/info',
    method: 'post',
    data
  })
}

export function addMerchant(data) {
  return request({
    url: '/api/1.0/base/s221010merchant/append',
    method: 'post',
    data
  })
}

export function editMerchant(data) {
  return request({
    url: '/api/1.0/base/s221010merchant/modify',
    method: 'post',
    data
  })
}

export function delMerchant(data) {
  return request({
    url: '/api/1.0/base/s221010merchant/discard',
    method: 'post',
    data
  })
}
