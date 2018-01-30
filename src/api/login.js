import request from '@/utils/request'

// export function loginByUsername(username, password) {
//   const data = {
//     username,
//     password
//   }
//   return request({
//     url: '/user/login',
//     method: 'post',
//     data
//   })
// }

export function loginByUsername(username, password) {
  const params = {
    username,
    password
  }
  return request({
    url: '/v1/user/login',
    method: 'post',
    params
  })
}

export function logout() {
  return request({
    url: '/user/logout',
    method: 'post'
  })
}

export function getUserInfo(token) {
  return Promise.reject({"code":20000,"data":{"roles":["admin"],"role":["admin"],"name":"admin","avatar":"https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif"}})
  // return request({
  //   url: '/user/info',
  //   method: 'get',
  //   params: {token}
  // })
}

