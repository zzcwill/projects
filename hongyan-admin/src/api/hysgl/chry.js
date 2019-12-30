import request from '@/utils/request'

export function  addConferenceUser(data) {
  return request({
    url: 'api/1.0/base/m322030conferenceattendees/append',
    method: 'post',
    data
  })
}

export function  infoConferenceUser(data) {
  return request({
    url: '/api/1.0/base/m322030conferenceattendees/info',
    method: 'post',
    data
  })
}

export function  listConferenceUser(data) {
  return request({
    url: '/api/1.0/base/m322030conferenceattendees/list',
    method: 'post',
    data
  })
}
export function  editConferenceUser(data) {
  return request({
    url: '/api/1.0/base/m322030conferenceattendees/modify',
    method: 'post',
    data
  })
}
export function  delConferenceUser(data) {
  return request({
    url: '/api/1.0/base/m322030conferenceattendees/discard',
    method: 'post',
    data
  })
}
