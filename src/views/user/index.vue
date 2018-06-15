<template>
  <div class="app-container">

    <div class="filter-container" style="padding-bottom: 10px;">
      <!--<el-input @keyup.enter.native="handleFilter" v-model="listQuery.name" style="width: 200px;"-->
                <!--class="filter-item"-->
                <!--placeholder="名称">-->
      <!--</el-input>-->
      <!--<el-button type="primary" icon="el-icon-search" @click="handleFilter">搜索</el-button>-->
      <el-button type="primary" icon="el-icon-edit" @click="handleCreate">添加</el-button>
      <!--<el-button type="primary" icon="el-icon-download" @click="handleExport" :loading="loadingExport">导出</el-button>-->
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
          prop="username"
          label="登录名">
        </el-table-column>
        <el-table-column
          prop="rolename"
          label="角色">
        </el-table-column>
        <el-table-column
          width="120"
          prop="organname"
          label="机构">
        </el-table-column>
        <el-table-column
          width="120"
          prop="name"
          label="昵称">
        </el-table-column>
        <el-table-column
          width="120"
          prop="phone"
          label="手机号">
        </el-table-column>
        <el-table-column
          width="120"
          prop="createtime"
          label="创建时间">
        </el-table-column>
        <!--<el-table-column-->
          <!--fixed="right"-->
          <!--label="操作"-->
          <!--width="130">-->
          <!--<template slot-scope="scope">-->
            <!--<el-tooltip content="编辑" placement="top">-->
              <!--<el-button type="primary" size="mini" icon="el-icon-edit" @click="handleEdit(scope.row)"></el-button>-->
            <!--</el-tooltip>-->
            <!--<el-tooltip content="删除" placement="top">-->
              <!--<el-button type="danger" size="mini" icon="el-icon-delete" @click="handleDelete(scope.row)"></el-button>-->
            <!--</el-tooltip>-->
          <!--</template>-->
        <!--</el-table-column>-->
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
        <el-form ref="form" status-icon :rules="rules" :model="tempModel" label-width="80px">
          <el-form-item label="登录名" prop="username">
            <el-input v-model="tempModel.username"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input v-model="tempModel.password"></el-input>
          </el-form-item>
          <el-form-item label="昵称" prop="name">
            <el-input v-model="tempModel.name"></el-input>
          </el-form-item>
          <el-form-item label="电话" prop="phone">
            <el-input v-model="tempModel.phone"></el-input>
          </el-form-item>
          <el-form-item label="机构" prop="organid">
            <el-select v-model="tempModel.organid" placeholder="请选择">
              <el-option v-for="item in listOrgan" :key="item.id" :label="item.name"
                         :value="item.id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="角色" prop="role_id">
            <el-select v-model="tempModel.role_id" placeholder="请选择">
              <el-option v-for="item in listRole" :key="item.id" :label="item.name"
                         :value="item.id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="handleSubmit" :loading="loadingSubmit">保存</el-button>
            <el-button @click="closeDialog">取消</el-button>
          </el-form-item>
        </el-form>
      </el-dialog>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import {getListUser, postModelUser, putModelUser, deleteModelUser} from '@/api/user'
  import {getListOrgan} from '@/api/organ'
  import {getListRole} from '@/api/part'

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
          username: '',
          sort: '+id'
        },
        // 表单相关
        listCity: [],
        listOrgan: [],
        listRole: [],
        tempModel: {
          id: '',
          username: '',
          password: '',
          name: '',
          phone: '',
          organid: '',
          role_id: '',
          from_system: '0'
        },
        loadingSubmit: false,
        dialogFormVisible: false,
        // 表单验证相关
        rules: {
          username: [
            {required: true, message: '请输入登录名', trigger: 'blur'},
            {max: 20, message: '长度在20个字符内', trigger: 'blur'}
          ],
          password: [
            {required: true, message: '请输入密码', trigger: 'blur'},
            {max: 20, message: '长度在20个字符内', trigger: 'blur'}
          ],
          name: [
            {required: true, message: '请输入昵称', trigger: 'blur'},
            {max: 40, message: '长度在40个字符内', trigger: 'blur'}
          ],
          phone: [
            {required: true, message: '请输入手机号', trigger: 'blur'},
            {max: 13, message: '长度在13个字符内', trigger: 'blur'}
          ],
          organid: [
            {required: true, message: '请选择机构', trigger: 'change'}
          ],
          role_id: [
            {required: true, message: '请选择角色', trigger: 'change'}
          ]
        },
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
          0: '省级',
          1: '市级'
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
      this._getListOrgan()
      this._getListRole()
    },
    methods: {
      closeDialog() {
        this.dialogFormVisible = false
        // 重置验证
        this.$refs.form.resetFields()
      },
      resetTempModel() {
        // 重置表单
        this.tempModel = {
          id: '',
          username: '',
          password: '',
          name: '',
          phone: '',
          organid: '',
          role_id: '',
          from_system: '0'
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
        // 表单验证
        this.$refs.form.validate(valid => {
          if (valid) {
            // 提交处理
            this.loadingSubmit = true
            // 提交数据
            if (!this.tempModel.id) {
              // 没有id，是新建
              this._postModelUser()
            } else {
              // 有id，是编辑
              this._putModelPlatform()
            }
          }
        })
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

        const rows = [['id', '登录名', '密码', '昵称', '电话', '城市', '角色', '平台']]
        this.tableData.forEach(item => {
          rows.push([
            item.id,
            item.username,
            item.password,
            item.name,
            item.phone,
            item.city_name,
            item.role_name,
            item.from_system
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
      _deleteModelUser() {
        deleteModelUser(this.tempModel.id).then(response => {
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
      _postModelUser() {
        postModelUser(this.tempModel).then(response => {
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
      _putModelUser() {
        putModelUser(this.tempModel).then(response => {
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
        getListUser(this.listQuery).then(response => {
          if (response.code === '200') {
            // 设置表格数据
            this.list = response.data
            // 设置分页插件数据总数
            this.total = parseInt(response.message)
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
      _getListOrgan() {
        const params = {
          offset: 0,
          limit: 1000
        }
        getListOrgan(params).then(response => {
          if (response.code === '200') {
            this.listOrgan = response.data
          } else {
            this.$message({
              type: 'error',
              message: response.message
            })
          }
        })
      },
      _getListRole() {
        const params = {
          offset: 0,
          limit: 1000
        }
        getListRole(params).then(response => {
          if (response.code === '200') {
            this.listRole = response.data
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
