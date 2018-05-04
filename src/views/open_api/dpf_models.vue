<template>
  <div class="app-container">
    <div class="filter-container" style="padding-bottom: 10px;">
      <el-select v-model="listQuery.supplier_id" placeholder="请选择供应商">
        <el-option v-for="item in listSupp" :key="item.SUPPLIER_ID" :label="item.NAME"
                   :value="item.SUPPLIER_ID"></el-option>
      </el-select>
      <el-input v-model="listQuery.accessKey" style="width: 200px;"
                class="filter-item"
                placeholder="accessKey">
      </el-input>
      <el-input v-model="listQuery.accessSecret" style="width: 200px;"
                class="filter-item"
                placeholder="accessSecret">
      </el-input>
      <el-button type="primary" icon="el-icon-search" @click="_getList">搜索</el-button>
    </div>

    <div class="table-container">
      <el-table
        v-loading="loadingList" element-loading-text="加载中..."
        :data="list"
        border
        stripe
        fit
        highlight-current-row
        style="width: 100%">
        <el-table-column
          prop="supplier_name"
          label="供应商名称">
        </el-table-column>
        <el-table-column
          prop="dpf_model"
          label="dpf型号">
        </el-table-column>
        <el-table-column
          prop="createTime"
          label="创建时间">
        </el-table-column>
        <el-table-column
          prop="createUser"
          label="创建人">
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import {getDpfModels} from '@/api/open_api'
  import {allSupp} from '@/api/supplier'

  export default {
    data() {
      return {
        // 列表相关
        list: [],
        listSupp: [],
        loadingList: false,
        listQuery: {
          accessKey: '39cf805b',
          accessSecret: '1a36149f',
          supplier_id: ''
        }
      }
    },
    created() {
      this.getAllSupp()
    },
    methods: {
      _getList() {
        // 清空表格数据
        this.list = []
        // 设置表格loading效果
        this.loadingList = true
        // 请求表格数据
        getDpfModels(this.listQuery).then(response => {
          if (response.code === '200') {
            // 设置表格数据
            this.list = response.data
          } else {
            this.$message({
              type: 'error',
              message: response.message
            })
          }
          // 取消表格loading效果
          this.loadingList = false
        })
      },
      getAllSupp() {
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
