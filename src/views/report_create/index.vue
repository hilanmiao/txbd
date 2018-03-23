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
      <el-button type="primary" icon="el-icon-download" @click="handleExport" :loading="loadingExport">导出</el-button>
    </div>

    <el-col :span="4">
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
            prop="cityName"
            label="城市"
            >
            <template slot-scope="scope">
              {{scope.row.cityName}}
              <el-button type="success" size="mini" icon="el-icon-search" @click="dialogFormVisible=true"></el-button>
            </template>
          </el-table-column>

          <el-table-column
            prop="count"
            label="数量"
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
    <el-col :span="10">
      <div class="chart-wrapper">
        <h3>安装总数：<span style="color:red">{{totalCount}}</span> 次</h3>
      </div>
      <div class="chart-wrapper" style="margin-top: 20px;">
        <pie-chart :dataArr2="pieDataList"></pie-chart>
      </div>
    </el-col>

    <div class="others-container">
      <el-dialog :visible.sync="dialogFormVisible" title="查看详情">
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
          :data="tableData2"
          border
          stripe
          fit
          highlight-current-row
        >
          <el-table-column
            prop="t3"
            label="车牌号">
          </el-table-column>
          <el-table-column
            prop="t4"
            label="车主姓名">
          </el-table-column>
          <el-table-column
            prop="t5"
            label="联系电话">
          </el-table-column>
          <el-table-column
            prop="t6"
            label="安装时间">
          </el-table-column>
          <el-table-column
            prop="t7"
            label="车辆颜色">
          </el-table-column>
          <el-table-column
            prop="t8"
            label="汽车类型">
          </el-table-column>
          <el-table-column
            prop="t9"
            label="载重">
          </el-table-column>

        </el-table>
        <el-pagination
          :page-sizes="[5, 40, 80, 100, 1000]"
          :page-size="5"
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
  import {getList} from '@/api/report_create'

  export default {
    components: {
      BarChart,
      PieChart
    },
    data() {
      return {
        dialogFormVisible: false,
        tableData2: [
          {
            t1: '交通厅',
            t2: '2018-03-22 10:22:25',
            t3: '鲁G5258P',
            t4: '李龙',
            t5: '18353674768',
            t6: '2018-03-22 10:22:25',
            t7: '蓝色',
            t8: '货车',
            t9: '10吨',
            t10: '已安装',
            t11: '6次',
            t12: 'dpf温度异常'
          },
          {
            t1: '交通厅',
            t2: '2018-03-22 10:22:25',
            t3: '鲁G809CP',
            t4: '张三营',
            t5: '18353674768',
            t6: '2018-03-22 10:22:25',
            t7: '蓝色',
            t8: '货车',
            t9: '10吨',
            t10: '已安装',
            t11: '6次',
            t12: 'dpf温度异常'
          },
          {
            t1: '交通厅',
            t2: '2018-03-22 10:22:25',
            t3: '鲁G4453C',
            t4: '汤云',
            t5: '18353674768',
            t6: '2018-03-22 10:22:25',
            t7: '绿色',
            t8: '货车',
            t9: '20吨',
            t10: '已安装',
            t11: '10次',
            t12: 'dpf压力异常'
          },
          {
            t1: '交通厅',
            t2: '2018-03-22 10:22:25',
            t3: '鲁G12234',
            t4: '王鸥',
            t5: '18353674768',
            t6: '2018-03-22 10:22:25',
            t7: '白色',
            t8: '货车',
            t9: '30吨',
            t10: '已安装',
            t11: '3次',
            t12: 'dpf定位异常'
          },
          {
            t1: '交通厅',
            t2: '2018-03-22 10:22:25',
            t3: '鲁G5556AG',
            t4: '张强',
            t5: '18353674768',
            t6: '2018-03-22 10:22:25',
            t7: '棕红色',
            t8: '货车',
            t9: '15吨',
            t10: '已安装',
            t11: '2次',
            t12: 'dpf温度异常'
          }
        ],
        // 列表相关
        tableData: [],
        dateRange: '',
        totalCount: '',
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
        }
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

          this.pieDataList.cityName = []
          this.pieDataList.dataAll = []
          this.temperatureData.cityName = []
          this.temperatureData.count = []
          this.totalCount = 0
          if (response.code === '200') {
            var dataA = response.data
            this.tableData = dataA.cityCount
            this.totalCount = dataA.totalCount
            const city = []
            const coun = []
            const datalist = []
            for (let i = 0; i < dataA.cityCount.length; i++) {
              city.push(dataA.cityCount[i].cityName)
              coun.push(dataA.cityCount[i].count)
              let pieData = {value: dataA.cityCount[i].count, name: dataA.cityCount[i].cityName}
              datalist.push(pieData)
            }
            this.pieDataList.cityName = city
            this.pieDataList.dataAll = datalist
            this.temperatureData.cityName = city
            this.temperatureData.count = coun
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

        const rows = [['城市', '数量']]
        this.tableData.forEach(item => {
          rows.push([
            item.cityName,
            item.count
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
