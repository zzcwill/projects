'use strict';

const moment = require('moment');
// const utility = require('utility')
const lodash = require('lodash');

moment.locale('zh-CN');

exports.moment = moment;
exports.lodash = lodash;


exports.passwordCompare = (password, existUser) => {
  const passhash = existUser.password;
  const salt = existUser.salt;
  const username = existUser.username;

  // let md5hash = utility.md5(password + salt)
  // let md5hash2 = utility.md5(md5hash + username)
  const md5hash2 = '';

  const isPass = md5hash2 === passhash;

  return isPass;
};

// 转驼峰对象
exports.turnHumpData = data => {
  const turnData = {};

  for (const key in data) {
    const name = lodash.camelCase(key);
    const value = data[key] !== null ? data[key] : '';
    turnData[name] = value;
  }

  return turnData;
};
// 转驼峰数组对象
exports.turnHumpDataArr = dataArr => {
  const turnDataArr = [];

  for (let n = 0; n < dataArr.length; n++) {
    const itemData = {};
    for (const key in dataArr[n]) {
      const name = lodash.camelCase(key);
      const value = dataArr[n][key] !== null ? dataArr[n][key] : '';
      itemData[name] = value;
    }
    turnDataArr.push(itemData);
  }

  return turnDataArr;
};
