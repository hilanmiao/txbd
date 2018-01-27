<template>
  <div class="app-container">

    <div class="filter-container" style="padding-bottom: 10px;">
      <el-input style="width: 200px;" class="filter-item" placeholder="机构名称">
      </el-input>
      <el-select value="" placeholder="请选择">
        <el-option
          label="张三"
          value="张三">
        </el-option>
        <el-option
          label="李四"
          value="李四">
        </el-option>
      </el-select>
      <el-button type="primary" icon="el-icon-search" @click="handleFilter">搜索</el-button>
      <el-button type="primary" icon="el-icon-edit" @click="handleCreate">添加</el-button>
      <el-button type="primary" icon="el-icon-download" @click="handleExport" :loading="loadingExport">导出</el-button>
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
          prop="name"
          label="机构名称"
          width="150">
        </el-table-column>
        <el-table-column
          prop="linkman"
          label="联系人"
          width="120">
        </el-table-column>
        <el-table-column
          prop="phone"
          label="电话"
          width="120">
        </el-table-column>
        <el-table-column
          prop="remark"
          label="备注">
        </el-table-column>
        <el-table-column
          fixed="right"
          label="操作"
          width="160">
          <template slot-scope="scope">
            <el-button type="primary" size="mini" @click="handleEdit(scope.row)">编辑</el-button>
            <el-button type="danger" size="mini" @click="handleDelete(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <div class="pagination-container" style="margin-top: 20px">
      <el-pagination
        :page-sizes="[20, 40, 80, 100, 1000]"
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

    <div class="others-container">
      <el-dialog :visible.sync="dialogFormVisible" title="添加&编辑" :before-close="handleBeforeClose">
        <el-form ref="form" :model="tempModel" label-width="80px">
          <el-form-item label="机构名称">
            <el-input v-model="tempModel.name"></el-input>
          </el-form-item>
          <el-form-item label="联系人">
            <el-input v-model="tempModel.linkman"></el-input>
          </el-form-item>
          <el-form-item label="电话">
            <el-input v-model="tempModel.phone"></el-input>
          </el-form-item>
          <el-form-item label="备注">
            <el-input type="textarea" v-model="tempModel.remark"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="handleSubmit" :loading="loadingSubmit">保存</el-button>
            <el-button @click="dialogFormVisible = false">取消</el-button>
          </el-form-item>
        </el-form>
      </el-dialog>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    data() {
      return {
        // 列表相关
        list: null,
        total: null,
        loadingList: false,
        listQuery: {
          page: 1,
          limit: 20,
          importance: undefined,
          title: undefined,
          type: undefined,
          sort: '+id'
        },
        // 表单相关
        tempModel: {
          id: undefined,
          name: '',
          linkman: '',
          phone: '',
          remark: ''
        },
        loadingSubmit: false,
        dialogFormVisible: false,

        // 导出相关
        loadingExport: false
      }
    },
    created() {
      this.getList()
    },
    methods: {
      getList() {
        // fetchList(this.listQuery).then(response => {
        //   this.list = response.data.items
        //   this.total = response.data.total
        //   this.listLoading = false
        // })
        this.loadingList = true
        setTimeout(() => {
          this.list = [
            {
              id: '0',
              name: '济南',
              linkman: '张三',
              phone: '123456',
              remark: '这是济南市'
            },
            {
              id: '1',
              name: '潍坊',
              linkman: '李四',
              phone: '123456',
              remark: '这是潍坊市'
            }
          ]
          this.total = 400
          this.loadingList = false
        }, 1000)
      },
      resetTempModel() {
        this.tempModel = {
          id: undefined,
          name: '',
          linkman: '',
          phone: '',
          remark: ''
        }
      },
      handleCreate() {
        this.resetTempModel()
        this.dialogFormVisible = true
      },
      handleEdit(row) {
        this.tempModel = row
        this.dialogFormVisible = true
      },
      handleDelete(row) {
        this.$confirm('此操作将永久删除该条数据, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
      },
      handleSubmit() {
        this.loadingSubmit = true
        // 提交数据
        setTimeout(() => {
          // 取消加载中
          this.loadingSubmit = false
          // 关闭dialog
          this.dialogFormVisible = false
          // 重新请求数据(带着原先的查询参数)
          this.getList()
        }, 2000)
      },
      handleBeforeClose(done) {
        if (!this.loadingSubmit) {
          done()
        }
      },
      handleExport() {
        // 显示loading
        this.loadingExport = true

        const rows = [['id', '机构名称', '联系人', '电话', '备注']]
        this.tableData.forEach(item => {
          rows.push([
            item.id,
            item.name,
            item.linkman,
            item.phone,
            item.remark
          ])
        })
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
      },
      handleFilter() {
        this.listQuery.page = 1
        this.getList()
      },
      handleSizeChange(val) {
        this.listQuery.limit = val
        this.getList()
      },
      handleCurrentChange(val) {
        this.listQuery.page = val
        this.getList()
      }
    }
  }
</script>

<style scoped>

</style>
