'use strict';

const moment = require('moment')
const utility = require('utility')
const lodash = require('lodash')

moment.locale('zh-CN');

exports.moment = moment;
exports.lodash = lodash;


exports.passwordCompare = (password, existUser) => {
	const passhash = existUser.password;
	const salt = existUser.salt;
	const username = existUser.username;

	let md5hash = utility.md5(password + salt)
	let md5hash2 = utility.md5(md5hash + username)

	let isPass = md5hash2 === passhash

  return isPass;
};

//转驼峰对象
exports.turnHumpData = (data) => {
	let turnData = {}

	for(let key in data) {
		let name = lodash.camelCase(key)
		turnData[name] = data[key]
	}

	return turnData
};
//转驼峰数组对象
exports.turnHumpDataArr = (dataArr) => {
	let turnDataArr = []

	for(let n = 0 ; n < dataArr.length ; n++) {
		let itemData = {}
		for(let key in dataArr[n]) {
			let name = lodash.camelCase(key)
			itemData[name] = dataArr[n][key]
		}	
		turnDataArr.push(itemData)		
	}

	return turnDataArr
};