'use strict';

module.exports = app => {
  const { router, controller } = app;

  router.get('/', controller.page.login.index);

  router.get('/login', controller.page.login.login);
};