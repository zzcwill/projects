import Vue from 'vue'
import Axios from 'axios'
import Qs from 'qs'

const http = Axios.create({
	// api的base_url
	baseURL: '/api/',
	timeout: 5000,
  transformRequest: [function(data) {
    if (data && data.type && data.type === 'file') {
      data = data.data
    } else {
      data = Qs.stringify(data)
    }
    return data
  }]	
})

// 设置请求头
http.interceptors.request.use(config => {
	let sessionId = sessionStorage.getItem('sessionId')
	if(sessionId !== null) {
		let authorization = sessionStorage.getItem('sessionId')
		config.headers['Authorization'] = authorization
	}
	return config
}, error => {
	console.log(error)
	Promise.reject(error)
})

// 拦截响应response，并做一些错误处理
http.interceptors.response.use((response) => {
	const data = response.data

	// if (data.code === 10000) {		
	// 	return data
	// }

	//cnode接口判断
	if (data.success === true) {		
		return data
	}	

	// 报错提示
	Vue.$za.tip.open({
		text: data.message
	})

	// 若不是正确的返回code，且已经登录，就抛出错误
	const err = new Error(data.message)

	err.data = data
	err.response = response
	throw err
}, (err) => {
	// 这里是返回状态码不为200时候的错误处理
	if (err && err.response) {
		switch (err.response.status) {
			case 400:
				err.message = '请求错误'
				Vue.$za.tip.open({
					text: err.message
				})				
				break

			case 403:
				err.message = '拒绝访问'
				Vue.$za.tip.open({
					text: err.message
				})				
				break

			case 404:
				err.message = `请求地址出错: ${err.response.config.url}`
				Vue.$za.tip.open({
					text: err.message
				})				
				break

			case 408:
				err.message = '请求超时'
				Vue.$za.tip.open({
					text: err.message
				})				
				break

			case 500:
				err.message = '服务器内部错误'
				Vue.$za.tip.open({
					text: err.message
				})				
				break

			default:
		}
	}

	return Promise.reject(err)
})

export default http