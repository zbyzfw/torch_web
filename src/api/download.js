import request from '@/utils/request'

// 下载中心

// 下载日志列表
export function getAllDownloadList(page, size) {
  return request({
    url: '/api/download/?page=' + page + '&size=' + size,
    method: 'get'
  })
}

// 根据task_id, 报告名称查询下载中心列表
export function getDownloadListByTaskIdReportName(task_id, name, page, size) {
  return request({
    url: '/api/download/?task_id=' + task_id + '&search=' + name + '&page=' + page + '&size=' + size,
    method: 'get'
  })
}

export function transReport(tid) {
  return request({
    url: '/api/transreport/',
    method: 'get',
    params: { 'task_id': tid }
  })
}
