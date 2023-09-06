import request from '@/utils/request'

// 登录
export function login(data) {
  return request({
    url: '/auth/login/',
    method: 'post',
    data
  })
}

export function getInfo(token) {
  return request({
    url: '/auth/info/',
    method: 'get',
    params: { token }
  })
}

export function logout() {
  return request({
    url: '/accounts/logout/',
    method: 'get'
  })
}

// 获取短信验证码
export function getMsgCode(mobile) {
  return request({
    url: '/auth/sendsms/?mobile=' + mobile,
    method: 'get'
  })
}

// 用户列表页， 获取部门树
export function queryDepartmentTree() {
  return request({
    url: '/auth/department/tree/',
    method: 'get'
  })
}

// 根据department_id, 查询用户
export function queryUserByDepartmentId(department_id) {
  return request({
    url: '/auth/user/list/?department_id=' + department_id,
    method: 'get'
  })
}
