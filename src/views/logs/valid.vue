<template>
  <div class="app-container">
    <div class="filer-container" style="padding-bottom:10px;">
      <el-date-picker
        v-model="dateArea"
        type="daterange"
        value-format="yyyy-MM-dd"
        unlink-panels
        clearable
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        :picker-options="pickerOptions"
      >
      </el-date-picker>
      <el-input v-model="listQuery.username"
                @keyup.enter.native="handleSearch"
                style="width:120px;" clearable
                placeholder="输入用户名"
      ></el-input>
      <el-button type="primary" @click="handleSearch">查询</el-button>
    </div>
    <div class="table-container">
      <el-table
        :data="dataTable"
        border
        stripe
        fit
        highlight-current-row
      >
        <el-table-column
          prop="username"
          label="用户名"
        >
        </el-table-column>
        <el-table-column
          prop="content"
          label="操作内容"
        ></el-table-column>
        <el-table-column
          prop="createtime"
          label="操作时间"
        ></el-table-column>
      </el-table>
    </div>
    <div class="pagination-container">
      <el-pagination
        :page-sizes="[10, 20, 50, 100]"
        :total="total"
        :page-size="listQuery.limit"
        :current-page.sync="listQuery.page"
        layout=" total,sizes, prev, pager, next, jumper"
        background
        @size-change="sizeChange"
        @current-change="currentChange"
      >
      </el-pagination>
    </div>
    <div class="others-container">

    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  import {getLogList} from '@/api/log'

  export default {
    data() {
      return {
        dateArea: '',
        total: 0,
        listQuery: {
          starttime: '',
          endtime: '',
          username: '',
          page: 1,
          offset: 0,
          limit: 10
        },
        form: {
          userid: '',
          username: '',
          content: '',
          createtime: ''
        },
        dataTable: [],
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
      this.getList()
    },
    methods: {
      handleSearch() {
        if (this.dateArea) {
          this.listQuery.starttime = this.dateArea[0]
          this.listQuery.endtime = this.dateArea[1]
        } else {
          this.listQuery.starttime = ''
          this.listQuery.endtime = ''
        }
        this.total = 0
        this.listQuery.page = 1
        this.getList()
      },
      getList() {
        this.dataTable = []
        getLogList(this.listQuery).then(response => {
          if (response.code === '200') {
            this.dataTable = response.data.dataList
            this.total = response.data.count
          } else {
            this.$message({
              type: 'error',
              message: response.message
            })
          }
        })
      },
      sizeChange(val) {
        this.listQuery.limit = val
        this.listQuery.page = 1
        this.getList()
      },
      currentChange(val) {
        this.listQuery.page = val
        this.getList()
      }
    }
  }

</script>
