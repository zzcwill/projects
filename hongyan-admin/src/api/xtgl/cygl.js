import request from '@/utils/request'

export function personSetting(data) {
    return request({
      url: '/api/1.0/base/s903010manager/list',
      method: 'post',
      data
    })
  }

  export function deleteInfo(data) {
    return request({
      url: '/api/1.0/base/s903010manager/discard',
      method: 'post',
      data
    })
  }

  export function modifyInfo(data) {
    return request({
      url: '/api/1.0/base/s903010manager/modify',
      method: 'post',
      data
    })
  }

  export function appendInfo(data) {
    return request({
      url: '/api/1.0/base/manager/appendManager',
      method: 'post',
      data
    })
  }

  //企业列表
  export function enterpriseList(data) {
    return request({
      url: '/api/1.0/base/c201010partner/list',
      method: 'post',
      data
    })
  }

  //根据企业获取部门

  export function departmentList(data) {
    return request({
      url: '/api/1.0/base/c201020organization/list',
      method: 'post',
      data
    })
  }

  //添加部门

export function appendDepartment(data) {
    return request({
      url: '/api/1.0/base/c201020organization/append',
      method: 'post',
      data
    })
  }



  