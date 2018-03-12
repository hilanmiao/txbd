const IP = '192.168.1.198'

module.exports = {
  NODE_ENV: '"production"',
  // BASE_API: '"https://easy-mock.com/mock/5950a2419adc231f356a6636/vue-admin"',
  // BASE_API: '"http://192.168.1.111:8080/api"',
  BASE_IP: `"${IP}"`,
  BASE_API: `"http://${IP}:8080/api/"`,
  WEB_SOCKET: `"ws://${IP}:8087/socketWebServer/"`,
  IMG_SERVER_PATH: `"http://${IP}:8089/file/show/"`,
  EXCEL_SERVER_PATH: `"http://${IP}:8089/file/show/"`
}
