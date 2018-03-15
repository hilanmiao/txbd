<template>
  <div class="app-container">
    <div class="filter-container" style="padding-bottom: 10px;">
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
      <el-input v-model="listQuery.name" placeholder="运维人员名称" style="width: 200px;"></el-input>
      <el-button type="primary" icon="el-icon-search" @click="searchData">搜索</el-button>
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
            prop="name"
            label="运维人员"
            width="140">
          </el-table-column>

          <el-table-column
            prop="value"
            label="数量"
          >
          </el-table-column>
        </el-table>
      </div>
    </el-col>
    <el-col :span="6">
      <div class="chart-wrapper">
        <pie-chart :dataD="tableData"></pie-chart>
      </div>
    </el-col>
  </div>
</template>

<script type="text/ecmascript-6">
  import PieChart from './components/PieChart'
  import {getWarningReport} from '@/api/alarm'

  export default {
    components: {
      PieChart
    },
    data() {
      return {
        // 列表相关
        tableData: [],
        dateRange: '',
        listQuery: {
          starttime: '',
          endtime: '',
          name: ''
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
        tableLoading: false
      }
    },

    created() {
      this._getList()
    },
    methods: {
      pickerChange() {
        if (this.dateRange != null) {
          this.listQuery.starttime = this.dateRange[0]
          this.listQuery.endtime = this.dateRange[1]
        } else {
          this.listQuery.starttime = null
          this.listQuery.endtime = null
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
        getWarningReport(this.listQuery).then(response => {
          if (response.code === '200') {
            this.tableData = response.data.map(item => {
              return {
                value: item.num,
                name: item.name
              }
            })
          } else {
            this.$message({
              type: 'error',
              message: response.message
            })
          }
        })
        // 取消表格loading效果
        this.tableLoading = false
      }
    }
  }
</script>

<style scoped>

</style>
