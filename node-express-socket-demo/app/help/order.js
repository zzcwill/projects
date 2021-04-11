

// 获取订单单号
let getOrderCode = () => {
	let date = new Date();
	let y = date.getFullYear();
	let m = date.getMonth() + 1;
	let d = date.getDate();
	let h = date.getHours() > 12 ? date.getHours() - 12 : date.getHours();
	m = m < 10 ? '0' + m : '' + m;
	d = d < 10 ? '0' + d : '' + d;
	h = h < 10 ? '0' + h : '' + h;
	let mi = date.getMinutes();
	mi = mi < 10 ? '0' + mi : '' + mi;
	let s = date.getSeconds();
	s = s < 10 ? '0' + s : '' + s;
	let str = y + '_' + m + '_' + d + '_' + h + '_' + mi + '_' + s;
	return str;
}

module.exports = {
	getOrderCode
}