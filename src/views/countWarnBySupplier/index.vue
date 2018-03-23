<template>
  <div class="app-container">
    <div class="filter-container">

      <el-date-picker
        v-model="dateRange"
        type="datetimerange"
        align="right"
        unlink-panels
        value-format="yyyy-MM-dd"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        :picker-options="pickerOptions"
        @change="pickerChange"
      >
      </el-date-picker>
      <el-button type="primary" icon="el-icon-search" @click="searchData">搜索</el-button>
      <el-button type="primary" icon="el-icon-download" @click="handleExport" :loading="loadingExport">导出</el-button>
    </div>

    <el-col :span="5">
      <div class="table-container">
        <el-table
          v-loading="tableLoading" element-loading-text="加载中..."
          :data="tableData"
          border
          stripe
          fit
          highlight-current-row
          @row-click="detailView=true"
        >
          <el-table-column
            prop="NAME"
            label="供应商" >
            <template slot-scope="scope">
              {{scope.row.NAME}}
              <el-button type="success" size="mini" icon="el-icon-search" @click="detailView=true"></el-button>
            </template>
          </el-table-column>

          <el-table-column
            prop="warnCount"
            label="数量"
            width="100"
          >
          </el-table-column>
        </el-table>
      </div>
    </el-col>
    <el-col :span="10">
      <div class="chart-wrapper">
        <bar-chart :dataArr="temperatureData"></bar-chart>
      </div>
    </el-col>
    <el-col :span="7">
      <div class="chart-wrapper">
        <h3>报警总数：<span style="color:red">{{warmcount}}</span> 次</h3>
      </div>
      <div class="chart-wrapper" style="margin-top: 20px;">
        <pie-chart :dataArr2="pieDataList"></pie-chart>
      </div>
    </el-col>

    <div class="others-container">
      <el-dialog :visible.sync="detailView" title="查看详情">
        <el-date-picker
          size="middle"
          v-model="dateRange"
          type="daterange"
          align="right"
          unlink-panels
          value-format="yyyy-MM-dd"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          :picker-options="pickerOptions"
          @change="pickerChange"
        >
        </el-date-picker>
        <el-button type="primary" size="middle" icon="el-icon-search" @click="searchData">搜索</el-button>
        <div>
          <p></p>
        </div>
        <el-table
          v-loading="tableLoading" element-loading-text="加载中..."
          :data="tableDetail"
          border
          stripe
          fit
          highlight-current-row
          style="width: 100%">

          <el-table-column
            prop="car_city"
            label="城市">
          </el-table-column>

          <el-table-column
            prop="car_number"
            label="车牌号">
          </el-table-column>

          <el-table-column
            prop="car_user_name"
            label="车主姓名">
          </el-table-column>

          <el-table-column
            prop="car_type_code"
            label="车型">
          </el-table-column>

          <el-table-column
            prop="car_user_phone"
            label="联系方式">
          </el-table-column>

          <el-table-column
            prop="warm_reason"
            label="报警原因">
          </el-table-column>

        </el-table>
        <el-pagination
          :page-sizes="[10, 40, 80, 100, 1000]"
          :page-size="10"
          :total="100"
          layout="total, sizes, prev, pager, next, jumper"
          background
        >
        </el-pagination>
      </el-dialog>
    </div>


  </div>
</template>

<script type="text/ecmascript-6">
  import BarChart from './components/BarChart'
  import PieChart from './components/PieChart'
  import {getList} from '@/api/countWarnBySupplier'

  export default {
    components: {
      BarChart,
      PieChart
    },
    data() {
      return {
        // 列表相关
        tableData: [],
        tableDetail:[],
        dateRange: '',
        warmcount: '',
        listQuery: {
          startTime: '',
          endTime: ''
        },
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
        loadingExport: false,
        tableLoading: false,
        temperatureData: {
          cityName: [],
          count: []
        },
        pieDataList: {
          dataAll: [],
          cityName: []
        },
      detailView:false
      }
    },

    created() {
      this._getList()
    },
    methods: {
      pickerChange() {
        if (this.dateRange != null) {
          this.listQuery.startTime = this.dateRange[0]
          this.listQuery.endTime = this.dateRange[1]
        } else {
          this.listQuery.startTime = null
          this.listQuery.endTime = null
        }
      },
      searchData() {
        this._getList()
      },
      _getList() {
        // 清空表格数据
        this.tableData = []
        // 设置表格loading效果
        this.tableLoading = true
        this.pickerChange()
        getList(this.listQuery).then(response => {
          this.warmcount = 0
          this.temperatureData.cityName = []
          this.temperatureData.count = []
          this.pieDataList.cityName = []
          this.pieDataList.dataAll = []
          if (response.code === '200') {
            this.makeData()
            var dataA = response.data
            this.tableData = dataA.dataList
            this.warmcount = dataA.totalWarn
            const city = []
            const coun = []
            const datalist = []

            for (let i = 0; i < dataA.dataList.length; i++) {
              let aname = dataA.dataList[i].NAME
              if (aname.length > 10) {
                aname = aname.substr(0, 10) + "..."
              }
              city.push(aname)
              coun.push(dataA.dataList[i].warnCount)
              let pieData = {value: dataA.dataList[i].warnCount, name: aname}
              datalist.push(pieData)
            }
            this.temperatureData.cityName = city
            this.temperatureData.count = coun
            this.pieDataList.cityName = city
            this.pieDataList.dataAll = datalist
          } else {
            this.$message({
              type: 'error',
              message: response.message
            })
          }
        })
        // 取消表格loading效果
        this.tableLoading = false
      },
      makeData(){
        this.tableDetail=[
          {car_city:'青岛',warm_reason:'前端温度异常',car_user_phone:'15653253156',car_type_code:'东风',car_user_name:'张世强',car_number:'鲁BWF568'},
          {car_city:'日照',warm_reason:'前端温度异常',car_user_phone:'18263367138',car_type_code:'东风',car_user_name:'李代义',car_number:'鲁LG6547'},
          {car_city:'东营',warm_reason:'离线时间异常',car_user_phone:'17171681713',car_type_code:'斯太尔',car_user_name:'张良涛',car_number:'鲁E8544T'},
          {car_city:'潍坊',warm_reason:'前压力异常',car_user_phone:'18866266178',car_type_code:'东风',car_user_name:'王全安',car_number:'鲁V789T8'},
          {car_city:'青岛',warm_reason:'离线时间异常',car_user_phone:'15689248745',car_type_code:'斯太尔',car_user_name:'何子翔',car_number:'鲁B23W68'}
        ]
      },
      handleExport() {
        // 导出处理（简单做，后期可能会改用插件）
        // 显示loading
        this.loadingExport = true

        const rows = [['供应商', '报警数量']]
        this.tableData.forEach(item => {
          rows.push([
            item.NAME,
            item.warnCount
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
      }
    }
  }
</script>

<style scoped>

</style>
