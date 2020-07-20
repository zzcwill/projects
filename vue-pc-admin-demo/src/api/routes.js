import request from '@/utils/request'

export function getRoutes() {
  return request({
    url: '/za/menu/list',
    method: 'post',
    data: {
      st: 'CLS_WEB_BEFORE'
    }
  })
}
