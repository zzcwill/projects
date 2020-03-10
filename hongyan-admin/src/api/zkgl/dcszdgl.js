import request from '@/utils/request'

export function getFacilityInfo(data){
    return request({
        url:'/api/1.0/base/c211216lockmachine/list',
        method:'post',
        data
    })
}

export function modifyFacilityInfo(data){
    return request({
        url: '/api/1.0/base/c211216lockmachine/modify',
        method: 'post',
        data
      })
}

export function discardFacilityInfo(data){
    return request({
        url: '/api/1.0/base/c211216lockmachine/discard',
        method: 'post',
        data
      })
}

export function appendFacilityInfo(data){
    return request({
        url: '/api/1.0/base/c211216lockmachine/append',
        method: 'post',
        
        data
      })
  }