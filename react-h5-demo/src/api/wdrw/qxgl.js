import request from '@/utils/request'

export function zaRoleList(data) {
  return request({
    url: '/za/role/list',
		method: 'post',
    data		
  })
}

export function zaRoleAdd(data) {
  return request({
    url: '/za/role/add',
		method: 'post',
    data		
  })
}

export function zaRoleUpdate(data) {
  return request({
    url: '/za/role/update',
		method: 'post',
    data		
  })
}