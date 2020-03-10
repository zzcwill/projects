import request from '@/utils/request'

export function cardManagement(data){
    return request({
        url: '/api/1.0/zkgl/sendCard/doListExt',
        method: 'post',
        data
      })
}


export function putInStorage(data){
  return request({
      url: '/api/1.0/zkgl/cardManage/putInStorage',
      method: 'post',
      data
    })
}