'use strict';

module.exports = app => {
  const { router, controller } = app;

  router.get('/', controller.page.user.index);

  router.get('/login', controller.page.user.login);
};
