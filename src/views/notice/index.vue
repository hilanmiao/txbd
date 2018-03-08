<template>
  <div class="app-container">

    <div class="filter-container" style="padding-bottom: 10px;">
      <el-input @keyup.enter.native="handleFilter" v-model="listQuery.title" style="width: 200px;"
                class="filter-item"
                placeholder="标题">
      </el-input>
      <el-button type="primary" icon="el-icon-search" @click="handleFilter">搜索</el-button>
      <el-button type="primary" icon="el-icon-edit" @click="handleCreate">添加</el-button>
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
          prop="title"
          label="标题">
        </el-table-column>
        <el-table-column
          width="200"
          prop="createTime"
          label="创建时间">
        </el-table-column>
        <el-table-column
          width="120"
          prop="createUserName"
          label="创建人">
        </el-table-column>
        <el-table-column
          fixed="right"
          label="操作"
          width="200">
          <template slot-scope="scope">
            <el-tooltip content="查看" placement="top">
              <el-button type="success" size="mini" icon="el-icon-search" @click="handleView(scope.row)"></el-button>
            </el-tooltip>
            <el-tooltip content="编辑" placement="top">
              <el-button type="primary" size="mini" icon="el-icon-edit" @click="handleEdit(scope.row)"></el-button>
            </el-tooltip>
            <el-tooltip content="删除" placement="top">
              <el-button type="danger" size="mini" icon="el-icon-delete" @click="handleDelete(scope.row)"></el-button>
            </el-tooltip>
          </template>
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
      <el-dialog :visible.sync="dialogFormVisible" title="查看" :before-close="handleBeforeClose">
        <el-form ref="form" :model="tempModel" label-width="80px">
          <el-form-item label="标题">
            {{tempModel.title}}
          </el-form-item>
          <el-form-item label="内容">
            <div v-html="decodeURIComponent(tempModel.content)"></div>
          </el-form-item>
          <el-form-item>
            <el-button @click="dialogFormVisible = false">关闭</el-button>
          </el-form-item>
        </el-form>
      </el-dialog>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import {getModelNotice, getListNotice, postModelNotice, putModelNotice, deleteModelNotice} from '@/api/notice'

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
          title: '',
          sort: '+id'
        },
        // 表单相关
        tempModel: {
          id: '',
          content: '',
          title: ''
        },
        loadingSubmit: false,
        dialogFormVisible: false,
        editor: undefined,

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
          0: '未发布',
          1: '已发布'
        }
        return statusMap[status]
      },
      typeTagFilter(status) {
        const statusMap = {
          0: 'warning',
          1: 'success'
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
          name: ''
        }
      },
      handleCreate() {
        this.$router.push({
          name: '公告添加编辑'
        })
      },
      handleView(row) {
        this.dialogFormVisible = true
        getModelNotice({id: row.id}).then(response => {
          if (response.code === '200') {
            this.tempModel = response.data
          } else {
            this.$message({
              type: 'error',
              message: response.message
            })
          }
        })
      },
      handleEdit(row) {
        this.$router.push({
          name: '公告添加编辑',
          params: {
            id: row.id
          }
        })
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
          this._deleteModelNotice()
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
          this._postModelNotice()
        } else {
          // 有id，是编辑
          this._putModelNotice()
        }
      },
      handleBeforeClose(done) {
        // dialog关闭前处理(http请求未完成时dialog不能关闭)
        if (!this.loadingSubmit) {
          done()
        }
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
      _deleteModelNotice() {
        deleteModelNotice(this.tempModel.id).then(response => {
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
      _postModelNotice() {
        postModelNotice(this.tempModel).then(response => {
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
      _putModelNotice() {
        putModelNotice(this.tempModel).then(response => {
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
        getListNotice(this.listQuery).then(response => {
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
