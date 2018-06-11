const getters = {
  sidebar: state => state.app.sidebar,
  fullscreen: state => state.app.fullscreen,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  name: state => state.user.name,
  roles: state => state.user.roles,
  permission_routers: state => state.permission.routers,
  addRouters: state => state.permission.addRouters,
  organid: state => state.user.organid,
  roleid: state => state.user.roleid
}
export default getters
