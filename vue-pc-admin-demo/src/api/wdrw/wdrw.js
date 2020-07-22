import request from '@/utils/request'

export function mytasksSearch(data) {
  return request({
    url: '/mytasks/search',
    method: 'post',
    data   
  })
}

export function flowGet() {
  return request({
    url: '/flow/get',
    method: 'post'
  })
}

export function getInfo(data) {
  return request({
    url: '/flow/nodes',
		method: 'post',
    data		
  })
}