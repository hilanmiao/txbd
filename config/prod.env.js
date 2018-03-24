const IP = '47.104.154.2'
const FileIP = '118.31.228.98:8089'

module.exports = {
  NODE_ENV: '"production"',
  // BASE_API: '"https://easy-mock.com/mock/5950a2419adc231f356a6636/vue-admin"',
  // BASE_API: '"http://192.168.1.111:8080/api"',
  BASE_IP: `"${IP}"`,
  BASE_API: `"http://${IP}/api/"`,
  WEB_SOCKET: `"ws://${IP}/socketWebServer/"`,
  IMG_SERVER_PATH: `"http://${FileIP}/file/show/"`,
  EXCEL_SERVER_PATH: `"http://${FileIP}/file/show/"`
}
