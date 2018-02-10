import request from '@/utils/request'

export function getLogList(params) {
  return request({
    url: 'v1/userlog',
    method: 'get',
    params
  })
}

