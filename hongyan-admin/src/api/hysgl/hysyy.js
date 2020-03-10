import request from '@/utils/request'

export function addconferenceapply(data) {
  return request({
    url: 'api/1.0/hysgl/conferenceapply/order',
    method: 'post',
    data
  })
}

export function infoConferenceApply(data) {
  return request({
    url: '/api/1.0/base/m322020conferenceapply/info',
    method: 'post',
    data
  })
}

export function listConferenceApply(data) {
  return request({
    url: '/api/1.0/base/m322020conferenceapply/list',
    method: 'post',
    data
  })
}
// 会议室预约审核
export function checkConferenceApply(data) {
  return request({
    url: 'api/1.0/hysgl/conferenceapply/check',
    method: 'post',
    data
  })
}

export function changeConferenceApply(data) {
  return request({
    url: 'api/1.0/hysgl/conferenceapply/change',
    method: 'post',
    data
  })
}

// 会议室签到信息
export function querySignMessage(data) {
  return request({
    url: '/api/1.0/hysgl/conferenceapply/getSignMessage',
    method: 'post',
    data
  })
}
