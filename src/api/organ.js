import request from '@/utils/request'

export function getListOrgan(params) {
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

export function editOrgan(params, id) {
  return request({
    url: 'v1/organ/' + id,
    method: 'put',
    params
  })
}
