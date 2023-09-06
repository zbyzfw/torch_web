import request from '@/utils/request'

// 城市表相关操作
// 获取城市表全部数据
export function queryCityList() {
  return request({
    url: '/api/city/',
    method: 'get'
  })
}

// 普查工作页， 获取城市树
export function queryCityTree() {
  return request({
    url: '/api/citytree/',
    method: 'get'
  })
}

// 向数据库中添加数据
export function addCity(data) {
  return request({
    url: '/api/city/',
    method: 'post',
    data
    // params: {'level': 0, 'point_classify': 0, 'point_type':1}
  })
}

