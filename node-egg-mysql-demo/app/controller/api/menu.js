'use strict';
const BaseController = require('../../core/base_controller');

class ApiUserController extends BaseController {
  async list() {
    const { ctx, app } = this;
    const { menuCode } = ctx.request.body;

    if (menuCode === undefined) {
      ctx.body = ctx.resmiss('menuCode');
      return;
    }

    if (menuCode === '') {
      ctx.body = ctx.resfail(20000, 'menuCode不能为空');
      return;
    }

    const userId = ctx.session.sessionId.uid;
    const roleIdArr = await ctx.service.menu.getRoleIdByUserId(userId);


    const menuIdArrPromise = Promise.all(roleIdArr.map(item => ctx.service.menu.getMenuIdByRoleId(item.roleId)));
    const [ menuIdArr ] = await Promise.all([ menuIdArrPromise ]);

    let menuIdData = ctx.helper.lodash.concat(...menuIdArr);

    menuIdData = menuIdData.map(item => item.menuId);
    menuIdData = ctx.helper.lodash.uniq(menuIdData);
    menuIdData = ctx.helper.lodash.sortBy(menuIdData);

    const menuPromise = Promise.all(menuIdData.map(item => ctx.service.menu.getMenuByMenuId(item, menuCode)));
    const [ menuList ] = await Promise.all([ menuPromise ]);

    const apiData = [];

    for (let key = 0; key < menuList.length; key++) {
      if (menuList[key].parentId === 0) {
        const itemData = menuList[key];
        itemData.sysMenuList = [];
        apiData.push(itemData);
      }
    }

    for (let num = 0; num < apiData.length; num++) {
      for (let key2 = 0; key2 < menuList.length; key2++) {
        if (menuList[key2].parentId === apiData[num].id) {
          const itemChildData = menuList[key2];
          apiData[num].sysMenuList.push(itemChildData);
        }
      }
    }
    ctx.body = ctx.resok(apiData);
  }
  async list2() {
    const { ctx, app } = this;
    const { menuCode } = ctx.request.body;

    if (menuCode === undefined) {
      ctx.body = ctx.resmiss('menuCode');
      return;
    }

    if (menuCode === '') {
      ctx.body = ctx.resfail(20000, 'menuCode不能为空');
      return;
    }

    const userId = ctx.session.sessionId.uid;

    const menuList = await ctx.service.menu.getMenuByUserId(userId, menuCode);

    const apiData = [];

    for (let key = 0; key < menuList.length; key++) {
      if (menuList[key].parentId === 0) {
        const itemData = menuList[key];
        itemData.sysMenuList = [];
        apiData.push(itemData);
      }
    }

    for (let num = 0; num < apiData.length; num++) {
      for (let key2 = 0; key2 < menuList.length; key2++) {
        if (menuList[key2].parentId === apiData[num].id) {
          const itemChildData = menuList[key2];
          apiData[num].sysMenuList.push(itemChildData);
        }
      }
    }
    ctx.body = ctx.resok(apiData);
  }
}

module.exports = ApiUserController;
