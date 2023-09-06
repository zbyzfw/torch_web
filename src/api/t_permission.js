import request from '@/utils/request'

// 站点表相关操作
// 展示所有用户
export function queryAll(page, size) {
  return request({
    // url: '/auth/user/list/?page='+page,
    url: '/auth/permissions/?page=' + page + '&size=' + size,
    method: 'get'
  })
}

// 根据站点名称查询站点表中的数据
export function searchByKeyword(keyword, page, size) {
  return request({
    url: '/auth/permissions/?search=' + keyword + '&page=' + page + '&size=' + size,
    method: 'get'
  })
}

export function searchColumnBySiteIdAndKeyword(site_id, keyword, page, size) {
  return request({
    url: '/api/sitecolumn/?site_id=' + site_id + '&search=' + keyword + '&page=' + page + '&size=' + size,
    method: 'get'
  })
}

// 添加权限
export function insertData(data) {
  return request({
    url: '/auth/permissions/',
    method: 'post',
    data
  })
}

// 更新权限
export function updateData(id, data) {
  return request({
    url: '/auth/permissions/' + id + '/',
    method: 'put',
    data
  })
}

// 删除权限
export function deleteData(id) {
  return request({
    url: '/auth/permissions/' + id + '/',
    method: 'delete'
  })
}

