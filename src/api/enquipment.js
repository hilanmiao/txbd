import request from '@/utils/request'

export function getListEnquipment(params) {
  return request({
    url: '/supplier/list',
    method: 'get',
    params
  })
}

export function postModelEnquipment(name, phone) {
  return request({
    url: '/supplier/post',
    method: 'post',
    data: {
      name,
      phone
    }
  })
}

export function deleteModelEnquipment(params) {
  return request({
    url: '/supplier/delete',
    method: 'delete',
    params
  })
}
