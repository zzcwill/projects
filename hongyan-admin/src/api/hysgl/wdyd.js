import request from '@/utils/request'

//我的预约列表查询
export function getOrderList(data) {
  return request({
    url: 'api/1.0/hysgl/conferenceapply/orderList',
    method: 'post',
    data
  })
}

//我的会议列表查询
export function getMyConferenceList(data) {
  return request({
    url: 'api/1.0/hysgl/conferenceapply/myConferenceList',
    method: 'post',
    data
  })
}
