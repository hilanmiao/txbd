<template>
  <div class="">
    <div id="mapDiv" class="map">
    </div>
    <div class="map-tool">
      <el-card class="box-card" :body-style="{padding:'5px'}">
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
        <el-select size="mini" value="" placeholder="城市" style="width:120px;">
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
      </el-card>
    </div>
    <div class="menu">
      <el-card :body-style="{padding:'10px'}">
        <img :src="logo"/>
        <el-dropdown>
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

        <el-button type="text" icon="el-icon-info" style="font-weight: bold;color:#606266;">系统帮助</el-button>
      </el-card>
    </div>
    <div class="search">
      <el-card :body-style="{padding:'5px'}">
        <div class="map-icon-wrapper" @click="showCarPanel=!showCarPanel">
          <div class="icon-wrapper icon-quanping">
            <svg-icon icon-class="caidan"/>
          </div>
        </div>
        <el-input placeholder="请输入车牌号" size="small">
          <el-button slot="append" icon="el-icon-search"></el-button>
        </el-input>
      </el-card>
    </div>
    <div class="car-panel-collapse" @click="showCarPanel=true">
      <el-card>
        <i class="el-icon-d-arrow-right"></i>
      </el-card>
    </div>
    <div class="car-panel" v-show="showCarPanel">
      <el-card>
        <el-row>
          <el-col :span="13">
            <h4>&nbsp;&nbsp;车辆列表</h4>
            <template>
              <el-table
                :data="tableData"
                max-height="320"
              >
                <el-table-column
                  prop="car"
                  label="车牌"
                  width="100"
                >
                </el-table-column>
                <el-table-column
                  prop="status"
                  label="状态"
                  width="60"
                >
                </el-table-column>
                <el-table-column
                  label="操作"
                  width="60"
                >
                  <template slot-scope="scope">
                    <el-tooltip content="监控" placement="top">
                      <el-button type="primary" size="mini" icon="el-icon-d-arrow-right"></el-button>
                    </el-tooltip>
                  </template>
                </el-table-column>
              </el-table>
              <el-pagination
                small
                layout="prev, pager, next"
                :total="1000">
              </el-pagination>

            </template>
          </el-col>
          <el-col :span="2">
            <div class="fenge">
              <i class="el-icon-sort"></i>
            </div>
          </el-col>
          <el-col :span="9">
            <h4>&nbsp;&nbsp;监控列表 <span class="tip">(最多同时监控20辆)</span></h4>
            <template>
              <el-table
                :data="tableData"
                max-height="320"
              >
                <el-table-column
                  prop="car"
                  label="车牌"
                  width="100"
                >
                </el-table-column>
                <el-table-column
                  label="操作"
                  width="60"
                >
                  <template slot-scope="scope">
                    <el-tooltip content="移除" placement="top">
                      <el-button type="danger" size="mini" icon="el-icon-delete"></el-button>
                    </el-tooltip>
                  </template>
                </el-table-column>
              </el-table>
            </template>
          </el-col>
        </el-row>
      </el-card>
    </div>
    <div class="car-info" v-show="showCarInfoPanel">
      <el-card>
        <div class="map-icon-wrapper chahao" @click="showCarInfoPanel=false">
          <div class="icon-wrapper icon-quanping">
            <svg-icon icon-class="chahao"/>
          </div>
        </div>
        <h4 class="header">车辆实时信息</h4>
        <div class="chart">
          <pie-chart :resize="chartResize"></pie-chart>
        </div>
        <div class="info">
          <p>
            车牌:
            <el-tag type="info">鲁G809CP</el-tag>
            &nbsp;
            车系:
            <el-tag type="info">宝马X5</el-tag>
          </p>
          <p>
            前温:
            <el-tag type="danger">180℃</el-tag>
            &nbsp;
            前压:
            <el-tag>1KPA</el-tag>
          </p>
          <p>
            中温:
            <el-tag>180℃</el-tag>
            &nbsp;
            中压:
            <el-tag type="danger">1KPA</el-tag>
          </p>
          <p>
            后温:
            <el-tag>180℃</el-tag>
            &nbsp;
            后压:
            <el-tag type="warning">1KPA</el-tag>
          </p>
        </div>
      </el-card>
    </div>
    <div class="control">
      <el-card>
        <el-collapse v-model="controlPanelActiveName" accordion>
          <el-collapse-item name="1">
            <template slot="title">
              <span style="color:#409EFF">车辆实时信息&nbsp;<i class="header-icon el-icon-info"></i></span>
            </template>
            <el-table
              :data="tableData"
              max-height="320"
            >
              <el-table-column
                prop="car"
                label="车牌"
                width="100"
              >
              </el-table-column>
              <el-table-column
                prop="status"
                label="状态"
                width="60"
              >
              </el-table-column>
              <el-table-column
                prop="status"
                label="状态"
                width="60"
              >
              </el-table-column>
              <el-table-column
                prop="status"
                label="状态"
                width="60"
              >
              </el-table-column>
              <el-table-column
                prop="status"
                label="状态"
                width="60"
              >
              </el-table-column>
              <el-table-column
                prop="status"
                label="状态"
                width="60"
              >
              </el-table-column>
              <el-table-column
                prop="status"
                label="状态"
                width="60"
              >
              </el-table-column>
              <el-table-column
                prop="status"
                label="状态"
                width="60"
              >
              </el-table-column>
              <el-table-column
                prop="status"
                label="状态"
                width="60"
              >
              </el-table-column>
              <el-table-column
                prop="status"
                label="状态"
                width="60"
              >
              </el-table-column>
              <el-table-column
                label="操作"
                width="120"
              >
                <template slot-scope="scope">
                  <el-button type="primary" size="mini" icon="el-icon-view" @click="showCarInfoPanel=true">实时监控
                  </el-button>
                </template>
              </el-table-column>
            </el-table>
          </el-collapse-item>
          <el-collapse-item name="2">
            <template slot="title">
              <span style="color:#67C23A">车辆历史记录&nbsp;<i class="header-icon el-icon-info"></i></span>
            </template>
            <div>
              <el-input style="width: 100px;"
                        class="filter-item"
                        placeholder="车牌号">
              </el-input>
              <el-date-picker
                type="daterange"
                align="right"
                unlink-panels
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                :picker-options="pickerOptions"
              >
              </el-date-picker>
              <el-button type="primary" size="small" icon="el-icon-search" @click="mapCarTrack">开始</el-button>
              <el-button type="warning" size="small" icon="el-icon-download" @click="carTrackPause">暂停</el-button>
              <el-button type="danger" size="small" icon="el-icon-download" @click="carTrackStop">结束</el-button>
            </div>
          </el-collapse-item>
          <el-collapse-item name="3">
            <template slot="title">
              <span style="color:#F56C6C">终端实时报警&nbsp;<i class="header-icon el-icon-info"></i></span>
            </template>
            <el-table
              :data="tableData"
              max-height="320"
            >
              <el-table-column
                prop="car"
                label="车牌"
                width="100"
              >
              </el-table-column>
              <el-table-column
                prop="status"
                label="状态"
                width="60"
              >
              </el-table-column>
              <el-table-column
                prop="status"
                label="状态"
                width="60"
              >
              </el-table-column>
              <el-table-column
                prop="status"
                label="状态"
                width="60"
              >
              </el-table-column>
              <el-table-column
                prop="status"
                label="状态"
                width="60"
              >
              </el-table-column>
              <el-table-column
                prop="status"
                label="状态"
                width="60"
              >
              </el-table-column>
              <el-table-column
                prop="status"
                label="状态"
                width="60"
              >
              </el-table-column>
              <el-table-column
                prop="status"
                label="状态"
                width="60"
              >
              </el-table-column>
              <el-table-column
                prop="status"
                label="状态"
                width="60"
              >
              </el-table-column>
              <el-table-column
                prop="status"
                label="状态"
                width="60"
              >
              </el-table-column>
              <el-table-column
                prop="status"
                label="状态"
                width="60"
              >
              </el-table-column>
              <el-table-column
                prop="status"
                label="状态"
                width="60"
              >
              </el-table-column>
              <el-table-column
                label="操作"
                width="60"
              >
                <template slot-scope="scope">
                  <el-tooltip content="历史轨迹" placement="top">
                    <el-button type="success" size="mini" icon="el-icon-view"></el-button>
                  </el-tooltip>
                </template>
              </el-table-column>
            </el-table>
          </el-collapse-item>
        </el-collapse>
      </el-card>
    </div>
    <div class="alarm" v-show="showAlarm">
      <img :src="alarm" alt="">
      <audio controls loop ref="alarmAudio">
        <source :src="alarmAudio" type="audio/mpeg">
      </audio>
      <div class="map-icon-wrapper" @click="alarmMuted">
        <div class="icon-wrapper icon-quanping">
          <svg-icon icon-class="jingyin"/>
        </div>
      </div>
    </div>
    <div class="test">
      <el-button type="danger" @click="alarmOn">警报测试按钮</el-button>
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
  import alarm from '@/assets/home_images/alarm.gif'
  import alarmAudio from '@/assets/home_images/alarm_audio.mp3'
  import screenfull from 'screenfull'
  import {getToken} from '@/utils/auth'
  import {getListHistory} from '@/api/history'
  import PieChart from './components/PieChart'

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
      Control,
      PieChart
    },
    data() {
      return {
        // 图片
        logo,
        alarm,
        alarmAudio,
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
        componentDialogFormVisible: false,
        // 车辆面板
        tableData: [
          {car: '鲁G809CP', status: '在线'},
          {car: '鲁G809CP', status: '在线'},
          {car: '鲁G809CP', status: '在线'},
          {car: '鲁G809CP', status: '离线'},
          {car: '鲁G809CP', status: '在线'},
          {car: '鲁G809CP', status: '在线'},
          {car: '鲁G809CP', status: '在线'},
          {car: '鲁G809CP', status: '在线'},
          {car: '鲁G809CP', status: '离线'},
          {car: '鲁G809CP', status: '在线'}
        ],
        showCarPanel: false,
        // 警报相关
        showAlarm: false,
        // 实时监控面板相关
        showCarInfoPanel: false,
        controlPanelActiveName: '',
        chartResize: false,
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
    watch: {
      'showCarInfoPanel': {
        handler: function (val, oldVal) {
          if (val) {
            this.chartResize = true
          }
        },
        deep: true
      }
    },
    mounted() {
      this.getTreeData()
      this.drawMap()
    },
    methods: {
      alarmOn() {
        this.controlPanelActiveName = '3'
        this.showAlarm = true
        this.$refs.alarmAudio.play()
      },
      alarmMuted() {
        this.$refs.alarmAudio.muted = true
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
        zoom.setPosition(window.T_ANCHOR_BOTTOM_RIGHT)
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
          type: 'FeatureCollection',
          features: [
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
        this.carTrack.stop()
        this.carTrack.clear()
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
  .map {
    position: absolute;
    height: 100%;
    width: 100%;
    z-index: 1;
  }

  .map-tool {
    position: fixed;
    right: 20px;
    top: 20px;
    z-index: 2;
    .box-card {
      height: 43px;
    }
  }

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
        background: #212121
      }
      .icon-dayin {
        background: #03A9F4
      }
      .icon-guanbi {
        background: #FF5252
      }
      .icon-quanping {
        background: #212121;
      }
    }

    .icon-wrapper {
      border-radius: 4px;
      padding: 4px;
      font-size: 20px;
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
      color: #212121
    }

    .icon-dayin {
      color: #03A9F4
    }

    .icon-guanbi {
      color: #FF5252
    }

    .icon-quanping {
      color: #212121
    }
  }

  .menu {
    position: fixed;
    left: 20px;
    top: 20px;
    z-index: 2;
    img {
      vertical-align: middle;
      padding-right: 20px;
    }
    .el-dropdown-link {
      cursor: pointer;
      font-weight: bold;
    }
    .el-icon-arrow-down {
      font-size: 12px;
    }
  }

  .control {
    position: fixed;
    left: 320px;
    bottom: 20px;
    z-index: 3;
  }

  .car-info {
    position: fixed;
    left: 20px;
    bottom: 20px;
    z-index: 2;
    .chahao {
      position: absolute;
      right: 5px;
      top: 5px;
    }
    .header {
      margin: 0;
      text-align: center;
    }
    .info {
      font-size: 13px;
      p {
        margin: 4px;
        .el-tag {
          width: 85px;
          height: 22px;
          line-height: 20px;
        }
      }
    }
  }

  .search {
    position: fixed;
    left: 20px;
    top: 100px;
    z-index: 2;
    .svg-icon {
      vertical-align: middle;
    }
    .el-input {
      width: 250px;
    }
  }

  .car-panel-collapse {
    position: fixed;
    left: 20px;
    top: 150px;
    z-index: 2;
    cursor: pointer;
  }

  .car-panel {
    position: fixed;
    left: 20px;
    top: 150px;
    z-index: 2;
    width: 550px;
    h4 {
      margin: 0;
    }
    .fenge {
      text-align: center;
      margin-top: 170px;
    }
    .tip {
      color: #999999;
      font-size: 12px;
    }
  }

  .alarm {
    position: fixed;
    right: 20px;
    top: 300px;
    z-index: 2;
    audio {
      display: block;
    }
    img {
      width: 150px;
      cursor: pointer;
    }
  }

  .test {
    position: fixed;
    right: 400px;
    top: 300px;
    z-index: 2;
  }

</style>
