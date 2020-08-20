'use strict';

module.exports = () => {
  return async function uppercase(ctx, next) {

    if (ctx.query.name) {
      ctx.query.name = ctx.query.name && ctx.query.name.toUpperCase();
    }

    await next();
  };
};
