'use strict';

const Service = require('egg').Service;

class LoanService extends Service {
  async getLoanByUserId(reqData) {
    const { mysql } = this.app;
    const client1 = mysql.get('db1');

    const { userId, flowType, page, pageSize } = reqData;
    const count = (page - 1) * pageSize;
    const sql = `
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
    const sql2 = `
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
    const dbData = await client1.query(sql);
    const dbData2 = await client1.query(sql2);

    const apiData = this.ctx.helper.turnHumpDataArr(dbData);

    const resData = {
      apiData,
      total: dbData2[0].total,
    };

    return resData;
  }
}

module.exports = LoanService;
