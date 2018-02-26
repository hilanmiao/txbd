import request from '@/utils/request'

// 创建
export function uploadImg(data) {
  return request({
    url: 'v1/unit/img/',
    method: 'post',
    data
  })
}
