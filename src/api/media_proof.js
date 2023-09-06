import request from '@/utils/request'

// 新媒体校对
export function mediaProofList(page, size, search, is_cooperation, media_classify, city_id) {
  return request({
    url: '/api/media/proof/',
    method: 'get',
    params: { 'page': page, 'size': size, 'search': search, 'is_cooperation': is_cooperation, 'media_classify': media_classify, 'city_id': city_id }
  })
}

