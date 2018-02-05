import request from '@/utils/request'

// 获取列表数据
export function getCitys() {
  return request({
    url: 'v1/user/citys',
    method: 'get'
  })
}
