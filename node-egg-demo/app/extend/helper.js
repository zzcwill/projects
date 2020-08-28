'use strict';

const moment = require('moment')
const utility = require('utility')
const lodash = require('lodash')

moment.locale('zh-CN');

exports.moment = moment;
exports.lodash = lodash;


exports.passwordCompare = (password, existUser) => {
	console.info(existUser)
	const passhash = existUser.password;
	const salt = existUser.salt;
	const username = existUser.username;

	let md5hash = utility.md5(password + salt)
	let md5hash2 = utility.md5(md5hash + username)
	console.info(md5hash)
	console.info(md5hash2)
	console.info(passhash)
	let isPass = md5hash2 === passhash

  return isPass;
};