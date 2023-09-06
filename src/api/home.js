import request from '@/utils/request'

// 获取首页数据
// 获取门户,非门户,新媒体 合格,不合格相关 统计
export function getHomeStatistics(task_id) {
  return request({
    url: '/api/homestatistics/?task_id=' + task_id,
    method: 'get'
  })
}

// 获取不合格数据,及不合格原因
export function getTypeStatistics(task_id) {
  return request({
    url: '/api/typestatistics/?task_id=' + task_id,
    method: 'get'
  })
}

// 获取政府网站检查情况
export function getCityStatistics(task_id) {
  return request({
    url: '/api/citystatistics/?task_id=' + task_id,
    method: 'get'
  })
}

// 获取政务新媒体查情况
export function getNewMediaCityStatistics(task_id) {
  return request({
    url: '/api/media/passrates/?task_id=' + task_id,
    method: 'get'
  })
}

// 获取市、县政府门户网站分段名单
export function menhuWebsitesubsectionStatistics(task_id) {
  return request({
    url: '/api/gradestatistics/?task_id=' + task_id,
    method: 'get'
  })
}

// 获取县级政府门户网站得分分段情况
export function getCountyListStatistics(task_id) {
  return request({
    url: '/api/county-statistics/?task_id=' + task_id,
    method: 'get'
  })
}

// 根据 需求名称、年、季度、阶段 筛选任务
export function queryTaskByRequirementYearQuarterPhase(group_id, year, quarter, phase) {
  return request({
    url: '/api/getphase/?group_id=' + group_id + '&year=' + year + '&quarter=' + quarter + '&phase=' + phase,
    method: 'get'
  })
}

// 获取历史合格率
export function getHistoryPassData(task_id) {
  return request({
    url: '/api/historystatistics/?task_id=' + task_id,
    method: 'get'
  })
}
