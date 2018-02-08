import request from '@/utils/request'

// 获取列表数据
export function getListRole(params) {
  return request({
    url: 'v1/user/role',
    method: 'get',
    params
  })
}

// 创建
export function postModelRole(data) {
  return request({
    url: 'v1/user/role',
    method: 'post',
    data
  })
}

// 修改
export function putModelPlatform(data) {
  return request({
    url: 'v1/lowerplatform/update',
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
