import request from '@/utils/request'

// 获取所有阶段任务
export function queryAllTask(page, size) {
  return request({
    url: '/mon/phaseinfo/?page=' + page + '&size=' + size,
    method: 'get'
  })
}

// 根据名称查询表中的数据
export function searchByKeywordTask(keyword, page, size) {
  return request({
    url: '/api/phaseinfo/?search=' + keyword + '&page=' + page + '&size=' + size,
    method: 'get'
  })
}

// 添加用户
export function insertDataTask(data) {
  return request({
    url: '/mon/phaseinfo/',
    method: 'post',
    data
  })
}

// 更新站点表中的数据
export function updateDataTask(id, data) {
  return request({
    url: '/mon/phaseinfo/' + id + '/',
    method: 'put',
    data
  })
}

// 删除站点表中的数据
export function deleteDataTask(id) {
  return request({
    url: '/mon/phaseinfo/' + id + '/',
    method: 'delete'
  })
}

// 需求名称相关操作
// 获取所有需求， 有分页
export function queryAllRequirement(page, size) {
  return request({
    url: '/api/taskgroup/?page=' + page + '&size=' + size,
    method: 'get'
  })
}

// 获取需求树， 无分页
export function getRequirementTree() {
  return request({
    url: '/api/taskgrouptree/',
    method: 'get'
  })
}

// 根据名称查询需求
export function searchByKeywordRequirement(keyword, page, size) {
  return request({
    url: '/api/taskgroup/?search=' + keyword + '&page=' + page + '&size=' + size,
    method: 'get'
  })
}

// 添加需求
export function insertDataRequirement(data) {
  return request({
    url: '/api/taskgroup/',
    method: 'post',
    data
  })
}

// 更新需求
export function updateDataRequirement(id, data) {
  return request({
    url: '/api/taskgroup/' + id + '/',
    method: 'put',
    data
  })
}

// 删除需求
export function deleteDataRequirement(id) {
  return request({
    url: '/api/taskgroup/' + id + '/',
    method: 'delete'
  })
}

// 获取任务管理中的年， 无分页
export function getYearTree() {
  return request({
    url: '/api/getyear/',
    method: 'get'
  })
}

// 根据 需求名称 和 年 筛选任务
export function queryTaskByRequirementYear(group_id, year) {
  return request({
    url: '/mon/phaseinfo/?group_id=' + group_id + '&year=' + year,
    method: 'get'
  })
}

// 网站 获取未选站点
export function getNotSelectSite(task_id) {
  return request({
    url: '/api/site/select/?task_id=' + task_id,
    method: 'get'
  })
}

// 网站 获取已选站点
export function getHaveSelectSite(task_id) {
  return request({
    url: '/api/site/haveselect/?task_id=' + task_id,
    method: 'get'
  })
}

// 新媒体 获取未选站点
export function getNotSelectNewMedia(task_id) {
  return request({
    url: '/api/media/select/?task_id=' + task_id,
    method: 'get'
  })
}

// 新媒体 获取已选站点
export function getHaveSelectNewMedia(task_id) {
  return request({
    url: '/api/media/haveselect/?task_id=' + task_id,
    method: 'get'
  })
}

// 更新阶段中的所选网站
export function updateSeletedSite(data) {
  return request({
    url: '/api/site/select/',
    method: 'post',
    data
  })
}

// 更新阶段中的所选新媒体
export function updateSeletedNewMedia(data) {
  return request({
    url: '/api/media/select/',
    method: 'post',
    data
  })
}

// 数据迁移, 将第一阶段的结果数据, 作为第二阶段的初始数据
// 更新阶段中的所选新媒体
export function migrageScoreDetail(sign) {
  return request({
    url: '/mon/celery/migrate-score-detail?sign=' + sign,
    method: 'get'
  })
}
