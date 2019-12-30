import request from '@/utils/request'

export function  getConferenceList(data) {
  return request({
    url: 'api/1.0/base/m322010conference/list',
    method: 'post',
    data
  })
}

export function  editConference(data) {
  return request({
    url: 'api/1.0/base/m322010conference/modify ',
    method: 'post',
    data
  })
}

export function  addConference(data) {
  return request({
    url: 'api/1.0/base/m322010conference/append ',
    method: 'post',
    data
  })
}

export function  infoConference(data) {
  return request({
    url: 'api/1.0/base/m322010conference/info ',
    method: 'post',
    data
  })
}

export function   delConference (data) {
  return request({
    url: 'api/1.0/base/m322010conference/discard ',
    method: 'post',
    data
  })
}
