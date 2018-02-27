import request from '@/utils/request'

export function getList(params) {
  return request({
    url: 'v1/threshold/thresholds',
    method: 'get',
    params
  })
}

export function addThre(data) {
  return request({
    url: 'v1/threshold/',
    method: 'post',
    data
  })
}

export function editThre(data) {
  return request({
    url: 'v1/threshold/',
    method: 'put',
    data
  })
}

export function deleThre(id) {
  return request({
    url: 'v1/threshold/'+id,
    method: 'delete',
  })
}
