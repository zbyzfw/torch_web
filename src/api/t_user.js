import request from '@/utils/request'

// 站点表相关操作
// 展示所有用户, 有分页
export function queryAll(page, size, department_id) {
  return request({
    // url: '/auth/user/list/?page='+page,
    url: '/auth/users/?page=' + page + '&size=' + size,
    method: 'get',
    params: { 'page': page, 'size': size, 'department': department_id }
  })
}

// 展示所有用户, 没有分页
export function allUser() {
  return request({
    // url: '/auth/user/list/?page='+page,
    url: '/auth/user/list/',
    method: 'get'
  })
}

// 根据站点名称查询用户表中的数据
export function searchByKeyword(keyword, page) {
  return request({
    url: '/auth/user/list/?search=' + keyword + '&page=' + page,
    method: 'get'
  })
}

// 根据城市ID,根据用户名称搜索数据
export function searchByCityIdAndKeyword(city_id, keyword, page) {
  return request({
    url: '/auth/user/list/?city_id=' + city_id + '&search=' + keyword + '&page=' + page,
    method: 'get'
  })
}

// 根据城市ID,站点分类下根据用户名称搜索数据
export function searchByCityIdAndSiteClassifyAndKeyword(city_id, site_classify, keyword, page) {
  return request({
    url: '/auth/user/list/?city_id=' + city_id + '&site_classify=' + site_classify + '&search=' + keyword + '&page=' + page,
    method: 'get'
  })
}

// export function query(keyword) {
//   return request({
//     url: '/api/website/?keyword='+keyword,
//     method: 'get',
//     // params: {}
//   })
// }

// 根据城市id查询用户表中的数据
// http://127.0.0.1:8000/api/website/?city_id=11
export function queryByCityId(city_id, page) {
  return request({
    url: '/auth/user/list/?city_id=' + city_id + '&page=' + page,
    method: 'get'

  })
}

// 根据城市id和站点类别查询用户表中的数据
export function queryByCityIdAndSiteClassify(city_id, site_classify, page) {
  return request({
    url: '/auth/user/list/?city_id=' + city_id + '&site_classify=' + site_classify + '&page=' + page,
    method: 'get'
  })
}

// 添加用户
export function insertData(data) {
  return request({
    url: '/auth/users/',
    method: 'post',
    data
  })
}

// 更新用户表中的数据
export function updateData(id, data) {
  return request({
    url: '/auth/users/' + id + '/',
    method: 'put',
    data
  })
}

// 删除用户表中的数据
export function deleteData(id) {
  return request({
    url: '/auth/users/' + id + '/',
    method: 'delete'
  })
}

// 用户操作日志记录
export function userOperationLog(page, size) {
  return request({
    // url: '/auth/user/list/?page='+page,
    url: '/api/ops/operationlog/?page=' + page + '&size=' + size,
    method: 'get'
  })
}
