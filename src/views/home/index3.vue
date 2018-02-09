<template>
  <div class="">
    <div id="mapDiv" class="map">
    </div>
    <div class="map-tool">
      <div class="logo">
        <img :src="logo"/>
      </div>
      <el-card class="box-card" :body-style="{padding:'5px'}">
        <el-tooltip content="全屏" placement="bottom">
          <div class="map-icon-wrapper">
            <div class="icon-wrapper icon-quanping">
              <svg-icon icon-class="quanping"/>
            </div>
          </div>
        </el-tooltip>
        <el-tooltip content="普通街道地图" placement="bottom">
          <div class="map-icon-wrapper">
            <div class="icon-wrapper icon-jiedao">
              <svg-icon icon-class="jiedao"/>
            </div>
          </div>
        </el-tooltip>
        <el-tooltip content="混合地图" placement="bottom">
          <div class="map-icon-wrapper">
            <div class="icon-wrapper icon-luwang">
              <svg-icon icon-class="luwang"/>
            </div>
          </div>
        </el-tooltip>
        <el-tooltip content="卫星地图" placement="bottom">
          <div class="map-icon-wrapper">
            <div class="icon-wrapper icon-weixing">
              <svg-icon icon-class="weixing"/>
            </div>
          </div>
        </el-tooltip>
        <el-tooltip content="全图" placement="bottom">
          <div class="map-icon-wrapper">
            <div class="icon-wrapper icon-diqiu">
              <svg-icon icon-class="diqiu"/>
            </div>
          </div>
        </el-tooltip>
        <el-tooltip content="放大" placement="bottom">
          <div class="map-icon-wrapper">
            <div class="icon-wrapper icon-fangda">
              <svg-icon icon-class="fangda"/>
            </div>
          </div>
        </el-tooltip>
        <el-tooltip content="缩小" placement="bottom">
          <div class="map-icon-wrapper">
            <div class="icon-wrapper icon-suoxiao">
              <svg-icon icon-class="suoxiao"/>
            </div>
          </div>
        </el-tooltip>
        <el-tooltip content="测距工具" placement="bottom">
          <div class="map-icon-wrapper">
            <div class="icon-wrapper icon-biaochi">
              <svg-icon icon-class="biaochi"/>
            </div>
          </div>
        </el-tooltip>
        <el-tooltip content="清除覆盖物" placement="bottom">
          <div class="map-icon-wrapper">
            <div class="icon-wrapper icon-shanchu">
              <svg-icon icon-class="shanchu"/>
            </div>
          </div>
        </el-tooltip>
        <el-tooltip content="打印地图" placement="bottom">
          <div class="map-icon-wrapper">
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
          <div class="map-icon-wrapper">
            <div class="icon-wrapper icon-guanbi">
              <svg-icon icon-class="guanbi"/>
            </div>
          </div>
        </el-tooltip>
      </el-card>
    </div>
    <div class="menu">
      <el-card :body-style="{padding:'10px'}">
        <div>
          <el-tooltip content="系统管理" placement="bottom">
            <div class="map-icon-wrapper">
              <div class="icon-wrapper icon-quanping">
                <svg-icon icon-class="shezhi"/>
              </div>
            </div>
          </el-tooltip>
        </div>
      </el-card>
    </div>

    <div class="car-info">
      <el-card>
        <h4 class="header">车辆实时信息</h4>
        <div class="chart">
          <pie-chart></pie-chart>
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
        <el-collapse>
          <el-collapse-item>
            <template slot="title">
              车辆实时信息&nbsp;<i class="header-icon el-icon-info"></i>
            </template>
          </el-collapse-item>
          <el-collapse-item>
            <template slot="title">
              车辆历史记录&nbsp;<i class="header-icon el-icon-info"></i>
            </template>
          </el-collapse-item>
          <el-collapse-item>
            <template slot="title">
              终端实时报警&nbsp;<i class="header-icon el-icon-info"></i>
            </template>
          </el-collapse-item>
        </el-collapse>
      </el-card>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import T from 'T'
  import logo from '@/assets/home_images/logo.png'
  import PieChart from './components/PieChart'

  export default {
    components: {
      PieChart
    },
    data() {
      return {
        logo
      }
    },
    mounted() {
      this.drawMap()
    },
    methods: {
      drawMap() {
        window.map = new T.Map('mapDiv')
        // 潍坊
        window.map.centerAndZoom(new T.LngLat(119.097980, 36.695950), 12)

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
    display: flex;
    .box-card {
      height: 43px;
    }
    .logo {
      img {
        padding: 5px;
      }
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
      /*margin: 4px 0 0 4px;*/
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
    right: 20px;
    top: 100px;
    z-index: 2;
  }

  .control {
    position: fixed;
    left: 400px;
    bottom: 20px;
    z-index: 2;
  }

  .car-info {
    position: fixed;
    left: 20px;
    bottom: 20px;
    z-index: 2;
    .header {
      margin: 0;
      text-align: center;
    }
    .info {
      font-size: 13px;
      p{
        margin: 4px;
        .el-tag {
          width: 85px;
          height: 22px;
          line-height: 20px;
        }
      }
    }
  }
</style>
