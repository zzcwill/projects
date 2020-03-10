import request from '@/utils/request'

export function InfoList(data){
    return request({
        url: '/api/1.0/base/p32b020msgpush/list',
        method: 'post',
        data
      })
}