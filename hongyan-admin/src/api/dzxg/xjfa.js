/**
 * 电子巡更 巡检方案接口
 */
import request from '@/utils/request'

export function apiXJFA(data, type = 'list') {
  return request({
    url: `/api/1.0/base/k321020plan/${type}`,
    method: 'post',
    data
  })
}

export function apiXJFACus(data, type = 'pageList') {
  return request({
    url: `/api/1.0/xggl/plan/${type}`,
    method: 'post',
    data
  })
}

export function apiGETLIST(data) {
  return request({
    url: '/api/1.0/base/c211210terminalmachine/list',
    method: 'post',
    data
  })
}

// 获取企业所有员工信息
export function apiGETEMPLOY(data) {
  return request({
    url: '/api/1.0/base/c201030employee/list',
    method: 'post',
    data
  })
}