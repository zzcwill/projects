'use strict';

module.exports = app => {
  const { router, controller } = app;
  router.get('/news', controller.news.list);

  router.post('/news/add', controller.news.add);

  router.post('/api/news/add', controller.news.add);
};
