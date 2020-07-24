import Axios from 'axios'
import Qs from 'qs'
import { Toast } from 'vant'
import { getToken } from '@/utils/auth'
import { getTimeMs } from '@/utils/time'

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
  if (getToken()) {
    config.headers['token'] = getToken()
	}
	config.headers['jonId'] = getTimeMs()
	return config
}, error => {
	console.log(error)
	Promise.reject(error)
})

// 拦截响应response，并做一些错误处理
http.interceptors.response.use((response) => {
  const res = response.data
  if (res.code !== 0) {
    Toast({
      position: 'bottom',
      message: res.msg || 'Error'
    }) 
    //登录失效的操作，目前没
    // if (res.code === 20001) {
    // }
    return Promise.reject(new Error(res.msg || 'Error'))
  } else {
    return res
  }
}, (err) => {
	// 这里是返回状态码不为200时候的错误处理
	if (err && err.response) {
    Toast({
      position: 'bottom',
      message: `${err.response.data.path}报错: ${err.response.data.message}`
    })
	}
	return Promise.reject(err)
})

export default http
