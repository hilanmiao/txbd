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
      <el-select @keyup.enter.native="handleFilter" v-model="listQuery.city_id" style="width:120px;" clearable
                 placeholder="选择城市">
        <el-option v-for="item in listCity" :key="item.id" :label="item.name"
                   :value="item.id"></el-option>
      </el-select>
      <el-input @keyup.enter.native="handleFilter" v-model="listQuery.name" style="width:200px;"
                class="filter-item"
                placeholder="修理厂名称">
      </el-input>
      <el-input @keyup.enter.native="handleFilter" v-model="listQuery.own_name" style="width: 200px;"
                class="filter-item"
                placeholder="公司法人名称">
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
          prop="cityName"
          label="城市"
          width="150">
        </el-table-column>
        <el-table-column
          prop="business"
          label="经营范围"
          width="150">
        </el-table-column>
        <el-table-column
          prop="name"
          label="名称"
          width="250">
        </el-table-column>
        <el-table-column
          prop="ownName"
          label="法人姓名"
          width="120">
        </el-table-column>
        <el-table-column
          prop="ownPhone"
          label="法人电话"
          width="120">
        </el-table-column>
        <el-table-column
          prop="registeredAddress"
          label="地址">
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
        <el-form ref="form" status-icon :rules="rules" :model="form" label-width="110px" size="mini">
          <el-row>
            <el-col :span="8">
              <el-form-item label="修理厂名称" prop="name">
                <el-input v-model="form.name" :disabled="lookOrEdit"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="企业代码" prop="shopId">
                <el-input v-model="form.shopId" :disabled="noEdit"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="企业面积" prop="area">
                <el-input v-model="form.area" :disabled="lookOrEdit"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="企业人数" prop="employees">
                <el-input v-model="form.employees" :disabled="lookOrEdit"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="业务范围" prop="business">
                <el-input v-model="form.business" :disabled="lookOrEdit"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="企业类别" prop="type">
                <el-input v-model="form.type" :disabled="lookOrEdit"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <!--<el-form-item label="省份" prop="provinceName">-->
              <!--<el-input v-model="form.provinceName" :disabled="lookOrEdit" value="37"></el-input>-->
              <!--</el-form-item>-->
              <el-form-item label="城市" prop="city_id">
                <el-select v-model="form.city_id" style="width:100%;" :disabled="lookOrEdit" placeholder="请选择城市">
                  <el-option v-for="item in listCity" :key="item.id" :label="item.name"
                             :value="item.id"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="经度" prop="longitude">
                <el-input v-model="form.longitude" :disabled="lookOrEdit"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="纬度" prop="latitude">
                <el-input v-model="form.latitude" :disabled="lookOrEdit"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="财务姓名" prop="financeName">
                <el-input v-model="form.financeName" :disabled="lookOrEdit"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="财务电话" prop="financePhone">
                <el-input v-model="form.financePhone" :disabled="lookOrEdit"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="企业法人姓名" prop="ownName">
                <el-input v-model="form.ownName" :disabled="lookOrEdit"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="企业法人电话" prop="ownPhone">
                <el-input v-model="form.ownPhone" :disabled="lookOrEdit"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="注册资本" prop="registeredCapital">
                <el-input v-model="form.registeredCapital" :disabled="lookOrEdit"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="总资产规模" prop="assets">
                <el-input v-model="form.assets" :disabled="lookOrEdit"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="开票信息" prop="invoiceMsg">
                <el-input v-model="form.invoiceMsg" :disabled="lookOrEdit"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="注册地址" prop="registeredAddress">
                <el-input v-model="form.registeredAddress" :disabled="lookOrEdit"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="企业所在地区" prop="location">
                <el-input v-model="form.location" :disabled="lookOrEdit"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="维修车型" prop="repireCarType">
                <el-input v-model="form.repireCarType" :disabled="lookOrEdit"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="备注信息" prop="remark">
                <el-input type="textarea" v-model="form.remark" :disabled="lookOrEdit"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="营业执照" :required="true" :error="imgRequired">
                <el-upload
                  class="upload-demo"
                  :action="uploadUrl"
                  :limit="1"
                  :on-preview="handleUploadPreview"
                  :on-remove="handleUploadRemove"
                  accept="image/*"
                  :disabled="lookOrEdit"
                  :file-list="form.imgUrl"
                  :on-success="handleUploadSuccess"
                  :before-upload="handleBeforeUpload"
                  :on-exceed="handleUploadExceed"
                  name="img"
                  list-type="picture">
                  <el-button size="small" type="primary">点击上传</el-button>
                  <div slot="tip" class="el-upload__tip">文件不超过10Mb</div>
                </el-upload>
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
  import {getMainList, addMain, editMain, lookMain, deleMain, exportEnquipment} from '@/api/maintenance'
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
        // 上传相关
        uploadUrl: process.env.BASE_API + 'v1/unit/img?token=' + getToken(),
        imgRequired: '',
        // 表单相关
        form: {
          accessSecret: '',
          accesskey: '',
          area: '',
          assets: '',
          business: '',
          city_id: '',
          createTime: '',
          createUserType: '',
          employees: '',
          financeName: '',
          financePhone: '',
          id: '',
          imgUrl: [],
          invoiceMsg: '',
          isDelete: '',
          latitude: '',
          location: '',
          longitude: '',
          name: '',
          ownName: '',
          ownPhone: '',
          province_id: '37',
          provinceName: '山东省',
          registeredAddress: '',
          registeredCapital: '',
          remark: '',
          repireCarType: '',
          shopId: '',
          type: ''
        },
        // 表单验证相关
        rules: {
          name: [
            {required: true, message: '请输入名称', trigger: 'blur'},
            {max: 50, message: '长度在50个字符内', trigger: 'blur'}
          ],
          // city_id: [
          //   {required: true, message: '请选择城市', trigger: 'blur'}
          // ],
          ownName: [
            {required: true, message: '请输入法人名称', trigger: 'blur'},
            {max: 5, message: '长度在5个字符内', trigger: 'blur'}
          ],
          ownPhone: [
            {required: true, message: '请输入法人电话', trigger: 'blur'},
            {max: 13, message: '长度在13个字符内', trigger: 'blur'},
            {validator: validatePhone, trigger: 'blur'}
          ],
          address: [
            {required: true, message: '请输入地址', trigger: 'blur'},
            {max: 50, message: '长度在50个字符内', trigger: 'blur'}
          ],
          longitude: [
            {required: true, message: '请输入经度', trigger: 'blur'}
          ],
          latitude: [
            {required: true, message: '请输入纬度', trigger: 'blur'}
          ],
          city_id: [
            {required: true, message: '请选择城市', trigger: 'change'}
          ],
          business: [
            {required: true, message: '请输入主营范围', trigger: 'blur'},
            {max: 100, message: '长度在100个字符内', trigger: 'blur'}
          ],
          shopId: [
            {required: true, message: '请输入企业代码', trigger: 'blur'},
            {max: 100, message: '长度在100个字符内', trigger: 'blur'}
          ],
          registeredCapital: [
            {required: true, message: '请输入注册资本', trigger: 'blur'},
            {max: 30, message: '长度在30个字符内', trigger: 'blur'}
          ],
          employees: [
            {required: true, message: '请输入员工数量', trigger: 'blur'},
            {max: 16, message: '长度在16个字符内', trigger: 'blur'}
          ],
          type: [
            {required: true, message: '请输入企业类别', trigger: 'blur'},
            {max: 50, message: '长度在50个字符内', trigger: 'blur'}
          ],
          assets: [
            {required: true, message: '请输入企业总资产规模', trigger: 'blur'},
            {max: 30, message: '长度在30个字符内', trigger: 'blur'}
          ],
          area: [
            {required: true, message: '请输入企业占地面积', trigger: 'blur'},
            {max: 30, message: '长度在30个字符内', trigger: 'blur'}
          ],
          repireCarType: [
            {required: true, message: '请输入维修汽车类型', trigger: 'blur'},
            {max: 100, message: '长度在100个字符内', trigger: 'blur'}
          ],
          invoiceMsg: [
            {required: true, message: '请输入开票信息', trigger: 'blur'},
            {max: 100, message: '长度在100个字符内', trigger: 'blur'}
          ],
          financeName: [
            {required: true, message: '请输入财务联系人姓名', trigger: 'blur'},
            {max: 5, message: '长度在5个字符内', trigger: 'blur'}
          ],
          financePhone: [
            {required: true, message: '请输入财务联系人电话', trigger: 'blur'},
            {max: 15, message: '长度在15个字符内', trigger: 'blur'},
            {validator: validatePhone, trigger: 'blur'}
          ],
          registeredAddress: [
            {required: true, message: '请输入注册地址', trigger: 'blur'},
            {max: 100, message: '长度在100个字符内', trigger: 'blur'}
          ],
          location: [
            {required: true, message: '请输入企业所在地区', trigger: 'blur'},
            {max: 15, message: '长度在15个字符内', trigger: 'blur'}
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
          city_id: '',
          endTime: '',
          name: '',
          own_name: '',
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
          accessSecret: '',
          accesskey: '',
          area: '',
          assets: '',
          business: '',
          city_id: '',
          createTime: '',
          createUserType: '',
          employees: '',
          financeName: '',
          financePhone: '',
          id: '',
          imgUrl: [],
          invoiceMsg: '',
          isDelete: '',
          latitude: '',
          location: '',
          longitude: '',
          name: '',
          ownName: '',
          ownPhone: '',
          province_id: '37',
          provinceName: '山东省',
          registeredAddress: '',
          registeredCapital: '',
          remark: '',
          repireCarType: '',
          shopId: '',
          type: ''
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
          // 清空上传验证信息
          this.imgRequired = ''
        } else {
          this.$message.error(response.message)
        }
      },
      handleUploadExceed() {
        this.$message.error('只能上传一个文件')
      },
      handleUploadRemove(file, fileList) {
        this.form.imgUrl = []
      },
      handleUploadPreview(file) {
        this.imgDetail = process.env.IMG_SERVER_PATH + file.url
        this.imageView = true
      },
      closeImage() {
        this.imageView = false
      },
      handleBeforeUpload(file) {
        // const isJPG = file.type === 'image/jpeg'
        const isLt2M = file.size / 1024 / 1024 * 10
        // if (!isJPG) {
        //   this.$message.error('上传头像图片只能是 JPG 格式!')
        //   return false
        // }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过10MB!')
          return false
        }
        // return isJPG && isLt2M
        return true
      },
      handleView(row) {
        this.titMsg = '查看'
        this.lookOrEdit = true
        this.noEdit = true
        const param = {
          id: row.id
        }
        lookMain(param, row.id).then(response => {
          if (response.code === '200') {
            const imgUrl = JSON.parse(response.data.imgUrl)
            if (imgUrl.length) {
              imgUrl[0].url = process.env.IMG_SERVER_PATH + imgUrl[0].url
              response.data.imgUrl = imgUrl
            }
            this.form = Object.assign({}, response.data)
            this.visibleView = true
          } else {
            this.$message({
              type: 'error',
              message: response.message
            })
          }
        })
      },
      handleEdit(row) {
        this.noEdit = true
        this.lookOrEdit = false
        this.titMsg = '编辑'
        const param = {
          id: row.id
        }
        lookMain(param, row.id).then(response => {
          if (response.code === '200') {
            const imgUrl = JSON.parse(response.data.imgUrl)
            if (imgUrl.length) {
              imgUrl[0].url = process.env.IMG_SERVER_PATH + imgUrl[0].url
              response.data.imgUrl = imgUrl
            }
            this.form = Object.assign({}, response.data)
            this.visibleView = true
          } else {
            this.$message({
              type: 'error',
              message: response.message
            })
          }
        })
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
            // 照片上传手动验证
            if (!this.form.img_url.length) {
              this.imgRequired = '请上传照片'
              return false
            } else {
              // 清空上传验证信息
              this.imgRequired = ''
            }
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
        // 因为要改变了值，所以要深拷贝
        const tempForm = JSON.parse(JSON.stringify(this.form))
        if (tempForm.imgUrl.length > 0) {
          // 处理图片路径
          tempForm.imgUrl[0].url = tempForm.imgUrl[0].url.replace(process.env.IMG_SERVER_PATH, '')
        }
        tempForm.imgUrl = JSON.stringify(tempForm.imgUrl)
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
        // 因为要改变了值，所以要深拷贝
        const tempForm = JSON.parse(JSON.stringify(this.form))
        if (tempForm.imgUrl.length > 0) {
          // 处理图片路径
          tempForm.imgUrl[0].url = tempForm.imgUrl[0].url.replace(process.env.IMG_SERVER_PATH, '')
        }
        tempForm.imgUrl = JSON.stringify(tempForm.imgUrl)
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
