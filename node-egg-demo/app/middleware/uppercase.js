'use strict';

module.exports = (options, app) => {
  return async function uppercaseMiddleware(ctx, next) {
    console.info('uppercaseMiddleware')
    if (ctx.query.name) {
      ctx.query.name = ctx.query.name && ctx.query.name.toUpperCase();
    }

    await next();
  };
};
