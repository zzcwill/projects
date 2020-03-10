import request from '@/utils/request'

//会议室模板列表分页查询
export function getConferenceModelList(data) {
  return request({
    url: 'api/1.0/base/m322022conferencemodel/list',
    method: 'post',
    data
  })
}

//会议室预约模板删除
export function delConferenceModel(data) {
  return request({
    url: 'api/1.0/base/m322022conferencemodel/discard',
    method: 'post',
    data
  })
}
//会议室预约模板新增
export function addConferenceModel(data) {
  return request({
    url: 'api/1.0/hysgl/conferencemodel/add',
    method: 'post',
    data
  })
}

//会议室预约模板详情查询
export function queryConferenceModelDetail(data) {
  return request({
    url: 'api/1.0/base/m322022conferencemodel/info',
    method: 'post',
    data
  })
}

//会议室预约模板人员详情查询
export function queryConferenceModelPeopleDetail(data) {
  return request({
    url: 'api/1.0/hysgl/conferencemodelattendees/getAllList',
    method: 'post',
    data
  })
}

//会议室预约模板修改
export function updateConferenceModel(data) {
  return request({
    url: 'api/1.0/hysgl/conferencemodel/update',
    method: 'post',
    data
  })
}

//会议室模板列表下拉查询
export function queryConferenceAllModel(data) {
  return request({
    url: 'api/1.0/common/search/conferenceModel',
    method: 'post',
    data
  })
}
