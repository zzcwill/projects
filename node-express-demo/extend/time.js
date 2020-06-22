var dayjs = require('dayjs');

function getNowDay() {
	return dayjs().format('YYYY-MM-DD')
}

exports.getNowDay = getNowDay;