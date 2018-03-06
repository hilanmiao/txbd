<template>
  <div class="app-container">

    <div class="filter-container" style="padding-bottom: 10px;">

      <el-input @keyup.enter.native="handleSearch" v-model="listQuery.dpf_model" style="width:200px;"
                class="filter-item"
                placeholder="dpf型号">
      </el-input>
      <el-input @keyup.enter.native="handleSearch" v-model="listQuery.name" style="width:200px;"
                class="filter-item"
                placeholder="供应商名称">
      </el-input>
      <el-button type="primary" icon="el-icon-search" @click="handleSearch">搜索</el-button>
      <el-button type="primary" icon="el-icon-edit" @click="handleAdd()">添加</el-button>
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
          prop="dpf_model"
          label="dpf型号"
          width="150">
        </el-table-column>
        <el-table-column
          prop="supplierName"
          label="供应商">
        </el-table-column>
        <el-table-column
          prop="minT1"
          label="T1最小值">
        </el-table-column>
        <el-table-column
          prop="maxT1"
          label="T1最大值">
        </el-table-column>
        <el-table-column
          prop="minT2"
          label="T2最小值">
        </el-table-column>
        <el-table-column
          prop="maxT2"
          label="T2最大值">
        </el-table-column>
        <el-table-column
          prop="minT3"
          label="T3最小值">
        </el-table-column>
        <el-table-column
          prop="maxT3"
          label="T3最大值">
        </el-table-column>
        <el-table-column
          prop="minP1"
          label="P1最小值">
        </el-table-column>
        <el-table-column
          prop="maxP1"
          label="P1最大值">
        </el-table-column>
        <el-table-column
          prop="minP2"
          label="P2最小值">
        </el-table-column>
        <el-table-column
          prop="maxP2"
          label="P2最大值">
        </el-table-column>
        <el-table-column
          fixed="right"
          label="操作"
          width="230">
          <template slot-scope="scope">
            <el-button type="primary" size="mini" icon="el-icon-edit" @click="handleEdit(scope.row)"></el-button>
            <el-button type="danger" size="mini" icon="el-icon-delete" @click="handleDelete(scope.row)"></el-button>
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
      <el-dialog :visible.sync="visibleView" title="添加&修改">
        <el-form ref="form" :model="form" :rules="rules" label-width="120px" :inline="true">

          <el-form-item label="dpf型号" prop="dpf_model">
            <el-input v-model="form.dpf_model" style="width:80%;" :readonly="lookOrEdit"></el-input>
          </el-form-item>

          <el-form-item label="供应商" prop="supplier_id">
            <el-select v-model="form.supplier_id" placeholder="请选择供应商" :disabled="lookOrEdit">
              <el-option v-for="item in listSupp" :key="item.SUPPLIER_ID" :label="item.NAME"
                         :value="item.SUPPLIER_ID"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="T1最小值" prop="minT1">
            <el-input v-model.number="form.minT1" placeholder="T1最小值" style="width:80%;"></el-input>
          </el-form-item>

          <el-form-item label="T1最大值" prop="maxT1">
            <el-input v-model.number="form.maxT1" placeholder="T1最大值"></el-input>
          </el-form-item>


          <el-form-item label="T2最小值" prop="minT2">
            <el-input v-model.number="form.minT2" style="width:80%;"></el-input>
          </el-form-item>

          <el-form-item label="T2最大值" prop="maxT2">
            <el-input v-model.number="form.maxT2"></el-input>
          </el-form-item>

          <el-form-item label="T3最小值" prop="minT3">
            <el-input v-model.number="form.minT3" style="width:80%;"></el-input>
          </el-form-item>

          <el-form-item label="T3最大值" prop="maxT3">
            <el-input v-model.number="form.maxT3"></el-input>
          </el-form-item>

          <el-form-item label="P1最小值" prop="minP1">
            <el-input v-model.number="form.minP1" style="width:80%;"></el-input>
          </el-form-item>

          <el-form-item label="P1最大值" prop="maxP1">
            <el-input v-model.number="form.maxP1"></el-input>
          </el-form-item>

          <el-form-item label="P2最小值" prop="minP2">
            <el-input v-model.number="form.minP2" style="width:80%;"></el-input>
          </el-form-item>

          <el-form-item label="P2最大值" prop="maxP2" style="width:50%;">
            <el-input v-model.number="form.maxP2"></el-input>
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
  import {getList, addThre, editThre, deleThre} from '@/api/threshold'
  import {allSupp} from '@/api/supplier'

  export default {
    data() {
      return {
        // 列表相关
        total: 0,
        loadingExport: false,
        tableLoading: false,
        lookOrEdit: false,
        T2: '',
        listSupp: [],
        tableData: [],
        // 表单相关
        form: {
          dpf_model: '',
          id: '',
          maxP1: '',
          maxP2: '',
          maxT1: '',
          maxT2: '',
          maxT3: '',
          minP1: '',
          minP2: '',
          minT1: '',
          minT2: '',
          minT3: '',
          supplierName: '',
          supplier_id: ''
        },
        rules: {
          dpf_model: [
            {required: true, message: '请输入活动名称', trigger: 'blur'}
          ],
          supplier_id: [
            {required: true, message: '请选择供应商', trigger: 'change'}
          ],
          maxP1: [
            {type: 'number', required: true, message: '请填写正确数值', trigger: 'blur'}
          ],
          maxP2: [
            {type: 'number', required: true, message: '请填写正确数值', trigger: 'blur'}
          ],
          maxT1: [
            {type: 'number', required: true, message: '请填写正确数值', trigger: 'blur'}
          ],
          maxT2: [
            {type: 'number', required: true, message: '请填写正确数值', trigger: 'blur'}
          ],
          maxT3: [
            {type: 'number', required: true, message: '请填写正确数值', trigger: 'blur'}
          ],
          minP1: [
            {type: 'number', required: true, message: '请填写正确数值', trigger: 'blur'}
          ],
          minP2: [
            {type: 'number', required: true, message: '请填写正确数值', trigger: 'blur'}
          ],
          minT1: [
            {type: 'number', required: true, message: '请填写正确数值', trigger: 'blur'}
          ],
          minT2: [
            {type: 'number', required: true, message: '请填写正确数值', trigger: 'blur'}
          ],
          minT3: [
            {type: 'number', required: true, message: '请填写正确数值', trigger: 'blur'}
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
      this.getAllSupp()
    },
    methods: {
      resetTempModel() {
        // 重置表单
        this.form = {
          dpf_model: '',
          id: '',
          maxP1: '',
          maxP2: '',
          maxT1: '',
          maxT2: '',
          maxT3: '',
          minP1: '',
          minP2: '',
          minT1: '',
          minT2: '',
          minT3: '',
          supplierName: '',
          supplier_id: ''
        }
      },
      getAllSupp() {
        allSupp().then(response => {
          if (response.code === '200') {
            this.listSupp = response.data
          } else {
            this.$message({
              type: 'error',
              message: response.message
            })
          }
        })
      },
      _getList() {
        // this.tableData = []
        // this.tableLoading = true
        getList(this.listQuery).then(response => {
          if (response.code === '200') {
            this.tableData = response.data.dataList
            this.total = response.data.count
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
      handleEdit(row) {
        this.resetTempModel()
        this.visibleView = true
        this.lookOrEdit = true
        this.form = row
      },
      handleDelete(row) {
        this.$confirm('此操作将永久删除该条数据, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.deleteThre(row.id)
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
      },
      deleteThre(id) {
        deleThre(id).then(response => {
          if (response.code === '204') {
            this.$message({
              type: 'success',
              message: response.message
            })
            this._getList()
          } else {
            this.$message({
              type: 'error',
              message: response.message
            })
          }
        })
      },
      handleExport() {
        // 导出处理（简单做，后期可能会改用插件）
        // 显示loading
        this.loadingExport = true

        const rows = [['DPF型号', '供应商', 'T1最小值', 'T2最小值', 'T3最小值', 'T1最大值', 'T2最大值', 'T3最大值', 'P1最小值', 'P2最小值', 'P1最大值', 'P2最大值']]
        this.tableData.forEach(item => {
          rows.push([
            item.dpf_model,
            item.supplierName,
            item.minT1,
            item.minT2,
            item.minT3,
            item.maxT1,
            item.maxT2,
            item.maxT3,
            item.minP1,
            item.minP2,
            item.maxP1,
            item.maxP2
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
      },

      handleSubmit(formName) {
        this.$refs[formName].validate((valid) => {
          // 验证规则
          if (valid) {
            if (this.form.id == null || this.form.id === '') {
              this._addSubmit()
            } else if (this.form.id !== '') {
              this._editSubmit()
            }
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
        addThre(tempForm).then(response => {
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
      _editSubmit() {
        editThre(this.form).then(response => {
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
