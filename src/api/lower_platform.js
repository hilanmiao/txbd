import request from '@/utils/request'

// 获取列表数据
export function getListPlatform(params) {
  return request({
    url: 'v1/lowerplatform/lowerPlatforms',
    method: 'get',
    params
  })
}

// 创建
export function postModelPlatform(data) {
  return request({
    url: 'v1/lowerplatform/',
    method: 'post',
    data
  })
}

// 修改
export function putModelPlatform(data) {
  return request({
    url: 'v1/lowerplatform/',
    method: 'put',
    data
  })
}

// 删除
export function deleteModelPlatform(id) {
  return request({
    url: 'v1/lowerplatform/' + id,
    method: 'delete'
  })
}

// 获取详情
export function getModelPlatform(id) {
  return request({
    url: 'v1/lowerplatform/' + id,
    method: 'get'
  })
}

// 导出
export function exportEnquipment(params) {
  return request({
    url: 'v1/lowerplatform/export',
    method: 'get',
    params
  })
}
