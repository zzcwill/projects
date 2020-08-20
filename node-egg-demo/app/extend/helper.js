'use strict';

const moment = require('moment');

moment.locale('zh-CN');
exports.relativeTime = time => moment(time).fromNow();
