import request from '@/utils/request'

export function getDetail() {
  return request({
    url: 'v1/timeThreshold/thresholds',
    method: 'get'
  })
}

export function editDate(id, threshold) {
  return request({
    url: 'v1/timeThreshold/' + id + '/' + threshold,
    method: 'put'
  })
}
