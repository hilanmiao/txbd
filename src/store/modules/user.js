import {loginByUsername, logout, getUserInfo} from '@/api/login'
import {getToken, setToken, removeToken} from '@/utils/auth'
import {getModelRole} from '@/api/part'

const user = {
  state: {
    user: '',
    status: '',
    code: '',
    token: getToken(),
    name: '',
    avatar: '',
    introduction: '',
    roles: [],
    setting: {
      articlePlatform: []
    },
    organid: '',
    roleid: ''
  },

  mutations: {
    SET_CODE: (state, code) => {
      state.code = code
    },
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_INTRODUCTION: (state, introduction) => {
      state.introduction = introduction
    },
    SET_SETTING: (state, setting) => {
      state.setting = setting
    },
    SET_STATUS: (state, status) => {
      state.status = status
    },
    SET_NAME: (state, name) => {
      state.name = name
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    },
    SET_ROLEID: (state, roleid) => {
      state.roleid = roleid
    },
    SET_ORGANID: (state, organid) => {
      state.organid = organid
    }
  },

  actions: {
    // 用户名登录
    LoginByUsername({commit}, userInfo) {
      const username = userInfo.username.trim()
      return new Promise((resolve, reject) => {
        loginByUsername(username, userInfo.password).then(response => {
          const data = response.data
          // commit('SET_TOKEN', data.token)
          // setToken(response.data.token)
          // TODO：记得改
          commit('SET_TOKEN', data)
          setToken(response.data)
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 获取用户信息
    // GetUserInfo({commit, state}) {
    //   return new Promise((resolve, reject) => {
    //     getUserInfo(state.token).then(response => {
    //       if (!response.data) { // 由于mockjs 不支持自定义状态码只能这样hack
    //         reject('error')
    //       }
    //       const data = response.data
    //       commit('SET_ROLES', data.roles)
    //       commit('SET_NAME', data.name)
    //       commit('SET_AVATAR', data.avatar)
    //       commit('SET_INTRODUCTION', data.introduction)
    //       resolve(response)
    //     }).catch(error => {
    //       reject(error)
    //     })
    //   })
    // },
    // TODO: 这里改了
    GetUserInfo({commit, state}) {
      return new Promise((resolve, reject) => {
        getUserInfo(state.token).then(response => {
          // TODO: 临时
          response = {
            code: '200',
            message: '',
            data: {
              "id": null,
              "username": "admin",
              "password": null,
              "role_id": "1",
              "name": "超级管理员",
              "status": "0",
              "createtime": null,
              "phone": "15626669999",
              "from_system": "0",
              "organid": "1",
              "organname": null,
              "rolename": null
            }
          }
          if (response.code !== '200') {
            reject('error')
          }
          const data = response.data
          commit('SET_NAME', data.name)
          commit('SET_ORGANID', data.organid)
          commit('SET_ROLEID', data.role_id)
          commit('SET_AVATAR', 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif')
          commit('SET_INTRODUCTION', data.name)
          getModelRole(state.token).then(response => {
            response.data.menu_ids = '1,11,12,13,14,15,16,17,5,51,52,53,6,61,62,63,64,65'.split(',')
            if (response.code !== '200') {
              reject('error')
            }
            commit('SET_ROLES', response.data.menu_ids)
            resolve(response)
          }).catch(error => {
            reject(error)
          })
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 第三方验证登录
    // LoginByThirdparty({ commit, state }, code) {
    //   return new Promise((resolve, reject) => {
    //     commit('SET_CODE', code)
    //     loginByThirdparty(state.status, state.email, state.code).then(response => {
    //       commit('SET_TOKEN', response.data.token)
    //       setToken(response.data.token)
    //       resolve()
    //     }).catch(error => {
    //       reject(error)
    //     })
    //   })
    // },

    // 登出
    LogOut({commit, state}) {
      return new Promise((resolve, reject) => {
        logout(state.token).then(() => {
          commit('SET_TOKEN', '')
          commit('SET_ROLES', [])
          removeToken()
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 前端 登出
    FedLogOut({commit}) {
      return new Promise(resolve => {
        commit('SET_TOKEN', '')
        removeToken()
        resolve()
      })
    },

    // 动态修改权限
    ChangeRoles({commit}, role) {
      return new Promise(resolve => {
        commit('SET_TOKEN', role)
        setToken(role)
        getUserInfo(role).then(response => {
          const data = response.data
          commit('SET_ROLES', data.roles)
          commit('SET_NAME', data.name)
          commit('SET_AVATAR', data.avatar)
          commit('SET_INTRODUCTION', data.introduction)
          resolve()
        })
      })
    }
  }
}

export default user
