const lodash = require('./lodash');

let getAllParams = (req) => {
	return {
		body: req.body,
		query: req.query
		// headers: req.headers
	}
}

let getRuleDataArr = (ruleData) => {
	let ruleArr = []

	for (const key in ruleData) {
		ruleArr[key] = ruleData[key]
	}

	return ruleArr
}

let check = (req, ruleData) => {
	let errorMsg = '';
	let initParams = getAllParams(req);
	let initRuleArr = ruleData;

	if(!lodash.isEmpty(initParams.body)) {
		for (let key in initRuleArr) {
			if(!lodash.isArray(initRuleArr[key])){
				errorMsg = key + '参数ruleArr数组异常';
				
			}

			if(lodash.isArray(initRuleArr[key])){
				let itemRuleArr = initRuleArr[key];
				let itemParamVal =  lodash.has(initParams.body, key) ? initParams.body[key]: '';

				for( let item = 0 ; item < itemRuleArr.length ; item++ ) {
					let chlidItem = itemRuleArr[item];
					if(chlidItem.ruleName === 'required') {
						if(!itemParamVal) {
							errorMsg = chlidItem.msg ? chlidItem.msg : (key + '参数没有传')
							
						}
						if(itemParamVal) {
							if(!lodash.isFunction(chlidItem.rule)){
								errorMsg = key + '参数ruleArr数组的' + chlidItem.ruleName + '方法异常';							
							}							
							if(lodash.isFunction(chlidItem.rule)) {
								if(!chlidItem.rule(itemParamVal)) {
									errorMsg = chlidItem.msg ? chlidItem.msg : (key + '参数错误')
									
								}
							}
						}						
					}	
					
					if(chlidItem.ruleName !== 'required') {
						if(itemParamVal) {
							if(!lodash.isFunction(chlidItem.rule)){
								errorMsg = key + '参数ruleArr数组的' + chlidItem.ruleName + '方法异常';								
							}							
							if(lodash.isFunction(chlidItem.rule)) {
								if(!chlidItem.rule(itemParamVal)) {
									errorMsg = chlidItem.msg ? chlidItem.msg : (key + '参数错误');
									console.info(errorMsg)								
								}
							}
						}						
					}					
				}				
			}
		}
	}

	if(!lodash.isEmpty(initParams.query)) {
		for (let key in initRuleArr) {
			if(!lodash.isArray(initRuleArr[key])){
				errorMsg = key + '参数ruleArr数组异常';
				
			}

			if(lodash.isArray(initRuleArr[key])){
				let itemRuleArr = initRuleArr[key];
				let itemParamVal =  lodash.has(initParams.query, key) ? initParams.query[key]: '';

				for( let item = 0 ; item < itemRuleArr.length ; item++ ) {
					let chlidItem = itemRuleArr[item];
					if(chlidItem.ruleName === 'required') {
						if(!itemParamVal) {
							errorMsg = chlidItem.msg ? chlidItem.msg : (key + '参数没有传')
							
						}
						if(itemParamVal) {
							if(!lodash.isFunction(chlidItem.rule)){
								errorMsg = key + '参数ruleArr数组的' + chlidItem.ruleName + '方法异常';								
							}							
							if(lodash.isFunction(chlidItem.rule)) {
								if(!chlidItem.rule(itemParamVal)) {
									errorMsg = chlidItem.msg ? chlidItem.msg : (key + '参数错误')
									
								}
							}
						}						
					}	
					
					if(chlidItem.ruleName !== 'required') {
						if(itemParamVal) {
							if(!lodash.isFunction(chlidItem.rule)){
								errorMsg = key + '参数ruleArr数组的' + chlidItem.ruleName + '方法异常';								
							}							
							if(lodash.isFunction(chlidItem.rule)) {
								if(!chlidItem.rule(itemParamVal)) {
									errorMsg = chlidItem.msg ? chlidItem.msg : (key + '参数错误');									
								}
							}
						}						
					}					
				}				
			}
		}
	}	

	return errorMsg;
}

module.exports = {
	check
}