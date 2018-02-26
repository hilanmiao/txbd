import request from '@/utils/request'

export function getMainList(params) {
  return request({
    url: 'v1/repairInfo/repairInfos',
    method: 'get',
    params
  })
}

export function editMain(data) {
  return request({
    url: 'v1/repairInfo/',
    method: 'put',
    data
  })
}

export function addMain(data) {
  return request({
    url: 'v1/repairInfo/',
    method: 'post',
    data
  })
}

export function lookMain(params, id) {
  return request({
    url: 'v1/repairInfo/' + id,
    method: 'get',
    params
  })
}

export function deleMain(id) {
  return request({
    url: 'v1/repairInfo/' + id,
    method: 'delete'
  })
}

export function exportMain(params) {
  return request({
    url: 'v1/repairInfo/export',
    method: 'get',
    params
  })
}
