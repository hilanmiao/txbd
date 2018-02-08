<template>
  <div class="app-container">
    <div class="filter-container">
      <el-select value="" placeholder="请选择车型">
        <el-option label="小车" value="0"></el-option>
        <el-option label="打车" value="1"></el-option>
      </el-select>
      <el-input style="width: 100px;"
                class="filter-item"
                placeholder="年限">
      </el-input>
      <el-button type="primary" icon="el-icon-search">搜索</el-button>
      <el-button type="primary" icon="el-icon-download">导出</el-button>
    </div>

    <el-row :gutter="32">
      <el-col :lg="24" :sm="24" :xs="24">
        <div class="chart-wrapper">
          <el-table
            border
            stripe
            fit
            highlight-current-row
            style="width: 100%">
            <el-table-column
              prop="name"
              label="机构">
            </el-table-column>
            <el-table-column
              width="120"
              prop="createTime"
              label="车牌">
            </el-table-column>
            <el-table-column
              width="120"
              prop="createTime"
              label="其他参数">
            </el-table-column>
            <el-table-column
              width="120"
              prop="createTime"
              label="其他参数">
            </el-table-column>
            <el-table-column
              width="120"
              prop="createTime"
              label="其他参数">
            </el-table-column>
            <el-table-column
              width="120"
              label="其他参数">
              <template slot-scope="scope">
                <el-tag :type="scope.row.status | typeTagFilter">{{scope.row.type | typeFilter}}</el-tag>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </el-col>

      <el-col :xs="24" :sm="24" :lg="12">
        <div class="chart-wrapper">
          <bar-chart></bar-chart>
        </div>
      </el-col>

      <el-col :xs="24" :sm="24" :lg="12">
        <div class="chart-wrapper">
          <pie-chart></pie-chart>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import BarChart from './components/BarChart'
  import PieChart from './components/PieChart'

  export default {
    name: 'dashboard-admin',
    components: {
      BarChart,
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
