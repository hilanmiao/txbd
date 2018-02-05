<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input style="width: 100px;"
                class="filter-item"
                placeholder="车牌号">
      </el-input>
      <el-date-picker
        v-model="listQuery.dateRange"
        type="daterange"
        align="right"
        unlink-panels
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        :picker-options="pickerOptions"
        :change="pickerChange"
      >
      </el-date-picker>
      <el-button type="primary" icon="el-icon-search">搜索</el-button>
      <el-button type="primary" icon="el-icon-download">导出</el-button>
    </div>

    <el-row :gutter="32">
      <el-col :lg="8" :sm="24" :xs="24">
        <div class="chart-wrapper">
          <el-card class="box-card">
            <div>
              <p><i class="el-icon-circle-check"></i>车辆总数：{{reportData.total}}</p>
              <p><i class="el-icon-circle-check"></i>上线数：{{reportData.online}}</p>
              <p><i class="el-icon-circle-check"></i>上线率：{{reportData.percent}}</p>
            </div>
          </el-card>
        </div>
      </el-col>

      <el-col :xs="24" :sm="24" :lg="16">
        <div class="chart-wrapper">
          <pie-chart></pie-chart>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import PieChart from './components/PieChart'

  export default {
    name: 'dashboard-admin',
    components: {
      PieChart
    },
    data() {
      return {
        listQuery: {
          dateRange: ''
        },
        reportData: {
          total: 10000,
          online: 8888,
          percent: '88.88%'
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
        }
      }
    },
    created() {
      this._getList()
    },
    methods: {
      pickerChange() {
        console.log(this.listQuery.dateRange)
      },
      _getList() {
        this.list = []
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .chart-wrapper {
    background: #fff;
    padding: 16px 16px 0;
    margin-bottom: 32px;
  }
</style>
