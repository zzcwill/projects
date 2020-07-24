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
export function loanApprovalInfoGetApprovalBaseInfo(data) {
  return request({
    url: '/loanApprovalInfo/getApprovalBaseInfo',
		method: 'post',
    data		
  })
}

//保存流程意见
export function opinionSave(data) {
  return request({
    url: '/opinion/save',
		method: 'post',
    data		
  })
}

//贷款预提交,提交
export function loanReviewPreSubmit(data) {
  return request({
    url: '/loanReview/preSubmit',
		method: 'post',
    data		
  })
}
export function loanReviewSubmit2next(data) {
  return request({
    url: '/loanReview/submit2next',
		method: 'post',
    data		
  })
}