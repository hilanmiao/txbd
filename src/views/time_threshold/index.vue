<template>
  <div class="app-container">

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
          prop="NAME"
          label="档位">
        </el-table-column>
        <el-table-column
          prop="THRESHOLD"
          label="阀值">
        </el-table-column>
        <el-table-column>
          <template slot-scope="scope">
            <el-button type="primary" size="mini" icon="el-icon-edit" @click="handleEdit(scope.row)"></el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>


    <div class="others-container">
      <el-dialog :visible.sync="visibleView" title="修改">
        <el-form ref="form" :model="form" :rules="rules" label-width="120px" :inline="true">

          <el-form-item label="档位" prop="dpf_model">
            <el-input v-model="form.NAME" style="width:80%;" :readonly="lookOrEdit"></el-input>
          </el-form-item>

          <el-form-item label="阀值" prop="minT1">
            <el-input v-model.number="form.THRESHOLD" placeholder="T1最小值" style="width:80%;"></el-input>
          </el-form-item>

          <el-form-item>
            <el-button type="primary" @click="handleSubmit('form')" :loading="submitLoading">保存
            </el-button>
            <el-button @click="qxSubmit()">关闭</el-button>
          </el-form-item>

        </el-form>
      </el-dialog>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import {getDetail, editDate} from '@/api/time_threshold'

  export default {
    data() {
      return {
        // 列表相关
        loadingExport: false,
        tableLoading: false,
        lookOrEdit: false,
        tableData: [],
        // 表单相关
        form: {
          THRESHOLD: '',
          ID: '',
          NAME: ''
        },
        rules: {
          THRESHOLD: [
            {required: true, message: '请输入活动名称', trigger: 'blur'}
          ],
          ID: [
            {required: true, message: '请选择供应商', trigger: 'change'}
          ],
          NAME: [
            {type: 'number', required: true, message: '请填写正确数值', trigger: 'blur'}
          ]
        },
        submitLoading: false,
        visibleView: false
      }
    },
    created() {
      this._getList()
    },
    methods: {
      resetTempModel() {
        // 重置表单
        this.form = {
          THRESHOLD: '',
          ID: '',
          NAME: ''
        }
      },

      _getList() {
        // this.tableData = []
        // this.tableLoading = true
        getDetail().then(response => {
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

      handleEdit(row) {
        this.resetTempModel()
        this.visibleView = true
        this.lookOrEdit = true
        this.form = row
      },
      handleExport() {
        // 导出处理（简单做，后期可能会改用插件）
        // 显示loading
        this.loadingExport = true

        const rows = [['档位', '阀值']]
        this.tableData.forEach(item => {
          rows.push([
            item.NAME,
            item.THRESHOLD

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
      handleSubmit(formName) {
        this.$refs[formName].validate((valid) => {
          // 验证规则
          if (valid) {
            this._editSubmit()
          } else {
            console.log('error submit!!')
            return false
          }
        })
      },
      qxSubmit() {
        this.$refs.form.resetFields()
        this.visibleView = false
      },
      _editSubmit() {
        editDate(this.form.ID, this.form.THRESHOLD).then(response => {
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
