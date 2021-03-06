<template>
  <div class="app-container">

    <div class="filter-container" style="padding-bottom: 10px;">
      <el-input @keyup.enter.native="handleFilter" v-model="listQuery.name" style="width: 200px;"
                class="filter-item"
                placeholder="平台名称">
      </el-input>
      <el-input @keyup.enter.native="handleFilter" v-model="listQuery.link_name" style="width: 200px;"
                class="filter-item"
                placeholder="联系人">
      </el-input>
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
          label="内容"
          width="120"
        >
        </el-table-column>
        <el-table-column
          prop="link_name"
          label="操作人">
        </el-table-column>
        <el-table-column
          prop="link_name"
          label="创建时间">
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

    <div class="others-container">
      <el-dialog :visible.sync="dialogFormVisible" title="添加&编辑" :before-close="handleBeforeClose">
        <el-form ref="form" :model="tempModel" label-width="80px">
          <el-form-item label="平台名称">
            <el-input v-model="tempModel.name"></el-input>
          </el-form-item>
          <el-form-item label="联系人">
            <el-input v-model="tempModel.link_name"></el-input>
          </el-form-item>
          <el-form-item label="电话">
            <el-input v-model="tempModel.link_phone"></el-input>
          </el-form-item>
          <el-form-item label="类型">
            <el-select v-model="tempModel.type" placeholder="请选择">
              <el-option label="市级平台" value="0"></el-option>
              <el-option label="供应商平台" value="1"></el-option>
            </el-select>
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
  import {getListPlatform, postModelPlatform, putModelPlatform, deleteModelPlatform} from '@/api/lower_platform'

  export default {
    data() {
      return {
        // 列表相关
        list: [],
        total: 0,
        loadingList: false,
        listQuery: {
          page: 1,
          limit: 10,
          offset: 0,
          name: '',
          link_name: '',
          sort: '+id'
        },
        // 表单相关
        tempModel: {
          id: '',
          name: '',
          link_name: '',
          link_phone: '',
          type: '0'
        },
        loadingSubmit: false,
        dialogFormVisible: false,

        // 导出相关
        loadingExport: false
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
    filters: {
      typeFilter(status) {
        const statusMap = {
          0: '市级平台',
          1: '供应商平台'
        }
        return statusMap[status]
      },
      typeTagFilter(status) {
        const statusMap = {
          0: 'success',
          1: 'info'
        }
        return statusMap[status]
      }
    },
    created() {
      // 获取列表数据
      this._getList()
    },
    methods: {
      resetTempModel() {
        // 重置表单
        this.tempModel = {
          id: '',
          name: '',
          link_name: '',
          link_phone: '',
          type: '0'
        }
      },
      handleCreate() {
        // 添加处理
        this.resetTempModel()
        this.dialogFormVisible = true
      },
      handleEdit(row) {
        // 使用对象拷贝赋值
        this.tempModel = Object.assign({}, row)
        // 编辑处理
        this.dialogFormVisible = true
      },
      handleDelete(row) {
        // 使用对象拷贝赋值
        this.tempModel = Object.assign({}, row)
        // 删除确认
        this.$confirm('此操作将永久删除该条数据, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          // 删除
          this._deleteModelPlatform()
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
      },
      handleSubmit() {
        // TODO: 提交前检查，必填项等。临时使用这种方式，以后或改为form自带的验证
        if (!this.tempModel.name) {
          this.$message({
            type: 'error',
            message: '平台名称必填'
          })
          return
        }
        // 提交处理
        this.loadingSubmit = true
        // 提交数据
        if (!this.tempModel.id) {
          // 没有id，是新建
          this._postModelPlatform()
        } else {
          // 有id，是编辑
          this._putModelPlatform()
        }
      },
      handleBeforeClose(done) {
        // dialog关闭前处理(http请求未完成时dialog不能关闭)
        if (!this.loadingSubmit) {
          done()
        }
      },
      handleExport() {
        // 导出处理（简单做，后期可能会改用插件）
        // 显示loading
        this.loadingExport = true

        const rows = [['id', '平台名称', '联系人', '电话', '状态', '创建时间', 'accessKey', 'accessSecret']]
        this.tableData.forEach(item => {
          rows.push([
            item.id,
            item.name,
            item.link_name,
            item.link_phone,
            item.type,
            item.createTime,
            item.accessKey,
            item.accessSecret
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
        // 搜索处理
        this.total = 0
        this.listQuery.page = 1
        this._getList()
      },
      handleSizeChange(val) {
        // 每页显示条数改变处理
        this.listQuery.limit = val
        this.listQuery.page = 1
        this._getList()
      },
      handleCurrentChange(val) {
        // 页码改变处理
        this.listQuery.page = val
        this._getList()
      },
      _deleteModelPlatform() {
        deleteModelPlatform(this.tempModel.id).then(response => {
          if (response.code === '204') {
            this.$message({
              type: 'success',
              message: '删除成功!'
            })
            // 重新请求数据(带着原先的查询参数)
            this._getList()
          } else {
            this.$message({
              type: 'error',
              message: response.message
            })
          }
        })
      },
      _postModelPlatform() {
        postModelPlatform(this.tempModel).then(response => {
          if (response.code === '201') {
            // 弹出提醒信息
            this.$message({
              type: 'success',
              message: '操作成功!'
            })
            // 重新请求数据(带着原先的查询参数)
            this._getList()
          } else {
            this.$message({
              type: 'error',
              message: response.message
            })
          }
          // 取消加载中
          this.loadingSubmit = false
          // 关闭dialog
          this.dialogFormVisible = false
        })
      },
      _putModelPlatform() {
        putModelPlatform(this.tempModel).then(response => {
          if (response.code === '201') {
            // 弹出提醒信息
            this.$message({
              type: 'success',
              message: '操作成功!'
            })
            // 重新请求数据(带着原先的查询参数)
            this._getList()
          } else {
            this.$message({
              type: 'error',
              message: response.message
            })
          }
          // 关闭dialog
          this.dialogFormVisible = false
          // 取消加载中
          this.loadingSubmit = false
        })
      },
      _getList() {
        // 清空表格数据
        this.list = []
        // 设置表格loading效果
        this.loadingList = true
        // 请求表格数据
        getListPlatform(this.listQuery).then(response => {
          if (response.code === '200') {
            // 设置表格数据
            this.list = response.data.dataList
            // 设置分页插件数据总数
            this.total = response.data.count
          } else {
            this.$message({
              type: 'error',
              message: response.message
            })
          }
          // 取消表格loading效果
          this.loadingList = false
        })
      }
    }
  }
</script>

<style scoped>

</style>
