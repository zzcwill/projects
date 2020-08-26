'use strict';

module.exports = app => {
  console.info(app.config.env);

  app.once('server', server => {
  });
  app.on('error', (err, ctx) => {
  });
  app.on('request', ctx => {
  });
  app.on('response', ctx => {
  });
};
