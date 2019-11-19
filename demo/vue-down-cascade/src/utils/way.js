//两个对象，第二个给第一个赋值
export function mergeObject(obj, obj2) {
	const defaults = {}
	for (let i in obj) {
		defaults[i] = obj[i]
	}

	for (let i in defaults) {
		defaults[i] = obj2[i]
	}
	return defaults
}