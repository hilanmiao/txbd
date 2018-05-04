<template>
  <div class="app-container">
    <div class="filter-container" style="padding-bottom: 10px;">
      <el-select v-model="listQuery.supplier_id" placeholder="请选择供应商">
        <el-option v-for="item in listSupp" :key="item.SUPPLIER_ID" :label="item.NAME"
                   :value="item.SUPPLIER_ID"></el-option>
      </el-select>
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
            label="dpf型号"
            width="140">
          </el-table-column>

          <el-table-column
            prop="value"
            label="安装数量"
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
  import {allSupp} from '@/api/supplier'
  import {getList} from '@/api/report_dpf_models'

  export default {
    components: {
      PieChart
    },
    data() {
      return {
        // 列表相关
        tableData: [],
        listSupp: [],
        listQuery: {
          supplier_id: ''
        },
        tableLoading: false
      }
    },

    created() {
      this._getAllSupp()
    },
    methods: {
      searchData() {
        this._getList()
      },
      _getList() {
        // 清空表格数据
        this.tableData = []
        // 设置表格loading效果
        this.tableLoading = true
        getList(this.listQuery).then(response => {
          if (response.code === '200') {
            this.tableData = response.data.map(item => {
              return {
                value: item.count,
                name: item.dpf_model
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
      },
      _getAllSupp() {
        allSupp().then(response => {
          if (response.code === '200') {
            this.listSupp = response.data
          } else {
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

<style scoped>

</style>
