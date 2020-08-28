'use strict';

const utility = require('utility');
const uuid = require('uuid');
const Service = require('egg').Service;

class UserService extends Service {
  async getUserByLoginName(loginName) {
    const { mysql } = this.app;

    const client1 = mysql.get('db1');

    // const dbtable = 'za_user';
    // const dbquery = 'uid, username, password, salt, realname,phone';
    // let sql = `select ${dbtable} from ${dbquery} where username= "${loginName}"`;
    // let dbData = await client1.query(sql);

    let dbData = await client1.select('za_user', { // 搜索 post 表
      where: { username: loginName }, // WHERE 条件
    });

    if(dbData.length === 0) {
      return {}
    }

    return dbData[0];
  }
}

module.exports = UserService;
