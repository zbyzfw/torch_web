import axios from 'axios'
import { MessageBox, Message } from 'element-ui'
import store from '@/store'
import { getToken } from '@/utils/auth'

// create an axios instance
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 5000 // request timeout
})

// request interceptor
service.interceptors.request.use(
  config => {
    // do something before request is sent
    config.headers['Content-Type'] = 'application/json'
    if (getToken()) {
      // console.log("token",)
      config.headers['Authorization'] = 'jwt ' + getToken()
    }
    return config

    // old
    // if (store.getters.token) {
    //   // let each request carry token
    //   // ['X-Token'] is a custom headers key
    //   // please modify it according to the actual situation
    //   config.headers['X-Token'] = getToken()
    // }
    // return config
  },
  error => {
    // do something with request error
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  response => {
    // console.log(response) // for debug
    const code = response.status
    if (code < 200 || code > 300) {
      Message.error(response.data)
      return Promise.reject('error')
    } else {
      return response.data
    }
  },
  error => {
    // console.log('响应拦截器:',error.response)
    let code = 0
    try {
      code = error.response.status
    } catch (e) {
      if (error.toString().indexOf('timeout')) {
        Message.error('请求超时')
        return Promise.reject(error)
      }
    }
    if (code === 401) {
      MessageBox.confirm(
        '登录状态过期，您可以继续留在该页面，或者重新登录',
        '系统提示',
        {
          confirmButtonText: '重新登录',
          cancelButtonText: '取消',
          type: 'warning'
        }
      ).then(() => {
        store.dispatch('user/logout').then(() => {
          location.reload() // 为了重新实例化vue-router对象 避免bug
          // this.$router.push({ path:  '/' })
        })
      })
    } else if (code === 400) {
      if (error.response.data.detail) {
        Message.error(error.response.data.detail)
      } else {
        Message.error(JSON.stringify(error.response.data))
      }
      // Message.error({
      //   title: '错误',
      //   message: errorMsg,
      //   duration: 2500
      // })
    } else if (code === 403) {
      Message.error(error.response.data.detail)
    } else if (code === 502) {
      Message.error('后端服务器连接失败,请联系管理员')
    } else {
      const errorMsg = error.response.data.detail
      if (errorMsg !== undefined) {
        Message.error(errorMsg)
      }
    }
    return Promise.reject(error)
  }
)

export default service
