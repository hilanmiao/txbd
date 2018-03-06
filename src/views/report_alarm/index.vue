<template>
  <div class="app-container">

    <div class="filter-container" style="padding-bottom: 10px;">
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
      <el-select @keyup.enter.native="handleFilter" v-model="listQuery.city_id" style="width:120px;" clearable
                 placeholder="选择城市">
        <el-option v-for="item in listCity" :key="item.id" :label="item.name"
                   :value="item.id"></el-option>
      </el-select>
      <el-input @keyup.enter.native="handleFilter" v-model="listQuery.deviceno" style="width:200px;"
                class="filter-item"
                placeholder="dpf编码">
      </el-input>
      <el-input @keyup.enter.native="handleFilter" v-model="listQuery.platenumber" style="width: 200px;"
                class="filter-item"
                placeholder="车牌号">
      </el-input>
      <el-input @keyup.enter.native="handleFilter" v-model="listQuery.supplier_id" style="width: 200px;"
                class="filter-item"
                placeholder="供应商">
      </el-input>
      <el-button type="primary" icon="el-icon-search" @click="handleSearch">搜索</el-button>
      <!--<el-button type="primary" icon="el-icon-download" @click="handleExport" :loading="loadingExport">导出</el-button>-->
      <el-button type="primary" icon="el-icon-search" @click="changeShow">切换展示</el-button>
    </div>

    <el-col :xs="24" :sm="24" :lg="25" v-show="tableShow">
      <div class="table-container">
        <el-table
          v-loading="tableLoading" element-loading-text="加载中..."
          :data="tableData"
          border
          stripe
          fit
          highlight-current-row
          style="width: 100%;">
          <el-table-column
            prop="DEVICENO"
            label="dpf编码">
          </el-table-column>
          <el-table-column
            prop="WARNNINGCONTENT"
            label="报警信息">
          </el-table-column>
          <el-table-column
            prop="WARNNINGTIME"
            label="报警时间">
          </el-table-column>
          <el-table-column
            prop="PLATENUMBER"
            label="车牌号">
          </el-table-column>
        </el-table>
      </div>


      <div class="pagination-container" v-show="tableShow">
        <el-pagination
          :page-sizes="[10, 40, 80, 100, 1000]"
          :page-size="listQuery.limit"
          :current-page.sync="listQuery.page"
          :total="total"
          layout="total, sizes, prev, pager, next, jumper"
          background
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        >
        </el-pagination>
      </div>
    </el-col>

    <el-col :xs="24" :sm="24" :lg="10" style="margin-top: 120px;" v-show="barShow">
      <div class="chart-wrapper">
        <pressure-bar-chart :dataArr="pressureDate"></pressure-bar-chart>
      </div>
    </el-col>

    <el-col :xs="24" :sm="24" :lg="10" style="margin-top: 120px;" v-show="barShow">
      <div class="chart-wrapper">
        <temperature-bar-chart :dataArr="temperatureData"></temperature-bar-chart>
      </div>
    </el-col>


  </div>
</template>

<script type="text/ecmascript-6">
  import PressureBarChart from './components/PressureBarChart'
  import TemperatureBarChart from './components/TemperatureBarChart'
  import {getList} from '@/api/report_alarm'
  import {getCitys} from '@/api/city'

  export default {
    name: 'dashboard-admin',
    components: {
      PressureBarChart,
      TemperatureBarChart
    },
    data() {
      return {
        // 列表相关
        tableData: [],
        total: 0,
        dateArea: '',
        loadingExport: false,
        // 表单相关
        listCity: [],
        barShow: false,
        tableShow: true,
        listQuery: {
          startTime: '',
          city_id: '',
          endTime: '',
          deviceno: '',
          platenumber: '',
          limit: 10,
          offset: 0,
          page: 1,
          supplier_id: ''
        },
        pressureDate: {
          p1: [],
          p2: [],
          cars: []
        },
        temperatureData: {
          t1: [],
          t2: [],
          t3: [],
          cars: []
        }
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
      }
    },
    created() {
      this._getList()
      this._getCityList()
      this.showBar()
    },
    methods: {
      changeShow() {
        if (this.tableShow === true) {
          this.tableShow = false
          this.barShow = true
        } else {
          this.tableShow = true
          this.barShow = false
        }
      },
      _getList() {
        // 设置表格loading效果
        this.tableLoading = true
        if (this.listQuery.city_id === '') {
          this.listQuery.city_id = null
        }
        this.selectDate()
        this.showBar()
        getList(this.listQuery).then(response => {
          if (response.code === '200') {
            // 设置表格数据
            this.tableData = response.data.dataList
            // 设置分页插件数据总数
            this.total = response.data.count
          } else {
            this.tableData = []
            this.$message({
              type: 'error',
              message: response.message
            })
          }
        })
        // 取消表格loading效果
        this.tableLoading = false
      },
      handleExport() {
        // 导出处理（简单做，后期可能会改用插件）
        // 显示loading
        this.loadingExport = true

        const rows = [['DPF编号', '报警信息', '报警时间', '车牌号', '前压', '后压', '原温度', '前温度', '后温度']]
        this.tableData.forEach(item => {
          rows.push([
            item.DEVICENO,
            item.WARNNINGCONTENT,
            item.WARNNINGTIME,
            item.PLATENUMBER,
            item.P1,
            item.P2,
            item.T1,
            item.T2,
            item.T3
          ])
        })
        let csvContent = 'data:text/csv;charset=utf-8,'
        rows.forEach(rowArray => {
          const row = rowArray.join(',')
          csvContent += row + '\r\n'
        })

        // window.open(encodedUri)
        const encodedUri = encodeURI(csvContent)
        const link = document.createElement('a')
        link.setAttribute('href', encodedUri)
        link.setAttribute('download', 'download.csv')
        document.body.appendChild(link) // Required for FF
        link.click() // This will download the data file named "my_data.csv".

        // 隐藏loading
        this.loadingExport = false
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
        this._getList()
      },
      handleSizeChange(val) {
        this.listQuery.limit = val
        this._getList()
      },
      handleCurrentChange(val) {
        this.offset = val
        this._getList()
      },
      _getCityList() {
        getCitys().then(response => {
          this.listCity = response.data
        })
        this.listCity = getCitys()
      },
      showBar() {
        if (this.listQuery.city_id === '') {
          this.listQuery.city_id = null
        }
        this.selectDate()
        getList(this.listQuery).then(response => {
          if (response.code === '200') {
            if (response.data.dataList.length > 0) {
              const pr1 = []
              const pr2 = []
              const te1 = []
              const te2 = []
              const te3 = []
              const cars = []
              for (let i = 0; i < response.data.dataList.length; i++) {
                pr1.push(response.data.dataList[i].P1)
                pr2.push(response.data.dataList[i].P2)
                te1.push(response.data.dataList[i].T1)
                te2.push(response.data.dataList[i].T2)
                te3.push(response.data.dataList[i].T3)
                cars.push(response.data.dataList[i].PLATENUMBER)
              }
              this.pressureDate.p1 = pr1
              this.pressureDate.p2 = pr2
              this.temperatureData.t1 = te1
              this.temperatureData.t2 = te2
              this.temperatureData.t3 = te3
              this.pressureDate.cars = cars
              this.temperatureData.cars = cars
            } else {
              this.temperatureData = {t1: [], t2: [], t3: [], cars: []}
              this.pressureDate = {p1: [], p2: [], cars: []}
              this.$message({
                type: 'error',
                message: '未查到相关数据'
              })
            }
          } else {
            this.temperatureData = {t1: [], t2: [], t3: [], cars: []}
            this.pressureDate = {p1: [], p2: [], cars: []}
            this.$message({
              type: 'error',
              message: '未查到相关数据'
            })
          }
        })
      }
    }
  }
</script>

<style scoped>

</style>
