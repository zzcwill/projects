'use strict';

module.exports = app => {
  const { router, controller } = app;

  router.get('/api/mysql/userlist', controller.mysql.userlist);
  router.post('/api/mysql/userlist2', controller.mysql.userlist2);

};
