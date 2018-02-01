import request from '@/utils/request'

export function getCitys() {
  return request({
    url: '/user/city',
    method: 'get'
  })
}

export function getUserInfoByUsername(username, password) {
  return request({
    url: '/user/u/' + username + '/' + password,
    method: 'get'
  })
}
