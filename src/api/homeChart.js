import request from '@/utils/request'

// 获取年
export function getYear() {
  return request({
    url: '/api/home/year/',
    method: 'get'
  })
}

// 获取季度
export function getQuarter(year) {
  return request({
    url: '/api/home/quarter/?year=' + year,
    method: 'get'
  })
}

// 获取taskId
export function getTaskId(year, quarter) {
  return request({
    url: '/api/home/task_id/?year=' + year + '&quarter=' + quarter,
    method: 'get'
  })
}

// 合格率占比
export function getRate(task_id) {
  return request({
    url: '/api/home/citiesstatistics/?task_id=' + task_id,
    method: 'get'
  })
}

// 百分率
export function getPercent(task_id) {
  return request({
    url: '/api/home/percentage/?task_id=' + task_id,
    method: 'get'
  })
}

// 不合格名单
export function getDisqualification(task_id) {
  return request({
    url: '/api/home/disqualification/?task_id=' + task_id,
    method: 'get'
  })
}

// 加分榜
export function getAwardedMarks(task_id) {
  return request({
    url: '/api/home/websiteaddscore/?task_id=' + task_id,
    method: 'get'
  })
}

// 问题比例
export function getProblemRatio(task_id) {
  return request({
    url: '/api/home/problemratio/?task_id=' + task_id,
    method: 'get'
  })
}

// 网站总访问量 成功量 失败量 连通率
export function getWebsiteVisit(task_id) {
  return request({
    url: '/api/home/websitevisit/?task_id=' + task_id,
    method: 'get'
  })
}

// 第一行统计
export function getFirstLineStatistics(task_id) {
  return request({
    url: '/api/home/firstlinestatistics/?task_id=' + task_id,
    method: 'get'
  })
}

// 政务新媒体数据 不同类型新媒体合格率占比
export function getMediaClassifyPass(task_id) {
  return request({
    url: '/api/home/mediaclassifypass/?task_id=' + task_id,
    method: 'get'
  })
}

// 获取当前年份季度信息
export function getCurrentTaskInfo(task_id) {
  return request({
    url: '/api/home/current_task_info/',
    method: 'get'
  })
}
