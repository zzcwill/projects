'use strict';
const BaseController = require('../../core/base_controller');

class LoanController extends BaseController { 
  async list() {
    const { ctx } = this;
    let { flowType, page, pageSize } = ctx.request.body;

    if(page === undefined) {
      page = 1
    }

    if(pageSize === undefined) {
      pageSize = 10
    }  
    
    if(flowType === undefined) {
      flowType = ''
    }

    let userId = ctx.session.sessionId.uid 
    let reqData = {
      userId,
      flowType,
      page,
      pageSize
    }
    
    let loanList = await ctx.service.loan.getLoanByUserId(reqData)
 
    ctx.body = ctx.resok(loanList)
  }
}

module.exports = LoanController;
