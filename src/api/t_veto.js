import request from '@/utils/request'

// 指标管理  扣分指标相关操作
// 获取政府网站下的所有二级指标
export function getPointList() {
  return request({
    url: '/api/veto/',
    method: 'get',
    params: { 'level': 1, 'point_classify': 0 }
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
    url: '/api/veto/',
    method: 'get',
    params: { 'level': 0, 'point_classify': 0, 'point_type': 1 }
  })
}

// 获取政府网站下的所有, 扣分项
export function getPointListMinus() {
  return request({
    url: '/api/veto/',
    method: 'get',
    params: { 'point_classify': 0, 'point_type': 0 }
  })
}

// 获取政府网站下的所有二级指标, 加分项
export function getPointListAdd(veto_classify) {
  return request({
    url: '/api/veto/',
    method: 'get',
    params: { 'veto_classify': veto_classify }
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
    url: '/api/veto/',
    method: 'post',
    data
  })
}

// 更新扣分指标项
export function updateData(id, data) {
  return request({
    url: '/api/veto/' + id + '/',
    method: 'put',
    data
  })
}

// 删除扣分指标项
export function deleteData(id) {
  return request({
    url: '/api/veto/' + id + '/',
    method: 'delete'
  })
}
