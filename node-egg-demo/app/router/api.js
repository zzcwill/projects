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
  apiRouter.post('/menu/list2', tokenRequired, controller.api.menu.list2);

  //第三方cnode相关
  apiRouter.post('/cnode/list', tokenRequired, controller.api.cnode.list);

  //上传接口校验
  apiRouter.post('/upload/new', controller.api.upload.new);
};
