import request from '@/utils/request'

export function getFacilityInfo(data){
    return request({
        url:'/api/1.0/base/c211217pilotmachine/list',
        method:'post',
        data
    })
}

export function modifyFacilityInfo(data){
    return request({
        url: '/api/1.0/base/c211217pilotmachine/modify',
        method: 'post',
        data
      })
}

export function discardFacilityInfo(data){
    return request({
        url: '/api/1.0/base/c211217pilotmachine/discard',
        method: 'post',
        data
      })
}

export function appendFacilityInfo(data){
    return request({
        url: '/api/1.0/base/c211217pilotmachine/append',
        method: 'post',
        
        data
      })
  }