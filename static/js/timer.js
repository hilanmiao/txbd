self.onmessage = function (event) {
  var seconds = event.data
  var t = setInterval(function () {
    seconds--
    self.postMessage(seconds)
    // console.log(seconds)
    if (seconds <= 0) {
      clearInterval(t)
      // self.close()
      // console.log('计时器已关闭')
    }
  }, 1000)
}
