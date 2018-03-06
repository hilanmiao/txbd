import request from '@/utils/request'

export function getSuppList(params) {
  return request({
    url: 'v1/web_supplier/suppliers',
    method: 'get',
    params
  })
}

export function editSupp(data) {
  return request({
    url: 'v1/web_supplier/',
    method: 'put',
    data
  })
}

export function addSupp(data) {
  return request({
    url: 'v1/web_supplier/',
    method: 'post',
    data
  })
}

export function lookSupp(params, id) {
  return request({
    url: 'v1/web_supplier/' + id,
    method: 'get',
    params
  })
}

export function deleSupp(id) {
  return request({
    url: 'v1/web_supplier/' + id,
    method: 'delete'
  })
}

export function allSupp() {
  return request({
    url: 'v1/web_supplier/allSupplier',
    method: 'get'
  })
}

// 导出
export function exportEnquipment(params) {
  return request({
    url: 'v1/web_supplier/export',
    method: 'get',
    params
  })
}
