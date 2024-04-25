'use strict';
const xlsx = require('node-xlsx').default;
const path = require('path');
const fs = require('fs');
const contentDisposition = require('content-disposition');

const Service = require('egg').Service;

class CustomerService extends Service {
  async getCustomerList(reqData) {
    const { mysql } = this.app;
    const client2 = mysql.get('db1');

    const { customerName } = reqData;

    let dbquery = '';
    if (customerName !== '') {
      dbquery = `AND customer_name LIKE '${customerName}%'`;
    }

    const sql = `
      SELECT 
        customer_name,
        cert_type,
        cert_no,
        mobile_phone
      FROM
        customer_base_info
      WHERE
      create_time > '2020-06-06' AND 
      create_time < '2020-12-31 24:00:00'
      ${dbquery}
    `;

    const dbData = await client2.query(sql);

    const apiData = this.ctx.helper.turnHumpDataArr(dbData);

    return apiData;
  }
  async export(reqData) {
    const { ctx } = this;
    const { customerName } = reqData;

    ctx.set('Content-Disposition', contentDisposition('excel.xlsx'));

    const url = path.resolve(__dirname, '../public/excel/customer.xlsx');
    const excelData = xlsx.parse(fs.readFileSync(url));

    const serviceData = {
      customerName,
    };
    const customerList = await ctx.service.customer.getCustomerList(serviceData);

    for (let key = 0; key < customerList.length; key++) {
      excelData[0].data.push([
        customerList[key].customerName,
        customerList[key].certType,
        customerList[key].certNo,
        customerList[key].mobilePhone,
      ]);
    }

    const options = { '!cols': [{ wch: 30 }, { wch: 30 }, { wch: 30 }, { wch: 30 }] };
    const buffer = xlsx.build([{ name: excelData[0].name, data: excelData[0].data }], options);

    return buffer;
  }
}

module.exports = CustomerService;
