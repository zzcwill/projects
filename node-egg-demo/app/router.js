'use strict';

module.exports = app => {
  require('./router/home')(app);
  require('./router/news')(app);
  require('./router/upload')(app);
  require('./router/mysql')(app);
};
