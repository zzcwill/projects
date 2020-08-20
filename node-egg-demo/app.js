'use strict';

module.exports = app => {
  app.config.coreMiddleware.unshift('report');

  app.once('server', server => {
  });
  app.on('error', (err, ctx) => {
    // report error
  });
  app.on('request', ctx => {
  });
  app.on('response', ctx => {
    // ctx.starttime is set by framework
    // const used = Date.now() - ctx.starttime;
    // log total cost
  });
};
