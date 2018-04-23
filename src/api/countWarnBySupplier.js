import request from '@/utils/request'

export function getList(params) {
  return request({
    url: 'v1/statistics/countWarnBySupplier',
    method: 'get',
    params
  })
}

export function getDetailList(params) {
  return request({
    url: 'v1/statistics/localWarn',
    method: 'get',
    params
  })
}
