import request from '@/utils/request'

// 阶段任务和该阶段任务内定报告主观性问题描述

// 获取
export function queryAll(page, size) {
  return request({
    url: '/api/taskproblemdescription/?page=' + page + '&size=' + size,
    method: 'get'
  })
}

export function queryCurrentTaskProblem(page, size) {
  return request({
    url: '/api/taskproblemdescription/?page=' + page + '&size=' + size,
    method: 'get'
  })
}

// 添加
export function insertData(data) {
  return request({
    url: '/api/taskproblemdescription/',
    method: 'post',
    data
  })
}

// 修改
export function updateData(id, data) {
  return request({
    url: '/api/taskproblemdescription/' + id + '/',
    method: 'put',
    data
  })
}

// 删除
export function deleteData(id) {
  return request({
    url: '/api/taskproblemdescription/' + id + '/',
    method: 'delete'
  })
}

// 查询
export function searchData(task_id, page, size) {
  return request({
    url: '/api/taskproblemdescription/?task=' + task_id +
      '&page=' + page + '&size=' + size,
    method: 'get'
  })
}
