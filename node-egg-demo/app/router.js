'use strict';

module.exports = app => {
  // 页面
  require('./router/page')(app);

  // 接口
  // require('./router/api')(app);
};
