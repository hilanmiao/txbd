<template>
  <div class="app-container">

    <div class="filter-container" style="padding-bottom: 10px;">
      <el-date-picker
        type="daterange"
        align="right"
        unlink-panels
        value-format="yyyy-MM-dd"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        :picker-options="pickerOptions"
        @change="pickerChange"
      >
      </el-date-picker>
      <el-select>
        <el-option label="交通厅"></el-option>
      </el-select>
      <el-button type="primary" icon="el-icon-search" @click="handleFilter">搜索</el-button>
      <el-button type="primary" icon="el-icon-download" @click="handleExport" :loading="loadingExport">导出</el-button>
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
          prop="t1"
          label="推送机构"
          width="120"
        >
        </el-table-column>
        <el-table-column
          prop="t2"
          label="推送时间">
        </el-table-column>
        <el-table-column
          prop="t3"
          label="车牌号">
        </el-table-column>
        <el-table-column
          prop="t4"
          label="车主姓名">
        </el-table-column>
        <el-table-column
          prop="t5"
          label="联系电话">
        </el-table-column>
        <el-table-column
          prop="t6"
          label="经纬度">
        </el-table-column>
        <el-table-column
          prop="t7"
          label="车辆颜色">
        </el-table-column>
        <el-table-column
          prop="t8"
          label="汽车类型">
        </el-table-column>
        <el-table-column
          prop="t9"
          label="载重">
        </el-table-column>
        <el-table-column
          prop="t10"
          label="是否安装dpf">
        </el-table-column>
        <el-table-column
          prop="t11"
          label="维修次数">
        </el-table-column>
        <el-table-column
          prop="t12"
          label="报警内容">
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
  </div>
</template>

<script type="text/ecmascript-6">
  import {getListPlatform, postModelPlatform, putModelPlatform, deleteModelPlatform} from '@/api/lower_platform'

  export default {
    data() {
      return {
        // 列表相关
        list: [],
        total: 100,
        loadingList: false,
        listQuery: {
          page: 1,
          limit: 10,
          offset: 0,
          name: '',
          link_name: '',
          sort: '+id'
        },
        // 表单相关
        tempModel: {
          id: '',
          name: '',
          link_name: '',
          link_phone: '',
          type: '0'
        },
        loadingSubmit: false,
        dialogFormVisible: false,

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
          0: '市级平台',
          1: '供应商平台'
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
          this._postModelPlatform()
        } else {
          // 有id，是编辑
          this._putModelPlatform()
        }
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

        const rows = [['id', '平台名称', '联系人', '电话', '状态', '创建时间', 'accessKey', 'accessSecret']]
        this.tableData.forEach(item => {
          rows.push([
            item.id,
            item.name,
            item.link_name,
            item.link_phone,
            item.type,
            item.createTime,
            item.accessKey,
            item.accessSecret
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
      _deleteModelPlatform() {
        deleteModelPlatform(this.tempModel.id).then(response => {
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
      _getList() {
        // 清空表格数据
        this.list = [
          {
            t1: '交通厅',
            t2: '2018-03-22 10:22:25',
            t3: '鲁G5258P',
            t4: '李龙',
            t5: '18353674768',
            t6: '141.5,36.3',
            t7: '蓝色',
            t8: '货车',
            t9: '10吨',
            t10: '已安装',
            t11: '6次',
            t12: 'dpf温度异常'
          },{
            t1: '交通厅',
            t2: '2018-03-22 10:22:25',
            t3: '鲁G5258P',
            t4: '李龙',
            t5: '18353674768',
            t6: '141.5,36.3',
            t7: '蓝色',
            t8: '货车',
            t9: '10吨',
            t10: '已安装',
            t11: '6次',
            t12: 'dpf温度异常'
          },{
            t1: '交通厅',
            t2: '2018-03-22 10:22:25',
            t3: '鲁G5258P',
            t4: '李龙',
            t5: '18353674768',
            t6: '141.5,36.3',
            t7: '蓝色',
            t8: '货车',
            t9: '10吨',
            t10: '已安装',
            t11: '6次',
            t12: 'dpf温度异常'
          },{
            t1: '交通厅',
            t2: '2018-03-22 10:22:25',
            t3: '鲁G5258P',
            t4: '李龙',
            t5: '18353674768',
            t6: '141.5,36.3',
            t7: '蓝色',
            t8: '货车',
            t9: '10吨',
            t10: '已安装',
            t11: '6次',
            t12: 'dpf温度异常'
          },{
            t1: '交通厅',
            t2: '2018-03-22 10:22:25',
            t3: '鲁G5258P',
            t4: '李龙',
            t5: '18353674768',
            t6: '141.5,36.3',
            t7: '蓝色',
            t8: '货车',
            t9: '10吨',
            t10: '已安装',
            t11: '6次',
            t12: 'dpf温度异常'
          },{
            t1: '交通厅',
            t2: '2018-03-22 10:22:25',
            t3: '鲁G5258P',
            t4: '李龙',
            t5: '18353674768',
            t6: '141.5,36.3',
            t7: '蓝色',
            t8: '货车',
            t9: '10吨',
            t10: '已安装',
            t11: '6次',
            t12: 'dpf温度异常'
          },{
            t1: '交通厅',
            t2: '2018-03-22 10:22:25',
            t3: '鲁G5258P',
            t4: '李龙',
            t5: '18353674768',
            t6: '141.5,36.3',
            t7: '蓝色',
            t8: '货车',
            t9: '10吨',
            t10: '已安装',
            t11: '6次',
            t12: 'dpf温度异常'
          },{
            t1: '交通厅',
            t2: '2018-03-22 10:22:25',
            t3: '鲁G5258P',
            t4: '李龙',
            t5: '18353674768',
            t6: '141.5,36.3',
            t7: '蓝色',
            t8: '货车',
            t9: '10吨',
            t10: '已安装',
            t11: '6次',
            t12: 'dpf温度异常'
          },{
            t1: '交通厅',
            t2: '2018-03-22 10:22:25',
            t3: '鲁G5258P',
            t4: '李龙',
            t5: '18353674768',
            t6: '141.5,36.3',
            t7: '蓝色',
            t8: '货车',
            t9: '10吨',
            t10: '已安装',
            t11: '6次',
            t12: 'dpf温度异常'
          },{
            t1: '交通厅',
            t2: '2018-03-22 10:22:25',
            t3: '鲁G5258P',
            t4: '李龙',
            t5: '18353674768',
            t6: '141.5,36.3',
            t7: '蓝色',
            t8: '货车',
            t9: '10吨',
            t10: '已安装',
            t11: '6次',
            t12: 'dpf温度异常'
          },
        ]
        // 设置表格loading效果
        // this.loadingList = true
        // 请求表格数据
        // getListPlatform(this.listQuery).then(response => {
        //   if (response.code === '200') {
        //     // 设置表格数据
        //     this.list = response.data.dataList
        //     // 设置分页插件数据总数
        //     this.total = response.data.count
        //   } else {
        //     this.$message({
        //       type: 'error',
        //       message: response.message
        //     })
        //   }
        //   // 取消表格loading效果
        //   this.loadingList = false
        // })
      }
    }
  }
</script>

<style scoped>

</style>
