'use strict';

module.exports = app => {
  const { router, controller, middleware } = app;
  const apiRouter = router.namespace('/api');

  const tokenRequired = middleware.tokenRequired();
  const pagination = middleware.pagination();

  apiRouter.post('/login', controller.api.login);
  apiRouter.post('/login', tokenRequired, controller.api.logout);
  apiRouter.post('/userinfo', tokenRequired, controller.api.userinfo);
};
