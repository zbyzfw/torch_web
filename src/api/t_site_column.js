import request from '@/utils/request'

// 栏目表相关操作

// 根据站点表id查询该站点表中的所有栏目
export function queryColumnBySiteId(site_id, page, size) {
  return request({
    url: '/api/sitecolumn/?site_id=' + site_id + '&page=' + page + '&size=' + size,
    method: 'get'
    // params:{}
  })
}

// 栏目表中添加数据
export function insertData(data) {
  return request({
    url: '/api/sitecolumn/',
    method: 'post',
    data
  })
}

// 更新栏目表中的数据
export function updateData(id, data) {
  return request({
    url: '/api/sitecolumn/' + id + '/',
    method: 'put',
    data
  })
}

// 删除站点表中的数据
export function deleteData(id) {
  return request({
    url: '/api/sitecolumn/' + id + '/',
    method: 'delete'
  })
}

// 根据条件查询栏目表中的数据
export function queryByCityIdAndColumnName(city_id, column_name) {
  return request({
    url: '/api/sitecolumn/',
    method: 'get',
    params: { 'city_id': city_id, 'column_name': column_name }
  })
}

// 根据城市id和站点类别查询栏目表中的数据
export function queryColumnByCityIdAndSiteClassify(city_id, site_classify, page, size) {
  return request({
    url: '/api/sitecolumn/?city_id=' + city_id + '&type=' + site_classify + '&page=' + page + '&size=' + size,
    method: 'get'
  })
}

// 根据关键词查询栏目表中的网站栏目表
export function searchColumnBySiteIdAndKeyword(site_id, keyword, page, size) {
  return request({
    url: '/api/sitecolumn/?site_id=' + site_id + '&search=' + keyword + '&page=' + page + '&size=' + size,
    method: 'get'
  })
}

// 根据城市id和站点类别查询栏目表中的新媒体数据
export function searchXinMeiTiByCityIdAndSiteClassify(city_id, site_classify, keyword, page, size) {
  return request({
    url: '/api/sitecolumn/?city_id=' + city_id + '&type=' + site_classify + '&search=' + keyword + '&page=' + page + '&size=' + size,
    method: 'get'
  })
}

// 栏目表中查询新媒体数据
// 根据站点表id查询该站点表中的所有栏目
// export function queryWeiXinBySiteId(site_id) {
//   return request({
//     url: '/api/sitecolumn/',
//     method: 'get',
//     params:{"site_id":site_id}
//     // params:{}
//   })
// }

// 栏目表中添加新媒体数据
export function insertNewMediaColumn(data) {
  return request({
    url: '/api/columncreate/',
    method: 'post',
    data
  })
}

// 获取新媒体的数据

// // 根据城市id和站点类别查询栏目表中的新媒体微信数据
// export function queryLingCaiWeixinByCityIdAndSiteClassify(city_id, site_classify, keyword, page, size) {
//   return request({
//     url: '/api/wxlist/?city_id=' + city_id + '&type=' + site_classify + '&search=' + keyword + '&page=' + page + '&size=' + size,
//     method: 'get',
//   })
// }
//
//
// // 根据城市id和站点类别查询栏目表中的新媒体数据
// export function queryLingCaiWeiboByCityIdAndSiteClassify(city_id, site_classify, keyword, page, size) {
//   return request({
//     url: '/api/weibolist/?city_id=' + city_id + '&type=' + site_classify + '&search=' + keyword + '&page=' + page + '&size=' + size,
//     method: 'get',
//   })
// }

