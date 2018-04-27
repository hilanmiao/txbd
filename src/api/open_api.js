import request from '@/utils/request'

export function getSuppList(params) {
  return request({
    url: 'v1/supplier/',
    method: 'get',
    params
  })
}
// 创建
export function postModelDpf(data) {
  return request({
    url: 'v1/supplier/dpf',
    method: 'post',
    data
  })
}
