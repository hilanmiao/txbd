import request from '@/utils/request'

export function getList(params) {
  return request({
    url: 'v1/statistics/onLineRate',
    method: 'get',
    params
  })
}

export function getDetailList(params) {
  return request({
    url: 'v1/statistics/onlineCarList',
    method: 'get',
    params
  })
}
