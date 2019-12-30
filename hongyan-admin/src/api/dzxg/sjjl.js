/**
 * 事件记录
 */
import request from '@/utils/request'

// 获取列表
export function getList(data) {
  return request({
    url: '/api/1.0/xggl/incident/list',
    method: 'post',
    data
  })
}

// 编辑信息
export function addOrEdit(data) {
  return request({
    url: '/api/1.0/base/k321090incident/modify',
    method: 'post',
    data
  })
}