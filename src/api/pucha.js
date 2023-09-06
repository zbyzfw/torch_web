import request from '@/utils/request'

// 站点表相关操作
// 获取站点表全部数据
export function queryAll(page, size) {
  return request({
    url: '/api/websitepartal/?page=' + page + '&size=' + size,
    method: 'get'
  })
}

// 获取门户网站和非门户网站的数据
export function queryAllWangZhan(page) {
  return request({
    url: '/api/websitepartal/?page=' + page + '&site_classify=0',
    method: 'get'
  })
}

// 获取所有参与普查的数据
export function queryAllByStatus(page, size) {
  return request({
    url: '/api/websitepartal/?page=' + page + '&size=' + size,
    method: 'get'
  })
}

// 根据站点名称查询站点表中的数据
export function searchByKeyword(keyword, page, size) {
  return request({
    url: '/api/websitepartal/?search=' + keyword + '&page=' + page + '&size=' + size,
    method: 'get'
  })
}

export function searchByKeywordAndStatus(keyword, page, size) {
  return request({
    url: '/api/websitepartal/?search=' + keyword + '&page=' + page + '&size=' + size,
    method: 'get'
  })
}

// 根据城市ID,根据站点名称搜索数据
export function searchByCityIdAndKeyword(city_id, keyword, page, size) {
  return request({
    url: '/api/websitepartal/?city_id=' + city_id + '&search=' + keyword + '&page=' + page + '&size=' + size,
    method: 'get'
  })
}

export function searchByCityIdAndKeywordAndStatus(city_id, keyword, page, size) {
  return request({
    url: '/api/websitepartal/?city_id=' + city_id + '&search=' + keyword + '&page=' + page + '&size=' + size,
    method: 'get'
  })
}

// 根据城市ID,站点分类下根据站点名称搜索数据
export function searchByCityIdAndSiteClassifyAndKeyword(city_id, site_classify, keyword, page, size) {
  return request({
    url: '/api/websitepartal/?city_id=' + city_id + '&site_classify=' + site_classify + '&search=' + keyword + '&page=' + page + '&size=' + size,
    method: 'get'
  })
}

// 普查工作 站点列表页面搜索站点（站点名称、站点类型、城市）
export function searchByCityIdAndSiteClassifyAndKeywordAndStatus(city_id, site_classify, keyword, page, size) {
  return request({
    url: '/api/websitepartal/?city_id=' + city_id + '&site_classify=' + site_classify + '&search=' + keyword + '&page=' + page + '&size=' + size,
    method: 'get'
  })
}

// 普查工作 站点列表页面搜索站点（站点名称、网站标识码、站点类型、城市）
export function searchBySiteNameWebBsmSiteClassifyStatus(search, web_bsm, site_classify, status, city_id, page, size) {
  return request({
    url: '/api/websitepartal/?search=' + search + '&web_bsm=' + web_bsm +
      '&site_classify=' + site_classify + '&status=' + status +
      '&city_id=' + city_id +
      '&page=' + page + '&size=' + size,
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

// 源管理 新媒体 查找新媒体的数据
export function queryNewMediaByCityIdSiteClassity(city_id, media_classify, page, size) {
  return request({
    url: '/api/newmedia/?city_id=' + city_id + '&site_classify=' + media_classify + '&page=' + page + '&size=' + size,
    method: 'get'
  })
}

// 源管理 新媒体 更新新媒体的数据
export function updateMediaData(id, data) {
  return request({
    url: '/api/newmedia/' + id + '/',
    method: 'put',
    data
  })
}

// 源管理 新媒体 根据 名称, 新媒体标识码 搜索新媒体
export function queryNewMediaByCityIdSiteClassityNameBizId(city_id, media_classify, media_name, biz_id, page, size) {
  return request({
    url: '/api/newmedia/?city_id=' + city_id + '&site_classify=' + media_classify +
      '&search=' + media_name + '&biz_id=' + biz_id +
      '&page=' + page + '&size=' + size,
    method: 'get'
  })
}

// 普查工作 新媒体 查找新媒体的数据
export function queryNewMediaByCityIdSiteClassityPucha(city_id, media_classify, page, size) {
  return request({
    url: '/api/newmediapartal/?city_id=' + city_id + '&site_classify=' + media_classify + '&page=' + page + '&size=' + size,
    method: 'get'
  })
}

// 普查工作 新媒体 根据 名称, 新媒体标识码 搜索新媒体
export function queryNewMediaByCityIdSiteClassityNameBizIdPucha(city_id, media_classify, media_name, biz_id, page, size) {
  return request({
    url: '/api/newmediapartal/?city_id=' + city_id + '&site_classify=' + media_classify +
      '&search=' + media_name + '&biz_id=' + biz_id +
      '&page=' + page + '&size=' + size,
    method: 'get'
  })
}

// 根据城市id查询站点表中的数据
// // http://127.0.0.1:8000/api/website/?city_id=11
export function queryByCityId(city_id, page, size) {
  return request({
    url: '/api/websitepartal/?city_id=' + city_id + '&page=' + page + '&size=' + size,
    method: 'get'
  })
}

export function queryByCityIdAndStatus(city_id, page, size) {
  return request({
    url: '/api/websitepartal/?city_id=' + city_id + '&page=' + page + '&size=' + size,
    method: 'get'

  })
}
//
//
// // 根据城市id和站点类别查询站点表中的数据
export function queryByCityIdAndSiteClassify(city_id, site_classify, page, size) {
  return request({
    url: '/api/websitepartal/?city_id=' + city_id + '&site_classify=' + site_classify + '&page=' + page + '&size=' + size,
    method: 'get'
  })
}

// 根据城市id和站点类别查询站点表中的数据
export function queryByCityIdAndSiteClassifyAndStatus(city_id, site_classify, page, size) {
  return request({
    url: '/api/websitepartal/?city_id=' + city_id + '&site_classify=' + site_classify + '&page=' + page + '&size=' + size,
    method: 'get'
  })
}

//
// // 站点表中添加数据
// export function insertData(data) {
//   return request({
//     url: '/api/website/',
//     method: 'post',
//     data
//   })
// }
//
// // 更新站点表中的数据
// export function updateData(id, data) {
//   return request({
//     url: '/api/website/' + id + '/',
//     method: 'put',
//     data
//   })
// }
//
// // 删除站点表中的数据
// export function deleteData(id) {
//   return request({
//     url: '/api/website/' + id + '/',
//     method: 'delete',
//   })
// }

// 获取单否指标
export function getVetoList(type) {
  if (type) {
    return request({
      url: '/api/veto/',
      method: 'get',
      params: { 'veto_classify': 1 }
    })
  } else {
    return request({
      url: '/api/veto/',
      method: 'get',
      params: { 'veto_classify': 0 }
    })
  }
}

// 获取政府网站下扣分项的所有二级指标
export function getPointList(type) {
  if (type) {
    return request({
      url: '/api/point/',
      method: 'get',
      params: { 'level': 0, 'point_classify': 1, 'point_type': 0 }
    })
  } else {
    return request({
      url: '/api/point/',
      method: 'get',
      params: { 'level': 1, 'point_classify': 0, 'point_type': 0 }
    })
  }
}
// 获取政府网站下加分项的所有二级指标
export function getinPointList() {
  return request({
    url: '/api/point/',
    method: 'get',
    params: { 'level': 1, 'point_classify': 0, 'point_type': 1, 'ordering': 'pid' }
  })
}

// 获取指定站点的指标得分
export function getScoreInfo(id) {
  return request({
    url: '/api/scoreinfodetail/' + id,
    method: 'get'
  })
}

// 获取指定站点扣分指标得分
export function getScoreDetail(id, type, task_id) {
  if (type) {
    return request({
      url: '/api/pointscore/',
      method: 'get',
      params: { 'site_column_id': id, 'point_type': 0, 'level': 0, 'point_classify': 1, 'task_id': task_id }
    })
  } else {
    return request({
      url: '/api/pointscore/',
      method: 'get',
      params: { 'site_id': id, 'point_type': 0, 'level': 1, 'point_classify': 0, 'task_id': task_id }
    })
  }
}

// 获取指定站点的加分指标得分
export function getInScoreDetail(id, task_id) {
  return request({
    url: '/api/pointscore/',
    method: 'get',
    params: { 'site_id': id, 'point_type': 1, 'level': 1, 'point_classify': 0, 'ordering': 'pid', 'task_id': task_id }
  })
}

// 获取单否指标得分
export function getVetoDetail(id, type, task_id) {
  if (type) {
    return request({
      url: '/api/vetoscore/',
      method: 'get',
      params: { 'site_column_id': id, 'veto_classify': 1, 'task_id': task_id }
    })
  } else {
    return request({
      url: '/api/vetoscore/',
      method: 'get',
      params: { 'site_id': id, 'veto_classify': 0, 'task_id': task_id }
    })
  }
}

// 更新指标得分
export function updateScoreInfo(id, data) {
  return request({
    url: '/api/scoredetail/' + id + '/',
    method: 'put',
    data
  })
}

// 刷新单个站点的程序打分
export function scoreRefresh(id) {
  return request({
    url: '/mon/refreshscore/' + id,
    method: 'post'
  })
}

// 根据条件查询站点表中的数据
export function getVeto(params) {
  return request({
    url: '/api/veto/',
    method: 'get',
    params: {}
  })
}

// 站点表中添加数据
export function insertVeto(data) {
  return request({
    url: '/api/veto/',
    method: 'post',
    data

  })
}

// 更新站点表中的数据
export function updateVeto(id, data) {
  return request({
    url: '/api/veto/' + id + '/',
    method: 'put',
    data
  })
}

// 删除站点表中的数据
export function deleteVeto(id) {
  return request({
    url: '/api/veto/' + id + '/',
    method: 'delete'
  })
}

// 获取某个站点的普查总览数据
export function getScoreOverview(site_id, task_id) {
  return request({
    url: '/mon/infoview?site_id=' + site_id + '&task_id=' + task_id,
    method: 'get'
  })
}

// ScoreDetail.vue中接口数据  网站数据接口
export function getSingleSiteScoreDetail(site_id) {
  return request({
    url: '/api/singlesite/?site_id=' + site_id,
    method: 'get'
  })
}

// ScoreDetail.vue中接口数据  新媒体数据接口概览
export function getSingleSiteScoreDetailMediaDetail(site_column_id) {
  return request({
    url: '/api/singlesite/?site_column_id=' + site_column_id,
    method: 'get'
  })
}

// ScoreDetail.vue中接口数据  网站数据接口
export function getSingleSiteScoreDetailMedia(media_name, city_id, id, biz_id, site_classify) {
  return request({
    url: '/api/getmedia/?media_name=' + media_name + '&city_id=' + city_id + '&id=' + id +
      '&biz_id=' + biz_id + '&site_classify=' + site_classify,
    method: 'get'
  })
}

// 获取当前普查任务的全部信息(需求名称 年 季度 阶段)
export function getTaskName() {
  return request({
    url: '/api/gettask/',
    method: 'get'
  })
}

// 获取当前普查任务的全部信息(需求名称 年 季度 阶段), task_id
export function getTaskNameId() {
  return request({
    url: '/api/gettaskid/',
    method: 'get'
  })
}
