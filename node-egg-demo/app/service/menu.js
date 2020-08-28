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

    return apiData;
	}	
}

module.exports = MenuService;
