<template>
  <div class="app-container">
    <el-form ref="form" :model="tempModel" label-width="80px">
      <el-form-item label="参数名称">
        <el-input v-model="tempModel.name"></el-input>
      </el-form-item>
      <el-form-item label="对应电话">
        <el-input v-model="tempModel.phone"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="handleSubmit" :loading="loadingSubmit">保存</el-button>
        <el-button @click="dialogFormVisible = false">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script type="text/ecmascript-6">
  import {getModelSms, postModelSms} from '@/api/sms'

  export default {
    data() {
      return {
        // 表单相关
        tempModel: {
          id: undefined,
          name: undefined
        },
        loadingSubmit: false
      }
    },
    created() {
      // 获取列表数据
      this._getModel()
    },
    methods: {
      handleSubmit() {
        // 提交处理
        this.loadingSubmit = true
        // 提交数据
        postModelSms(this.tempModel).then(response => {
          // 取消加载中
          this.loadingSubmit = false
          // 弹出提醒信息
          this.$message({
            type: 'success',
            message: '操作成功!'
          })
        })
      },
      _getModel() {
        // 提交数据
        getModelSms().then(response => {
          this.tempModel = response.data.data
        })
      }
    }
  }
</script>

<style scoped>

</style>
