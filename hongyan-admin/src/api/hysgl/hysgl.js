import request from '@/utils/request'
// 会议室信息修改
export function updateConferenceList(data) {
  return request({
    url: 'api/1.0/hysgl/conference/update',
    method: 'post',
    data
  })
}

// 会议室设备列表查询
export function conferenceDeviceList(data) {
  return request({
    url: 'api/1.0/hysgl/conference/deviceList',
    method: 'post',
    data
  })
}

// 会议室审核
export function checkConferenceInfo(data) {
  return request({
    url: 'api/1.0/hysgl/conference/check',
    method: 'post',
    data
  })
}

export function getConferenceList(data) {
  return request({
    url: 'api/1.0/base/m322010conference/list',
    method: 'post',
    data
  })
}

export function listConferenceApply(data) {
  return request({
    url: '/api/1.0/hysgl/conferenceapply/list',
    method: 'post',
    data
  })
}

export function editConference(data) {
  return request({
    url: 'api/1.0/base/m322010conference/modify ',
    method: 'post',
    data
  })
}

export function addConference(data) {
  return request({
    url: 'api/1.0/base/m322010conference/append ',
    method: 'post',
    data
  })
}

export function infoConference(data) {
  return request({
    url: 'api/1.0/base/m322010conference/info ',
    method: 'post',
    data
  })
}

export function delConference(data) {
  return request({
    url: 'api/1.0/base/m322010conference/discard ',
    method: 'post',
    data
  })
}
