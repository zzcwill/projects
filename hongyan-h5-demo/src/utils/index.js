// 判断一个对象是否为空
export function judgeObjectNull(obj) {
	var isOk = true
	var count = 0
	for (var i in obj) {
			if (obj.hasOwnProperty(i)) {
					count++
			}
	}
	
	if(count) {
		isOk = false
	}

	return isOk
}