<template>
  <div class="notice">
    <div class="instruction" v-if="model.title">
      <span>
        <i class="el-icon-bell"></i>
      </span>
      <a @click="dialogVisible = true">{{model.title}}</a>
    </div>

    <el-dialog :visible.sync="dialogVisible" title="公告详情">
      <h1>{{model.title}}</h1>
      <div v-html="decodeURIComponent(model.content)"></div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">关闭</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script type="text/ecmascript-6">
  import {getListNotice} from '@/api/notice'

  export default {
    data() {
      return {
        dialogVisible: false,
        model: {
          title: '',
          content: ''
        }
      }
    },
    created() {
      this._getList()
    },
    methods: {
      _getList() {
        getListNotice({limit: 1, offset: 0}).then(response => {
          if (response.code === '200') {
            this.model = response.data.dataList[0]
          }
        })
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .notice {
    height: 50px;
    line-height: 50px;
    display: inline-block;
    float: left;
    margin-right: 20px;
    .instruction {
      height: 100%;
      color: #ff0000;
      font-size: 14px;
    }
  }
</style>
