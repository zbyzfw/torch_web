import request from '@/utils/request'

// 任务阶段管理相关操作
// 展示所有任务阶段
export function getAllPhase(task_id) {
  return request({
    url: '/api/taskassignment/?task_id=' + task_id,
    method: 'get'
  })
}

// 添加用户
export function insertData(data) {
  return request({
    url: '/auth/departments/',
    method: 'post',
    data
  })
}

// 更新站点表中的数据
export function updateData(id, data) {
  return request({
    url: '/auth/departments/' + id + '/',
    method: 'put',
    data
  })
}

// 删除站点表中的数据
export function deleteData(id) {
  return request({
    url: '/auth/departments/' + id + '/',
    method: 'delete'
  })
}

// 修改分配任务人员的接口
export function updateAssignmentData(task_id, data) {
  return request({
    url: '/api/assignment/' + task_id + '/',
    method: 'put',
    data
  })
}

// 上传参与普查的网站列表
export function uploadWebsiteList(data) {
  return request({
    url: '/api/site/select/',
    method: 'post',
    data
  })
}

// 上传参与新媒体的网站列表
export function uploadMediaList(data) {
  return request({
    url: '/api/media/select/',
    method: 'post',
    data
  })
}

// 上传参与普查的新媒体excel文件
export function uploadMediaExcel(data) {
  return request({
    url: '/api/media/select/',
    method: 'put',
    data
  })
}
