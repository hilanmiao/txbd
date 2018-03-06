<template>
  <div class="app-container">
    <div class="filter-container">
      <el-select @keyup.enter.native="handleFilter" v-model="listQuery.city_id" style="width:120px;" clearable
                 placeholder="选择城市">
        <el-option v-for="item in listCity" :key="item.id" :label="item.name"
                   :value="item.id"></el-option>
      </el-select>
      <el-date-picker
        v-model="listQuery.dateRange"
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
          <pie-chart :dataD="dataDetail"></pie-chart>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import PieChart from './components/PieChart'
  import {getCitys} from '@/api/city'
  import {getData} from '@/api/report_online'

  export default {
    name: 'dashboard-admin',
    components: {
      PieChart
    },
    data() {
      return {
        listQuery: {
          dateRange: '',
          startTime: '',
          endTime: '',
          city_id: ''
        },
        listCity: [],
        dataDetail: {
          outLine: 0,
          onLine: 0
        },
        reportData: {
          total: 0,
          online: 8888,
          percent: '88.88%'
        },
        loadingExport: false,
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
      this._getCityList()
      this.searchData()
    },
    methods: {
      pickerChange() {
        if (this.listQuery.dateRange != null) {
          this.listQuery.startTime = this.listQuery.dateRange[0]
          this.listQuery.endTime = this.listQuery.dateRange[1]
        } else {
          this.listQuery.startTime = null
          this.listQuery.endTime = null
        }
      },
      searchData() {
        if (this.listQuery.city_id === '') {
          this.listQuery.city_id = null
        }
        this.pickerChange()
        this._getData()
      },
      _getData() {
        const params = this.listQuery
        getData(params).then(response => {
          this.reportData.online = response.data.onLine
          this.reportData.percent = response.data.rate
          this.reportData.total = response.data.total
          this.dataDetail.onLine = response.data.onLine
          this.dataDetail.outLine = response.data.total - response.data.onLine
        })
      },
      _getCityList() {
        getCitys().then(response => {
          this.listCity = response.data
        })
        this.listCity = getCitys()
      },
      handleExport() {
        // 导出处理（简单做，后期可能会改用插件）
        // 显示loading
        this.loadingExport = true

        const rows = [['总数', '上线数', '上线率']]
        rows.push([
          this.reportData.total,
          this.reportData.online,
          this.reportData.percent
        ])
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

<style rel="stylesheet/scss" lang="scss" scoped>
  .chart-wrapper {
    background: #fff;
    padding: 16px 16px 0;
    margin-bottom: 32px;
  }
</style>
