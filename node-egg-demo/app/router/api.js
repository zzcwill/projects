'use strict';

module.exports = app => {
  const { router, controller, middleware } = app;
  const apiRouter = router.namespace('/api');

  const tokenRequired = middleware.tokenRequired();
  const pagination = middleware.pagination();

  //用户相关
  apiRouter.post('/user/login', controller.api.user.login);
  apiRouter.post('/user/logout', tokenRequired, controller.api.user.logout);
  apiRouter.post('/user/userinfo', tokenRequired, controller.api.user.userinfo);

  //菜单相关
  apiRouter.post('/menu/list', tokenRequired, controller.api.menu.list);
};
