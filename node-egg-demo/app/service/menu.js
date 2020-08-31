'use strict';

const utility = require('utility');
const uuid = require('uuid');
const Service = require('egg').Service;

class MenuService extends Service {
  async getRoleIdByUserId(userId) {
    const { mysql } = this.app;

    const client1 = mysql.get('db1');

    let dbData = await client1.select('za_user_role', { // 搜索 post 表
      where: { user_id: userId }, // WHERE 条件
      columns: ['role_id']
    });

    let apiData = this.ctx.helper.turnHumpDataArr(dbData)

    return apiData;
	}

  async getMenuIdByRoleId(roleId) {
    const { mysql } = this.app;

    const client1 = mysql.get('db1');

    let dbData = await client1.select('za_role_menu', { // 搜索 post 表
      where: { role_id: roleId }, // WHERE 条件
      columns: ['menu_id']
    });

		let apiData = this.ctx.helper.turnHumpDataArr(dbData)

    return apiData;
	}	

  async getMenuByMenuId(menuId, menuCode) {
    const { mysql } = this.app;

    const client1 = mysql.get('db1');

    let dbData = await client1.select('za_sys_menu', { // 搜索 post 表
      where: { id: menuId ,sys_type: menuCode}, // WHERE 条件
      // columns: ['menu_id']
    });

		let apiData = this.ctx.helper.turnHumpDataArr(dbData)

    return apiData[0];
  }
  
  async getMenuByUserId(userId, menuCode) {
    const { mysql } = this.app;

    const client1 = mysql.get('db1');


    // let dbtable = 'za_sys_menu';
    let dbquery = 'd.*';   
    let sql = `
      SELECT
        ${dbquery}
      FROM
        za_user  a 
        INNER JOIN 
        za_user_role  b     on    a.uid = b.user_id
        INNER JOIN 
        za_role_menu   c     on        b.role_id = c.role_id
        INNER JOIN 
        za_sys_menu   d     on        c.menu_id = d.id
      WHERE
        a.uid = ${userId} and
        d.sys_type = '${menuCode}'
    `;
    let dbData = await client1.query(sql)

		let apiData = this.ctx.helper.turnHumpDataArr(dbData)

    return apiData;
  }
}

module.exports = MenuService;
