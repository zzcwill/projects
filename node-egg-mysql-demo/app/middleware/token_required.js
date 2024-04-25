'use strict';

module.exports = () => {
  return async function(ctx, next) {
    if (!ctx.session.sessionId) {
      ctx.body = ctx.resfail(20000, '请先登录，再调接口');
      return;
    }

    await next();
  };
};
