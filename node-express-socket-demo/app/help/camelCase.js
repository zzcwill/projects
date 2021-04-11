const lodash = require('./lodash');

//转驼峰对象
let turnHumpData = (data) => {
	let turnData = {}

	for(let key in data) {
		let name = lodash.camelCase(key)
		let value = data[key] !== null ? data[key] : ''
		turnData[name] = value
	}

	return turnData
};
//转驼峰数组对象
let turnHumpDataArr = (dataArr) => {
	let turnDataArr = []

	for(let n = 0 ; n < dataArr.length ; n++) {
		let itemData = {}
		for(let key in dataArr[n]) {
			let name = lodash.camelCase(key)
			let value = dataArr[n][key] !== null ? dataArr[n][key] : ''
			itemData[name] = value
		}
		turnDataArr.push(itemData)		
	}

	return turnDataArr
};

module.exports = {
	turnHumpData,
	turnHumpDataArr
}