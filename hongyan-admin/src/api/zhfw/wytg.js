/**
 * 综合服务物业通告页面接口
 */
import request from '@/utils/request'

// 获取每个小区的单元列表
export function getList(data) {
  return request({
    url: '/api/1.0/base/c801010announcement/list',
    method: 'post',
    data
  })
}
// 上传文件
export function addFile(data) {
  return request({
    url: '/api/1.0/common/file/upload/api',
    method: 'post',
    data
  })
}

// 新增/编辑 公告
export function modifyNotice(data, type = false) {
  return request({
    url: `/api/1.0/base/c801010announcement/${type ? 'modify' : 'append'}`,
    method: 'post',
    data
  })
}

// 物业通告接口
export function apiWYTG(data, type = 'list') {
  return request({
    url: `/api/1.0/base/c801010announcement/${type}`,
    method: 'post',
    data
  })
}