'use strict';

const Service = require('egg').Service;

class LoanService extends Service {  
  async getLoanByUserId(reqData) {
    const { mysql } = this.app;
    const client1 = mysql.get('db1');

    let { userId, flowType, page, pageSize } = reqData
    let count = (page-1)*pageSize
    let sql = `
      SELECT
        c.*,
        b.node_key,
        b.node_name,
        b.business_type
      FROM
        za_admin.za_user  a 
        INNER JOIN 
        cls.business_object_process_info  b     on    a.uid = b.operator_id
        INNER JOIN 
        cls.loan_project_info   c     on        b.business_object_id = c.id
      WHERE
        a.uid = ${userId} AND
        b.business_type = '${flowType}' AND
        b.borrower_name LIKE '王%'
      ORDER BY c.id ASC
        LIMIT ${pageSize}
        OFFSET ${count};      
    `;
    let sql2 = `
      SELECT
        COUNT(*) as total
      FROM
        za_admin.za_user  a 
        INNER JOIN 
        cls.business_object_process_info  b     on    a.uid = b.operator_id
        INNER JOIN 
        cls.loan_project_info   c     on        b.business_object_id = c.id
      WHERE
        a.uid = ${userId} AND
        b.business_type = '${flowType}' AND
        b.borrower_name LIKE '王%'
      ORDER BY c.id ASC
        LIMIT ${pageSize}
        OFFSET ${count};      
    `;    
    let dbData = await client1.query(sql)
    let dbData2 = await client1.query(sql2)

    let apiData = this.ctx.helper.turnHumpDataArr(dbData)

    let resData = {
      apiData,
      total: dbData2[0].total
    }

    return resData;
  }
}

module.exports = LoanService;
