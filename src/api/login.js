import request from '@/utils/request'

// export function loginByUsername(username, password) {
//   // const data = {
//   //   username,
//   //   password
//   // }
//   // return request({
//   //   url: '/user/login',
//   //   method: 'post',
//   //   data
//   // })
//   // TODO: 记得改
//   return new Promise((resolve, reject) => {
//     resolve({"code":20000,"data":{"token":"admin"}})
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

export function getUserInfo() {
  return request({
    url: 'v1/user/',
    method: 'get'
  })
  // TODO：记得改
  // return new Promise((resolve, reject) => {
  //   resolve({
  //     "code": 20000,
  //     "data": {
  //       "roles": ["admin"],
  //       // roles: [1, 11, 12, 13, 14, 15, 16, 17],
  //       "role": ["admin"],
  //       "name": "admin",
  //       "avatar": "https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif"
  //     }
  //   })
  // })
}

