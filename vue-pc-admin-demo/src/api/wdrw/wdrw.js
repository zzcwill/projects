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

export function flowNodes(data) {
  return request({
    url: '/flow/nodes',
		method: 'post',
    data		
  })
}

export function customerCreditInfoDownload() {
  return  process.env.VUE_APP_BASE_API + '/customer/creditInfo/download?customerName'
}

//贷款详情
export function pledgeInfoDetail(data) {
  return request({
    url: '/loanApprovalInfo/getApprovalBaseInfo',
		method: 'post',
    data		
  })
}