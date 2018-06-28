import request from '@/utils/request'

// 获取列表数据
export function getListUser(params) {
  return request({
    url: 'v1/user',
    method: 'get',
    params
  })
}

// 创建
export function postModelUser(params) {
  return request({
    url: 'v1/user',
    method: 'post',
    params
  })
}

// 修改
export function putModelUser(params) {
  return request({
    url: 'v1/user/',
    method: 'put',
    params
  })
}

// 删除
export function deleteModelUser(id) {
  return request({
    url: 'v1/lowerplatform/' + id,
    method: 'delete'
  })
}

// 获取详情
export function getModelUser(id) {
  return request({
    url: 'v1/user/' + id,
    method: 'get'
  })
}

// 冻结
export function getDUser(params) {
  return request({
    url: 'v1/user/dUser',
    method: 'get',
    params
  })
}

// 解冻
export function getJUser(params) {
  return request({
    url: 'v1/user/jUser',
    method: 'get',
    params
  })
}
