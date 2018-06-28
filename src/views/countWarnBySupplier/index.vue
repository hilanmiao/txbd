<template>
  <div class="app-container">
    <div class="filter-container">

      <el-date-picker
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
      <el-button type="primary" icon="el-icon-search" @click="searchData">搜索</el-button>
      <!--<el-button type="primary" icon="el-icon-download" @click="handleExport" :loading="loadingExport">导出</el-button>-->
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
        >
          <el-table-column
            prop="NAME"
            label="供应商">
            <template slot-scope="scope">
              {{scope.row.NAME}}
              <el-button type="success" size="mini" icon="el-icon-search"
                         @click="showDetail(scope.row.SUPPLIER_ID)"></el-button>
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
      <el-dialog :visible.sync="dialogFormVisible" title="查看详情">
        <el-date-picker
          size="middle"
          v-model="dateRange2"
          type="daterange"
          align="right"
          unlink-panels
          value-format="yyyy-MM-dd"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          :picker-options="pickerOptions"
          @change="pickerChange2"
        >
        </el-date-picker>
        <el-button type="primary" size="middle" icon="el-icon-search" @click="searchData2">搜索</el-button>
        <div>
          <p></p>
        </div>
        <el-table
          v-loading="tableLoading2" element-loading-text="加载中..."
          :data="tableData2"
          border
          stripe
          fit
          highlight-current-row
        >
          <el-table-column
            prop="PLATENUMBER"
            label="车牌号">
          </el-table-column>
          <el-table-column
            prop="CAR_USER_NAME"
            label="车主姓名">
          </el-table-column>
          <el-table-column
            prop="CAR_USER_PHONE"
            label="车主电话">
          </el-table-column>
          <el-table-column
            prop="DEVICENO"
            label="设备编号">
          </el-table-column>
          <el-table-column
            prop="DPF_MODEL"
            label="DPF类型">
          </el-table-column>
          <el-table-column
            prop="WARNNINGCONTENT"
            label="报警内容">
          </el-table-column>
          <el-table-column
            prop="WARNNINGTIME"
            label="报警时间">
          </el-table-column>
        </el-table>
        <el-pagination
          :page-sizes="[5, 10, 40, 80, 100, 1000]"
          :page-size="listQuery2.limit"
          :current-page.sync="listQuery2.page"
          :total="total2"
          layout="total, sizes, prev, pager, next, jumper"
          background
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        >
        </el-pagination>
      </el-dialog>
    </div>

  </div>
</template>

<script type="text/ecmascript-6">
  import BarChart from './components/BarChart'
  import PieChart from './components/PieChart'
  import {getList, getDetailList as getRegisterList} from '@/api/countWarnBySupplier'

  export default {
    components: {
      BarChart,
      PieChart
    },
    data() {
      return {
        // 列表相关
        tableData: [],
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
        // 模态框相关
        dateRange2: '',
        dialogFormVisible: false,
        tableData2: [],
        total2: 0,
        listQuery2: {
          startTime: '',
          city_id: '',
          endTime: '',
          limit: 5,
          offset: 0,
          page: 1,
          supplier_id: ''
        },
        tableLoading2: false
      }
    },
    watch: {
      'listQuery2.page': {
        handler: function (val, oldVal) {
          // 拼装查询用的offset
          if (val > 1) {
            this.listQuery2.offset = (val - 1) * this.listQuery2.limit
          } else {
            this.listQuery2.offset = 0
          }
        },
        deep: true
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
        this.dateRange2 = this.dateRange
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
      },
      pickerChange2() {
        if (this.dateRange2 != null) {
          this.listQuery2.startTime = this.dateRange2[0]
          this.listQuery2.endTime = this.dateRange2[1]
        } else {
          this.listQuery2.startTime = null
          this.listQuery2.endTime = null
        }
      },
      searchData2() {
        this.total2 = 0
        this.listQuery2.page = 1
        this.$nextTick(() => {
          this._getRegisterList()
        })
      },
      showDetail(supplierId) {
        this.listQuery2.supplier_id = supplierId
        this.dialogFormVisible = true
        this.$nextTick(() => {
          this._getRegisterList()
        })
      },
      handleSizeChange(val) {
        // 每页显示条数改变处理
        this.listQuery2.limit = val
        this.listQuery2.page = 1
        this.$nextTick(() => {
          this._getRegisterList()
        })
      },
      handleCurrentChange(val) {
        // 页码改变处理
        this.listQuery2.page = val
        this.$nextTick(() => {
          this._getRegisterList()
        })
      },
      _getRegisterList() {
        // 清空表格数据
        this.tableData2 = []
        // 设置表格loading效果
        this.tableLoading2 = true
        this.pickerChange2()
        getRegisterList(this.listQuery2).then(response => {
          if (response.code === '200') {
            // 设置表格数据
            this.tableData2 = response.data.dataList
            // 设置分页插件数据总数
            this.total2 = response.data.count
          } else {
            this.total2 = 0
            this.$message({
              type: 'error',
              message: response.message
            })
          }
        })
        // 取消表格loading效果
        this.tableLoading2 = false
      }
    }
  }
</script>

<style scoped>

</style>
