'use strict';

const Service = require('egg').Service;

class MysqlService extends Service {
  async userlist(obj) {
    const { mysql } = this.app;

    // use build-in http client to GET hacker-news api
    const data = await mysql.select('za_user', { // 搜索 post 表
      where: { department_id: [ '35', '3' ] }, // WHERE 条件
      columns: [ 'uid', 'level', 'username', 'realname', 'phone' ], // 要查询的表字段
      orders: [[ 'level', 'desc' ], [ 'uid', 'asc' ]], // 排序方式
      limit: obj.pageSize, // 返回数据量
      offset: (obj.page - 1) * obj.pageSize, // 数据偏移量
    });

    const data2 = {
      list: data,
      totalItem: data.length,
    };
    return data2;
  }
  async userlist2(obj2) {
    const { mysql } = this.app;

    const sql = `
    SELECT uid, level,username, realname, phone FROM za_user 
    WHERE level = 40 AND phone LIKE'159%'
    ORDER BY uid ASC
    LIMIT 1;`;
    const data = await mysql.query(sql);

    const data2 = data[0];
    return data2;
  }
}

module.exports = MysqlService;
