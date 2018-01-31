<template>
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
</template>

<script>
  export default {
    data() {
      return {
        list: null
      }
    },
    filters: {
      statusFilter(status) {
        const statusMap = {
          success: 'success',
          warning: 'warning',
          danger: 'danger'
        }
        return statusMap[status]
      }
    },
    created() {
      this.fetchData()
    },
    methods: {
      fetchData() {
        this.list = [
          {
            id: 1001,
            content: '系统初始化',
            createTime: '2018-1-30 11:41:39',
            status: 'success',
            username: '超级管理员'
          }, {
            id: 1002,
            content: 'DPF实时监控功能开启',
            createTime: '2018-1-30 11:41:39',
            status: 'success',
            username: '超级管理员'
          }, {
            id: 1003,
            content: '更改系统参数',
            createTime: '2018-1-30 11:41:39',
            status: 'warning',
            username: '超级管理员'
          }, {
            id: 1004,
            content: 'DPF冲突报警，发送报警短信',
            createTime: '2018-1-30 11:41:39',
            status: 'danger',
            username: '超级管理员'
          }, {
            id: 1005,
            content: '定期推送统计报表至指定邮箱',
            createTime: '2018-1-30 11:41:39',
            status: 'info',
            username: '超级管理员'
          }
        ]
      }
    }
  }
</script>
