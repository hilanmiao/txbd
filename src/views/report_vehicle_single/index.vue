<template>
  <div class="filter-container" style="padding-bottom: 10px;">
    <div class="app-container">

      <el-input v-model="listQuery.key" style="width:200px;"
                class="filter-item" placeholder="车牌号或者dpf编号" clearable>
      </el-input>

      <el-date-picker
        v-model="dateArea"
        type="daterange"
        align="right"
        unlink-panels
        value-format="yyyy-MM-dd"
        range-separator="-"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        @change="selectDate"
        style="width:300px;"
        clearable
      >
      </el-date-picker>

      <el-button type="primary" icon="el-icon-search" @click="handleSearch">搜索</el-button>
    </div>

    <el-row>
      <el-col :sm="24" :xs="24">
        <div class="chart-wrapper">
          <b>单量车详细信息</b>
        </div>
      </el-col>
      <el-card>
        <el-col :xs="24" :sm="24">
          <div>
            <el-form ref="form" :model="form" label-width="120px">
              <el-col>
                <el-form-item>
                  <el-col :span="2">车牌号</el-col>
                  <el-col :span="5">
                    <el-input v-model="form.car_number" class="form-input" readonly></el-input>
                  </el-col>
                  <el-col :span="2">车型</el-col>
                  <el-col :span="5">
                    <el-input v-model="form.car_type_code" class="form-input" readonly></el-input>
                  </el-col>
                  <el-col :span="2">车主姓名</el-col>
                  <el-col :span="5">
                    <el-input v-model="form.car_user_name" class="form-input" readonly></el-input>
                  </el-col>
                </el-form-item>
                <el-form-item>
                  <el-col :span="2">联系方式</el-col>
                  <el-col :span="5">
                    <el-input v-model="form.car_user_phone" class="form-input" readonly></el-input>
                  </el-col>
                  <el-col :span="2">车辆颜色</el-col>
                  <el-col :span="5">
                    <el-input v-model="form.car_color" class="form-input" readonly></el-input>
                  </el-col>
                  <el-col :span="2">安装点</el-col>
                  <el-col :span="5">
                    <el-input v-model="form.install_place_msg" class="form-input" readonly></el-input>
                  </el-col>
                </el-form-item>
                <el-form-item>
                  <el-col :span="2">发动机编号</el-col>
                  <el-col :span="5">
                    <el-input v-model="form.car_engine_number" class="form-input" readonly></el-input>
                  </el-col>
                  <el-col :span="2">唯一标识</el-col>
                  <el-col :span="5">
                    <el-input v-model="form.qr_code" class="form-input" readonly></el-input>
                  </el-col>
                  <el-col :span="2">车主邮箱</el-col>
                  <el-col :span="5">
                    <el-input v-model="form.area" class="form-input" readonly></el-input>
                  </el-col>
                </el-form-item>
                <el-form-item>
                  <el-col :span="2">安装时间</el-col>
                  <el-col :span="5">
                    <el-input v-model="form.name" class="form-input" readonly></el-input>
                  </el-col>
                  <el-col :span="2">安装点负责人</el-col>
                  <el-col :span="5">
                    <el-input v-model="form.install_user_name" class="form-input" readonly></el-input>
                  </el-col>
                  <el-col :span="2">安装点电话</el-col>
                  <el-col :span="5">
                    <el-input v-model="form.install_user_phone" class="form-input" readonly></el-input>
                  </el-col>
                </el-form-item>

                <el-form-item>
                  <el-col :span="2">车辆出厂日期</el-col>
                  <el-col :span="5">
                    <el-input v-model="form.car_manufacture_time" class="form-input" readonly></el-input>
                  </el-col>
                  <el-col :span="2">安装前图片</el-col>
                  <el-col :span="5">
                    <el-input v-model="form.dpf_model" class="form-input" readonly></el-input>
                  </el-col>
                  <el-col :span="2">供应商</el-col>
                  <el-col :span="5">
                    <el-input v-model="form.provinceName" class="form-input" readonly></el-input>
                  </el-col>
                </el-form-item>

                <el-form-item>
                  <el-col :span="2">45°图片</el-col>
                  <el-col :span="5">
                    <el-button type="primary" icon="el-icon-search" @click="lookimg(0)">查看图片</el-button>
                  </el-col>
                  <el-col :span="2">安装前图片</el-col>
                  <el-col :span="5">
                    <el-button type="primary" icon="el-icon-search" @click="lookimg(1)">查看图片</el-button>
                  </el-col>
                  <el-col :span="2">安装后图片</el-col>
                  <el-col :span="5">
                    <el-button type="primary" icon="el-icon-search" @click="lookimg(2)">查看图片</el-button>
                  </el-col>
                </el-form-item>
              </el-col>

            </el-form>
          </div>
        </el-col>

        <el-col :xs="24" :sm="24" :lg="10">
          <div class="chart-wrapper">
            <pressure-line-chart :dataArr="pressureDate"></pressure-line-chart>
          </div>
        </el-col>

        <el-col :xs="24" :sm="24" :lg="10">
          <div class="chart-wrapper">
            <temperature-line-chart :dataArr="temperatureData"></temperature-line-chart>
          </div>
        </el-col>
      </el-card>
      <el-dialog :visible.sync="imageView" title="查看图片">
        <img :src="imgDetail" @click="closeImage" width="100%">
      </el-dialog>
    </el-row>

  </div>


</template>

<script>
  import PressureLineChart from './components/PressureLineChart'
  import TemperatureLineChart from './components/TemperatureLineChart'
  import {getCarDetail} from '@/api/report_vehicle_single'

  export default {
    name: 'dashboard-admin',
    components: {
      PressureLineChart,
      TemperatureLineChart
    },
    data() {
      return {
        font_family: 'Helvetica Neue',
        imageView: false,
        imgDetail: '',
        listQuery: {
          startTime: null,
          endTime: null,
          key: ''
        },
        dateArea: '',
        listCity: [],
        reportData: {
          total: 10000,
          online: 8888,
          percent: '88.88%'
        },
        pressureDate: {
          p1: [],
          p2: [],
          dcreatetime: []
        },
        temperatureData: {
          t1: [],
          t2: [],
          t3: [],
          dcreatetime: []
        },
        temperature: [],
        form: {
          id: '',
          city_id: '',
          cityName: '',
          province_id: '',
          provinceName: '',
          supplier_id: '',
          supplierName: '',
          dpf_model: '',
          dpf_id: '',
          car_number: '',
          car_color: '',
          car_type_code: '',
          car_user_name: '',
          car_user_identity_code: '',
          car_user_phone: '',
          car_engine_number: '',
          install_place_msg: '',
          install_user_name: '',
          install_user_phone: '',
          img_url_45: '',
          before_install_img_url: '',
          after_install_img_url: '',
          createTime: '',
          createUser: '',
          createUserName: '',
          createUserType: '',
          qr_code: '',
          car_manufacture_time: '',
          car_status: '',
          dpf_status: ''
        }
      }
    },
    created() {

    },
    methods: {
      lookimg(val) {
        if (this.form) {
          if (val === 0) {
            if (this.form.img_url_45) {
              this.imageView = true
              this.imgDetail = process.env.IMG_SERVER_PATH + this.form.img_url_45
            }
          } else if (val === 1) {
            if (this.form.before_install_img_url) {
              this.imageView = true
              this.imgDetail = process.env.IMG_SERVER_PATH + this.form.before_install_img_url
            }
          } else if (val === 2) {
            if (this.form.after_install_img_url) {
              this.imageView = true
              this.imgDetail = process.env.IMG_SERVER_PATH + this.form.after_install_img_url
            }
          }
        } else {
          this.$message({
            type: 'error',
            message: '未查询到图片'
          })
        }
      },
      closeImage() {
        this.imageView = false
      },
      selectDate() {
        if (this.dateArea != null) {
          this.listQuery.startTime = this.dateArea[0]
          this.listQuery.endTime = this.dateArea[1]
        } else {
          this.listQuery.startTime = null
          this.listQuery.endTime = null
        }
      },

      handleSearch() {
        this.form = {}
        getCarDetail(this.listQuery).then(response => {
          if (response.code === '200') {
            if (response.data.installInfo != null) {
              this.form = response.data.installInfo
              if (response.data.dataList.length > 0) {
                const pr1 = []
                const pr2 = []
                const te1 = []
                const te2 = []
                const te3 = []
                const timedate = []
                for (let i = 0; i < response.data.dataList.length; i++) {
                  pr1.push(response.data.dataList[i].P1)
                  pr2.push(response.data.dataList[i].P2)
                  te1.push(response.data.dataList[i].T1)
                  te2.push(response.data.dataList[i].T2)
                  te3.push(response.data.dataList[i].T3)
                  timedate.push(response.data.dataList[i].CREATETIME)
                }
                this.pressureDate.p1 = pr1
                this.pressureDate.p2 = pr2
                this.temperatureData.t1 = te1
                this.temperatureData.t2 = te2
                this.temperatureData.t3 = te3
                this.pressureDate.dcreatetime = timedate
                this.temperatureData.dcreatetime = timedate
              } else {
                this.temperatureData = {t1: [], t2: [], t3: [], dcreatetime: []}
                this.pressureDate = {p1: [], p2: [], dcreatetime: []}
                this.$message({
                  type: 'error',
                  message: '未查到相关数据'
                })
              }
            } else {
              this.temperatureData = {t1: [], t2: [], t3: [], dcreatetime: []}
              this.pressureDate = {p1: [], p2: [], dcreatetime: []}
              this.$message({
                type: 'error',
                message: '不存在此车辆，请检查搜索信息'
              })
            }
          } else {
            this.temperatureData = {t1: [], t2: [], t3: [], dcreatetime: []}
            this.pressureDate = {p1: [], p2: [], dcreatetime: []}
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
  .chart-wrapper {
    background: #fff;
    padding: 5px 5px 0;
    margin-bottom: 5px;
    margin-left: 10px;
  }

  .form-input {
    width: 80%;
  }

  .bg-purple-dark {
    background: #99a9bf;
  }

  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }

</style>
