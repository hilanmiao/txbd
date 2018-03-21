<template>
  <div class="app-container">

    <div class="filter-container" style="padding-bottom: 10px;">
      <el-date-picker
        v-model="dateArea"
        type="daterange"
        align="right"
        unlink-panels
        value-format="yyyy-MM-dd"
        range-separator="-"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        @change="selectDate"
        style="width:300px;"
        clearable
      >
      </el-date-picker>
      <el-input @keyup.enter.native="handleFilter" v-model="listQuery.name" style="width:200px;"
                class="filter-item"
                placeholder="运维人员名称">
      </el-input>
      <el-button type="primary" icon="el-icon-search" @click="handleSearch">搜索</el-button>
    </div>

    <div class="table-container">
      <el-table
        v-loading="tableLoading" element-loading-text="加载中..."
        :data="tableData"
        border
        stripe
        fit
        highlight-current-row
        style="width: 100%">
        <el-table-column
          prop="name"
          label="运维人员"
          width="150">
        </el-table-column>
        <el-table-column
          prop="dpfInfo"
          label="DPF异常信息描述"
          width="150">
        </el-table-column>
        <el-table-column
          prop="warning_time"
          label="发出预警时间"
          width="250">
        </el-table-column>
        <el-table-column
          prop="dispose_content"
          label="标记内容">
        </el-table-column>
        <el-table-column
          prop="dispose_time"
          label="标记时间"
          width="180">
        </el-table-column>
      </el-table>
    </div>

    <div class="pagination-container" style="margin-top: 20px">
      <el-pagination
        :page-sizes="[10, 40, 80, 100, 1000]"
        :page-size="listQuery.limit"
        :current-page.sync="listQuery.page"
        :total="total"
        layout="total, sizes, prev, pager, next, jumper"
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import {getWarningHistory} from '@/api/alarm'

  export default {
    data() {
      return {
        // 列表相关
        tableData: [],
        total: 0,
        dateArea: '',
        loadingExport: false,
        tableLoading: false,
        noEdit: false,
        imageView: false,
        imgDetail: '',
        // 表单相关
        form: {},
        listCity: [],
        submitLoading: false,
        visible: false,
        visibleView: false,
        lookOrEdit: true,
        titMsg: '编辑&添加',
        listQuery: {
          starttime: '',
          endtime: '',
          name: '',
          limit: 10,
          offset: 0,
          page: 1
        }
      }
    },
    watch: {
      'listQuery.page': {
        handler: function (val, oldVal) {
          // 拼装查询用的offset
          if (val > 1) {
            this.listQuery.offset = (val - 1) * this.listQuery.limit
          } else {
            this.listQuery.offset = 0
          }
        },
        deep: true
      }
    },
    created() {
      this._getList()
    },
    methods: {
      _getList() {
        // 清空表格数据
        this.tableData = []
        // 设置表格loading效果
        this.tableLoading = true
        getWarningHistory(this.listQuery).then(response => {
          if (response.code === '200') {
            // 设置表格数据
            this.tableData = response.data.list
            // 设置分页插件数据总数
            this.total = response.data.count
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
      selectDate() {
        if (this.dateArea != null) {
          this.listQuery.starttime = this.dateArea[0]
          this.listQuery.endtime = this.dateArea[1]
        } else {
          this.listQuery.starttime = ''
          this.listQuery.endtime = ''
        }
      },
      handleSearch() {
        this._getList()
      },
      handleSizeChange(val) {
        this.listQuery.limit = val
        this._getList()
      },
      handleCurrentChange(val) {
        this.offset = val
        this._getList()
      }
    }
  }
</script>

<style scoped>

</style>
