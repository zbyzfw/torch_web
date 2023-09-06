import request from '@/utils/request'

// 栏目表相关操作

// 查询单个栏目
export function queryColumn(site_id, url, column_name) {
  return request({
    url: '/api/columncreate/',
    method: 'get',
    params: { 'column_url': url, 'site_id': site_id, 'column_name': column_name }
  })
}

export function queryColumnConfig(id) {
  return request({
    url: '/api/sitecolumnconfig/',
    method: 'get',
    params: { 'column_id': id }
  })
}

// 栏目表中添加数据
export function insertColumnConfig(data) {
  return request({
    url: '/api/sitecolumnconfig/',
    method: 'post',
    data
  })
}

// 更新栏目表中的数据
export function updateColumnConfig(id, data) {
  if (id == '') {
    return request({
      url: '/api/sitecolumnconfig/',
      method: 'post',
      data
    })
  } else {
    return request({
      url: '/api/sitecolumnconfig/' + id + '/',
      method: 'put',
      data
    })
  }
}

export function testColumnRule(data) {
  return request({
    url: '/api/testrules/',
    method: 'get',
    params: { ...data }
  })
}

// 删除站点表中的数据
// export function deleteData(id) {
//   return request({
//     url: '/api/sitecolumn/' + id + '/',
//     method: 'delete',
//   })
// }

// 根据条件查询栏目表中的数据
// export function queryByCityIdAndColumnName(city_id, column_name) {
//   return request({
//     url: '/api/sitecolumn/',
//     method: 'get',
//     params:{"city_id":city_id, "column_name":column_name}
//   })
// }

// 根据城市id和站点类别查询栏目表中的数据
// export function queryColumnByCityIdAndSiteClassify(city_id, site_classify, page) {
//   return request({
//     url: '/api/sitecolumn/?city_id='+city_id +'&type=' + site_classify + '&page='+page,
//     method: 'get',
//   })
// }
