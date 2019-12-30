/**
 * 天气记录
 */
import request from '@/utils/request'

// 获取列表
export function getList(data) {
  return request({
    url: '/api/1.0/wygl/weather/list',
    method: 'post',
    data
  })
}