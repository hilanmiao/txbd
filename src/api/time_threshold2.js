import request from '@/utils/request'

export function getDetail() {
  return request({
    url: 'v1/timeThreshold/',
    method: 'get'
  })
}

export function editDate(params) {
  return request({
    url: 'v1/timeThreshold/',
    method: 'put',
    params
  })
}
export function getDistance() {
  return request({
    url: 'v1/timeThreshold/distance',
    method: 'get'
  })
}

export function editDistance(params) {
  return request({
    url: 'v1/timeThreshold/distance',
    method: 'put',
    params
  })
}
