//  成功状态过滤器
export function buyfilter(code) {
	const arr = ['成功', '失败', '待定']
	let index = code * 1
	return arr[index]
}