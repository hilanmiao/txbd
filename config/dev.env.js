var merge = require('webpack-merge')
var prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  BASE_IP: prodEnv.BASE_IP,
  BASE_API: prodEnv.BASE_API,
  WEB_SOCKET: prodEnv.WEB_SOCKET,
  IMG_SERVER_PATH: prodEnv.IMG_SERVER_PATH,
  EXCEL_SERVER_PATH: prodEnv.EXCEL_SERVER_PATH,
  UPIMG_SERVER_PATH: prodEnv.UPIMG_SERVER_PATH
})
