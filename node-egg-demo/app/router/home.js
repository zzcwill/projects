'use strict';

module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.home.index);
  router.redirect('/home', '/news');

  const uppercase = app.middleware.uppercase();
  router.get('/user', uppercase, controller.home.user);

  router.get('/login', controller.home.login);
  router.post('/api/login', controller.home.apilogin);
  router.post('/api/userinfo', controller.home.apiuserinfo);
};
