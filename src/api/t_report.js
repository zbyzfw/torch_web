import request from '@/utils/request'

// 栏目表相关操作

// 根据站点表id查询该站点表中的所有栏目
// export function queryColumnBySiteId(site_id) {
//   return request({
//     url: '/api/report/',
//     method: 'get',
//     params:{"site_id":site_id}
//     // params:{}
//   })
// }

// 报告表相关操作
// 获取报告表全部数据
export function queryAll(page, size) {
  return request({
    url: '/api/report/?page=' + page + '&size=' + size,
    method: 'get'
  })
}

// 根据条件查询报告列表中的数据(城市id, task_id, 站点类型)
export function queryByCityIdTaskIDSiteClassify(city_id, task_id, type, search, page, size) {
  return request({
    url: '/api/report/?city_id=' + city_id + '&task_id=' + task_id + '&type=' + type + '&search=' + search + '&page=' + page + '&size=' + size,
    method: 'get'
  })
}

// 根据条件查询站点表中的数据
export function query(keyword, page, size) {
  return request({
    url: '/api/report/?search=' + keyword + '&page=' + page + '&size=' + size,
    method: 'get'
  })
}

// 统一生成报告相关接口

// 1. 获取 生成指定普查阶段全部报告 的sign
export function getSign(task_id) {
  return request({
    url: '/mon/exportall/?task_id=' + task_id,
    method: 'get'
  })
}

// 1. 获取 生成指定普查阶段网站全部报告 的sign
export function getSignWebsite(task_id) {
  return request({
    url: '/mon/celery/export-websites?task_id=' + task_id,
    method: 'get'
  })
}

// 1. 获取 生成指定普查阶段新媒体全部报告 的sign
export function getSignMedia(task_id) {
  return request({
    url: '/mon/celery/export-medias?task_id=' + task_id,
    method: 'get'
  })
}

// 2. 根据获取的sign 生成指定普查阶段全部报告
export function genPhraseAllReport(sign) {
  return request({
    url: '/mon/celery/status?sign=' + sign,
    method: 'get'
  })
}

// 获取 我为政府网站找错(网站) 的 sign
export function getFindErrorSignWebsite(task_id) {
  return request({
    url: '/mon/celery/export-finderror/all?task_id=' + task_id,
    method: 'get'
  })
}

// 获取 ipv6(网站) 的 sign
export function getIpv6SignWebsite(task_id) {
  return request({
    url: '/mon/celery/export-ipv6/all?task_id=' + task_id,
    method: 'get'
  })
}

// 获取 死链(网站) 的 sign
export function getDeadWrongChainSignWebsite(task_id) {
  return request({
    url: '/mon/celery/export-deadwrongchain/all?task_id=' + task_id,
    method: 'get'
  })
}

// 下载报告相关接口

// 下载指定普查阶段全部报告
export function downloadPhraseAllReport(task_id) {
  return request({
    url: '/api/reportdownload/?task_id=' + task_id,
    method: 'get'
  })
}

// 批量下载所选报告
export function downloadBatchReport(data) {
  return request({
    url: '/api/reportdownload/',
    method: 'post',
    data
  })
}

// 生成最新报告 网站
export function generateNewReportWebsite(task_id, site_id) {
  return request({
    url: '/api/exportreport/?task_id=' + task_id + '&site_id=' + site_id,
    method: 'get'
  })
}

// 生成最新报告 新媒体
export function generateNewReportNewMedia(task_id, site_column_id) {
  return request({
    url: '/api/exportreport/?task_id=' + task_id + '&site_column_id=' + site_column_id,
    method: 'get'
  })
}

// 下载 全省政府网站与政务新媒体检查情况 报告
export function downloadPhraseSummaryOutsiteReport(task_id) {
  return request({
    url: '/api/report/phase/summary/outsite/?task_id=' + task_id,
    method: 'get'
  })
}

// 下载 全省政府网站与政务新媒体检查及管理情况的通报 报告
export function downloadPhraseSummaryDetailReport(task_id) {
  return request({
    url: '/api/report/phase/summary/detail/?task_id=' + task_id,
    method: 'get'
  })
}

// 删除站点表中的数据
export function deleteData(id) {
  return request({
    url: '/api/report/' + id + '/',
    method: 'delete'
  })
}

// 获取某个报告（网站）
export function queryOneReport(site_id, task_id) {
  return request({
    url: '/api/exportreport/?site_id=' + site_id + '&task_id=' + task_id,
    method: 'get'
  })
}

// 获取某个报告（微信、微博）
export function queryOneReportMedia(site_column_id, task_id) {
  return request({
    url: '/api/exportreport/?site_column_id=' + site_column_id + '&task_id=' + task_id,
    method: 'get'
  })
}

// 普查结果  地市概览
export function queryCityReportSummary(city_id, task_id) {
  return request({
    url: '/api/regionstatistics/?city_id=' + city_id + '&task_id=' + task_id,
    method: 'get'
  })
}

// 普查结果 地市明细
export function queryCityReportDetail(city_id, task_id) {
  return request({
    url: '/api/detailstatistics/?city_id=' + city_id + '&task_id=' + task_id,
    method: 'get'
  })
}

// 生成单个站点我为政府网站找错报告
export function genFindErrorOne(task_id, site_id) {
  return request({
    url: '/mon/celery/export-finderror/one?task_id=' + task_id + '&site_id=' + site_id,
    method: 'get'
  })
}

// 下载单个站点我为政府网站找错报告
export function downFindErrorOne(task_id, site_id) {
  return request({
    url: '/mon/celery/download-finderror/one?task_id=' + task_id + '&site_id=' + site_id,
    method: 'get'
  })
}

// 生成单个站点ipv6报告
export function genIpv6One(task_id, site_id) {
  return request({
    url: '/mon/celery/export-ipv6/one?task_id=' + task_id + '&site_id=' + site_id,
    method: 'get'
  })
}

// 下载单个站点ipv6报告
export function downIpv6One(task_id, site_id) {
  return request({
    url: '/mon/celery/download-ipv6/one?task_id=' + task_id + '&site_id=' + site_id,
    method: 'get'
  })
}

// 生成单个站点死链错链报告
export function genDeadWrongChainOne(task_id, site_id) {
  return request({
    url: '/mon/celery/export-deadwrongchain/one?task_id=' + task_id + '&site_id=' + site_id,
    method: 'get'
  })
}

// 下载单个站点死链错链报告
export function downDeadWrongChainOne(task_id, site_id) {
  return request({
    url: '/mon/celery/download-deadwrongchain/one?task_id=' + task_id + '&site_id=' + site_id,
    method: 'get'
  })
}

// // 添加报表
// export function insertData(data) {
//   return request({
//     url: '/api/report/',
//     method: 'post',
//     data
//   })
// }
//
// // 更新报表中的数据
// export function updateData(id, data) {
//   return request({
//     url: '/api/report/' + id + '/',
//     method: 'put',
//     data
//   })
// }

// 批量上传文件数据文件入库模块(表述不规范, 常见错别字, 非法外链, 死链, 我为政府网站找错)
export function uploadFileListBatch(data) {
  return request({
    url: '/api/upload/data/',
    method: 'post',
    data
  })
}

// 查询 上传数据文件入库模块(表述不规范, 常见错别字, 非法外链, 死链, 我为政府网站找错) 模块
// 查询, 根据 阶段任务id(task), 上传类型 upload_type 查询 数据
// 表述不规范
export function getUploadIrregularExpression(task_id, upload_type, page, size) {
  return request({
    url: '/api/upload/irregular/expression/?task=' + task_id + '&upload_type=' + upload_type +
      '&page=' + page + '&size=' + size,
    method: 'get'
  })
}

// 表述不规范 筛选出有误报的数据
export function getUploadIrregularExpressionIsFalseAlarm(task_id, upload_type, person_check_status_value, page, size) {
  return request({
    url: '/api/upload/irregular/expressionalram/?task=' + task_id + '&upload_type=' + upload_type +
      '&person_check_status=' + person_check_status_value +
      '&page=' + page + '&size=' + size,
    method: 'get'
  })
}

// 表述不规范 筛选出有误报的数据 无分页
export function downloadIrregularExpressionIsFalseAlarm(task_id, upload_type, person_check_status_value) {
  return request({
    url: '/api/download/irregular/expressionalram/?task=' + task_id + '&upload_type=' + upload_type +
    '&person_check_status=' + person_check_status_value,
    method: 'get'
  })
}

// 查询, 根据 阶段任务id(task), 上传类型 upload_type 查询 数据
// 常见错别字
export function getUploadCommonTypos(task_id, upload_type, page, size) {
  return request({
    url: '/api/upload/common/typos/?task=' + task_id + '&upload_type=' + upload_type +
      '&page=' + page + '&size=' + size,
    method: 'get'
  })
}

// 常见错别字  无分页
export function downloadCommonTypos(task_id, upload_type) {
  return request({
    url: '/api/download/common/typos/?task=' + task_id + '&upload_type=' + upload_type,
    method: 'get'
  })
}

// 查询, 根据 阶段任务id(task), 上传类型 upload_type 查询 数据
// 非法外链
export function getUploadIllegalExternalchain(task_id, upload_type, page, size) {
  return request({
    url: '/api/upload/illegal/externalchain/?task=' + task_id + '&upload_type=' + upload_type +
      '&page=' + page + '&size=' + size,
    method: 'get'
  })
}

// 非法外链 无分页
export function downloadIllegalExternalchain(task_id, upload_type) {
  return request({
    url: '/api/download/illegal/externalchain/?task=' + task_id + '&upload_type=' + upload_type,
    method: 'get'
  })
}

// 查询, 根据 阶段任务id(task), 上传类型 upload_type 查询 数据
// 死链
export function getUploadDeadlink(task_id, upload_type, page, size) {
  return request({
    url: '/api/upload/deadlink/?task=' + task_id + '&upload_type=' + upload_type +
      '&page=' + page + '&size=' + size,
    method: 'get'
  })
}

// 死链 筛选出有误报的数据
export function getUploadDeadlinkIsFalseAlarm(task_id, upload_type, person_check_status_value, page, size) {
  return request({
    url: '/api/upload/deadlinknalram/?task=' + task_id + '&upload_type=' + upload_type +
      '&person_check_status=' + person_check_status_value +
      '&page=' + page + '&size=' + size,
    method: 'get'
  })
}

// 死链 筛选出有误报的数据 下载 无分页
export function downloadDeadlinkIsFalseAlarm(task_id, upload_type, person_check_status_value) {
  return request({
    url: '/api/download/deadlinknalram/?task=' + task_id + '&upload_type=' + upload_type +
    '&person_check_status=' + person_check_status_value,
    method: 'get'
  })
}

// 查询, 根据 阶段任务id(task), 上传类型 upload_type 查询 数据
// 我为政府网站找错
export function getUploadFinderror(task_id, upload_type, page, size) {
  return request({
    url: '/api/upload/finderror/?task=' + task_id + '&upload_type=' + upload_type +
      '&page=' + page + '&size=' + size,
    method: 'get'

  })
}

// 我为政府网站找错 无分页
export function downloadFinderror(task_id, upload_type) {
  return request({
    url: '/api/download/finderror/?task=' + task_id + '&upload_type=' + upload_type,
    method: 'get'
  })
}

// 核减 修改
// 表述不规范
export function updateDataUploadIrregularExpression(id, data) {
  return request({
    url: '/api/upload/irregular/expression/' + id + '/',
    method: 'put',
    data
  })
}

// 死链
export function updateDataEventUploadDeadlink(id, data) {
  return request({
    url: '/api/upload/deadlink/' + id + '/',
    method: 'put',
    data
  })
}
