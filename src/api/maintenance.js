import request from '@/utils/request'

export function getMainList(params) {
  return request({
    url: 'v1/repairFactory/factorys',
    method: 'get',
    params
  })
}

export function editMain(data) {
  return request({
    url: 'v1/repairFactory/',
    method: 'put',
    data
  })
}

export function addMain(data) {
  return request({
    url: 'v1/repairFactory/',
    method: 'post',
    data
  })
}

export function lookMain(params, id) {
  return request({
    url: 'v1/repairFactory/' + id,
    method: 'get',
    params
  })
}

export function deleMain(id) {
  return request({
    url: 'v1/repairFactory/' + id,
    method: 'delete'
  })
}
