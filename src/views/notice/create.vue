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
        <el-button @click="goBack">返回</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script type="text/ecmascript-6">
  import E from 'wangeditor'
  import {postModelNotice, putModelNotice, getModelNotice} from '@/api/notice'
  import {getToken} from '@/utils/auth'
  import {uploadImg} from '@/api/unit'

  export default {
    data() {
      return {
        // 表单相关
        id: this.$route.params.id,
        tempModel: {
          id: '',
          content: '',
          title: ''
        },
        loadingSubmit: false,
        dialogFormVisible: false,
        editor: undefined
      }
    },
    mounted() {
      this.editor = new E('#editor')
      // this.editor.customConfig.uploadImgShowBase64 = true
      this.editor.customConfig.uploadFileName = 'img'
      this.editor.customConfig.uploadImgServer = process.env.BASE_API + 'v1/unit/img?token=' + getToken()
      this.editor.customConfig.uploadImgHooks = {
        // 如果服务器端返回的不是 {errno:0, data: [...]} 这种格式，可使用该配置
        // （但是，服务器端返回的必须是一个 JSON 格式字符串！！！否则会报错）
        customInsert: function (insertImg, result, editor) {
          // 图片上传并返回结果，自定义插入图片的事件（而不是编辑器自动插入图片！！！）
          // insertImg 是插入图片的函数，editor 是编辑器对象，result 是服务器端返回的结果

          // 举例：假如上传图片成功后，服务器端返回的是 {url:'....'} 这种格式，即可这样插入图片：
          // var url = result.url
          if (result.code === '201') {
            var url = process.env.IMG_SERVER_PATH + result.data
            insertImg(url)
          } else {
            this.$message({
              type: 'error',
              message: result.message
            })
          }
          // result 必须是一个 JSON 格式字符串！！！否则报错
        }
      }
      this.editor.create()
      if (this.id) {
        this._getModel()
      }
    },
    methods: {
      goBack() {
        // 返回列表
        this.$router.back()
      },
      resetTempModel() {
        // 重置表单
        this.tempModel = {
          id: '',
          content: '',
          title: ''
        }
      },
      handleSubmit() {
        this.tempModel.content = encodeURIComponent(this.editor.txt.html())
        if (!this.tempModel.title) {
          this.$message({
            type: 'error',
            message: '标题必填'
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
      _uploadImage(img) {
        uploadImg({img: img}).then(response => {
          if (response.code === '201') {
            // 弹出提醒信息
            this.$message({
              type: 'success',
              message: '操作成功!'
            })
            // 返回
            return response.data
          } else {
            this.$message({
              type: 'error',
              message: response.message
            })
            return ''
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
            this.goBack()
          } else {
            this.$message({
              type: 'error',
              message: response.message
            })
          }
          // 取消加载中
          this.loadingSubmit = false
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
            this.goBack()
          } else {
            this.$message({
              type: 'error',
              message: response.message
            })
          }
          // 取消加载中
          this.loadingSubmit = false
        })
      },
      _getModel() {
        // 提交处理
        this.loadingSubmit = true
        getModelNotice({id: this.id}).then(response => {
          if (response.code === '200') {
            this.tempModel = response.data
            this.editor.txt.html(decodeURIComponent(this.tempModel.content))
          } else {
            this.$message({
              type: 'error',
              message: response.message
            })
          }
          // 取消加载中
          this.loadingSubmit = false
        })
      }
    }
  }
</script>

<style scoped>

</style>
