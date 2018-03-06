import request from '@/utils/request'

export function getMainList(params) {
  return request({
    url: 'v1/installInfo/installInfos',
    method: 'get',
    params
  })
}

export function exportMain(params) {
  return request({
    url: 'v1/installInfo/export',
    method: 'get',
    params
  })
}

export function lookMain(params, id) {
  return request({
    url: 'v1/installInfo/' + id,
    method: 'get',
    params
  })
}

// 导出
export function exportEnquipment(params) {
  return request({
    url: 'v1/repairFactory/export',
    method: 'get',
    params
  })
}
