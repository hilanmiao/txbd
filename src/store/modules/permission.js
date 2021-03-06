import {asyncRouterMap, constantRouterMap} from '@/router'

/**
 * 通过meta.role判断是否与当前用户权限匹配
 * @param roles
 * @param route
 */
// function hasPermission(roles, route) {
//   if (route.meta && route.meta.roles) {
//     return roles.some(role => route.meta.roles.indexOf(role) >= 0)
//   } else {
//     return true
//   }
// }
// TODO: 这里改了
function hasPermission(roles, route) {
  // 不显示首页到菜单上
  if (route.id === 99) {
    return false
  } else {
    if (route.id && !route.hidden) {
      return roles.some(role => route.id === parseInt(role))
    } else {
      return true
    }
  }
}

/**
 * 递归过滤异步路由表，返回符合用户角色权限的路由表
 * @param asyncRouterMap
 * @param roles
 */
function filterAsyncRouter(asyncRouterMap, roles) {
  // // 做一次深拷贝
  // const tempAsyncRouterMap = JSON.parse(JSON.stringify(asyncRouterMap))
  const accessedRouters = asyncRouterMap.filter(route => {
    if (hasPermission(roles, route)) {
      if (route.children && route.children.length) {
        route.children = filterAsyncRouter(route.children, roles)
      }
      return true
    }
    return false
  })
  return accessedRouters
}

const permission = {
  state: {
    routers: constantRouterMap,
    addRouters: []
  },
  mutations: {
    SET_ROUTERS: (state, routers) => {
      state.addRouters = routers
      state.routers = constantRouterMap.concat(routers)
    }
  },
  actions: {
    // GenerateRoutes({commit}, data) {
    //   return new Promise(resolve => {
    //     const {roles} = data
    //     let accessedRouters
    //     if (roles.indexOf('admin') >= 0) {
    //       accessedRouters = asyncRouterMap
    //     } else {
    //       accessedRouters = filterAsyncRouter(asyncRouterMap, roles)
    //     }
    //     commit('SET_ROUTERS', accessedRouters)
    //     resolve()
    //   })
    // }
    // TODO: 这里改了
    GenerateRoutes({commit}, data) {
      return new Promise(resolve => {
        const {roles} = data
        const accessedRouters = filterAsyncRouter(asyncRouterMap, roles)
        commit('SET_ROUTERS', accessedRouters)
        resolve()
      })
    }
  }
}

export default permission
