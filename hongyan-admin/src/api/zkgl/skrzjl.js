import request from '@/utils/request'

export function InfoList(data){
    return request({
        url: '/api/1.0/base/l211220cardreadinglog/list',
        method: 'post',
        data
      })
}