var dayjs = require('dayjs');
const { streamWriter } = require('xmlbuilder');

function getNowDay() {
	return dayjs().format('YYYY-MM-DD');
}

function today(time) {
	return dayjs(time).format('YYYY-MM-DD');
}

exports.getNowDay = getNowDay;
exports.today = today;