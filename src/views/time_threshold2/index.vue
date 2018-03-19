<template>
  <div class="app-container">

   <div class="table-container" style="margin-top: 20px;margin-left: 10%;">

  <!--   时间阀值：{{TIMETHRESHOLD}} 小时<br>

     距离阀值：{{DISTANCETHRESHOLD}} 千米-->
    </div>


    <div class="others-container" style="margin-top: 5%;margin-left: 10%;">

      <el-form ref="form" :model="form" :rules="rules"  :inline="true" >

          <el-form-item label="时间阀值（小时）:" prop="THRESHOLD">
            <el-input v-model.number="form.THRESHOLD" placeholder="时间阀值（小时）" style="width:40%;"></el-input>
          </el-form-item>

          <el-form-item>
            <el-button type="primary" @click="handleSubmit('form')" :loading="submitLoading">修改
            </el-button>
           </el-form-item>

      </el-form>

      <el-form ref="dform" :model="dform" :rules="rules"  :inline="true" >

        <el-form-item label="距离阀值（千米）:" prop="THRESHOLD">
          <el-input v-model.number="dform.THRESHOLD" placeholder="时间阀值（小时）" style="width:40%;"></el-input>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="handleSubmitd('form')" :loading="submitLoading">修改
          </el-button>
        </el-form-item>

      </el-form>

    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import {getDetail, editDate,getDistance,editDistance} from '@/api/time_threshold2'

  export default {
    data() {
      return {
        // 列表相关
        loadingExport: false,
        tableLoading: false,
        lookOrEdit: false,
        tableData: {},
        TIMETHRESHOLD:'',
        DISTANCETHRESHOLD:'',
        // 表单相关
        form: {
          THRESHOLD: '',
          ID: ''
         },
        dform: {
          THRESHOLD: '',
          ID: ''
        },
        upForm: {
          threshold: '',
          id: ''
        },
        updForm: {
          threshold: '',
          id: ''
        },
        rules: {
          THRESHOLD: [
            {required: true, message: '请输入阀值时间', trigger: 'blur'},
            { type: 'number', message: '输入必须为数字'}
          ]
         },
        submitLoading: false,
        visibleView: true,
      }
    },
    created() {
      this._getList()

    },
    methods: {
      resetTempModel() {
        // 重置表单
        this.form = {
          threshold: '',
          id: ''
        }
      },

      _getList() {
        // this.tableData = []
        // this.tableLoading = true
        getDetail().then(response => {
          if (response.code === '200') {
            this.form= response.data
            this.TIMETHRESHOLD= response.data.THRESHOLD
          } else {
            this.$message({
              type: 'error',
              message: response.message
            })
          }
        })
        this._getDistance()
        this.tableLoading = false
      },
      _getDistance() {
        // this.tableData = []
        // this.tableLoading = true
        getDistance().then(response => {
          if (response.code === '200') {
            this.dform= response.data
            this.DISTANCETHRESHOLD= response.data.THRESHOLD
          }
        })

      },
      handleEdit(row) {
        this.resetTempModel()
        this.visibleView = true
        this.lookOrEdit = true
        this.form = row
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
      handleSubmitd(formName) {
        this.$refs[formName].validate((valid) => {
          // 验证规则
          if (valid) {
            this._editSubmitd()
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
      qxSubmit1() {
        this.$refs.dform.resetFields()
        this.visibleView = false
      },
      _editSubmit() {
        this.upForm.threshold=this.form.THRESHOLD
        this.upForm.id=this.form.ID
        editDate(this.upForm).then(response => {
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
      _editSubmitd() {
        this.updForm.threshold=this.dform.THRESHOLD
        this.updForm.id=this.dform.ID
        editDistance(this.updForm).then(response => {
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
