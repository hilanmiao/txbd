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
export function putModelUser(data) {
  return request({
    url: 'v1/lowerplatform/update',
    method: 'put',
    data
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
  // return request({
  //   url: 'v1/lowerplatform/' + id,
  //   method: 'get'
  // })

}
