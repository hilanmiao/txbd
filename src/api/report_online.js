import request from '@/utils/request'


export function getData(params) {
  return request({
    url: 'v1/statistics/onLineRate',
    method: 'get',
    params
   })
}
