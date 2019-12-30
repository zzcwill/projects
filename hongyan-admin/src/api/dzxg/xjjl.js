/**
 * 巡检记录接口
 */
import request from '@/utils/request'

// 获取巡更信息
export function getList(data) {
  return request({
    url: '/api/1.0/xggl/logday/pageList',
    method: 'post',
    data
  })
}

export function getListDetail(data) {
  return request({
    url: '/api/1.0/xggl/logday/pageDetailList',
    method: 'post',
    data
  })
}

export function getPersonDetail(data) {
  return request({
    url: '/api/1.0/base/k321042logdaypersonnel/list',
    method: 'post',
    data
  })
}

// 删除单个巡更信息
export function del(data) {
  return request({
    url: '/api/1.0/base/k321040logday/discard',
    method: 'post',
    data
  })
}

// 新增或编辑巡更
export function addOrEdit(data, type) {
  return request({
    url: `/api/1.0/base/k321040logday/${type ? 'modify' : 'append'}`,
    method: 'post',
    data
  })
}
