'use strict';

module.exports = app => {
  const { router, controller } = app;

  router.post('/api/upload/new', controller.upload.new);
};
