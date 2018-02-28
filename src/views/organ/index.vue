<template>
  <div class="app-container">

    <div class="filter-container" style="padding-bottom: 10px;">
      <el-button type="primary" icon="el-icon-edit" @click="handleAdd()">添加</el-button>
      <el-button type="primary" icon="el-icon-download" @click="handleExport" :loading="loadingExport">导出</el-button>
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
          prop="code"
          label="编号">
        </el-table-column>
        <el-table-column
          prop="name"
          label="名称">
        </el-table-column>
        <el-table-column
          prop="created_time"
          label="创建时间">
        </el-table-column>

        <!--<el-table-column
          fixed="right"
          label="操作"
          width="230">
          <template slot-scope="scope">
            <el-button type="primary" size="mini" icon="el-icon-edit" @click="handleEdit(scope.row)"></el-button>
            <el-button type="danger" size="mini" icon="el-icon-delete" @click="handleDelete(scope.row)"></el-button>
          </template>
        </el-table-column>
      --></el-table>
    </div>

    <div class="pagination-container" style="margin-top: 20px">
      <el-pagination
        :page-sizes="[10, 40, 80, 100, 1000]"
        :page-size="listQuery.limit"
        :current-page.sync="listQuery.page"
        layout=" sizes, prev, pager, next, jumper"
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      >
      </el-pagination>
    </div>

    <div class="others-container">
      <el-dialog :visible.sync="visibleView" title="添加&修改">
        <el-form ref="form" :model="form" :rules="rules" label-width="120px">

          <el-form-item label="机构名称" prop="name">
            <el-input v-model="form.name" style="width:80%;" :readonly="lookOrEdit"></el-input>
          </el-form-item>

          <el-form-item label="机构编号" prop="code">
            <el-input v-model="form.code" style="width:80%;" :readonly="lookOrEdit"></el-input>
          </el-form-item>

          <el-form-item>
            <el-button type="primary" @click="handleSubmit('form')" :loading="submitLoading">保存
            </el-button>
            <el-button @click="qxSubmit('form')">关闭</el-button>
          </el-form-item>

        </el-form>
      </el-dialog>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import {getListOrgan, addOrgan} from '@/api/organ'

  export default {
    data() {
      return {
        // 列表相关
        loadingExport: false,
        tableLoading: false,
        lookOrEdit: false,
        listSupp: [],
        tableData: [],
        // 表单相关
        form: {
          id: '',
          name: '',
          code: ''
        },
        rules: {
          name: [
            {required: true, message: '请输入机构名称', trigger: 'blur'}
          ],
          code: [
            {required: true, message: '请输入机构编号', trigger: 'blur'}
          ]
        },
        submitLoading: false,
        visibleView: false,
        listQuery: {
          endTime: '',
          name: '',
          dpf_model: '',
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
      resetTempModel() {
        // 重置表单
        this.form = {
          name: '',
          id: '',
          code: ''
        }
      },
      _getList() {
        this.tableData = []
        this.tableLoading = true
        getListOrgan(this.listQuery).then(response => {
          if (response.code === '200') {
            this.tableData = response.data
          } else {
            this.$message({
              type: 'error',
              message: response.message
            })
          }
        })
        this.tableLoading = false
      },
      handleAdd() {
        this.resetTempModel()
        this.visibleView = true
        this.lookOrEdit = false
      },
      handleExport() {
        // 导出处理（简单做，后期可能会改用插件）
        // 显示loading
        this.loadingExport = true

        const rows = [['机构编号', '机构名称', '创建时间']]
        this.tableData.forEach(item => {
          rows.push([
            item.code,
            item.name,
            item.created_time
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
      handleSizeChange(val) {
        this.listQuery.limit = val
        this._getList()
      },
      handleCurrentChange(val) {
        this.offset = val
        this._getList()
      },

      handleSubmit(formName) {
        this.$refs[formName].validate((valid) => {
          // 验证规则
          if (valid) {
            this._addSubmit()
          } else {
            console.log('error submit!!')
            return false
          }
        })
      },
      qxSubmit(formName) {
        this.$refs[formName].resetFields()
        this.visibleView = false
      },
      _addSubmit() {
        this.form.id = null
        const tempForm = Object.assign({}, this.form)
        addOrgan(tempForm).then(response => {
          if (response.code === '201') {
            // 弹出提醒信息
            this.$message({
              type: 'success',
              message: '操作成功!'
            })
            this.visibleView = false
            this._getList()
          } else {
            this.$message({
              type: 'error',
              message: response.message
            })
          }
          this.submitLoading = false
        })
      },
      handleBeforeClose(done) {
        if (!this.submitLoading) {
          done()
        }
      },
      _postForm() {
        setTimeout(() => {
          console.log('提交中')
        }, 2000)
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .chart-wrapper {
    background: #fff;
    padding: 16px 16px 0;
    margin-bottom: 32px;
  }
</style>
