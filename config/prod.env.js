// const IP = '47.104.154.2'
// const FileIP = '118.31.228.98:8089'
// const IP = '192.168.1.198:8080'
// const FileIP = '192.168.1.198:8089'
// const IP = '192.168.3.8:8080'
// const FileIP = '192.168.3.8:8089'
const IP = '112.35.23.152:8081'
const FileIP = '112.35.23.152:8089'

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
