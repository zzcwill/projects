'use strict';
const BaseController = require('../../core/base_controller');


class CustomerController extends BaseController { 
  async list() {
    const { ctx } = this;
    let { customerName, page, pageSize } = ctx.request.body;

    if(page === undefined) {
      page = 1
    }

    if(pageSize === undefined) {
      pageSize = 10
    }

    if(customerName === undefined) {
      customerName = ''
    }

    let reqData = {
      customerName,
      page,
      pageSize
    }
    
    let customerList = await ctx.service.customer.getCustomerList(reqData)
 
    ctx.body = ctx.resok(customerList)
  }

  async export() {
    const { ctx } = this;
    let { customerName } = ctx.request.body;

    if(customerName === undefined) {
      customerName = ''
    }   
    
    let reqData = {
      customerName
    }    

    let excelData = await ctx.service.customer.export(reqData)

    ctx.body = excelData
  }
}

module.exports = CustomerController;
