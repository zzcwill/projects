const { resOk } = global.help.resData;
const { userService, cacheService } = require('../service');
const { setToken } = global.help.token;
const checkParam = global.help.checkParam;
const lodash = global.help.lodash;
const logger = global.help.logger;
const config = global.config;
const { AuthFailed, ParameterException } = global.help.httpCode;
const { setPassWord, getSalt } = global.help.password;

module.exports = {
	get: async (req, res, next) => {
		// let ruleData = {
		// 	name: [
		// 		{
		// 			ruleName: 'required',
		// 			rule: (val) => {
		// 				var isOk = true
		// 				if (!val) {
		// 					isOk = false
		// 				}
		// 				return isOk
		// 			}
		// 		}
		// 	]
		// }
		// let msgParam = checkParam.check(req, ruleData)
		// if (msgParam) {
		// 	let error = new ParameterException(msgParam)
		// 	next(error)
		// 	return
		// }
		let { linkCache } = config
		res.json(resOk(linkCache))
	},
}