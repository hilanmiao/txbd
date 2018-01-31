<template>
  <el-table :data="list" style="width: 100%;padding-top: 15px;">
    <el-table-column label="ID" show-overflow-tooltip width="100">
      <template slot-scope="scope">
        {{scope.row.id}}
      </template>
    </el-table-column>
    <el-table-column label="平台日志内容" >
      <template slot-scope="scope">
        {{scope.row.content }}
      </template>
    </el-table-column>
    <el-table-column label="生成时间" width="195" align="center">
      <template slot-scope="scope">
        {{scope.row.createTime }}
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
            id: 131,
            content: '定期推送统计报表至指定邮箱-交通厅',
            createTime: '2018-1-30 11:41:39',
            status: 'success',
            username: '超级管理员'
          }, {
            id: 132,
            content: '定期推送统计报表至指定邮箱-环保局',
            createTime: '2018-1-30 11:41:39',
            status: 'success',
            username: '超级管理员'
          }, {
            id: 133,
            content: '定期推送统计报表至指定邮箱-公安厅',
            createTime: '2018-1-30 11:41:39',
            status: 'warning',
            username: '超级管理员'
          }, {
            id: 134,
            content: '定期推送统计报表至指定邮箱-环监站',
            createTime: '2018-1-30 11:41:39',
            status: 'danger',
            username: '超级管理员'
          }
        ]
      }
    }
  }
</script>
