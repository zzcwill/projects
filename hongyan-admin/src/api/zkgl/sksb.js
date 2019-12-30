import request from '@/utils/request'

export function getFacilityInfo(data){
    return request({
        url: '/api/1.0/base/c211210terminalmachine/list',
        method: 'post',
        data
      })
}

export function modifyFacilityInfo(data){
    return request({
        url: '/api/1.0/base/c211210terminalmachine/modify',
        method: 'post',
        data
      })
}

export function discardFacilityInfo(data){
    return request({
        url: '/api/1.0/base/c211210terminalmachine/discard',
        method: 'post',
        data
      })
}

export function appendFacilityInfo(data){
  return request({
      url: '/api/1.0/zkgl/terminalMachine/addTerminal',
      method: 'post',
      
      data
    })
}

export function personInfo(data){
  return request({
      url: '/api/1.0/base/c201030employee/list',
      method: 'post',
      data
    })
}

