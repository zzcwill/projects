export function getExport(data) {
	let str = ''
	let str2 = ''
	let str3 = ''
	let num = 0

	for (let key in data) {
		num = num + 1
		if (num === 1) {
			str2 = '?' + key + '=' + data[key]
			str = str + str2
		}
		if (num > 1) {
			str3 = '&' + key + '=' + data[key]
			str = str + str3
		}
	}

	return str
} 