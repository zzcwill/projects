import request from '@/utils/request'

export function organizationList(data) {
  return request({
    url: '/api/1.0/base/c201020organization/list',
    method: 'post',
    data
  })
}

export function organizationInfo(data) {
  return request({
    url: '/api/1.0/base/c201020organization/info',
    method: 'post',
    data
  })
}

export function addOrganization(data) {
  return request({
    url: '/api/1.0/base/c201020organization/append',
    method: 'post',
    data
  })
}

export function editOrganization(data) {
  return request({
    url: '/api/1.0/base/c201020organization/modify',
    method: 'post',
    data
  })
}

export function delOrganization(data) {
  return request({
    url: '/api/1.0/base/c201020organization/discard',
    method: 'post',
    data
  })
}
