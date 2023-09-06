import request from '@/utils/request'

// 用户角色相关操作
// 展示所有用户角色
export function getRole(page, size) {
  return request({
    url: '/auth/roles/?page=' + page + '&size=' + size,
    method: 'get'
  })
}

// 添加用户
export function insertData(data) {
  return request({
    url: '/auth/roles/',
    method: 'post',
    data
  })
}

// 更新用户
export function updateData(id, data) {
  return request({
    url: '/auth/roles/' + id + '/',
    method: 'put',
    data
  })
}

// 删除用户
export function deleteData(id) {
  return request({
    url: '/auth/roles/' + id + '/',
    method: 'delete'
  })
}

