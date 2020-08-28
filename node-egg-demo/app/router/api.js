'use strict';

module.exports = app => {
  const { router, controller, middleware } = app;
  const apiRouter = router.namespace('/api');

  const tokenRequired = middleware.tokenRequired();
  const pagination = middleware.pagination();

  // apiRouter.post('/login', controller.api.user.login);
  // apiRouter.post('/logout', tokenRequired, controller.api.user.logout);
  // apiRouter.post('/userinfo', tokenRequired, controller.api.user.userinfo);
};
