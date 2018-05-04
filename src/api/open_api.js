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
    url: 'v1/supplier/dpfInstall',
    method: 'post',
    data
  })
}

// 根据供应商id查询dpf型号
export function getDpfModels(params) {
  return request({
    url: 'v1/supplier/dpfModels',
    method: 'get',
    params
  })
}
