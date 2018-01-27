import request from '@/utils/request'

export function getList(params) {
  return request({
    url: '/supplier/list',
    method: 'get',
    params
  })
}

export function postForm(name, phone) {
  return request({
    url: '/supplier/post',
    method: 'post',
    data: {
      name,
      phone
    }
  })
}

export function deleteModel(params) {
  return request({
    url: '/supplier/delete',
    method: 'delete',
    params
  })
}
