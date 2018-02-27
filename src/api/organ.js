import request from '@/utils/request'

export function getList(params) {
  return request({
    url: 'v1/organ',
    method: 'get',
    params
  })
}

export function addOrgan(params) {
  return request({
    url: 'v1/organ',
    method: 'post',
    params
  })
}
