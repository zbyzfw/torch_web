import request from '@/utils/request'

// 运维管理模块相关接口

// 展示程序评分中, 程序与人工 打分不一致 的数据
export function queryAll(page, size) {
  return request({
    // url: '/auth/user/list/?page='+page,
    url: '/api/ops/?page=' + page + '&size=' + size,
    method: 'get'
  })
}

// 网站栏目采集异常接口
export function querySpiderError(page, size) {
  return request({
    // url: '/auth/user/list/?page='+page,
    url: '/api/ops/spider-error/?page=' + page + '&size=' + size,
    method: 'get'
  })
}

// 打分异常指标接口
export function queryScoreError(page, size) {
  return request({
    // url: '/auth/user/list/?page='+page,
    url: '/api/ops/calculate-error/?page=' + page + '&size=' + size,
    method: 'get'
  })
}

