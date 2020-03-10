import request from '@/utils/request'

export function numConference(data) {
  return request({
    url: '/api/1.0/hysgl/conference/statisticsNum',
    method: 'post',
    data
  })
}

export function numConferencePie(data) {
  return request({
    url: '/api/1.0/hysgl/conference/ratioConferenceType',
    method: 'post',
    data
  })
}

export function listConferenceMonth(data) {
  return request({
    url: '/api/1.0/hysgl/conference/listByDate',
    method: 'post',
    data
  })
}

export function listConference(data) {
  return request({
    url: '/api/1.0/hysgl/conference/listByConference',
    method: 'post',
    data
  })
}
