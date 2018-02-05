<template>
  <div class="dashboard-editor-container">
    <el-row>
      <el-col lg="24">
        <el-table :data="list" style="width: 100%;padding-top: 15px;">
          <el-table-column label="ID" show-overflow-tooltip width="100">
            <template slot-scope="scope">
              {{scope.row.id}}
            </template>
          </el-table-column>
          <el-table-column label="系统日志内容">
            <template slot-scope="scope">
              {{scope.row.content }}
            </template>
          </el-table-column>
          <el-table-column label="生成时间" width="150" align="center">
            <template slot-scope="scope">
              {{scope.row.createTime }}
            </template>
          </el-table-column>
          <el-table-column label="标记" width="100" align="center">
            <template slot-scope="scope">
              <el-tag :type="scope.row.status | statusFilter"> {{scope.row.status}}</el-tag>
            </template>
          </el-table-column>
          <el-table-column label="操作人" width="105" align="center">
            <template slot-scope="scope">
              {{scope.row.username }}
            </template>
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>

    <el-row :gutter="32">
      <el-col :xs="24" :sm="24" :lg="8">
        <div class="chart-wrapper">
          <bar-chart></bar-chart>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import BarChart from './components/BarChart'

  export default {
    name: 'dashboard-admin',
    components: {
      BarChart
    },
    data() {
      return {
        list: null
      }
    },
    methods: {}
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .chart-wrapper {
    background: #fff;
    padding: 16px 16px 0;
    margin-bottom: 32px;
  }
</style>
