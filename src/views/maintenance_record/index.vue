<template>
  <div class="app-container">

    <div class="filter-container" style="padding-bottom: 10px;">
      <el-date-picker
        v-model="dateArea"
        type="daterange"
        align="right"
        unlink-panels
        value-format="yyyy-MM-dd"
        range-separator="-"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        @change="selectDate"
        style="width:300px;"
        clearable
      >
      </el-date-picker>
      <el-input @keyup.enter.native="handleFilter" v-model="listQuery.carNumber" style="width:200px;"
                class="filter-item"
                placeholder="车牌号">
      </el-input>
      <el-input @keyup.enter.native="handleFilter" v-model="listQuery.carOwnerName" style="width:200px;"
                class="filter-item"
                placeholder="车主姓名">
      </el-input>
      <el-button type="primary" icon="el-icon-search" @click="handleSearch">搜索</el-button>
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
          prop="carNumber"
          label="车牌号"
          width="150">
        </el-table-column>
        <el-table-column
          prop="carOwnerName"
          label="车主姓名"
          width="150">
        </el-table-column>
        <el-table-column
          prop="carOwnerPhone"
          label="联系电话"
          width="150">
        </el-table-column>
        <el-table-column
          prop="carType"
          label="车辆型号"
          width="250">
        </el-table-column>
        <el-table-column
          prop="dpfModel"
          label="dfp型号"
          width="120">
        </el-table-column>
        <el-table-column
          prop="dpfFactory"
          label="dpf厂家"
          width="120">
        </el-table-column>
        <el-table-column
          prop="maintainContent"
          label="维护内容">
        </el-table-column>
        <el-table-column
          fixed="right"
          label="操作"
          width="230">
          <template slot-scope="scope">
            <el-button type="success" size="mini" icon="el-icon-search" @click="handleView(scope.row)"></el-button>
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
      <el-dialog :visible.sync="imageView" title="查看图片">
        <img :src="imgDetail" @click="closeImage" width="100%">
      </el-dialog>
    </div>

    <div class="others-container">
      <el-dialog :visible.sync="visibleView" :title="titMsg">
        <el-form ref="form" :model="form" label-width="120px">

          <el-form-item label="车牌号">
            <el-col :span="10">
              <el-input v-model="form.carNumber" style="width:80%;" :disabled="lookOrEdit"></el-input>
            </el-col>
            <el-col :span="4">车辆型号</el-col>
            <el-col :span="8">
              <el-input v-model="form.carType" :disabled="lookOrEdit"></el-input>
            </el-col>
          </el-form-item>
          <el-form-item label="车主姓名">
            <el-col :span="10">
              <el-input v-model="form.carOwnerName" style="width:80%;" :disabled="lookOrEdit"></el-input>
            </el-col>
            <el-col :span="4">联系电话</el-col>
            <el-col :span="8">
              <el-input v-model="form.carOwnerPhone" :disabled="lookOrEdit"></el-input>
            </el-col>
          </el-form-item>
          <el-form-item label="dpf型号">
            <el-col :span="10">
              <el-input v-model="form.dpfModel" style="width:80%;" :disabled="lookOrEdit"></el-input>
            </el-col>
            <el-col :span="4">dpf编码</el-col>
            <el-col :span="8">
              <el-input v-model="form.dpfId" :disabled="lookOrEdit"></el-input>
            </el-col>
          </el-form-item>
          <el-form-item label="dpf厂家">
            <el-col :span="10">
              <el-input v-model="form.dpfFactory" style="width:80%;" :disabled="lookOrEdit"></el-input>
            </el-col>
          </el-form-item>
          <el-form-item label="信息上传人类型">
            <el-col :span="10">
              <el-select v-model="form.createUserType" style="width:70%;" :disabled="lookOrEdit">
                <el-option label="下级平台" value="0"></el-option>
                <el-option label="省级平台" value="1"></el-option>
              </el-select>
            </el-col>
            <el-col :span="4">dpf安装时间</el-col>
            <el-col :span="8">
              <el-date-picker
                :disabled="lookOrEdit"
                v-model="form.installTime"
                align="right"
                type="date"
                placeholder="选择日期"
                value-format="yyyy-MM-dd"
                :picker-options="pickerOptions">
              </el-date-picker>
            </el-col>
          </el-form-item>
          <el-form-item label="维修厂">
            <el-col :span="10">
              <el-input style="width:80%;" v-model="form.maintainShopName" :disabled="lookOrEdit"></el-input>
            </el-col>
            <el-col :span="4">维修厂电话</el-col>
            <el-col :span="8">
              <el-input v-model="form.maintainShopPhone" :disabled="lookOrEdit"></el-input>
            </el-col>
          </el-form-item>
          <el-form-item label="维修人员">
            <el-col :span="10">
              <el-input style="width:80%;" v-model="form.maintainUser" :disabled="lookOrEdit"></el-input>
            </el-col>
            <el-col :span="4">维修人员电话</el-col>
            <el-col :span="8">
              <el-input v-model="form.maintainPhone" :disabled="lookOrEdit"></el-input>
            </el-col>
          </el-form-item>
          <el-form-item label="维护内容">
            <el-input type="textarea" v-model="form.maintainContent" :disabled="lookOrEdit"></el-input>
          </el-form-item>
          <el-form-item label="备注信息">
            <el-input type="textarea" v-model="form.remark" :disabled="lookOrEdit"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="handleSubmit" :loading="submitLoading" v-if="!lookOrEdit">保存
            </el-button>
            <el-button @click="visibleView = false">关闭</el-button>
          </el-form-item>
        </el-form>
      </el-dialog>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import {getMainList, addMain, editMain, lookMain, deleMain} from '@/api/maintenance_record'
  import {getCitys} from '@/api/city'
  import {getToken} from '@/utils/auth'
  import {IMG_SERVER_PATH} from '@/api/config'

  export default {
    data() {
      return {
        // 列表相关
        tableData: [],
        total: 0,
        dateArea: '',
        loadingExport: false,
        tableLoading: false,
        noEdit: false,
        imageView: false,
        imgDetail: '',
        upImg: process.env.BASE_API + '/v1/unit/img?token=' + getToken(),
        // 表单相关
        form: {
          accessKey: '',
          accessSecret: '',
          carNumber: '',
          carOwnerName: '',
          carOwnerPhone: '',
          carType: '',
          createUserType: '',
          dpfFactory: '',
          dpfId: '',
          dpfModel: '',
          id: '',
          installTime: '',
          maintainContent: '',
          maintainShopName: '',
          maintainShopPhone: '',
          maintainUser: '',
          maintainUserPhone: '',
          remark: ''
        },
        listCity: [],
        submitLoading: false,
        visible: false,
        visibleView: false,
        lookOrEdit: true,
        titMsg: '编辑&添加',
        listQuery: {
          startTime: '',
          endTime: '',
          carNumber: '',
          carOwnerName: '',
          limit: 10,
          offset: 0,
          page: 1
        },
        pickerOptions: {
          disabledDate(time) {
            return time.getTime() > Date.now()
          },
          shortcuts: [{
            text: '今天',
            onClick(picker) {
              picker.$emit('pick', new Date())
            }
          }, {
            text: '昨天',
            onClick(picker) {
              const date = new Date()
              date.setTime(date.getTime() - 3600 * 1000 * 24)
              picker.$emit('pick', date)
            }
          }, {
            text: '一周前',
            onClick(picker) {
              const date = new Date()
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7)
              picker.$emit('pick', date)
            }
          }]
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
      this._getCityList()
    },
    methods: {
      resetTempModel() {
        // 重置表单
        this.form = {
          accessKey: '',
          accessSecret: '',
          carNumber: '',
          carOwnerName: '',
          carOwnerPhone: '',
          carType: '',
          createUserType: '',
          dpfFactory: '',
          dpfId: '',
          dpfModel: '',
          id: '',
          installTime: '',
          maintainContent: '',
          maintainShopName: '',
          maintainShopPhone: '',
          maintainUser: '',
          maintainUserPhone: '',
          remark: ''
        }
      },
      _getList() {
        // 清空表格数据
        this.tableData = []
        // 设置表格loading效果
        this.tableLoading = true
        getMainList(this.listQuery).then(response => {
          if (response.code === '200') {
            // 设置表格数据
            this.tableData = response.data.dataList
            // 设置分页插件数据总数
            this.total = response.data.count
          } else {
            this.$message({
              type: 'error',
              message: response.message
            })
          }
        })
        // 取消表格loading效果
        this.tableLoading = false
      },
      handleUploadSuccess(response, file, fileList) {
        if (response.code === '201') {
          this.form.imgUrl = []
          this.form.imgUrl.push({
            name: file.name,
            url: IMG_SERVER_PATH + response.data
          })
        } else {
          this.$message.error(response.message)
        }
      },
      handleUploadRemove(file, fileList) {
        this.form.imgUrl = []
      },
      handleUploadPreview(file) {
        this.imgDetail = file.url
        this.imageView = true
      },
      closeImage() {
        this.imageView = false
      },
      handleView(row) {
        this.titMsg = '查看'
        this.lookOrEdit = true
        this.noEdit = true
        const param = {
          id: row.id
        }
        lookMain(param, row.id).then(responce => {
          this.form = Object.assign({}, responce.data)
        })
        this.visibleView = true
      },
      handleEdit(row) {
        this.noEdit = true
        this.lookOrEdit = false
        this.titMsg = '编辑'
        const param = {
          id: row.id
        }
        lookMain(param, row.id).then(responce => {
          this.form = Object.assign({}, responce.data)
        })
        this.visibleView = true
      },
      handleAdd() {
        this.titMsg = '添加'
        this.resetTempModel()
        this.noEdit = false
        this.lookOrEdit = false
        this.visibleView = true
      },
      handleDelete(row) {
        this.form = row
        this.$confirm('此操作将永久删除该条数据, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this._deleteModelEnquipment(row.id)
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
      },
      _deleteModelEnquipment(id) {
        deleMain(id).then(response => {
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
      handleExport() {
        // 导出处理（简单做，后期可能会改用插件）
        // 显示loading
        this.loadingExport = true

        const rows = [['城市', '供应商', '联系人', '联系人手机']]
        this.tableData.forEach(item => {
          rows.push([
            item.city_name,
            item.name,
            item.link_name,
            item.link_phone
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
      selectDate() {
        if (this.dateArea != null) {
          this.listQuery.startTime = this.dateArea[0]
          this.listQuery.endTime = this.dateArea[1]
        } else {
          this.listQuery.startTime = ''
          this.listQuery.endTime = ''
        }
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
      handleSubmit() {
        this.submitLoading = true
        // 提交数据
        if (this.form.id === '') {
          this._addSubmit()
        }
        if (this.form.id !== '') {
          this._editSubmit()
        }
      },
      _addSubmit() {
        const tempForm = Object.assign({}, this.form)
        addMain(tempForm).then(response => {
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
        const tempForm = Object.assign({}, this.form)
        editMain(tempForm).then(response => {
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
      _getCityList() {
        getCitys().then(response => {
          this.listCity = response.data
        })
        this.listCity = getCitys()
      },
      _postForm() {
        setTimeout(() => {
          console.log('提交中')
        }, 2000)
      }
    }
  }
</script>

<style scoped>

</style>
