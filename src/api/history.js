import request from '@/utils/request'

// 获取列表数据
export function getListHistory(params) {
  return request({
    url: 'v1/gis/history',
    method: 'get',
    params
  })
}
// 创建
export function postModelEnquipment(data) {
  return request({
    url: 'v1/dpfInfo/dpfInfo',
    method: 'post',
    data
  })
}

// 修改
export function putModelEnquipment(data) {
  return request({
    url: 'v1/dpfInfo/dpfInfo',
    method: 'put',
    data
  })
}

// 删除
export function deleteModelEnquipment(id) {
  return request({
    url: 'v1/dpfInfo/' + id,
    method: 'delete'
  })
}

// 获取详情
export function getModelEnquipment(id) {
  return request({
    url: 'v1/dpfInfo/' + id,
    method: 'get'
  })
}
