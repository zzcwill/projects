'use strict';
const BaseController = require('../../core/base_controller');

class ApiUserController extends BaseController {
  async list() {
    const { ctx, app } = this;
    const { menuCode } = ctx.request.body;

    if(menuCode === undefined) {
      ctx.body = ctx.resmiss('menuCode')
      return
    }

    if(menuCode === '') {
      ctx.body = ctx.resfail(20000,'menuCode不能为空')
      return      
    }

    let userId = ctx.session.sessionId.uid
    let roleIdArr = await ctx.service.menu.getRoleIdByUserId(userId)


    let menuIdArrPromise = Promise.all(roleIdArr.map(item => ctx.service.menu.getMenuIdByRoleId(item.roleId)));
    let [ menuIdArr ] = await Promise.all([ menuIdArrPromise ]);

    let menuIdData = ctx.helper.lodash.concat(...menuIdArr);

    menuIdData = menuIdData.map(item => item.menuId);
    menuIdData = ctx.helper.lodash.uniq(menuIdData);
    menuIdData = ctx.helper.lodash.sortBy(menuIdData);

    let menuPromise = Promise.all(menuIdData.map(item => ctx.service.menu.getMenuByMenuId(item, menuCode)));
    let [ menuList ] = await Promise.all([ menuPromise ]);    

    console.info(menuIdData)
    console.info(menuList)
    ctx.body = ctx.resok(menuList)
  }
}

module.exports = ApiUserController;
