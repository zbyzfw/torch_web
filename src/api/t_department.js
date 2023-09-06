import request from '@/utils/request'

// 站点表相关操作
// 展示所有部门
export function getDepartment(page, size) {
  return request({
    url: '/auth/departments/?page=' + page + '&size=' + size,
    method: 'get'
  })
}

// 添加用户
export function insertData(data) {
  return request({
    url: '/auth/departments/',
    method: 'post',
    data
  })
}

// 更新站点表中的数据
export function updateData(id, data) {
  return request({
    url: '/auth/departments/' + id + '/',
    method: 'put',
    data
  })
}

// 删除站点表中的数据
export function deleteData(id) {
  return request({
    url: '/auth/departments/' + id + '/',
    method: 'delete'
  })
}

