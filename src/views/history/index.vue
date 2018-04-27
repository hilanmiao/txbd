<template>
  <div class="app-container">
    <el-row>
      <el-tabs>
        <el-tab-pane>
          <span slot="label"><i class="el-icon-date"></i>车辆历史记录</span>
          <div>
            <div>
              <el-input style="width: 200px;"
                        class="filter-item"
                        placeholder="车牌号"
                        v-model="carCodeHistory"
              >
              </el-input>
              <el-date-picker
                v-model="dateRangeHistory"
                type="daterange"
                align="right"
                unlink-panels
                value-format="yyyy-MM-dd"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                :picker-options="pickerOptions"
              >
              </el-date-picker>
              <el-button type="primary" icon="el-icon-search" @click="_getCarHistory"
                         :loading="loadingSearchHistory">确认
              </el-button>
            </div>
            <div style="padding-top: 10px">
              <el-button type="primary" icon="el-icon-search" @click="carTrackStart">开始</el-button>
              <el-button type="warning" icon="el-icon-download" @click="carTrackPause">暂停</el-button>
              <el-button type="danger" icon="el-icon-download" @click="carTrackStop">结束</el-button>
            </div>
          </div>
        </el-tab-pane>
      </el-tabs>
      <div ref="map" id="mapDiv" class="map">
      </div>
      <remote-js src="http://cdn.bootcss.com/d3/3.5.17/d3.js"></remote-js>
      <remote-js src="http://lbs.tianditu.com/api/js4.0/opensource/openlibrary/D3SvgOverlay.js"></remote-js>
      <remote-js src="http://lbs.tianditu.com/api/js4.0/opensource/openlibrary/CarTrack.js"></remote-js>
    </el-row>
  </div>
</template>

<script type="text/ecmascript-6">
  import T from 'T'
  import {getCarHistory} from '@/api/gis'

  export default {
    components: {
      'remote-js': {
        render(createElement) {
          return createElement('script', {attrs: {type: 'text/javascript', src: this.src}})
        },
        props: {
          src: {type: String, required: true}
        }
      }
    },
    data() {
      return {
        zoom: 12,
        // 历史轨迹面板相关
        carTrack: undefined,
        carCodeHistory: '鲁G12345',
        loadingSearchHistory: false,
        showPanelHistory: false,
        dateRangeHistory: '',
        pickerOptions: {
          shortcuts: [{
            text: '最近一周',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
              picker.$emit('pick', [start, end])
            }
          }, {
            text: '最近一个月',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
              picker.$emit('pick', [start, end])
            }
          }, {
            text: '最近三个月',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
              picker.$emit('pick', [start, end])
            }
          }]
        }
      }
    },
    mounted() {
      this.drawMap()
    },
    methods: {
      drawMap() {
        window.map = new T.Map('mapDiv')
        // 济南
        // window.map.centerAndZoom(new T.LngLat(116.986110, 36.670660), this.zoom)
        // 北京
        // window.map.centerAndZoom(new T.LngLat(116.26802, 39.90623), this.zoom)
        // 潍坊
        window.map.centerAndZoom(new T.LngLat(119.097980, 36.695950), this.zoom)

        // 允许鼠标双击放大地图
        window.map.enableScrollWheelZoom()

        // 添加鹰眼控件
        var miniMap = new T.Control.OverviewMap({
          isOpen: true,
          size: new T.Point(150, 150)
        })
        window.map.addControl(miniMap)

        // 添加比例尺控件
        var scale = new T.Control.Scale()
        window.map.addControl(scale)

        // 添加缩放控件
        var zoom = new T.Control.Zoom()
        zoom.setPosition(window.T_ANCHOR_BOTTOM_RIGHT)
        window.map.addControl(zoom)

        // 创建标注工具对象
        this.lineTool = new T.PolylineTool(window.map, {showLabel: true})
      },
      mapMarker(cars) {
        // 响应填充基础数据
        cars.forEach(item => {
          this.listCarWatchBase.some(base => {
            if (base.deviceno === item.deviceno) {
              item.car_user_name = base.car_user_name
              item.car_user_phone = base.car_user_phone
              item.dpf_high_lines = base.dpf_high_lines
              item.dpf_maintain_num = base.dpf_maintain_num
              item.dpf_mileage_num = base.dpf_mileage_num
              item.dpf_online_num = base.dpf_online_num
              item.dpf_warning_num = base.dpf_warning_num
              item.install_place_msg = base.install_place_msg
              item.install_user_name = base.install_user_name
              item.install_user_phone = base.install_user_phone
              return true
            }
          })
        })
        // 填充数据
        this.listCarWatchReal = cars
        // 循环标记
        this.listCarWatchReal.forEach((car, index, array) => {
          // 中心点移动到第一个点
          if (index === 0 && array.length === 1) {
            window.map.panTo(new T.LngLat(car.longitude, car.latitude))
          }
          // 查看是否已经标注
          let tempMarker = {}
          this.listMarker.some(item => {
            if (item.data.deviceno === car.deviceno) {
              tempMarker = item
              return true
            }
          })
          if (!tempMarker.data) {
            // 创建标注
            const marker = new T.Marker(new T.LngLat(car.longitude, car.latitude))
            window.map.addOverLay(marker)
            // 创建标注的文字标签
            const label = new T.Label({
              text: `<b>${car.platenumber}<b>`,
              position: marker.getLngLat(),
              offset: new T.Point(3, -30)
            })
            window.map.addOverLay(label)
            // 创建信息窗口
            const infoWin = new T.InfoWindow()
            const content = `
              <div style="display: flex;">
                <div style="flex: 1;">
                <b>设备编号：${car.deviceno}</b><br>
                <b>车辆状态：${car.status}</b><br>
                <b>行驶速度：${car.speed}</b><br>
                <b>经度：${car.longitude}</b><br>
                <b>纬度：${car.latitude}</b><br>
                <b>方向：${car.direction}</b><br>
                <b>GPS定位时间：${car.gpstime}</b><br>
                <b>DOC原温度：${car.t1}</b><br>
                <b>DPF前端温度：${car.t2}</b><br>
                <b>DPF后端温度：${car.t3}</b><br>
                <b>DOC前端压力：${car.p1}</b><br>
                <b>DOC后端压力：${car.p2}</b><br>
                </div>
                <div style="flex: 1;">
                <b>车主姓名：${car.car_user_name}</b><br>
                <b>车主电话：${car.car_user_phone}</b><br>
                <b>在线率：${car.dpf_high_lines}</b><br>
                <b>维修次数：${car.dpf_maintain_num}</b><br>
                <b>里程数：${car.dpf_mileage_num}</b><br>
                <b>在线时长：${car.dpf_online_num}</b><br>
                <b>报警次数：${car.dpf_warning_num}</b><br>
                <b>安装点地址：${car.install_place_msg}</b><br>
                <b>安装人姓名：${car.install_user_name}</b><br>
                <b>安装人手机：${car.install_user_phone}</b><br>
                </div>
              </div>
            `
            infoWin.setContent(content)
            marker.addEventListener('click', function (type, target, lnglat, containerPoint) {
              marker.openInfoWindow(infoWin)
              console.log(type, target, lnglat, containerPoint)
            })

            // 保存
            this.listMarker.push(
              {
                data: car,
                marker: marker,
                label: label,
                infoWin: infoWin
              }
            )
          } else {
            // 更新位置
            // 先关闭信息窗口
            tempMarker.infoWin.closeInfoWindow()
            tempMarker.marker.setLngLat(new T.LngLat(car.longitude, car.latitude))
            tempMarker.label.setLngLat(new T.LngLat(car.longitude, car.latitude))
            tempMarker.infoWin.setLngLat(new T.LngLat(car.longitude, car.latitude))
            tempMarker.content = `
              <div style="display: flex;">
                <div style="flex: 1;">
                <b>设备编号：${car.deviceno}</b>
                <b>车辆状态：${car.status}</b>
                <b>行驶速度：${car.speed}</b>
                <b>经度：${car.longitude}</b>
                <b>纬度：${car.latitude}</b>
                <b>方向：${car.direction}</b>
                <b>GPS定位时间：${car.gpstime}</b>
                <b>DOC原温度：${car.t1}</b>
                <b>DPF前端温度：${car.t2}</b>
                <b>DPF后端温度：${car.t3}</b>
                <b>DOC前端压力：${car.p1}</b><br>
                <b>DOC后端压力：${car.p2}</b><br>
                </div>
                <div style="flex: 1;">
                <b>车主姓名：${car.car_user_name}</b><br>
                <b>车主电话：${car.car_user_phone}</b><br>
                <b>在线率：${car.dpf_high_lines}</b><br>
                <b>维修次数：${car.dpf_maintain_num}</b><br>
                <b>里程数：${car.dpf_mileage_num}</b><br>
                <b>在线时长：${car.dpf_online_num}</b><br>
                <b>报警次数：${car.dpf_warning_num}</b><br>
                <b>安装点地址：${car.install_place_msg}</b><br>
                <b>安装人姓名：${car.install_user_name}</b><br>
                <b>安装人手机：${car.install_user_phone}</b><br>
                </div>
              </div>
            `
            tempMarker.infoWin.setContent(tempMarker.content)
            tempMarker.infoWin.update()
            // 只能打开一个？？？
            // tempMarker.marker.openInfoWindow(tempMarker.infoWin)
          }
        })
        // TODO: 临时
        let tempCar = Object.assign({}, this.listCarWatchReal[0])
        tempCar.platenumber = '鲁G809CP'
        this.listCarWatchReal.push(tempCar)
        tempCar = Object.assign({}, this.listCarWatchReal[0])
        tempCar.platenumber = '鲁V58661'
        this.listCarWatchReal.push(tempCar)
        tempCar = Object.assign({}, this.listCarWatchReal[0])
        tempCar.platenumber = '鲁V22561'
        this.listCarWatchReal.push(tempCar)
        tempCar = Object.assign({}, this.listCarWatchReal[0])
        tempCar.platenumber = '鲁V98985'
        this.listCarWatchReal.push(tempCar)
        tempCar = Object.assign({}, this.listCarWatchReal[0])
        tempCar.platenumber = '鲁V69336'
        this.listCarWatchReal.push(tempCar)
        tempCar = Object.assign({}, this.listCarWatchReal[0])
        tempCar.platenumber = '鲁V75555'
        this.listCarWatchReal.push(tempCar)
        tempCar = Object.assign({}, this.listCarWatchReal[0])
        tempCar.platenumber = '鲁V56746'
        this.listCarWatchReal.push(tempCar)
      },
      mapCarTrack(history) {
        // 显示控制按钮
        this.showPanelHistory = true
        // 或者使用更简单的“添加线”
        // 定位中心点
        window.map.setZoom(12)
        window.map.panTo(new T.LngLat(history[0].car_longitude, history[1].car_latitude))
        const datas = {
          type: 'FeatureCollection',
          features: []
        }

        datas.features = history.map((item, index) => {
          return {
            type: 'Feature',
            properties: {
              time: index,
              id: 'route1',
              name: index
            },
            geometry: {
              type: 'Point',
              coordinates: [
                item.car_longitude,
                item.car_latitude
              ]
            }
          }
        })
        this.carTrack = new T.CarTrack(window.map, {
          interval: 5,
          speed: 10,
          dynamicLine: false,
          polylinestyle: {color: '#2C64A7', weight: 5, opacity: 0.9},
          Datas: datas.features.map(
            (obj, i) => {
              var coordinates = obj.geometry.coordinates
              var lnlat = new T.LngLat(coordinates[0], coordinates[1])
              return lnlat
            }
          )
        })
        this.carTrackStart()
      },
      carTrackStart() {
        this.carTrack.start()
      },
      carTrackPause() {
        this.carTrack.pause()
      },
      carTrackStop() {
        this.showPanelHistory = false
        this.carTrackPause()
        // this.carTrack.stop()
        // this.carTrack.clear()
        // 呵呵，太难受了,总是这么多莫名其妙的问题，这还得用d3,气屎了
        window.d3.select('.d3-overlay').remove()
        const imgs = document.getElementsByTagName('img')
        Array.prototype.forEach.call(imgs, function (d) {
          if (d.src === 'http://lbs.tianditu.com/api-new/html5/APIExample/openlibrary/data/car.png') {
            d.parentNode.removeChild(d)
          }
        })
        this.carTrack = null
      },
      mapPrint() {
        // 解析路由
        const {href} = this.$router.resolve({
          name: 'map_print',
          query: {
            bounds: JSON.stringify(window.map.getBounds()),
            zoom: window.map.getZoom()
          }
        })
        console.log(href)
        window.open(href, '_blank')
      },
      mapClearOverLays() {
        window.map.clearOverLays()
      },
      _getCarHistory() {
        // 清楚以前的轨迹
        if (this.carTrack) {
          this.carTrackStop()
        }

        if (!this.carCodeHistory || !this.dateRangeHistory.length) {
          this.$message({
            type: 'info',
            message: '请输入车牌号和日期范围'
          })
          return
        }
        // 隐藏控制按钮
        this.showPanelHistory = false
        // 显示loading效果
        this.loadingSearchHistory = true
        // 请求表格数据
        const params = {
          starttime: this.dateRangeHistory[0],
          endtime: this.dateRangeHistory[1],
          carCode: this.carCodeHistory
        }
        getCarHistory(params).then(response => {
          if (response.code === '200') {
            this.mapCarTrack(response.data)
          } else {
            this.$message({
              type: 'error',
              message: response.message
            })
          }
          // 取消表格loading效果
          this.loadingSearchHistory = false
        })
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss">
  .map {
    width: 100%;
    margin-top: 15px;
    height: 600px;
  }
</style>
