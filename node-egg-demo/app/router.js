'use strict';

module.exports = app => {
  // 页面
  require('./router/web')(app);

  // 接口
  require('./router/api')(app);
};
