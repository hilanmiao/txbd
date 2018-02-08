<template>
  <div class="home-container">
    <div class="nav">
      <el-row class="fl">
        <el-col>
          <img :src="logo" style="vertical-align: middle;"/>
        </el-col>
        <el-col>
          <el-dropdown @command="handleCommand">
						      <span class="el-dropdown-link">
						       <i class="el-icon-edit-outline"></i> DPF信息管理<i class="el-icon-arrow-down el-icon--right"></i>
						      </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>供应商管理</el-dropdown-item>
              <el-dropdown-item>登记信息管理</el-dropdown-item>
              <el-dropdown-item>设备信息管理</el-dropdown-item>
              <el-dropdown-item>维修厂管理</el-dropdown-item>
              <el-dropdown-item>维修管理</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </el-col>

        <el-col>
          <el-dropdown @command="handleCommand">
						      <span class="el-dropdown-link">
							      	<i class="el-icon-printer"></i>
							        统计分析
							        <i class="el-icon-arrow-down el-icon--right"></i>
						      </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>在线率统计</el-dropdown-item>
              <el-dropdown-item>里程统计</el-dropdown-item>
              <el-dropdown-item>车辆信息统计</el-dropdown-item>
              <el-dropdown-item>车辆不在线统计</el-dropdown-item>
              <el-dropdown-item>汽车指标统计</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </el-col>

        <el-col>
          <el-dropdown @command="handleCommand">
						      	<span class="el-dropdown-link">
							      	<i class="el-icon-message"></i>
							        日志管理<i class="el-icon-arrow-down el-icon--right"></i>
						      	</span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>平台日志管理</el-dropdown-item>
              <el-dropdown-item>审核日志查询</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </el-col>

        <el-col>
          <el-dropdown @command="handleCommand">
						      	<span class="el-dropdown-link">
						      		<i class="el-icon-setting"></i>
						        系统管理<i class="el-icon-arrow-down el-icon--right"></i>
						      	</span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>机构管理</el-dropdown-item>
              <el-dropdown-item>角色管理</el-dropdown-item>
              <el-dropdown-item>用户管理</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </el-col>

        <el-col>
          <el-button style="color:#ffffff" type="text" icon="el-icon-bell">公告管理</el-button>
        </el-col>

        <el-col>
          <el-button style="color:#ffffff" type="text" icon="el-icon-info">系统帮助</el-button>
        </el-col>

        <el-button type="success" icon="el-icon-search" @click="webSocket">开启websocket</el-button>
        <el-button type="warning" icon="el-icon-search" @click="webSocketClose">关闭websocket</el-button>

      </el-row>

      <el-row class="fr">
        <el-tooltip content="全屏" placement="bottom">
          <div class="map-icon-wrapper" @click="screenfull">
            <div class="icon-wrapper icon-quanping">
              <svg-icon icon-class="quanping"/>
            </div>
          </div>
        </el-tooltip>
        <el-tooltip content="普通街道地图" placement="bottom">
          <div class="map-icon-wrapper" @click="mapTileLayerClear">
            <div class="icon-wrapper icon-jiedao">
              <svg-icon icon-class="jiedao"/>
            </div>
          </div>
        </el-tooltip>

        <el-tooltip content="混合地图" placement="bottom">
          <div class="map-icon-wrapper" @click="mapShowImgAndCiaLayer">
            <div class="icon-wrapper icon-luwang">
              <svg-icon icon-class="luwang"/>
            </div>
          </div>
        </el-tooltip>
        <el-tooltip content="卫星地图" placement="bottom">
          <div class="map-icon-wrapper" @click="mapShowImgLayer">
            <div class="icon-wrapper icon-weixing">
              <svg-icon icon-class="weixing"/>
            </div>
          </div>
        </el-tooltip>
        <el-tooltip content="全图" placement="bottom">
          <div class="map-icon-wrapper" @click="mapZoomMin">
            <div class="icon-wrapper icon-diqiu">
              <svg-icon icon-class="diqiu"/>
            </div>
          </div>
        </el-tooltip>
        <el-tooltip content="放大" placement="bottom">
          <div class="map-icon-wrapper" @click="mapZoomIn">
            <div class="icon-wrapper icon-fangda">
              <svg-icon icon-class="fangda"/>
            </div>
          </div>
        </el-tooltip>
        <el-tooltip content="缩小" placement="bottom">
          <div class="map-icon-wrapper" @click="mapZoomOut">
            <div class="icon-wrapper icon-suoxiao">
              <svg-icon icon-class="suoxiao"/>
            </div>
          </div>
        </el-tooltip>
        <el-tooltip content="测距工具" placement="bottom">
          <div class="map-icon-wrapper" @click="mapLineToolOpen">
            <div class="icon-wrapper icon-biaochi">
              <svg-icon icon-class="biaochi"/>
            </div>
          </div>
        </el-tooltip>
        <el-tooltip content="清除覆盖物" placement="bottom">
          <div class="map-icon-wrapper" @click="mapClearOverLays">
            <div class="icon-wrapper icon-shanchu">
              <svg-icon icon-class="shanchu"/>
            </div>
          </div>
        </el-tooltip>
        <el-tooltip content="打印地图" placement="bottom">
          <div class="map-icon-wrapper" @click="mapPrint">
            <div class="icon-wrapper icon-dayin">
              <svg-icon icon-class="dayin"/>
            </div>
          </div>
        </el-tooltip>
        <el-tooltip content="汽车轨迹" placement="bottom">
          <div class="map-icon-wrapper" @click="mapCarTrack">
            <div class="icon-wrapper ">
              <svg-icon icon-class="qiche"/>
            </div>
          </div>
        </el-tooltip>
        <el-select size="mini" value="" placeholder="地域">
          <el-option label="济南" value="济南"></el-option>
          <el-option label="潍坊" value="潍坊"></el-option>
          <el-option label="青岛" value="青岛"></el-option>
          <el-option label="青岛" value="青岛"></el-option>
          <el-option label="青岛" value="青岛"></el-option>
          <el-option label="青岛" value="青岛"></el-option>
          <el-option label="青岛" value="青岛"></el-option>
          <el-option label="青岛" value="青岛"></el-option>
          <el-option label="青岛" value="青岛"></el-option>
          <el-option label="青岛" value="青岛"></el-option>
          <el-option label="青岛" value="青岛"></el-option>
          <el-option label="青岛" value="青岛"></el-option>
          <el-option label="青岛" value="青岛"></el-option>
          <el-option label="青岛" value="青岛"></el-option>
          <el-option label="青岛" value="青岛"></el-option>
        </el-select>
        <el-tooltip content="退出" placement="bottom">
          <div class="map-icon-wrapper" @click="logOut">
            <div class="icon-wrapper icon-guanbi">
              <svg-icon icon-class="guanbi"/>
            </div>
          </div>
        </el-tooltip>
      </el-row>

    </div>

    <div>
      <el-row>
        <el-col :span="4" class="left" ref="left">
          <div class="content" ref="leftContent">
            <div class="filter-container">
              <span class="fl">监控面板</span>
              <!--<span class="fr"><i class="el-icon-d-arrow-right"></i></span>-->
            </div>

            <el-collapse style="padding-top: 10px;background: #f2f2f2;">
              <div>
                <el-input class="fl custom-input" placeholder="请输入内容"></el-input>
                <el-button class="fr" type="primary">查询</el-button>
              </div>

              <div class="clearfix" style="padding-top: 10px;">
                <el-tabs type="border-card" style="width: 99%;">
                  <el-tab-pane label="车辆列表" style="width: 33.33%;">
                    <div ref="treeContainer" class="tree-container clearfix" v-loading="treeLoading"
                         element-loading-text="加载中..."
                         style="background: #f2f2f2;">
                      <el-tree
                        ref="tree"
                        node-key="id"
                        show-checkbox
                        default-expand-all
                        :data="treeData"
                        :props="defaultProps"
                        highlight-current
                        @node-click="treeNodeClick"
                        @check-change="treeCheckChange"
                      ></el-tree>
                    </div>
                  </el-tab-pane>
                  <el-tab-pane label="查询结果" style="width: 33.33%;">查询结果</el-tab-pane>
                  <el-tab-pane label="监控列表" style="width: 33.33%;border: 0 !important;">监控列表</el-tab-pane>
                </el-tabs>
              </div>

            </el-collapse>
          </div>

          <div ref="collapseClose" @click="collapseClose" class="collapse"
               style="width: 10px;height: 52px;position: absolute; left:16.7%; top: 50%; transform: translate(-50%,-50%);z-index: 999;"
               :style="backgroundDiv1"></div>
          <div ref="collapseOpen" @click="collapseOpen" class="collapse1"
               style="display: none;width: 10px;height: 52px;position: absolute; left:5px; top: 50%; transform: translate(-50%,-50%);z-index: 999;"
               :style="backgroundDiv2"></div>
        </el-col>

        <el-col :span="20" class="right" ref="right">
          <div class="map-container">
            <div ref="map" id="mapDiv" class="map" style="height: 600px;">
            </div>
          </div>
          <div class="control">
            <control :list-car="listCar" :loading-submit="componentLoadingSubmit"
                     :dialog-form-visible="componentDialogFormVisible"
                     @componentHandleSetHistory="componentHandleSetHistory"
            ></control>
          </div>
        </el-col>
      </el-row>

      <div class="others-container">
        <el-dialog width="20%" :modal="false" :visible.sync="dialogFormVisibleCar" title="历史轨迹" v-loading="loadingTrack">
          <el-form ref="form" label-width="80px">
            <el-form-item>
              <el-button type="primary" @click="carTrackStart" >开始</el-button>
              <el-button @click="carTrackPause">暂停</el-button>
            </el-form-item>
          </el-form>
        </el-dialog>
      </div>
    </div>

    <remote-js src="http://cdn.bootcss.com/d3/3.5.17/d3.js"></remote-js>
    <remote-js src="http://lbs.tianditu.com/api/js4.0/opensource/openlibrary/D3SvgOverlay.js"></remote-js>
    <remote-js src="http://lbs.tianditu.com/api/js4.0/opensource/openlibrary/CarTrack.js"></remote-js>
    <remote-js src="http://cdn.bootcss.com/d3/3.5.17/d3.js"></remote-js>
  </div>
</template>

<script type="text/ecmascript-6">
  import T from 'T'
  import Control from './components/control'
  import logo from '@/assets/home_images/logo.png'
  import collapse from '@/assets/home_images/collapse.png'
  import collapse1 from '@/assets/home_images/collapse1.png'
  import screenfull from 'screenfull'
  import {debounce} from '@/utils'
  import {getToken} from '@/utils/auth'
  import {getListHistory} from '@/api/history'

  export default {
    components: {
      'remote-js': {
        render(createElement) {
          return createElement('script', {attrs: {type: 'text/javascript', src: this.src}})
        },
        props: {
          src: {type: String, required: true}
        }
      },
      Control
    },
    data() {
      return {
        // 图片
        logo,
        collapse,
        collapse1,
        backgroundDiv1: {
          backgroundImage: 'url(' + collapse + ')'
        },
        backgroundDiv2: {
          backgroundImage: 'url(' + collapse1 + ')'
        },
        // tree相关
        treeLoading: false,
        treeData: [],
        defaultProps: {
          children: 'children',
          label: 'label'
        },
        // map相关
        lineTool: null,
        zoom: 12,
        lineToolIsClose: true,
        tileLayerImg: null,
        tileLayerCia: null,
        carTrack: undefined,
        dialogFormVisibleCar: false,
        loadingTrack: false,
        // 子组件相关
        listCar: [],
        // websocket
        ws: undefined,
        listMarker: [],
        componentLoadingSubmit: false,
        componentDialogFormVisible: false
      }
    },
    mounted() {
      this.setLayout()
      this.getTreeData()
      this.drawMap()
      // 监听resize事件
      this.__resizeHanlder = debounce(() => {
        // 重新设置布局
        this.setLayout()
      }, 100)
      window.addEventListener('resize', this.__resizeHanlder)
    },
    methods: {
      setLayout() {
        this.$refs.map.style.height = (window.innerHeight - 236) + 'px'
        this.$refs.treeContainer.style.height = (window.innerHeight - 228) + 'px'
      },
      collapseClose() {
        this.$refs.leftContent.style.display = 'none'
        this.$refs.collapseClose.style.display = 'none'
        this.$refs.collapseOpen.style.display = 'block'
        this.$refs.collapseOpen.style.left = '0'
        this.$refs.right.$el.style.width = '100%'
        // 通知地图容器大小已经改变
        window.map.checkResize()
      },
      collapseOpen() {
        this.$refs.leftContent.style.display = 'block'
        this.$refs.collapseClose.style.display = 'block'
        this.$refs.collapseOpen.style.display = 'none'
        this.$refs.left.$el.style.width = '16.6667%'
        this.$refs.right.$el.style.width = '83.3333%'
        // 通知地图容器大小已经改变
        window.map.checkResize()
      },
      screenfull() {
        if (!screenfull.enabled) {
          this.$message({
            message: '你的浏览器不支持全屏',
            type: 'warning'
          })
          return false
        }
        screenfull.toggle()
      },
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
        window.map.addControl(zoom)

        // 创建标注工具对象
        this.lineTool = new T.PolylineTool(window.map, {showLabel: true})
      },
      mapTileLayerClear() {
        // 移除所有叠加层对象(两个基本的底图并不会被删除) ！！！不好使啊，大哥！！！
        // window.map.clearLayers()
        if (this.tileLayerImg) {
          window.map.removeLayer(this.tileLayerImg)
        }
        if (this.tileLayerCia) {
          window.map.removeLayer(this.tileLayerCia)
        }
      },
      mapShowImgLayer() {
        this.mapTileLayerClear()
        this.mapAddTileLayerImg()
      },
      mapShowImgAndCiaLayer() {
        this.mapTileLayerClear()
        this.mapAddTileLayerImg()
        this.mapAddTileLayerCia()
      },
      mapAddTileLayerImg() {
        const imageURL = 'http://t0.tianditu.cn/img_w/wmts?' +
          'SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=img&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles' +
          '&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}'
        // 创建自定义图层对象
        this.tileLayerImg = new T.TileLayer(imageURL, {minZoom: 1, maxZoom: 18})
        // 将图层增加到地图上
        window.map.addLayer(this.tileLayerImg)
      },
      mapAddTileLayerCia() {
        const imageURL = 'http://t0.tianditu.cn/cia_w/wmts?' +
          'SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=cia&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles' +
          '&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}'
        // 创建自定义图层对象
        this.tileLayerCia = new T.TileLayer(imageURL, {minZoom: 1, maxZoom: 18})
        // 将图层增加到地图上
        window.map.addLayer(this.tileLayerCia)
      },
      mapZoomMin() {
        window.map.setZoom(1)
      },
      mapZoomIn() {
        window.map.zoomIn()
      },
      mapZoomOut() {
        window.map.zoomOut()
      },
      mapLineToolOpen() {
        this.lineToolIsClose = false
        this.lineTool.open()
      },
      mapLineToolClose() {
        this.lineToolIsClose = true
        this.lineTool.clear()
        this.lineTool.close()
      },
      mapMarker(car) {
        // 创建标注
        const marker = new T.Marker(new T.LngLat(car.car_longitude, car.car_latitude))
        window.map.addOverLay(marker)
        // 创建标注的文字标签
        const label = new T.Label({
          text: `<b>${car.car_number}<b>`,
          position: marker.getLngLat(),
          offset: new T.Point(3, -30)
        })
        window.map.addOverLay(label)
        // 创建信息窗口
        const infoWin = new T.InfoWindow()
        const content = `
          <div>
            <b>车辆状态：${car.car_status}</b><br>
            <b>行驶速度：${car.car_speed}</b><br>
            <b>经度：${car.car_longitude}</b><br>
            <b>纬度：${car.car_latitude}</b><br>
            <b>方向：${car.car_direction}</b><br>
            <b>DPF状态：${car.dpf_status}</b><br>
            <b>DOC原温度：${car.t1}</b><br>
            <b>DPF前端温度：${car.t2}</b><br>
            <b>DPF后端温度：${car.t3}</b><br>
          </div>
        `
        infoWin.setContent(content)
        marker.addEventListener('click', function (type, target, lnglat, containerPoint) {
          marker.openInfoWindow(infoWin)
          console.log(type, target, lnglat, containerPoint)
        })
      },
      mapCarTrack() {
        // 或者使用更简单的“添加线”
        window.map.panTo(new T.LngLat(116.26802, 39.90623))
        window.map.setZoom(12)
        const datas = {
          'type': 'FeatureCollection',
          'features': [
            {
              'type': 'Feature',
              'properties': {
                'time': 1,
                'id': 'route1',
                'name': '五棵松'
              },
              'geometry': {
                'type': 'Point',
                'coordinates': [
                  116.26802,
                  39.90623
                ]
              }
            },
            {
              'type': 'Feature',
              'properties': {
                'time': 2,
                'id': 'route1',
                'name': '万寿路'
              },
              'geometry': {
                'type': 'Point',
                'coordinates': [
                  116.28896,
                  39.90622
                ]
              }
            },
            {
              'type': 'Feature',
              'properties': {
                'time': 3,
                'id': 'route1',
                'name': '公主坟'
              },
              'geometry': {
                'type': 'Point',
                'coordinates': [
                  116.30421,
                  39.90625
                ]
              }
            },
            {
              'type': 'Feature',
              'properties': {
                'time': 4,
                'id': 'route1',
                'name': '军事博物馆'
              },
              'geometry': {
                'type': 'Point',
                'coordinates': [
                  116.3155,
                  39.90618
                ]
              }
            },
            {
              'type': 'Feature',
              'properties': {
                'time': 5,
                'id': 'route1',
                'name': '木樨地'
              },
              'geometry': {
                'type': 'Point',
                'coordinates': [
                  116.3313,
                  39.90611
                ]
              }
            },
            {
              'type': 'Feature',
              'properties': {
                'time': 6,
                'id': 'route1',
                'name': '南礼士路'
              },
              'geometry': {
                'type': 'Point',
                'coordinates': [
                  116.34643,
                  39.90583
                ]
              }
            },
            {
              'type': 'Feature',
              'properties': {
                'time': 10,
                'id': 'route1',
                'name': '复兴门'
              },
              'geometry': {
                'type': 'Point',
                'coordinates': [
                  116.35033,
                  39.90582
                ]
              }
            },
            {
              'type': 'Feature',
              'properties': {
                'time': 11,
                'id': 'route1',
                'name': '西单'
              },
              'geometry': {
                'type': 'Point',
                'coordinates': [
                  116.36784,
                  39.90579
                ]
              }
            },
            {
              'type': 'Feature',
              'properties': {
                'time': 12,
                'id': 'route1',
                'name': '灵境胡同'
              },
              'geometry': {
                'type': 'Point',
                'coordinates': [
                  116.36755,
                  39.91449
                ]
              }
            },
            {
              'type': 'Feature',
              'properties': {
                'time': 13,
                'id': 'route1',
                'name': '西四'
              },
              'geometry': {
                'type': 'Point',
                'coordinates': [
                  116.36755,
                  39.91449
                ]
              }
            },
            {
              'type': 'Feature',
              'properties': {
                'time': 14,
                'id': 'route1',
                'name': '平安里'
              },
              'geometry': {
                'type': 'Point',
                'coordinates': [
                  116.36673,
                  39.93235
                ]
              }
            },
            {
              'type': 'Feature',
              'properties': {
                'time': 15,
                'id': 'route1',
                'name': '平安里中转'
              },
              'geometry': {
                'type': 'Point',
                'coordinates': [
                  116.36651,
                  39.93924
                ]
              }
            },
            {
              'type': 'Feature',
              'properties': {
                'time': 16,
                'id': 'route1',
                'name': '新街口'
              },
              'geometry': {
                'type': 'Point',
                'coordinates': [
                  116.36172,
                  39.93923
                ]
              }
            },
            {
              'type': 'Feature',
              'properties': {
                'time': 17,
                'id': 'route1',
                'name': '西直门'
              },
              'geometry': {
                'type': 'Point',
                'coordinates': [
                  116.34936,
                  39.93913
                ]
              }
            },
            {
              'type': 'Feature',
              'properties': {
                'time': 18,
                'id': 'route1',
                'name': '动物园'
              },
              'geometry': {
                'type': 'Point',
                'coordinates': [
                  116.33292,
                  39.93697
                ]
              }
            },
            {
              'type': 'Feature',
              'properties': {
                'time': 18,
                'id': 'route1',
                'name': '白石桥南'
              },
              'geometry': {
                'type': 'Point',
                'coordinates': [
                  116.319550,
                  39.931000
                ]
              }
            }
          ]
        }
        this.carTrack = new T.CarTrack(window.map, {
          interval: 5,
          speed: 10,
          dynamicLine: false,
          polylinestyle: {color: '#2C64A7', weight: 5, opacity: 0.9},
          Datas:
            datas.features.map(
              (obj, i) => {
                var coordinates = obj.geometry.coordinates
                var lnlat = new T.LngLat(coordinates[0], coordinates[1])
                return lnlat
              }
            )
        })
      },
      carTrackStart() {
        this.carTrack.start()
      },
      carTrackPause() {
        this.carTrack.pause()
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
      treeCheckChange(data, nodeChecked, childrenChecked) {
        if (!nodeChecked) {
          // 从监控列表移除
          const index = this.listCar.findIndex(item => item === data.id)
          this.listCar.splice(index, 1)
        } else {
          this.carData.some(item => {
            if (item.id === data.id) {
              // 添加到监控列表
              this.listCar.push(item.id)
              // 创建标注点
              this.mapMarker(item)
              window.map.panTo(new T.LngLat(item.car_longitude, item.car_latitude))
            }
          })
        }
      },
      treeNodeClick(data, node, component) {
        console.log(data, node, component)
        if (node.checked) {
          // 将地图的中心点变换到指定的地理坐标
          this.carData.some(item => {
            if (item.id === data.id) {
              window.map.panTo(new T.LngLat(item.car_longitude, item.car_latitude))
            }
          })
        }
      },
      handleCommand(command) {
        this.goToDashboard()
      },
      goToDashboard() {
        // 解析路由
        const {href} = this.$router.resolve({
          name: 'dashboard'
        })
        window.open(href, '_blank')
      },
      logOut() {
        this.$store.dispatch('FedLogOut').then(() => {
          // 为了重新实例化vue-router对象 避免bug
          location.reload()
        })
      },
      getTreeData() {
        this.treeLoading = true
        setTimeout(() => {
          this.treeData = [
            {
              id: '0',
              label: '所有车辆',
              children: [
                {
                  id: '1',
                  label: '济南',
                  children: [
                    {
                      id: '11',
                      label: '鲁G809CP'
                    },
                    {
                      id: '12',
                      label: '鲁G6666'
                    },
                    {
                      id: '13',
                      label: '鲁G3726'
                    }
                  ]
                },
                {
                  id: '2',
                  label: '潍坊',
                  children: [
                    {
                      id: '21',
                      label: '鲁G1586CP'
                    },
                    {
                      id: '22',
                      label: '鲁G8986CP'
                    },
                    {
                      id: '23',
                      label: '鲁G1876CP'
                    }
                  ]
                }
              ]
            }
          ]
          this.treeLoading = false
        }, 1000)

        this.carData = [
          {
            id: '11',
            car_number: '鲁G809CP',
            car_model: '普通货车',
            createtime: '2018-1-30 12:30:33',
            car_status: '运营中',
            car_speed: 89,
            car_longitude: '116.988770',
            car_latitude: '36.661600',
            car_direction: '东偏北',
            dpf_status: '正常',
            t1: '120℃',
            t2: '200℃',
            t3: '80℃'
          },
          {
            id: '12',
            car_number: '鲁G6666',
            car_model: '普通货车',
            createtime: '2018-1-14 18:40:43',
            car_status: '运营中',
            car_speed: 99,
            car_longitude: '116.975770',
            car_latitude: '36.656540',
            car_direction: '东偏北',
            dpf_status: '正常',
            t1: '120℃',
            t2: '200℃',
            t3: '80℃'
          },
          {
            id: '13',
            car_number: '鲁G3726',
            car_model: '普通货车',
            createtime: '2018-1-28 07:16:55',
            car_status: '运营中',
            car_speed: 40,
            car_longitude: '117.007870',
            car_latitude: '36.670590',
            car_direction: '东偏北',
            dpf_status: '正常',
            t1: '120℃',
            t2: '200℃',
            t3: '80℃'
          },
          {
            id: '21',
            car_number: '鲁G1586CP',
            car_model: '普通货车',
            createtime: '2018-1-25 05:45:44',
            car_status: '运营中',
            car_speed: 60,
            car_longitude: '119.129220',
            car_latitude: '36.707650',
            car_direction: '东偏北',
            dpf_status: '正常',
            t1: '120℃',
            t2: '200℃',
            t3: '80℃'
          },
          {
            id: '22',
            car_number: '鲁G8986CP',
            car_model: '普通货车',
            createtime: '2018-1-29 01:55:29',
            car_status: '运营中',
            car_speed: 80,
            car_longitude: '119.198740',
            car_latitude: '36.726640',
            car_direction: '东偏北',
            dpf_status: '正常',
            t1: '120℃',
            t2: '200℃',
            t3: '80℃'
          },
          {
            id: '23',
            car_number: '鲁G1876CP',
            car_model: '普通货车',
            createtime: '2018-1-27 09:47:16',
            car_status: '运营中',
            car_speed: 120,
            car_longitude: '119.189470',
            car_latitude: '36.772030',
            car_direction: '东偏北',
            dpf_status: '正常',
            t1: '120℃',
            t2: '200℃',
            t3: '80℃'
          }
        ]
      },
      webSocket() {
        const self = this
        // 创建标注
        const marker = new T.Marker(new T.LngLat(119.097980, 36.695950))
        window.map.addOverLay(marker)
        // 创建标注的文字标签
        const label = new T.Label({
          text: `<b style="color:red">测试websocket<b>`,
          position: marker.getLngLat(),
          offset: new T.Point(3, -30)
        })
        window.map.addOverLay(label)
        // 创建信息窗口
        const infoWin = new T.InfoWindow()
        let content = `
          <div>
            <b>车辆状态：aaasd</b><br>
          </div>
        `
        infoWin.setContent(content)
        marker.addEventListener('click', function (type, target, lnglat, containerPoint) {
          marker.openInfoWindow(infoWin)
          console.log(type, target, lnglat, containerPoint)
        })
        // window.map.panTo(marker.getLngLat())
        this.listMarker.push(
          {
            car: '鲁G12345',
            marker: marker,
            label: label,
            infoWin: infoWin
          }
        )

        const token = getToken()
        const car = '鲁g12345'
        this.ws = new WebSocket(`ws://192.168.1.198:8087/socketServer/${token}/${car}`)
        this.ws.onopen = function (evt) {
          console.log('Connection open ...')
          // ws.send('Hello WebSockets!')
        }
        this.ws.onmessage = function (evt) {
          const data = JSON.parse(evt.data)
          console.log('Received Message: ' + evt.data)
          marker.setLngLat(new T.LngLat(data.lt, data.la))
          label.setLngLat(marker.getLngLat())
          infoWin.setLngLat(marker.getLngLat())
          content = `
          <div>
            <b>车辆状态：${data.upTime}</b><br>
          </div>
          `
          infoWin.setContent(content)
          infoWin.update()
        }
        this.ws.onclose = function (evt) {
          console.log('Connection closed.')
        }
      },
      webSocketClose() {
        this.ws.close()
        window.map.removeOverLay(this.listMarker[0].marker)
        window.map.removeOverLay(this.listMarker[0].label)
        window.map.removeOverLay(this.listMarker[0].infoWin)
      },
      componentHandleSetHistory(listQuery) {
        // 弹出控制面板
        this.dialogFormVisibleCar = true
        this.loadingTrack = true

        const params = {
          token: getToken(),
          starttime: listQuery.dateRange[0],
          endtime: listQuery.dateRange[1],
          carCode: listQuery.carCode
        }
        getListHistory(params).then(response => {
          if (response.code === '200') {
            // 弹出提醒信息
            this.$message({
              type: 'success',
              message: '操作成功!'
            })
            // 设置轨迹
            this.mapCarTrack(response.data)
            // 取消轨迹loading
            this.loadingTrack = false
          } else {
            this.$message({
              type: 'error',
              message: response.message
            })
          }
        })
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .map-icon-wrapper {
    cursor: pointer;
    display: inline-block;
    &:hover {
      .icon-wrapper {
        color: #fff;
      }
      .icon-jiedao {
        background: #303F9F
      }
      .icon-luwang {
        background: #388E3C
      }
      .icon-weixing {
        background: #FF9800
      }
      .icon-diqiu {
        background: #FF5252
      }
      .icon-fangda {
        background: #795548
      }
      .icon-suoxiao {
        background: #607D8B
      }
      .icon-biaochi {
        background: #7B1FA2
      }
      .icon-shanchu {
        background: #7C4DFF
      }
      .icon-dayin {
        background: #03A9F4
      }
      .icon-guanbi {
        background: #FF5252
      }
      .icon-quanping {
        background: #ffffff;
        color: #333;
      }
    }

    .icon-wrapper {
      border-radius: 4px;
      padding: 0 10px;
      /*margin: 4px 0 0 4px;*/
      font-size: 22px;
    }
  }

  .icon-jiedao {
    color: #303F9F
  }

  .icon-luwang {
    color: #388E3C
  }

  .icon-weixing {
    color: #FF9800
  }

  .icon-diqiu {
    color: #FF5252
  }

  .icon-fangda {
    color: #795548
  }

  .icon-suoxiao {
    color: #607D8B
  }

  .icon-biaochi {
    color: #7B1FA2
  }

  .icon-shanchu {
    color: #7C4DFF
  }

  .icon-dayin {
    color: #FF9800
  }

  .icon-guanbi {
    color: #FF5252
  }

  .icon-quanping {
    color: #fff
  }


</style>
