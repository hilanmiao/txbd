<!--<template>-->
  <!--<div class="home-container">-->
    <!--<div class="" style="padding-bottom: 10px;padding-top: 10px;">-->
      <!--<el-row type="flex" justify="space-between">-->
        <!--<el-col :span="14">-->
          <!--<el-button-group>-->
            <!--<el-button type="primary" icon="el-icon-location" @click="goToDashboard">定时定位车辆查询</el-button>-->
            <!--<el-button type="primary" icon="el-icon-location">数据统计</el-button>-->
            <!--<el-button type="primary" icon="el-icon-location">信息管理</el-button>-->
            <!--<el-button type="primary" icon="el-icon-location">系统管理</el-button>-->
            <!--<el-button type="primary" icon="el-icon-location">系统帮助</el-button>-->
          <!--</el-button-group>-->
        <!--</el-col>-->
        <!--<el-col :span="10" style="text-align:right;">-->
          <!--<el-tooltip content="普通街道地图" placement="bottom">-->
            <!--<div class="map-icon-wrapper">-->
              <!--<div class="icon-wrapper icon-jiedao">-->
                <!--<svg-icon icon-class="jiedao"/>-->
              <!--</div>-->
            <!--</div>-->
          <!--</el-tooltip>-->

          <!--<el-tooltip content="混合地图" placement="bottom">-->
            <!--<div class="map-icon-wrapper">-->
              <!--<div class="icon-wrapper icon-luwang">-->
                <!--<svg-icon icon-class="luwang"/>-->
              <!--</div>-->
            <!--</div>-->
          <!--</el-tooltip>-->
          <!--<el-tooltip content="卫星地图" placement="bottom">-->
            <!--<div class="map-icon-wrapper">-->
              <!--<div class="icon-wrapper icon-weixing">-->
                <!--<svg-icon icon-class="weixing"/>-->
              <!--</div>-->
            <!--</div>-->
          <!--</el-tooltip>-->
          <!--<el-tooltip content="全图" placement="bottom">-->
            <!--<div class="map-icon-wrapper">-->
              <!--<div class="icon-wrapper icon-diqiu">-->
                <!--<svg-icon icon-class="diqiu"/>-->
              <!--</div>-->
            <!--</div>-->
          <!--</el-tooltip>-->
          <!--<el-tooltip content="放大" placement="bottom">-->
            <!--<div class="map-icon-wrapper">-->
              <!--<div class="icon-wrapper icon-fangda">-->
                <!--<svg-icon icon-class="fangda"/>-->
              <!--</div>-->
            <!--</div>-->
          <!--</el-tooltip>-->
          <!--<el-tooltip content="缩小" placement="bottom">-->
            <!--<div class="map-icon-wrapper">-->
              <!--<div class="icon-wrapper icon-suoxiao">-->
                <!--<svg-icon icon-class="suoxiao"/>-->
              <!--</div>-->
            <!--</div>-->
          <!--</el-tooltip>-->
          <!--<el-tooltip content="测距工具" placement="bottom">-->
            <!--<div class="map-icon-wrapper">-->
              <!--<div class="icon-wrapper icon-biaochi">-->
                <!--<svg-icon icon-class="biaochi"/>-->
              <!--</div>-->
            <!--</div>-->
          <!--</el-tooltip>-->
          <!--<el-tooltip content="清除覆盖物" placement="bottom">-->
            <!--<div class="map-icon-wrapper">-->
              <!--<div class="icon-wrapper icon-shanchu">-->
                <!--<svg-icon icon-class="shanchu"/>-->
              <!--</div>-->
            <!--</div>-->
          <!--</el-tooltip>-->
          <!--<el-tooltip content="打印地图" placement="bottom">-->
            <!--<div class="map-icon-wrapper">-->
              <!--<div class="icon-wrapper icon-dayin">-->
                <!--<svg-icon icon-class="dayin"/>-->
              <!--</div>-->
            <!--</div>-->
          <!--</el-tooltip>-->
          <!--<el-select size="mini" value="" placeholder="地域">-->
            <!--<el-option label="济南" value="济南"></el-option>-->
            <!--<el-option label="潍坊" value="潍坊"></el-option>-->
            <!--<el-option label="青岛" value="青岛"></el-option>-->
            <!--<el-option label="青岛" value="青岛"></el-option>-->
            <!--<el-option label="青岛" value="青岛"></el-option>-->
            <!--<el-option label="青岛" value="青岛"></el-option>-->
            <!--<el-option label="青岛" value="青岛"></el-option>-->
            <!--<el-option label="青岛" value="青岛"></el-option>-->
            <!--<el-option label="青岛" value="青岛"></el-option>-->
            <!--<el-option label="青岛" value="青岛"></el-option>-->
            <!--<el-option label="青岛" value="青岛"></el-option>-->
            <!--<el-option label="青岛" value="青岛"></el-option>-->
            <!--<el-option label="青岛" value="青岛"></el-option>-->
            <!--<el-option label="青岛" value="青岛"></el-option>-->
            <!--<el-option label="青岛" value="青岛"></el-option>-->
          <!--</el-select>-->
          <!--<el-tooltip content="退出" placement="bottom">-->
            <!--<div class="map-icon-wrapper" @click="iconHandleTuichu">-->
              <!--<div class="icon-wrapper icon-guanbi">-->
                <!--<svg-icon icon-class="guanbi"/>-->
              <!--</div>-->
            <!--</div>-->
          <!--</el-tooltip>-->

          <!--<el-button-group>-->

            <!--<el-button type="primary" icon="el-icon-edit" @click="mapTileLayerClear">普通街道地图</el-button>-->
            <!--<el-button type="primary" icon="el-icon-share" @click="mapShowImgLayer">卫星地图</el-button>-->
            <!--<el-button type="primary" icon="el-icon-delete" @click="mapShowImgAndCiaLayer">卫星和网路的混合视图</el-button>-->
            <!--<el-button type="primary" icon="el-icon-delete" @click="mapZoomMin">全图</el-button>-->
            <!--<el-button type="primary" icon="el-icon-delete" @click="mapZoomIn">放大</el-button>-->
            <!--<el-button type="primary" icon="el-icon-delete" @click="mapZoomOut">缩小</el-button>-->
            <!--<el-button type="primary" v-if="lineToolIsClose" icon="el-icon-delete" @click="mapLineToolOpen">测距-->
            <!--</el-button>-->
            <!--<el-button type="danger" v-if="!lineToolIsClose" icon="el-icon-delete" @click="mapLineToolClose">关闭测距-->
            <!--</el-button>-->
            <!--<el-button type="primary" icon="el-icon-delete" @click="mapClearOverLays">清除覆盖物</el-button>-->
            <!--<el-button type="success" icon="el-icon-location" @click="mapCarTrack">画车辆轨迹</el-button>-->
            <!--<el-button type="success" icon="el-icon-location" @click="mapPrint">打印</el-button>-->
          <!--</el-button-group>-->
        <!--</el-col>-->
      <!--</el-row>-->
    <!--</div>-->
    <!--<div>-->
      <!--<el-row>-->
        <!--<el-col :span="4">-->
          <!--<div class="filter-container">-->

          <!--</div>-->
          <!--<div class="tree-container"-->
               <!--v-loading="treeLoading"-->
               <!--element-loading-text="加载中..." style="min-height: 600px;">-->
            <!--<el-tree-->
              <!--ref="tree"-->
              <!--node-key="id"-->
              <!--show-checkbox-->
              <!--default-expand-all-->
              <!--:data="treeData"-->
              <!--:props="defaultProps"-->
              <!--highlight-current-->
              <!--@node-click="treeNodeClick"-->
              <!--@check-change="treeCheckChange"-->
            <!--&gt;</el-tree>-->
          <!--</div>-->
        <!--</el-col>-->
        <!--<el-col :span="20">-->
          <!--<div class="map-container">-->
            <!--<div ref="map" id="mapDiv" class="map" style="height: 700px;">-->

            <!--</div>-->
          <!--</div>-->
          <!--<div class="control">-->
            <!--<div style="margin-top: 10px;">-->
              <!--<el-button-group>-->
                <!--<el-button type="text">事件报告 0</el-button>-->
                <!--<el-button type="text">事件报告 0</el-button>-->
                <!--<el-button type="text">事件报告 0</el-button>-->
                <!--<el-button type="text">事件报告 0</el-button>-->
                <!--<el-button type="text">事件报告 0</el-button>-->
                <!--<el-button type="text">事件报告 0</el-button>-->
                <!--<el-button type="text">事件报告 0</el-button>-->
                <!--<el-button type="text">事件报告 0</el-button>-->
              <!--</el-button-group>-->
            <!--</div>-->
            <!--<div style="margin-top: 10px;margin-bottom: 10px;">-->
              <!--<control :list-car="listCar"></control>-->
            <!--</div>-->
          <!--</div>-->
        <!--</el-col>-->
      <!--</el-row>-->
    <!--</div>-->

    <!--<remote-js src="http://cdn.bootcss.com/d3/3.5.17/d3.js"></remote-js>-->
    <!--<remote-js src="http://lbs.tianditu.com/api/js4.0/opensource/openlibrary/D3SvgOverlay.js"></remote-js>-->
    <!--<remote-js src="http://lbs.tianditu.com/api/js4.0/opensource/openlibrary/CarTrack.js"></remote-js>-->
    <!--<remote-js src="http://cdn.bootcss.com/d3/3.5.17/d3.js"></remote-js>-->
  <!--</div>-->
<!--</template>-->

<!--<script type="text/ecmascript-6">-->
  <!--import T from 'T'-->
  <!--import Control from './components/control'-->
  <!--import {debounce} from '@/utils'-->

  <!--export default {-->
    <!--components: {-->
      <!--'remote-js': {-->
        <!--render(createElement) {-->
          <!--return createElement('script', {attrs: {type: 'text/javascript', src: this.src}})-->
        <!--},-->
        <!--props: {-->
          <!--src: {type: String, required: true}-->
        <!--}-->
      <!--},-->
      <!--Control-->
    <!--},-->
    <!--data() {-->
      <!--return {-->
        <!--// tree相关-->
        <!--treeLoading: false,-->
        <!--treeData: [],-->
        <!--defaultProps: {-->
          <!--children: 'children',-->
          <!--label: 'label'-->
        <!--},-->
        <!--// map相关-->
        <!--lineTool: null,-->
        <!--zoom: 16,-->
        <!--lineToolIsClose: true,-->
        <!--tileLayerImg: null,-->
        <!--tileLayerCia: null,-->
        <!--// 子组件相关-->
        <!--listCar: []-->
      <!--}-->
    <!--},-->
    <!--mounted() {-->
      <!--this.getTreeData()-->
      <!--this.drawMap()-->
      <!--this.$refs.map.style.height = '300px'-->
      <!--// // 监听resize事件-->
      <!--// this.__resizeHanlder = debounce(() => {-->
      <!--//   this.$refs.map.style.height = '300px'-->
      <!--// }, 100)-->
      <!--// window.addEventListener('resize', this.__resizeHanlder)-->
    <!--},-->
    <!--methods: {-->
      <!--drawMap() {-->
        <!--window.map = new T.Map('mapDiv')-->
        <!--window.map.centerAndZoom(new T.LngLat(116.986110, 36.670660), this.zoom)-->
        <!--// 允许鼠标双击放大地图-->
        <!--window.map.enableScrollWheelZoom()-->

        <!--// 添加鹰眼控件-->
        <!--var miniMap = new T.Control.OverviewMap({-->
          <!--isOpen: true,-->
          <!--size: new T.Point(150, 150)-->
        <!--})-->
        <!--window.map.addControl(miniMap)-->

        <!--// 添加比例尺控件-->
        <!--var scale = new T.Control.Scale()-->
        <!--window.map.addControl(scale)-->

        <!--// 添加缩放控件-->
        <!--var zoom = new T.Control.Zoom()-->
        <!--window.map.addControl(zoom)-->

        <!--// 创建标注工具对象-->
        <!--this.lineTool = new T.PolylineTool(window.map, {showLabel: true})-->
      <!--},-->
      <!--mapTileLayerClear() {-->
        <!--// 移除所有叠加层对象(两个基本的底图并不会被删除) ！！！不好使啊，大哥！！！-->
        <!--// window.map.clearLayers()-->
        <!--if (this.tileLayerImg) {-->
          <!--window.map.removeLayer(this.tileLayerImg)-->
        <!--}-->
        <!--if (this.tileLayerCia) {-->
          <!--window.map.removeLayer(this.tileLayerCia)-->
        <!--}-->
      <!--},-->
      <!--mapShowImgLayer() {-->
        <!--this.mapTileLayerClear()-->
        <!--this.mapAddTileLayerImg()-->
      <!--},-->
      <!--mapShowImgAndCiaLayer() {-->
        <!--this.mapTileLayerClear()-->
        <!--this.mapAddTileLayerImg()-->
        <!--this.mapAddTileLayerCia()-->
      <!--},-->
      <!--mapAddTileLayerImg() {-->
        <!--const imageURL = 'http://t0.tianditu.cn/img_w/wmts?' +-->
          <!--'SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=img&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles' +-->
          <!--'&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}'-->
        <!--// 创建自定义图层对象-->
        <!--this.tileLayerImg = new T.TileLayer(imageURL, {minZoom: 1, maxZoom: 18})-->
        <!--// 将图层增加到地图上-->
        <!--window.map.addLayer(this.tileLayerImg)-->
      <!--},-->
      <!--mapAddTileLayerCia() {-->
        <!--const imageURL = 'http://t0.tianditu.cn/cia_w/wmts?' +-->
          <!--'SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=cia&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles' +-->
          <!--'&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}'-->
        <!--// 创建自定义图层对象-->
        <!--this.tileLayerCia = new T.TileLayer(imageURL, {minZoom: 1, maxZoom: 18})-->
        <!--// 将图层增加到地图上-->
        <!--window.map.addLayer(this.tileLayerCia)-->
      <!--},-->
      <!--mapZoomMin() {-->
        <!--window.map.setZoom(1)-->
      <!--},-->
      <!--mapZoomIn() {-->
        <!--window.map.zoomIn()-->
      <!--},-->
      <!--mapZoomOut() {-->
        <!--window.map.zoomOut()-->
      <!--},-->
      <!--mapLineToolOpen() {-->
        <!--this.lineToolIsClose = false-->
        <!--this.lineTool.open()-->
      <!--},-->
      <!--mapLineToolClose() {-->
        <!--this.lineToolIsClose = true-->
        <!--this.lineTool.clear()-->
        <!--this.lineTool.close()-->
      <!--},-->
      <!--mapMarker(car) {-->
        <!--// 创建标注-->
        <!--const marker = new T.Marker(new T.LngLat(car.car_longitude, car.car_latitude))-->
        <!--window.map.addOverLay(marker)-->
        <!--// 创建标注的文字标签-->
        <!--const label = new T.Label({-->
          <!--text: `<b>${car.car_number}<b>`,-->
          <!--position: marker.getLngLat(),-->
          <!--offset: new T.Point(3, -30)-->
        <!--})-->
        <!--window.map.addOverLay(label)-->
        <!--// 创建信息窗口-->
        <!--const infoWin = new T.InfoWindow()-->
        <!--const content = `-->
          <!--<div>-->
            <!--<b>车辆状态：${car.car_status}</b><br>-->
            <!--<b>行驶速度：${car.car_speed}</b><br>-->
            <!--<b>经度：${car.car_longitude}</b><br>-->
            <!--<b>纬度：${car.car_latitude}</b><br>-->
            <!--<b>方向：${car.car_direction}</b><br>-->
            <!--<b>DPF状态：${car.dpf_status}</b><br>-->
            <!--<b>DOC原温度：${car.t1}</b><br>-->
            <!--<b>DPF前端温度：${car.t2}</b><br>-->
            <!--<b>DPF后端温度：${car.t3}</b><br>-->
          <!--</div>-->
        <!--`-->
        <!--infoWin.setContent(content)-->
        <!--marker.addEventListener('click', function (type, target, lnglat, containerPoint) {-->
          <!--marker.openInfoWindow(infoWin)-->
          <!--console.log(type, target, lnglat, containerPoint)-->
        <!--})-->
      <!--},-->
      <!--mapCarTrack() {-->
        <!--// 或者使用更简单的“添加线”-->
        <!--window.map.panTo(new T.LngLat(116.26802, 39.90623))-->
        <!--window.map.setZoom(12)-->
        <!--const datas = {-->
          <!--'type': 'FeatureCollection',-->
          <!--'features': [-->
            <!--{-->
              <!--'type': 'Feature',-->
              <!--'properties': {-->
                <!--'time': 1,-->
                <!--'id': 'route1',-->
                <!--'name': '五棵松'-->
              <!--},-->
              <!--'geometry': {-->
                <!--'type': 'Point',-->
                <!--'coordinates': [-->
                  <!--116.26802,-->
                  <!--39.90623-->
                <!--]-->
              <!--}-->
            <!--},-->
            <!--{-->
              <!--'type': 'Feature',-->
              <!--'properties': {-->
                <!--'time': 2,-->
                <!--'id': 'route1',-->
                <!--'name': '万寿路'-->
              <!--},-->
              <!--'geometry': {-->
                <!--'type': 'Point',-->
                <!--'coordinates': [-->
                  <!--116.28896,-->
                  <!--39.90622-->
                <!--]-->
              <!--}-->
            <!--},-->
            <!--{-->
              <!--'type': 'Feature',-->
              <!--'properties': {-->
                <!--'time': 3,-->
                <!--'id': 'route1',-->
                <!--'name': '公主坟'-->
              <!--},-->
              <!--'geometry': {-->
                <!--'type': 'Point',-->
                <!--'coordinates': [-->
                  <!--116.30421,-->
                  <!--39.90625-->
                <!--]-->
              <!--}-->
            <!--},-->
            <!--{-->
              <!--'type': 'Feature',-->
              <!--'properties': {-->
                <!--'time': 4,-->
                <!--'id': 'route1',-->
                <!--'name': '军事博物馆'-->
              <!--},-->
              <!--'geometry': {-->
                <!--'type': 'Point',-->
                <!--'coordinates': [-->
                  <!--116.3155,-->
                  <!--39.90618-->
                <!--]-->
              <!--}-->
            <!--},-->
            <!--{-->
              <!--'type': 'Feature',-->
              <!--'properties': {-->
                <!--'time': 5,-->
                <!--'id': 'route1',-->
                <!--'name': '木樨地'-->
              <!--},-->
              <!--'geometry': {-->
                <!--'type': 'Point',-->
                <!--'coordinates': [-->
                  <!--116.3313,-->
                  <!--39.90611-->
                <!--]-->
              <!--}-->
            <!--},-->
            <!--{-->
              <!--'type': 'Feature',-->
              <!--'properties': {-->
                <!--'time': 6,-->
                <!--'id': 'route1',-->
                <!--'name': '南礼士路'-->
              <!--},-->
              <!--'geometry': {-->
                <!--'type': 'Point',-->
                <!--'coordinates': [-->
                  <!--116.34643,-->
                  <!--39.90583-->
                <!--]-->
              <!--}-->
            <!--},-->
            <!--{-->
              <!--'type': 'Feature',-->
              <!--'properties': {-->
                <!--'time': 10,-->
                <!--'id': 'route1',-->
                <!--'name': '复兴门'-->
              <!--},-->
              <!--'geometry': {-->
                <!--'type': 'Point',-->
                <!--'coordinates': [-->
                  <!--116.35033,-->
                  <!--39.90582-->
                <!--]-->
              <!--}-->
            <!--},-->
            <!--{-->
              <!--'type': 'Feature',-->
              <!--'properties': {-->
                <!--'time': 11,-->
                <!--'id': 'route1',-->
                <!--'name': '西单'-->
              <!--},-->
              <!--'geometry': {-->
                <!--'type': 'Point',-->
                <!--'coordinates': [-->
                  <!--116.36784,-->
                  <!--39.90579-->
                <!--]-->
              <!--}-->
            <!--},-->
            <!--{-->
              <!--'type': 'Feature',-->
              <!--'properties': {-->
                <!--'time': 12,-->
                <!--'id': 'route1',-->
                <!--'name': '灵境胡同'-->
              <!--},-->
              <!--'geometry': {-->
                <!--'type': 'Point',-->
                <!--'coordinates': [-->
                  <!--116.36755,-->
                  <!--39.91449-->
                <!--]-->
              <!--}-->
            <!--},-->
            <!--{-->
              <!--'type': 'Feature',-->
              <!--'properties': {-->
                <!--'time': 13,-->
                <!--'id': 'route1',-->
                <!--'name': '西四'-->
              <!--},-->
              <!--'geometry': {-->
                <!--'type': 'Point',-->
                <!--'coordinates': [-->
                  <!--116.36755,-->
                  <!--39.91449-->
                <!--]-->
              <!--}-->
            <!--},-->
            <!--{-->
              <!--'type': 'Feature',-->
              <!--'properties': {-->
                <!--'time': 14,-->
                <!--'id': 'route1',-->
                <!--'name': '平安里'-->
              <!--},-->
              <!--'geometry': {-->
                <!--'type': 'Point',-->
                <!--'coordinates': [-->
                  <!--116.36673,-->
                  <!--39.93235-->
                <!--]-->
              <!--}-->
            <!--},-->
            <!--{-->
              <!--'type': 'Feature',-->
              <!--'properties': {-->
                <!--'time': 15,-->
                <!--'id': 'route1',-->
                <!--'name': '平安里中转'-->
              <!--},-->
              <!--'geometry': {-->
                <!--'type': 'Point',-->
                <!--'coordinates': [-->
                  <!--116.36651,-->
                  <!--39.93924-->
                <!--]-->
              <!--}-->
            <!--},-->
            <!--{-->
              <!--'type': 'Feature',-->
              <!--'properties': {-->
                <!--'time': 16,-->
                <!--'id': 'route1',-->
                <!--'name': '新街口'-->
              <!--},-->
              <!--'geometry': {-->
                <!--'type': 'Point',-->
                <!--'coordinates': [-->
                  <!--116.36172,-->
                  <!--39.93923-->
                <!--]-->
              <!--}-->
            <!--},-->
            <!--{-->
              <!--'type': 'Feature',-->
              <!--'properties': {-->
                <!--'time': 17,-->
                <!--'id': 'route1',-->
                <!--'name': '西直门'-->
              <!--},-->
              <!--'geometry': {-->
                <!--'type': 'Point',-->
                <!--'coordinates': [-->
                  <!--116.34936,-->
                  <!--39.93913-->
                <!--]-->
              <!--}-->
            <!--},-->
            <!--{-->
              <!--'type': 'Feature',-->
              <!--'properties': {-->
                <!--'time': 18,-->
                <!--'id': 'route1',-->
                <!--'name': '动物园'-->
              <!--},-->
              <!--'geometry': {-->
                <!--'type': 'Point',-->
                <!--'coordinates': [-->
                  <!--116.33292,-->
                  <!--39.93697-->
                <!--]-->
              <!--}-->
            <!--},-->
            <!--{-->
              <!--'type': 'Feature',-->
              <!--'properties': {-->
                <!--'time': 18,-->
                <!--'id': 'route1',-->
                <!--'name': '白石桥南'-->
              <!--},-->
              <!--'geometry': {-->
                <!--'type': 'Point',-->
                <!--'coordinates': [-->
                  <!--116.319550,-->
                  <!--39.931000-->
                <!--]-->
              <!--}-->
            <!--}-->
          <!--]-->
        <!--}-->
        <!--const carTrack = new T.CarTrack(window.map, {-->
          <!--interval: 5,-->
          <!--speed: 10,-->
          <!--dynamicLine: false,-->
          <!--polylinestyle: {color: '#2C64A7', weight: 5, opacity: 0.9},-->
          <!--Datas:-->
            <!--datas.features.map(-->
              <!--(obj, i) => {-->
                <!--var coordinates = obj.geometry.coordinates-->
                <!--var lnlat = new T.LngLat(coordinates[0], coordinates[1])-->
                <!--return lnlat-->
              <!--}-->
            <!--)-->
        <!--})-->
        <!--carTrack.start()-->
      <!--},-->
      <!--mapPrint() {-->
        <!--// 解析路由-->
        <!--const {href} = this.$router.resolve({-->
          <!--name: 'map_print',-->
          <!--query: {-->
            <!--bounds: JSON.stringify(window.map.getBounds()),-->
            <!--zoom: window.map.getZoom()-->
          <!--}-->
        <!--})-->
        <!--console.log(href)-->
        <!--window.open(href, '_blank')-->
      <!--},-->
      <!--mapClearOverLays() {-->
        <!--window.map.clearOverLays()-->
      <!--},-->
      <!--treeCheckChange(data, nodeChecked, childrenChecked) {-->
        <!--if (!nodeChecked) {-->
          <!--// 从监控列表移除-->
          <!--const index = this.listCar.findIndex(item => item === data.id)-->
          <!--this.listCar.splice(index, 1)-->
        <!--} else {-->
          <!--this.carData.some(item => {-->
            <!--if (item.id === data.id) {-->
              <!--// 添加到监控列表-->
              <!--this.listCar.push(item.id)-->
              <!--// 创建标注点-->
              <!--this.mapMarker(item)-->
              <!--window.map.panTo(new T.LngLat(item.car_longitude, item.car_latitude))-->
            <!--}-->
          <!--})-->
        <!--}-->
      <!--},-->
      <!--treeNodeClick(data, node, component) {-->
        <!--console.log(data, node, component)-->
        <!--if (node.checked) {-->
          <!--// 将地图的中心点变换到指定的地理坐标-->
          <!--this.carData.some(item => {-->
            <!--if (item.id === data.id) {-->
              <!--window.map.panTo(new T.LngLat(item.car_longitude, item.car_latitude))-->
            <!--}-->
          <!--})-->
        <!--}-->
      <!--},-->
      <!--goToDashboard () {-->
        <!--// 解析路由-->
        <!--const {href} = this.$router.resolve({-->
          <!--name: 'dashboard'-->
        <!--})-->
        <!--window.open(href, '_blank')-->
      <!--},-->
      <!--iconHandleTuichu() {-->
        <!--this.$store.dispatch('FedLogOut').then(() => {-->
          <!--// 为了重新实例化vue-router对象 避免bug-->
          <!--location.reload()-->
        <!--})-->
      <!--},-->
      <!--getTreeData() {-->
        <!--this.treeLoading = true-->
        <!--setTimeout(() => {-->
          <!--this.treeData = [-->
            <!--{-->
              <!--id: '0',-->
              <!--label: '所有车辆',-->
              <!--children: [-->
                <!--{-->
                  <!--id: '1',-->
                  <!--label: '济南',-->
                  <!--children: [-->
                    <!--{-->
                      <!--id: '11',-->
                      <!--label: '鲁G809CP'-->
                    <!--},-->
                    <!--{-->
                      <!--id: '12',-->
                      <!--label: '鲁G6666'-->
                    <!--},-->
                    <!--{-->
                      <!--id: '13',-->
                      <!--label: '鲁G3726'-->
                    <!--}-->
                  <!--]-->
                <!--},-->
                <!--{-->
                  <!--id: '2',-->
                  <!--label: '潍坊',-->
                  <!--children: [-->
                    <!--{-->
                      <!--id: '21',-->
                      <!--label: '鲁G1586CP'-->
                    <!--},-->
                    <!--{-->
                      <!--id: '22',-->
                      <!--label: '鲁G8986CP'-->
                    <!--},-->
                    <!--{-->
                      <!--id: '23',-->
                      <!--label: '鲁G1876CP'-->
                    <!--}-->
                  <!--]-->
                <!--}-->
              <!--]-->
            <!--}-->
          <!--]-->
          <!--this.treeLoading = false-->
        <!--}, 1000)-->

        <!--this.carData = [-->
          <!--{-->
            <!--id: '11',-->
            <!--car_number: '鲁G809CP',-->
            <!--car_model: '普通货车',-->
            <!--createtime: '2018-1-30 12:30:33',-->
            <!--car_status: '运营中',-->
            <!--car_speed: 89,-->
            <!--car_longitude: '116.988770',-->
            <!--car_latitude: '36.661600',-->
            <!--car_direction: '东偏北',-->
            <!--dpf_status: '正常',-->
            <!--t1: '120℃',-->
            <!--t2: '200℃',-->
            <!--t3: '80℃'-->
          <!--},-->
          <!--{-->
            <!--id: '12',-->
            <!--car_number: '鲁G6666',-->
            <!--car_model: '普通货车',-->
            <!--createtime: '2018-1-14 18:40:43',-->
            <!--car_status: '运营中',-->
            <!--car_speed: 99,-->
            <!--car_longitude: '116.975770',-->
            <!--car_latitude: '36.656540',-->
            <!--car_direction: '东偏北',-->
            <!--dpf_status: '正常',-->
            <!--t1: '120℃',-->
            <!--t2: '200℃',-->
            <!--t3: '80℃'-->
          <!--},-->
          <!--{-->
            <!--id: '13',-->
            <!--car_number: '鲁G3726',-->
            <!--car_model: '普通货车',-->
            <!--createtime: '2018-1-28 07:16:55',-->
            <!--car_status: '运营中',-->
            <!--car_speed: 40,-->
            <!--car_longitude: '117.007870',-->
            <!--car_latitude: '36.670590',-->
            <!--car_direction: '东偏北',-->
            <!--dpf_status: '正常',-->
            <!--t1: '120℃',-->
            <!--t2: '200℃',-->
            <!--t3: '80℃'-->
          <!--},-->
          <!--{-->
            <!--id: '21',-->
            <!--car_number: '鲁G1586CP',-->
            <!--car_model: '普通货车',-->
            <!--createtime: '2018-1-25 05:45:44',-->
            <!--car_status: '运营中',-->
            <!--car_speed: 60,-->
            <!--car_longitude: '119.129220',-->
            <!--car_latitude: '36.707650',-->
            <!--car_direction: '东偏北',-->
            <!--dpf_status: '正常',-->
            <!--t1: '120℃',-->
            <!--t2: '200℃',-->
            <!--t3: '80℃'-->
          <!--},-->
          <!--{-->
            <!--id: '22',-->
            <!--car_number: '鲁G8986CP',-->
            <!--car_model: '普通货车',-->
            <!--createtime: '2018-1-29 01:55:29',-->
            <!--car_status: '运营中',-->
            <!--car_speed: 80,-->
            <!--car_longitude: '119.198740',-->
            <!--car_latitude: '36.726640',-->
            <!--car_direction: '东偏北',-->
            <!--dpf_status: '正常',-->
            <!--t1: '120℃',-->
            <!--t2: '200℃',-->
            <!--t3: '80℃'-->
          <!--},-->
          <!--{-->
            <!--id: '23',-->
            <!--car_number: '鲁G1876CP',-->
            <!--car_model: '普通货车',-->
            <!--createtime: '2018-1-27 09:47:16',-->
            <!--car_status: '运营中',-->
            <!--car_speed: 120,-->
            <!--car_longitude: '119.189470',-->
            <!--car_latitude: '36.772030',-->
            <!--car_direction: '东偏北',-->
            <!--dpf_status: '正常',-->
            <!--t1: '120℃',-->
            <!--t2: '200℃',-->
            <!--t3: '80℃'-->
          <!--}-->
        <!--]-->
      <!--}-->
    <!--}-->
  <!--}-->
<!--</script>-->

<!--<style rel="stylesheet/scss" lang="scss" scoped>-->
  <!--.map-icon-wrapper {-->
    <!--cursor: pointer;-->
    <!--display: inline-block;-->
    <!--&:hover {-->
      <!--.icon-wrapper {-->
        <!--color: #fff;-->
      <!--}-->
      <!--.icon-jiedao {-->
        <!--background: #303F9F-->
      <!--}-->
      <!--.icon-luwang {-->
        <!--background: #388E3C-->
      <!--}-->
      <!--.icon-weixing {-->
        <!--background: #FF9800-->
      <!--}-->
      <!--.icon-diqiu {-->
        <!--background: #FF5252-->
      <!--}-->
      <!--.icon-fangda {-->
        <!--background: #795548-->
      <!--}-->
      <!--.icon-suoxiao {-->
        <!--background: #607D8B-->
      <!--}-->
      <!--.icon-biaochi {-->
        <!--background: #7B1FA2-->
      <!--}-->
      <!--.icon-shanchu {-->
        <!--background: #7C4DFF-->
      <!--}-->
      <!--.icon-dayin {-->
        <!--background: #03A9F4-->
      <!--}-->
      <!--.icon-guanbi {-->
        <!--background: #FF5252-->
      <!--}-->
    <!--}-->

    <!--.icon-wrapper {-->
      <!--border-radius: 4px;-->
      <!--padding: 6px;-->
      <!--margin: 4px 0 0 4px;-->
      <!--font-size: 24px;-->
    <!--}-->
  <!--}-->

  <!--.icon-jiedao {-->
    <!--color: #303F9F-->
  <!--}-->
  <!--.icon-luwang {-->
    <!--color: #388E3C-->
  <!--}-->
  <!--.icon-weixing {-->
    <!--color: #FF9800-->
  <!--}-->
  <!--.icon-diqiu {-->
    <!--color: #FF5252-->
  <!--}-->
  <!--.icon-fangda {-->
    <!--color: #795548-->
  <!--}-->
  <!--.icon-suoxiao {-->
    <!--color: #607D8B-->
  <!--}-->
  <!--.icon-biaochi {-->
    <!--color: #7B1FA2-->
  <!--}-->
  <!--.icon-shanchu {-->
    <!--color: #7C4DFF-->
  <!--}-->
  <!--.icon-dayin {-->
    <!--color: #03A9F4-->
  <!--}-->
  <!--.icon-guanbi {-->
    <!--color: #FF5252-->
  <!--}-->
<!--</style>-->
