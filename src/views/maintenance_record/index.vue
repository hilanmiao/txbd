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
      <!--<el-button type="primary" icon="el-icon-edit" @click="handleAdd()">添加</el-button>-->
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
          prop="carMark"
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
          prop="carTypeNo"
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
          label="dpf厂家">
        </el-table-column>
        <!--<el-table-column-->
          <!--prop="maintainContent"-->
          <!--label="维护内容">-->
        <!--</el-table-column>-->
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
        <el-form ref="form" status-icon :rules="rules" :model="form" label-width="110px" size="mini">
          <el-row>
            <el-col :span="8">
              <el-form-item label="车牌号" prop="carMark">
                <el-input v-model="form.carMark" :disabled="lookOrEdit"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="车辆型号" prop="carTypeNo">
                <el-input v-model="form.carTypeNo" :disabled="lookOrEdit"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="车主姓名" prop="carOwnerName">
                <el-input v-model="form.carOwnerName" :disabled="lookOrEdit"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="联系电话" prop="carOwnerPhone">
                <el-input v-model="form.carOwnerPhone" :disabled="lookOrEdit"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="dpf型号" prop="dpfModel">
                <el-input v-model="form.dpfModel" :disabled="lookOrEdit"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="dpf编码" prop="dpfId">
                <el-input v-model="form.dpfId" :disabled="lookOrEdit"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="dpf厂家" prop="dpfFactory">
                <el-input v-model="form.dpfFactory" :disabled="lookOrEdit"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="dpf安装时间" prop="installTime">
                <el-date-picker
                  style="width: 100%"
                  :disabled="lookOrEdit"
                  v-model="form.installTime"
                  align="right"
                  type="date"
                  placeholder="选择日期"
                  value-format="yyyy-MM-dd"
                  :picker-options="pickerOptions">
                </el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="维修厂" prop="maintainShopName">
                <el-input v-model="form.maintainShopName" :disabled="lookOrEdit"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="维修厂电话" prop="maintainShopPhone">
                <el-input v-model="form.maintainShopPhone" :disabled="lookOrEdit"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="维修人员电话" prop="maintainUserPhone">
                <el-input v-model="form.maintainUserPhone" :disabled="lookOrEdit"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="维修人员" prop="maintainUser">
                <el-input v-model="form.maintainUser" :disabled="lookOrEdit"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="维护内容" prop="maintainContent">
                <el-input type="textarea" v-model="form.maintainContent" :disabled="lookOrEdit"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="备注信息" prop="remark">
                <el-input type="textarea" v-model="form.remark" :disabled="lookOrEdit"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item>
                <el-button type="primary" @click="handleSubmit" :loading="submitLoading" v-if="!lookOrEdit">保存
                </el-button>
                <el-button @click="closeDialog">关闭</el-button>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </el-dialog>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import {getMainList, addMain, editMain, lookMain, deleMain, exportEnquipment} from '@/api/maintenance_record'
  import {getCitys} from '@/api/city'
  import {getToken} from '@/utils/auth'

  export default {
    data() {
      // 自定义校验规则
      var validatePhone = (rule, value, callback) => {
        if (/^[\d\-]+$/.test(value)) {
          callback()
        } else {
          callback(new Error('只能输入0536-xxx或纯数字'))
        }
      }
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
          carMark: '',
          carOwnerName: '',
          carOwnerPhone: '',
          carTypeNo: '',
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
        // 表单验证相关
        rules: {
          carMark: [
            {required: true, message: '请输入车牌号', trigger: 'blur'},
            {max: 15, message: '长度在15个字符内', trigger: 'blur'}
          ],
          carTypeNo: [
            {required: true, message: '请输入车辆型号', trigger: 'blur'},
            {max: 6, message: '长度在20个字符内', trigger: 'blur'}
          ],
          carOwnerName: [
            {required: true, message: '请输入车主姓名', trigger: 'blur'},
            {max: 5, message: '长度在5个字符内', trigger: 'blur'}
          ],
          carOwnerPhone: [
            {required: true, message: '请输入车主联系电话', trigger: 'change'},
            {max: 15, message: '长度在15个字符内', trigger: 'blur'},
            {validator: validatePhone, trigger: 'blur'}
          ],
          dpfModel: [
            {required: true, message: '请输入dpf型号', trigger: 'change'},
            {max: 6, message: '长度在20个字符内', trigger: 'blur'}
          ],
          dpfId: [
            {required: true, message: '请输入dpf编码', trigger: 'change'},
            {max: 10, message: '长度在30个字符内', trigger: 'blur'}
          ],
          dpfFactory: [
            {required: true, message: '请输入dpf厂家', trigger: 'change'},
            {max: 10, message: '长度在35个字符内', trigger: 'blur'}
          ],
          createUserType: [
            {required: true, message: '请选择信息上传人类型', trigger: 'change'}
          ],
          installTime: [
            {required: true, message: '请选择dpf安装时间', trigger: 'change'}
          ],
          maintainShopName: [
            {required: true, message: '请输入维修厂', trigger: 'change'},
            {max: 10, message: '长度在35个字符内', trigger: 'blur'}
          ],
          maintainShopPhone: [
            {required: true, message: '请输入维修厂电话', trigger: 'change'},
            {max: 15, message: '长度在15个字符内', trigger: 'blur'},
            {validator: validatePhone, trigger: 'blur'}
          ],
          maintainUser: [
            {required: true, message: '请输入维修人员', trigger: 'change'},
            {max: 5, message: '长度在5个字符内', trigger: 'blur'}
          ],
          maintainUserPhone: [
            {required: true, message: '请输入维修人员电话', trigger: 'change'},
            {max: 15, message: '长度在15个字符内', trigger: 'blur'},
            {validator: validatePhone, trigger: 'blur'}
          ],
          maintainContent: [
            {required: true, message: '请输入维修内容', trigger: 'change'},
            {max: 65, message: '长度在200个字符内', trigger: 'blur'}
          ],
          remark: [
            {required: true, message: '请输入备注', trigger: 'change'},
            {max: 65, message: '长度在200个字符内', trigger: 'blur'}
          ]
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
      closeDialog() {
        this.visibleView = false
        // 重置验证
        this.$refs.form.resetFields()
      },
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
            url: process.env.IMG_SERVER_PATH + response.data
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
        // 显示loading
        this.loadingExport = true
        // 获取excel
        exportEnquipment().then(response => {
          if (response.code === '200') {
            const link = document.createElement('a')
            link.setAttribute('href', process.env.EXCEL_SERVER_PATH + response.data)
            link.setAttribute('download', 'download.xls')
            document.body.appendChild(link) // Required for FF
            link.click() // This will download the data file named "my_data.csv".
          } else {
            this.$message({
              type: 'error',
              message: response.message
            })
          }
          // 隐藏loading
          this.loadingExport = false
        })
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
        // 表单验证
        this.$refs.form.validate(valid => {
          if (valid) {
            this.submitLoading = true
            // 提交数据
            if (this.form.id === '') {
              this._addSubmit()
            }
            if (this.form.id !== '') {
              this._editSubmit()
            }
          }
        })
      },
      _addSubmit() {
        const tempForm = Object.assign({}, this.form)
        tempForm.createUserType = '1'
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
        tempForm.createUserType = '2'
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
