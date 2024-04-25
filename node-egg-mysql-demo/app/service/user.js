'use strict';

const utility = require('utility');
const uuid = require('uuid');
const Service = require('egg').Service;

class UserService extends Service {
  async getUserByLoginName(loginName) {
    const { mysql } = this.app;

    const client1 = mysql.get('db1');

    // const dbtable = 'za_user';
    // const dbquery = 'uid, level, username, realname, phone, company_id, company_name, department_id, department_name, bz_group_id, bz_group_name';
    // let sql = `select ${dbquery} from ${dbtable} where username= "${loginName}"`;
    // let dbData = await client1.query(sql);

    const dbData = await client1.select('za_user', { // 搜索 post 表
      where: { username: loginName }, // WHERE 条件
      columns: [ 'uid', 'level', 'username', 'realname', 'phone', 'company_id', 'company_name', 'department_id', 'department_name', 'bz_group_id', 'bz_group_name' ],
    });

    if (dbData.length === 0) {
      return {};
    }

    const apiData = this.ctx.helper.turnHumpData(dbData[0]);

    return apiData;
  }
}

module.exports = UserService;
