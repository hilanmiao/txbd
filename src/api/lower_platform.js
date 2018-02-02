import request from '@/utils/request'

// 获取列表数据
export function getListPlatform(params) {
  return request({
    url: 'v1/lower_platform/lowerPlatforms',
    method: 'get',
    params
  })
}
// 创建
export function postModelPlatform(data) {
  return request({
    url: 'v1/lower_platform/save',
    method: 'post',
    data
  })
}

// 修改
export function putModelPlatform(data) {
  return request({
    url: 'v1/lower_platform/update',
    method: 'put',
    data
  })
}

// 删除
export function deleteModelPlatform(id) {
  return request({
    url: 'v1/lower_platform/' + id,
    method: 'delete'
  })
}

// 获取详情
export function getModelPlatform(id) {
  return request({
    url: 'v1/lower_platform/' + id,
    method: 'get'
  })
}
