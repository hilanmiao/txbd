import request from '@/utils/request'

export function getListSupplier(params) {
  return request({
    url: '/supplier/list',
    method: 'get',
    params
  })
}
