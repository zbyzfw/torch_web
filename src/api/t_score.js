import request from '@/utils/request'

// 网站评分页

// 获取问题链接原因
export function queryYuanyin(detail_id, site_id, site_column_id, point_type, point_id, tid) {
  return request({
    url: '/api/imglink/?detail_id=' + detail_id + '&site_id=' + site_id + '&site_column_id=' + site_column_id +
      '&point_type=' + point_type + '&point_id=' + point_id + '&tid=' + tid,
    method: 'get'
  })
}

// 站点无法访问原因查看接口
export function querySiteNotVisitYuanyin(site_id) {
  return request({
    url: '/mon/sitemon/?site_id=' + site_id,
    method: 'get'
  })
}

// 删除问题图片
export function deleteYuanyinImg(id) {
  return request({
    url: '/api/imglink/' + id + '/',
    method: 'delete'
  })
}

// 填报原因, 上传图片
export function uploadYuanyinImg(data) {
  return request({
    url: '/api/imglink/',
    method: 'post',
    data
  })
}

// 获取历史普查时间
export function queryHistoryTime() {
  return request({
    url: '/api/selecttask/',
    method: 'get'
  })
}

// 普查工作 新媒体 备注获取
export function getRemarkValue(task_id, media_id) {
  return request({
    url: '/api/media/remark/?task_id=' + task_id + '&media_id=' + media_id,
    method: 'get'
  })
}

// 普查工作 新媒体提交备注
export function addMediaRemak(data) {
  return request({
    url: '/api/media/remark/',
    method: 'post',
    data
  })
}

