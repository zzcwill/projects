import Axios from 'axios'
import { Message } from 'element-ui'
import store from '@/store'
import Qs from 'qs'

const http = Axios.create({
	// api的base_url
	baseURL: process.env.VUE_APP_BASE_API,
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
  if (store.getters.token) {
    config.headers['token'] = store.getters.token
  }
	return config
}, error => {
})

// 拦截响应response，并做一些错误处理
http.interceptors.response.use((response) => {
  const res = response.data

  if (res.code !== 10000) {
    Message({
      message: res.message || 'Error',
      type: 'error',
      duration: 5 * 1000
    })
    return
  }

  return res
}, (err) => {
	// http状态码不为200时-错误处理
	if (err) {
    Message({
      message: err,
      type: 'error',
      duration: 5 * 1000
    })
	}
})

export default http
