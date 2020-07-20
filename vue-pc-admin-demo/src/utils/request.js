import Axios from 'axios'
import { Message } from 'element-ui'
import store from '@/store'
import Qs from 'qs'

const http = Axios.create({
	// api的base_url
	baseURL: process.env.VUE_APP_BASE_API,
  timeout: 50000,
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
  if (store.getters.token) {
    config.headers['token'] = store.getters.token
  }
	return config
}, error => {
	console.log(error)
	Promise.reject(error)
})

// 拦截响应response，并做一些错误处理
http.interceptors.response.use((response) => {
  const res = response.data
  if (res.code === 10000) {
    return res
  }

  if (res.code !== 10000) {
    Message({
      message: res.message || 'Error',
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(new Error(res.message || 'Error'))
  }
}, (err) => {
	// 这里是返回状态码不为200时候的错误处理
	if (err && err.response) {
    Message({
      message: `${err.response.data.path}报错: ${err.response.data.message}`,
      type: 'error',
      duration: 5 * 1000
    })
	}
	return Promise.reject(err)
})

export default http
