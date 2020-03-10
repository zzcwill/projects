import request from '@/utils/request'

export function addUrl(data) {
  return request({
    url: '/api/1.0/common/file/upload/api',
    method: 'post',
    data
  })
}
