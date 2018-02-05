import request from '@/utils/request'

export function getUserInfoByUsername(username, password) {
  return request({
    url: '/user/u/' + username + '/' + password,
    method: 'get'
  })
}
