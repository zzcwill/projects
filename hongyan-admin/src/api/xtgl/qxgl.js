import request from '@/utils/request'

export function userInfo() {
  return request({
    url: '/api/1.0/base/s902030group/list',
    method: 'post'
  })
}


// 删除用户组
export function discardGroup(data) {
  return request({
    url: '/api/1.0/base/s902030group/discard',
    method: 'post',
    data
  })
}
// 新增用户组
export function appendGroup(data) {
  return request({
    url: '/api/1.0/base/s902030group/append',
    method: 'post',
    data
  })
}

// 所有成员列表
export function userLsit() {
  return request({
    url: '/api/1.0/base/s903010manager/list',
    method: 'post'
  })
}

// 用户组添加成员
export function groupUSer(data) {
  return request({
    url: '/api/1.0/xtgl/group/ManagerRelationGroup',
    method: 'post',
    data
  })
}


// 删除用户组成员
export function deleteUSer(data) {
  return request({
    url: '/api/1.0/base/s903030managergroup/discard',
    method: 'post',
    data
  })
}


export function getInfo(data) {
  return request({
    url: '/api/1.0/xtgl/group/managerList',
    method: 'post',
    data
  })
}

//权限列表 
export function grouppermissionList(data) {
  return request({
    url: '/api/1.0/base/s902040grouppermission/list',
    method: 'post',
    data
  })
}

// 删除权限
export function discardGrouppermission(data) {
  return request({
    url: '/api/1.0/base/s902040grouppermission/discard',
    method: 'post',
    data
  })
}

// 新增权限
export function appendGrouppermission(data) {
  return request({
    url: '/api/1.0/base/s902040grouppermission/append',
    method: 'post',
    data
  })
}






