<template>
  <div class="">
    <el-form ref="form" :model="tempModel" label-width="80px" style="    padding: 40px 45px 20px 50px;">
      <el-form-item label="标题">
        <el-input v-model="tempModel.title"></el-input>
      </el-form-item>
      <el-form-item label="内容">
        <div id="editor"></div>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="handleSubmit" :loading="loadingSubmit">保存</el-button>
        <el-button @click="dialogFormVisible = false">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script type="text/ecmascript-6">
  import E from 'wangeditor'

  export default {
    data() {
      return {
        // 表单相关
        id: this.$route.params.id,
        tempModel: {
          id: '',
          name: '',
          title: ''
        },
        loadingSubmit: false,
        dialogFormVisible: false,
        editor: undefined
      }
    },
    mounted() {
      this.editor = new E('#editor')
      this.editor.customConfig.uploadImgShowBase64 = true
      // this.editor.customConfig.uploadImgServer = '/upload'
      this.editor.create()
      if (this.id) {
        this._getModel()
      }
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
        this.$router.push({
          name: '公告添加编辑'
        })
      },
      handleEdit(row) {
        // 使用对象拷贝赋值
        this.tempModel = Object.assign({}, row)
        // 编辑处理
        this.dialogFormVisible = true
      },
      handleSubmit() {
        this.tempModel.content = this.editor.txt.html()
        console.log(this.tempModel.content)
        // // TODO: 提交前检查，必填项等。临时使用这种方式，以后或改为form自带的验证
        // if (!this.tempModel.name) {
        //   this.$message({
        //     type: 'error',
        //     message: '平台名称必填'
        //   })
        //   return
        // }
        // // 提交处理
        // this.loadingSubmit = true
        // // 提交数据
        // if (!this.tempModel.id) {
        //   // 没有id，是新建
        //   this._postModelPlatform()
        // } else {
        //   // 有id，是编辑
        //   this._putModelPlatform()
        // }
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
      _getModel() {
        this.tempModel = {
          id: 1,
          title: 'hehe',
          content: '<p>dageda</p>'
        }
        this.editor.txt.html(decodeURIComponent(this.tempModel.content))
      }
    }
  }
</script>

<style scoped>

</style>
