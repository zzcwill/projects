import request from '@/utils/request'

export function listConferenceApply(data) {
  return request({
    url: '/api/1.0/hysgl/conferenceapply/recordList',
    method: 'post',
    data
  })
}
export function exportExcel(data) {
  return request({
    url: '/api/1.0/hysgl/conference/export',
    method: 'post',
    responseType: 'blob',
    data
  })
}
