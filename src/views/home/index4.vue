<template>
  <div class="home-wrapper">
    <div class="nav">
      <div class="menu">
        <img :src="logo"/>
        <el-dropdown @command="handleCommand">
						      <span class="el-dropdown-link">
						       <i class="el-icon-edit-outline"></i> DPF信息管理<i class="el-icon-arrow-down el-icon--right"></i>
						      </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="dpf/supplier">供应商管理</el-dropdown-item>
            <el-dropdown-item command="dpf/register">登记信息管理</el-dropdown-item>
            <el-dropdown-item command="dpf/equipment">设备信息管理</el-dropdown-item>
            <el-dropdown-item command="dpf/maintenance">维修厂管理</el-dropdown-item>
            <el-dropdown-item command="dpf/maintenance_record">维修管理</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>

        <el-dropdown @command="handleCommand">
						      <span class="el-dropdown-link">
							      	<i class="el-icon-printer"></i>
							        统计分析
							        <i class="el-icon-arrow-down el-icon--right"></i>
						      </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="report/report_create">安装监控数量统计</el-dropdown-item>
            <el-dropdown-item command="report/report_online">在线率统计</el-dropdown-item>
            <el-dropdown-item command="report/report_mileage">里程统计</el-dropdown-item>
            <el-dropdown-item command="report/report_vehicle_city">地市车辆统计</el-dropdown-item>
            <el-dropdown-item command="report/report_vehicle_single">单车指标统计</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>

        <el-dropdown @command="handleCommand">
						      	<span class="el-dropdown-link">
							      	<i class="el-icon-message"></i>
							        监控报警管理<i class="el-icon-arrow-down el-icon--right"></i>
						      	</span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="warning/alarm">报警处理</el-dropdown-item>
            <!--<el-dropdown-item command="warning/history">历史轨迹查询</el-dropdown-item>-->
          </el-dropdown-menu>
        </el-dropdown>

        <el-dropdown @command="handleCommand">
						      	<span class="el-dropdown-link">
						      		<i class="el-icon-setting"></i>
						        系统管理<i class="el-icon-arrow-down el-icon--right"></i>
						      	</span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="system/organ">机构管理</el-dropdown-item>
            <el-dropdown-item command="system/part">角色管理</el-dropdown-item>
            <el-dropdown-item command="system/user">用户管理</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>

        <el-button type="text" icon="el-icon-info" command="dashboard">系统帮助</el-button>
      </div>
      <div class="map-tool">
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
        <el-tooltip content="退出" placement="bottom">
          <div class="map-icon-wrapper" @click="logOut">
            <div class="icon-wrapper icon-guanbi">
              <svg-icon icon-class="guanbi"/>
            </div>
          </div>
        </el-tooltip>
      </div>
    </div>
    <div class="container">
      <div class="left" ref="left">
        <el-card ref="leftCard" :body-style="{padding:'0px',borderRadius:'0'}">
          <div class="label">监控面板</div>
          <div class="search">
            <el-input placeholder="请输入设备编号" v-model="listQuery.carCode"></el-input>
            <el-button @click="_getCarWarning">查询</el-button>
          </div>
          <div class="citySelect">
            <el-select v-model="listQuery.city" placeholder="">
              <el-option label="选择城市" value=""></el-option>
              <el-option label="济南" value="济南"></el-option>
              <el-option label="潍坊" value="潍坊"></el-option>
              <el-option label="青岛" value="青岛"></el-option>
            </el-select>
          </div>
          <div class="tabs">
            <el-tabs type="card">
              <el-tab-pane label="预警列表">
                <template>
                  <el-table
                    :data="listCar"
                    :max-height="leftTableHeight"
                    v-loading="loadingList" element-loading-text="加载中..."
                  >
                    <el-table-column
                      prop="carCode"
                      label="车牌号"
                      width="80"
                    >
                    </el-table-column>
                    <el-table-column
                      prop="deviceno"
                      label="设备编号"
                      width="80"
                    >
                    </el-table-column>
                    <el-table-column
                      label="操作"
                    >
                      <template slot-scope="scope">
                        <template>
                          <div v-show="scope.row.checked">
                            <el-tooltip content="监控" placement="right-start">
                              <el-button type="success" size="mini" icon="el-icon-check"
                                         @click="handleWatch(scope.row)"></el-button>
                            </el-tooltip>
                          </div>
                          <div v-show="!scope.row.checked">
                            <el-tooltip content="监控" placement="right-start">
                              <el-button type="primary" size="mini" icon="el-icon-d-arrow-right"
                                         @click="handleWatch(scope.row)"></el-button>
                            </el-tooltip>
                          </div>
                        </template>
                      </template>
                    </el-table-column>
                  </el-table>
                  <el-pagination
                    small
                    layout="prev, pager, next"
                    :page-size="listQuery.limit"
                    :current-page.sync="listQuery.page"
                    :total="total"
                    @current-change="handleCurrentChange"
                  >
                  </el-pagination>
                </template>
              </el-tab-pane>
              <el-tab-pane label="查询列表">
                <template>
                  <el-table
                    :data="listCar2"
                    :max-height="leftTableHeight"
                    v-loading="loadingList2" element-loading-text="加载中..."
                  >
                    <el-table-column
                      prop="carCode"
                      label="车牌号"
                      width="80"
                    >
                    </el-table-column>
                    <el-table-column
                      prop="deviceno"
                      label="设备编号"
                      width="80"
                    >
                    </el-table-column>
                    <el-table-column
                      label="操作"
                      width="60"
                    >
                      <template slot-scope="scope">
                        <template>
                          <div v-show="scope.row.checked">
                            <el-tooltip content="监控" placement="right-start">
                              <el-button type="success" size="mini" icon="el-icon-check"
                                         @click="handleWatch(scope.row)"></el-button>
                            </el-tooltip>
                          </div>
                          <div v-show="!scope.row.checked">
                            <el-tooltip content="监控" placement="right-start">
                              <el-button type="primary" size="mini" icon="el-icon-d-arrow-right"
                                         @click="handleWatch(scope.row)"></el-button>
                            </el-tooltip>
                          </div>
                        </template>
                      </template>
                    </el-table-column>
                  </el-table>
                </template>
              </el-tab-pane>
              <el-tab-pane label="监控列表 ">
                <template>
                  <el-table
                    :data="listCarWatch"
                    :max-height="leftTableHeight"
                  >
                    <el-table-column
                      prop="carCode"
                      label="车牌"
                      width="80"
                    >
                    </el-table-column>
                    <el-table-column
                      prop="deviceno"
                      label="设备编号"
                      width="80"
                    >
                    </el-table-column>
                    <el-table-column
                      label="操作"
                      width="60"
                    >
                      <template slot-scope="scope">
                        <el-tooltip content="移除" placement="right-start">
                          <el-button type="danger" size="mini" icon="el-icon-delete"
                                     @click="handleWatchRemove(scope.row)"></el-button>
                        </el-tooltip>
                      </template>
                    </el-table-column>
                  </el-table>
                  <!--<h4 style="margin: 10px;text-align: center"><i class="el-icon-info"></i>最多同时监控20辆</h4>-->
                </template>
              </el-tab-pane>
            </el-tabs>
          </div>
        </el-card>
      </div>
      <div class="right" ref="right">
        <el-card :body-style="{padding:'0px',borderRadius:'0'}">
          <div ref="map" id="mapDiv" class="map">
          </div>
        </el-card>
        <div class="control" ref="control" id="control">
          <div class="expand" id="expand">
            <i class="el-icon-arrow-up"></i>
          </div>
          <el-tabs type="border-card">
            <el-tab-pane>
              <span slot="label"><i class="el-icon-date"></i>车辆信息</span>
              <el-table
                :data="listCarWatchReal"
                :height="expandHeight"
              >
                <el-table-column
                  prop="platenumber"
                  label="车牌号"
                  width="100"
                >
                </el-table-column>
                <el-table-column
                  prop="deviceno"
                  label="设备编号"
                >
                </el-table-column>
                <el-table-column
                  prop="car_user_name"
                  label="车主姓名"
                >
                </el-table-column>
                <el-table-column
                  prop="car_user_phone"
                  label="车主电话"
                  width="110"
                >
                </el-table-column>
                <el-table-column
                  prop="dpf_high_lines"
                  label="在线率"
                >
                </el-table-column>
                <el-table-column
                  prop="dpf_maintain_num"
                  label="维修次数"
                >
                </el-table-column>
                <el-table-column
                  prop="dpf_mileage_num"
                  label="里程数"
                >
                </el-table-column>
                <el-table-column
                  prop="dpf_online_num"
                  label="在线时长"
                >
                </el-table-column>
                <el-table-column
                  prop="dpf_warning_num"
                  label="报警次数"
                >
                </el-table-column>
                <el-table-column
                  prop="install_place_msg"
                  label="安装点地址"
                  width="110"
                >
                </el-table-column>
                <el-table-column
                  prop="install_user_name"
                  label="安装人员"
                >
                </el-table-column>
                <el-table-column
                  prop="install_user_phone"
                  label="安装人手机"
                  width="110"
                >
                </el-table-column>
                <el-table-column
                  prop="status"
                  label="车辆状态"
                >
                </el-table-column>
                <el-table-column
                  prop="status"
                  label="经纬度"
                  width="120"
                >
                  <template slot-scope="scope">
                    {{scope.row.longitude + ',' + scope.row.latitude}}
                  </template>
                </el-table-column>
                <el-table-column
                  prop="direction"
                  label="方向"
                >
                </el-table-column>
                <el-table-column
                  prop="gpstime"
                  label="GPS定位时间"
                  width="120"
                >
                </el-table-column>
                <el-table-column
                  prop="t1"
                  label="DOC原温度"
                  width="110"
                >
                  <template slot-scope="scope">
                    <el-tag>{{scope.row.t1}}</el-tag>
                  </template>
                </el-table-column>
                <el-table-column
                  prop="t2"
                  label="DPF前端温度"
                  width="110"
                >
                  <template slot-scope="scope">
                    <el-tag>{{scope.row.t2}}</el-tag>
                  </template>
                </el-table-column>
                <el-table-column
                  prop="t3"
                  label="DPF前端温度"
                  width="110"
                >
                  <template slot-scope="scope">
                    <el-tag>{{scope.row.t3}}</el-tag>
                  </template>
                </el-table-column>
                <el-table-column
                  prop="p1"
                  label="DOC前端压力"
                  width="110"
                >
                  <template slot-scope="scope">
                    <el-tag>{{scope.row.p1}}</el-tag>
                  </template>
                </el-table-column>
                <el-table-column
                  prop="p2"
                  label="DOC后端压力"
                  width="110"
                >
                  <template slot-scope="scope">
                    <el-tag>{{scope.row.p2}}</el-tag>
                  </template>
                </el-table-column>
              </el-table>
            </el-tab-pane>
            <!--<el-tab-pane>-->
            <!--<span slot="label"><i class="el-icon-date"></i>车辆历史记录</span>-->
            <!--<div :style="{height: expandHeight + 'px'}">-->
            <!--<div>-->
            <!--<el-input style="width: 200px;"-->
            <!--class="filter-item"-->
            <!--placeholder="车牌号"-->
            <!--v-model="carCodeHistory"-->
            <!--&gt;-->
            <!--</el-input>-->
            <!--<el-date-picker-->
            <!--v-model="dateRangeHistory"-->
            <!--type="daterange"-->
            <!--align="right"-->
            <!--unlink-panels-->
            <!--value-format="yyyy-MM-dd"-->
            <!--start-placeholder="开始日期"-->
            <!--end-placeholder="结束日期"-->
            <!--:picker-options="pickerOptions"-->
            <!--&gt;-->
            <!--</el-date-picker>-->
            <!--<el-button type="primary" icon="el-icon-search" @click="_getCarHistory"-->
            <!--:loading="loadingSearchHistory">确认-->
            <!--</el-button>-->
            <!--</div>-->
            <!--<div style="padding-top: 10px" v-show="showPanelHistory">-->
            <!--<el-button type="primary" icon="el-icon-search" @click="carTrackStart">开始</el-button>-->
            <!--<el-button type="warning" icon="el-icon-download" @click="carTrackPause">暂停</el-button>-->
            <!--<el-button type="danger" icon="el-icon-download" @click="carTrackStop">结束</el-button>-->
            <!--</div>-->
            <!--</div>-->
            <!--</el-tab-pane>-->
            <!--<el-tab-pane>-->
            <!--<span slot="label"><i class="el-icon-date"></i>终端上报警情（预处警）</span>-->
            <!--<el-table-->
            <!--:data="listCarWatchReal"-->
            <!--:height="expandHeight"-->
            <!--&gt;-->
            <!--<el-table-column-->
            <!--prop="platenumber"-->
            <!--label="车牌"-->
            <!--width="100"-->
            <!--&gt;-->
            <!--</el-table-column>-->
            <!--<el-table-column-->
            <!--prop="car_user_name"-->
            <!--label="车主姓名"-->
            <!--width="100"-->
            <!--&gt;-->
            <!--</el-table-column>-->
            <!--<el-table-column-->
            <!--prop="car_user_phone"-->
            <!--label="联系电话"-->
            <!--width="100"-->
            <!--&gt;-->
            <!--</el-table-column>-->
            <!--<el-table-column-->
            <!--prop="t1"-->
            <!--label="DOC原温度"-->
            <!--width="110"-->
            <!--&gt;-->
            <!--<template slot-scope="scope">-->
            <!--<el-tag>{{scope.row.t1}}</el-tag>-->
            <!--</template>-->
            <!--</el-table-column>-->
            <!--<el-table-column-->
            <!--prop="t2"-->
            <!--label="DPF前端温度"-->
            <!--width="110"-->
            <!--&gt;-->
            <!--<template slot-scope="scope">-->
            <!--<el-tag>{{scope.row.t2}}</el-tag>-->
            <!--</template>-->
            <!--</el-table-column>-->
            <!--<el-table-column-->
            <!--prop="t3"-->
            <!--label="DPF前端温度"-->
            <!--width="110"-->
            <!--&gt;-->
            <!--<template slot-scope="scope">-->
            <!--<el-tag>{{scope.row.t3}}</el-tag>-->
            <!--</template>-->
            <!--</el-table-column>-->
            <!--<el-table-column-->
            <!--prop="p1"-->
            <!--label="DOC前端压力"-->
            <!--width="110"-->
            <!--&gt;-->
            <!--<template slot-scope="scope">-->
            <!--<el-tag>{{scope.row.p1}}</el-tag>-->
            <!--</template>-->
            <!--</el-table-column>-->
            <!--<el-table-column-->
            <!--prop="p2"-->
            <!--label="DOC后端压力"-->
            <!--width="110"-->
            <!--&gt;-->
            <!--<template slot-scope="scope">-->
            <!--<el-tag>{{scope.row.p2}}</el-tag>-->
            <!--</template>-->
            <!--</el-table-column>-->
            <!--<el-table-column-->
            <!--label="操作"-->
            <!--width="120"-->
            <!--&gt;-->
            <!--<template slot-scope="scope">-->
            <!--<el-button type="primary" size="mini" icon="el-icon-delete">移除警情</el-button>-->
            <!--</template>-->
            <!--</el-table-column>-->
            <!--</el-table>-->
            <!--</el-tab-pane>-->
          </el-tabs>
        </div>
      </div>
      <div class="alarm" v-show="showAlarm">
        <div class="info-wrapper">
          <el-card>
            <div class="alarm-info">
              <h4 class="header">车辆异常报警</h4>
              <div class="info">
                <p>
                  车牌:鲁G809CP
                  &nbsp;
                  车系:宝马X5
                </p>
                <p>
                  前温:180℃
                  &nbsp;
                  前压:1KPA
                </p>
                <p>
                  中温:180℃
                  &nbsp;
                  中压:1KPA
                </p>
                <p>
                  后温: <span style="color: red;">180℃</span>
                  &nbsp;
                  后压: <span style="color: red;">1KPA</span>
                </p>
                <p>
                  报警内容：dfp未启用
                </p>
                <p>
                  <el-button type="primary" size="mini" icon="el-icon-location">定位</el-button>
                </p>
              </div>
            </div>
          </el-card>
          <el-card>
            <div class="alarm-info">
              <h4 class="header">车辆异常报警</h4>
              <div class="info">
                <p>
                  车牌:鲁G809CP
                  &nbsp;
                  车系:宝马X5
                </p>
                <p>
                  前温:180℃
                  &nbsp;
                  前压:1KPA
                </p>
                <p>
                  中温:180℃
                  &nbsp;
                  中压:1KPA
                </p>
                <p>
                  后温: <span style="color: red;">180℃</span>
                  &nbsp;
                  后压: <span style="color: red;">1KPA</span>
                </p>
                <p>
                  报警内容：dfp未启用
                </p>
                <p>
                  <el-button type="primary" size="mini" icon="el-icon-location">定位</el-button>
                </p>
              </div>
            </div>
          </el-card>
          <el-card>
            <div class="alarm-info">
              <h4 class="header">车辆异常报警</h4>
              <div class="info">
                <p>
                  车牌:鲁G809CP
                  &nbsp;
                  车系:宝马X5
                </p>
                <p>
                  前温:180℃
                  &nbsp;
                  前压:1KPA
                </p>
                <p>
                  中温:180℃
                  &nbsp;
                  中压:1KPA
                </p>
                <p>
                  后温: <span style="color: red;">180℃</span>
                  &nbsp;
                  后压: <span style="color: red;">1KPA</span>
                </p>
                <p>
                  报警内容：dfp未启用
                </p>
                <p>
                  <el-button type="primary" size="mini" icon="el-icon-location">定位</el-button>
                </p>
              </div>
            </div>
          </el-card>
          <el-card>
            <div class="alarm-info">
              <h4 class="header">车辆异常报警</h4>
              <div class="info">
                <p>
                  车牌:鲁G809CP
                  &nbsp;
                  车系:宝马X5
                </p>
                <p>
                  前温:180℃
                  &nbsp;
                  前压:1KPA
                </p>
                <p>
                  中温:180℃
                  &nbsp;
                  中压:1KPA
                </p>
                <p>
                  后温: <span style="color: red;">180℃</span>
                  &nbsp;
                  后压: <span style="color: red;">1KPA</span>
                </p>
                <p>
                  报警内容：dfp未启用
                </p>
                <p>
                  <el-button type="primary" size="mini" icon="el-icon-location">定位</el-button>
                </p>
              </div>
            </div>
          </el-card>
          <el-card>
            <div class="alarm-info">
              <h4 class="header">车辆异常报警</h4>
              <div class="info">
                <p>
                  车牌:鲁G809CP
                  &nbsp;
                  车系:宝马X5
                </p>
                <p>
                  前温:180℃
                  &nbsp;
                  前压:1KPA
                </p>
                <p>
                  中温:180℃
                  &nbsp;
                  中压:1KPA
                </p>
                <p>
                  后温: <span style="color: red;">180℃</span>
                  &nbsp;
                  后压: <span style="color: red;">1KPA</span>
                </p>
                <p>
                  报警内容：dfp未启用
                </p>
                <p>
                  <el-button type="primary" size="mini" icon="el-icon-location">定位</el-button>
                </p>
              </div>
            </div>
          </el-card>

        </div>
        <img :src="alarm" alt="">
        <audio controls loop ref="alarmAudio">
          <source :src="alarmAudio" type="audio/mpeg">
        </audio>
        <div class="map-icon-wrapper" @click="alarmMuted">
          <div class="icon-wrapper icon-guanbi">
            <svg-icon icon-class="jingyin"/>
          </div>
        </div>
      </div>
      <div class="test" 　v-show="false">
        <el-button type="danger" @click="alarmOn">警报测试</el-button>
        <el-button @click="alarmOff">关闭警报测试</el-button>
      </div>
    </div>

    <remote-js src="http://cdn.bootcss.com/d3/3.5.17/d3.js"></remote-js>
    <remote-js src="http://lbs.tianditu.com/api/js4.0/opensource/openlibrary/D3SvgOverlay.js"></remote-js>
    <remote-js src="http://lbs.tianditu.com/api/js4.0/opensource/openlibrary/CarTrack.js"></remote-js>
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
  import {getCars, getCarHistory, getCarBase, getCarWarning} from '@/api/gis'
  import PieChart from './components/PieChart'
  import {debounce} from '@/utils'

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
        // map相关
        lineTool: null,
        zoom: 12,
        lineToolIsClose: true,
        tileLayerImg: null,
        tileLayerCia: null,
        dialogFormVisibleCar: false,
        // websocket
        ws: undefined,
        listMarker: [],
        componentLoadingSubmit: false,
        componentDialogFormVisible: false,
        // 车辆面板
        leftTableHeight: '400',
        listCar: [],
        listCar2: [],
        loadingList: false,
        loadingList2: false,
        total: 0,
        listQuery: {
          page: 1,
          limit: 20,
          offset: 0,
          carCode: '',
          city: '',
          sort: '+id'
        },
        showCarPanel: false,
        listCarWatch: [],
        listCarWatchBase: [],
        worker: null,
        // 警报相关
        showAlarm: false,
        controlPanelActiveName: '',
        listCarAlarm: [],
        // 实时信息面板相关
        listCarWatchReal: [],
        maxWatchCount: 200,
        // 获取车辆基础数据时间间隔(分)
        // timeInterval: 30 * 60,
        timeInterval: 5 * 60,
        myWorker: null,
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
        },
        // 下方信息面板拉动方向
        expandHeight: 200,
        pullDirection: ''
      }
    },
    watch: {
      'listQuery.page': {
        handler: function (val, oldVal) {
          // 拼装查询用的offset
          if (val > 1) {
            this.listQuery.offset = (val - 1) * this.listQuery.limit
          } else {
            this.listQuery.offset = 0
          }
        },
        deep: true
      },
      'listCarWatch': {
        handler: function (val, oldVal) {
          if (val.length) {
            // 开启计时器
            this.openTimer()
            this._getCarBase()
          } else {
            // 关闭计时器
            this.closeTimer()
          }
        }
      }
    },
    mounted() {
      this.setLayout()
      this.drawMap()
      // 监听resize事件
      this.__resizeHanlder = debounce(() => {
        // 重新设置布局
        this.setLayout()
      }, 100)
      window.addEventListener('resize', this.__resizeHanlder)
      this._getCars()
      this._getCarWarning()
      // 注册下方信息面板拉动事件
      this.registerPullEvent()
    },
    methods: {
      openTimer() {
        const that = this
        this.worker = new Worker('/static/js/timer.js')
        this.worker.onmessage = function (event) {
          // console.log(event.data)
          const seconds = event.data
          if (seconds <= 0) {
            // 获取基础数据
            that._getCarBase()
            // 重新开始循环
            that.worker.postMessage(that.timeInterval)
          }
        }
        this.worker.onerror = function (error) {
          console.log(error.filename, error.lineno, error.message)
          that.worker.terminate()
        }
        this.worker.postMessage(this.timeInterval)
      },
      closeTimer() {
        this.worker.terminate()
      },
      registerPullEvent() {
        const self = this
        const expandDom = document.getElementById('expand')
        const controlDom = document.getElementById('control')
        expandDom.onmousedown = function (e) {
          const oEvent = e || event
          self.y = oEvent.clientY
          self.controlH = controlDom.offsetHeight

          if (self.y < (controlDom.offsetTop + 5)) {
            self.pullDirection = 'top'
          } else if (self.y > (controlDom.offsetTop + self.controlH - 5)) {
            self.pullDirection = 'bottom'
          }

          document.onmousemove = function (e) {
            const oEvent = e || event
            self.yy = oEvent.clientY
            if (self.pullDirection === 'top') {
              self.expandHeight = self.controlH + (self.y - self.yy) - 71
            } else if (this.pullDirection === 'bottom') {
              self.expandHeight = self.controlH + (self.yy - self.y) - 71
            }
          }

          document.onmouseup = function () {
            document.onmousedown = null
            document.onmousemove = null
          }
        }
      },
      setLayout() {
        // this.$refs.leftCard.style.height = 1000 + 'px'
        this.leftTableHeight = (window.innerHeight - 270)
        this.$refs.map.style.height = (window.innerHeight - 344) + 'px'
        this.$refs.left.style.height = (window.innerHeight - 72) + 'px'
        this.$refs.control.style.width = this.$refs.right.offsetWidth - 20 + 'px'
        // this.$refs.treeContainer.style.height = (window.innerHeight - 228) + 'px'
        // this.$refs.carTab.style.height = (window.innerHeight - 228) + 'px'
      },
      handleCommand(command) {
        // this.goToDashboard()
        this.$router.push({
          path: command
        })
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
      alarmOn() {
        this.controlPanelActiveName = '3'
        this.showAlarm = true
        this.$refs.alarmAudio.play()
      },
      alarmOff() {
        this.controlPanelActiveName = '3'
        this.showAlarm = false
        this.$refs.alarmAudio.pause()
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
      handleWatch(row) {
        // 验证是否超过20辆
        if (this.listCarWatch.length >= this.maxWatchCount) {
          this.$message({
            type: 'error',
            message: '最多监控200辆车'
          })
          return
        }

        // 查询是否已经在在监控中
        const index = this.listCarWatch.findIndex(item => item.deviceno === row.deviceno)
        if (index > -1) {
          this.$message({
            type: 'warning',
            message: '车辆已经在监控中'
          })
          return
        }
        // 添加到监控列表
        this.listCarWatch.push(row)
        // 改变状态
        if (row.from === 1) {
          const oriIndex = this.listCar.findIndex(item => item === row)
          this.listCar[oriIndex].checked = true
        } else {
          const oriIndex = this.listCar2.findIndex(item => item === row)
          this.listCar2[oriIndex].checked = true
        }

        // 断开连接
        this.webSocketClose()
        // 建立连接
        this.webSocketOpen()
        // 获取基础数据
        this._getCarBase()
      },
      handleWatchRemove(row) {
        // 查询是否已经在在监控中
        const index = this.listCarWatch.findIndex(item => item === row)
        // 从监控列表中删除
        this.listCarWatch.splice(index, 1)
        // 改变状态
        if (row.from === 1) {
          const oriIndex = this.listCar.findIndex(item => item === row)
          this.listCar[oriIndex].checked = false
        } else {
          const oriIndex = this.listCar2.findIndex(item => item === row)
          this.listCar2[oriIndex].checked = false
        }
        // 关闭并重新连接
        this.webSocketClose()
        this.webSocketOpen()
      },
      webSocketOpen() {
        const self = this
        if (!this.listCarWatch.length) {
          return
        }
        const token = getToken()
        // 使用设备编号连接
        const cars = this.listCarWatch.map(item => {
          return item.deviceno
        }).join(',')
        // this.ws = new WebSocket(`ws://192.168.1.196/socketWebServer/${token}/${cars}`)
        this.ws = new WebSocket(`${process.env.WEB_SOCKET}/${token}/${cars}`)
        this.ws.onopen = function (evt) {
          console.log('Connection open ...')
          // ws.send('Hello WebSockets!')
        }
        this.ws.onmessage = function (evt) {
          console.log('Received Message: ' + evt.data)
          self.mapMarker(JSON.parse(evt.data))
        }
        this.ws.onclose = function (evt) {
          console.log('Connection closed.')
        }
      },
      webSocketClose() {
        if (this.ws) {
          this.ws.close()
          // 删除标记列表
          this.listMarker = []
        }

        // 移除覆盖物
        window.map.clearOverLays()
      },
      handleCurrentChange(val) {
        // 页码改变处理
        this.listQuery.page = val
        this._getCars()
      },
      _getCars() {
        // 设置表格loading效果
        this.loadingList = true
        // 请求表格数据
        getCars(this.listQuery).then(response => {
          if (response.code === '200') {
            // 设置表格数据
            this.listCar = response.data
            // 设置分页插件数据总数
            this.total = parseInt(response.message)
            // 重新拼装
            this.listCar = this.listCar.map(item => {
              const tempObj = {checked: false, from: 1}
              // 翻页后需要重新检查
              const watchIndex = this.listCarWatch.findIndex(itemWatch => itemWatch === item)
              if (watchIndex > -1) {
                tempObj.checked = true
              }
              return Object.assign(tempObj, item)
            })
          } else {
            this.listCar = []
            this.$message({
              type: 'error',
              message: response.message
            })
          }
          // 取消表格loading效果
          this.loadingList = false
        })
      },
      _getCarWarning() {
        // 设置表格loading效果
        this.loadingList2 = true
        // 请求表格数据
        const params = {
          carCode: this.carCode,
          offset: 0,
          limit: 1
        }
        getCarWarning(params).then(response => {
          if (response.code === '200') {
            // 设置表格数据
            this.listCar2 = response.data
            // 重新拼装
            this.listCar2 = this.listCar2.map(item => {
              const tempObj = {checked: false, from: 2}
              // 翻页后需要重新检查
              const watchIndex = this.listCarWatch.findIndex(itemWatch => itemWatch === item)
              if (watchIndex > -1) {
                tempObj.checked = true
              }
              return Object.assign(tempObj, item)
            })
            console.log(this.listCar2)
          } else {
            this.listCar2 = []
            this.$message({
              type: 'error',
              message: response.message
            })
          }
          // 取消表格loading效果
          this.loadingList2 = false
        })
      },
      _getCarHistory() {
        // 关闭实时监控
        this.webSocketClose()
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
      },
      _getCarBase() {
        if (this.listCarWatch.length) {
          // 清空车辆基础信息列表
          this.listCarWatchBase = []
          this.listCarWatch.forEach(item => {
            getCarBase(item.deviceno).then(response => {
              if (response.code === '200') {
                // 循环添加
                this.listCarWatchBase.push(Object.assign({deviceno: item.deviceno}, response.data))
                // this.listCarWatchReal.some(itemReal => {
                //   if (item.deviceno === itemReal.deviceno) {
                //     // itemReal = Object.assign(response.data, itemReal)
                //     itemReal.car_user_name = response.data.car_user_name
                //     itemReal.car_user_phone = response.data.car_user_phone
                //     itemReal.dpf_high_lines = response.data.dpf_high_lines
                //     itemReal.dpf_maintain_num = response.data.dpf_maintain_num
                //     itemReal.dpf_mileage_num = response.data.dpf_mileage_num
                //     itemReal.dpf_online_num = response.data.dpf_online_num
                //     itemReal.dpf_warning_num = response.data.dpf_warning_num
                //     itemReal.install_place_msg = response.data.install_place_msg
                //     itemReal.install_user_name = response.data.install_user_name
                //     itemReal.install_user_phone = response.data.install_user_phone
                //     return true
                //   }
                // })
              }
            })
          })
        }
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss">
  .home-wrapper {
    .nav {
      display: flex;
      justify-content: space-between;
      background: #409EFF;
      height: 50px;
      padding-left: 10px;
      padding-right: 20px;

      .el-dropdown-link {
        cursor: pointer;
        color: #fff;
      }
      .el-icon-arrow-down {
        font-size: 12px;
      }

      .el-button {
        color: #fff;
      }

      .menu {
        line-height: 50px;
        img {
          vertical-align: middle;
          padding-right: 20px;
        }
      }

      .map-tool {
        display: flex;
        align-items: center;

        .map-icon-wrapper {
          cursor: pointer;
          display: inline-block;
          margin: 0 2px;
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
              background: #FF9800
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
            color: #FF9800
          }

          .icon-guanbi {
            color: #FF5252
          }

          .icon-quanping {
            color: #212121
          }
        }
      }
    }

    .container {
      padding: 10px;
      display: flex;
    }

    .left {
      width: 250px;

      .el-card {
        border-radius: 0;
        height: 100%;
      }

      .label {
        background: #409EFF;
        padding: 10px;
        color: #fff;
      }

      .search {
        display: flex;
        padding: 10px;
        .el-button {
          background: #409EFF;
          color: #fff;
        }
      }

      .citySelect {
        padding: 0 10px 10px 10px;
        .el-select {
          width: 100%;
        }
      }

      .tabs {
        .el-tabs__nav {
          width: 100%;
          text-align: center;
          border-left: 0;
          border-right: 0;
          .el-tabs__item {
            width: 33.33%;
            padding: 0;
          }
        }

        .el-table td {
          font-size: 12px;
          padding: 4px 0;
        }
      }
    }

    .right {
      flex: 1;
      padding: 0 10px;
      .map {
        height: 600px;
        width: 100%;
      }
      .el-tabs--border-card {
        border-left: 0;
        border-right: 0;
      }
      .control {
        position: fixed;
        bottom: 12px;
        right: 20px;
        z-index: 9999;
        .expand {
          background: #fff;
          padding: 4px;
          height: 26px;
          color: #ccc;
          left: 49%;
          position: absolute;
          top: -25px;
          cursor: n-resize;
          border-radius: 2px;
          border: 1px solid #ebeef5;
        }
      }
    }

    .alarm {
      position: fixed;
      right: 20px;
      top: 100px;
      z-index: 9999;
      .info-wrapper {
        max-height: 500px;
        overflow: auto;
        .alarm-info {
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
      }
      audio {
        display: none;
      }
      img {
        width: 100px;
        cursor: pointer;
      }
      .map-icon-wrapper {
        cursor: pointer;
        display: inline-block;
        margin: 0 2px;
        &:hover {
          .icon-wrapper {
            color: #fff;
          }
          .icon-guanbi {
            background: #FF5252
          }
        }
        .icon-wrapper {
          border-radius: 4px;
          padding: 4px;
          font-size: 20px;
        }
        .icon-guanbi {
          color: #ffffff;
          background: #FF5252
        }
      }
    }

    .test {
      position: fixed;
      right: 400px;
      top: 300px;
      z-index: 9999;
    }
  }
</style>
