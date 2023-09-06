import request from '@/utils/request'

// 指标管理  扣分指标相关操作
// 获取政府网站下的所有二级指标
export function getPointList() {
  return request({
    url: '/api/point/',
    method: 'get',
    params: { 'level': 1, 'point_classify': 0 }
  })
}

// 根据是否是程序可以评分, is_program =1, 筛选出程序可以评分的栏目类别
export function getColumnClassifyByIsProgram() {
  return request({
    url: '/api/point/',
    method: 'get',
    params: { 'is_program': 1 }
  })
}

// 获取政府网站下的所有二级指标, 扣分项
// export function getPointListMinus() {
//   return request({
//     url: '/api/point/',
//     method: 'get',
//     params: {'level': 1, 'point_classify': 0, 'point_type':0}
//   })
// }

// 获取政府网站下的所有二级指标, 加分项
// export function getPointListAdd() {
//   return request({
//     url: '/api/point/',
//     method: 'get',
//     params: {'level': 1, 'point_classify': 0, 'point_type':1}
//   })
// }

// 获取政府网站下所有的加分项 一级指标
export function getPointListAddFirstLevel() {
  return request({
    url: '/api/point/',
    method: 'get',
    params: { 'level': 0, 'point_classify': 0, 'point_type': 1 }
  })
}

// 获取政府网站下所有的扣分项 一级指标
export function getPointListMinusFirstLevel() {
  return request({
    url: '/api/point/',
    method: 'get',
    params: { 'level': 0, 'point_classify': 0, 'point_type': 1 }
  })
}

// 获取政府网站下的所有, 扣分项, point_classify 表示是网站还是新媒体
export function getPointListMinus() {
  return request({
    url: '/api/point/',
    method: 'get',
    params: { 'point_classify': 0, 'point_type': 0 }
  })
}

export function getPointListMinusXinmeiti() {
  return request({
    url: '/api/point/',
    method: 'get',
    params: { 'point_classify': 1, 'point_type': 0 }
  })
}

// 获取政府网站下的所有二级指标, 加分项
export function getPointListAdd() {
  return request({
    url: '/api/point/',
    method: 'get',
    params: { 'point_classify': 0, 'point_type': 1 }
  })
}

// 获取指定站点的指标得分
// export function getScoreInfo(id) {
//   return request({
//     url: '/api/scoreinfo/',
//     method: 'get',
//     params: {'site_id': id,}
//   })
// }

// 添加扣分指标项
export function insertData(data) {
  return request({
    url: '/api/point/',
    method: 'post',
    data
  })
}

// 更新扣分指标项
export function updateData(id, data) {
  return request({
    url: '/api/point/' + id + '/',
    method: 'put',
    data
  })
}

// 删除扣分指标项
export function deleteData(id) {
  return request({
    url: '/api/point/' + id + '/',
    method: 'delete'
  })
}
// 删除扣分指标项
export function deleteScoreData(id) {
  return request({
    url: '/api/earlywarning/' + id + '/',
    method: 'delete'
  })
}

// 获取指标树
export function getPointListTree(site_classify) {
  return request({
    url: '/api/pointtree/?site_classify=' + site_classify,
    method: 'get'
  })
}
