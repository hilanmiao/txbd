import request from '@/utils/request'

export function getCarDetail(params) {
  return request({
    url: 'v1/statistics/oneCarTP',
    method: 'get',
    params
  })
}
