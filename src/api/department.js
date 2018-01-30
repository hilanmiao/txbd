import request from '@/utils/request'

export function getList(params) {
  return request({
    url: '/department/list',
    method: 'get',
    params
  })
}

export function postForm(name, phone) {
  return request({
    url: '/department/post',
    method: 'post',
    data: {
      name,
      phone
    }
  })
}

export function deleteModel(params) {
  return request({
    url: '/department/delete',
    method: 'delete',
    params
  })
}
