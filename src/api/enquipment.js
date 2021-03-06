import request from '@/utils/request'

// 获取列表数据
export function getListEnquipment(params) {
  return request({
    url: 'v1/dpfInfo/dpfInfos',
    method: 'get',
    params
  })
}
// 创建
export function postModelEnquipment(data) {
  return request({
    url: 'v1/dpfInfo/',
    method: 'post',
    data
  })
}

// 修改
export function putModelEnquipment(data) {
  return request({
    url: 'v1/dpfInfo/',
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

// 导出
export function exportEnquipment(params) {
  return request({
    url: 'v1/dpfInfo/export',
    method: 'get',
    params
  })
}
