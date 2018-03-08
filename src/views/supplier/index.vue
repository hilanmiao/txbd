<template>
  <div class="app-container">

    <div class="filter-container" style="padding-bottom: 10px;">
      <!--<el-date-picker-->
      <!--v-model="dateArea"-->
      <!--type="daterange"-->
      <!--align="right"-->
      <!--unlink-panels-->
      <!--value-format="yyyy-MM-dd"-->
      <!--range-separator="-"-->
      <!--start-placeholder="开始日期"-->
      <!--end-placeholder="结束日期"-->
      <!--@change="selectDate"-->
      <!--style="width:300px;"-->
      <!--clearable-->
      <!--&gt;-->
      <!--</el-date-picker>-->
      <el-select @keyup.enter.native="handleSearch" v-model="listQuery.city_id" style="width:120px;" clearable
                 placeholder="选择城市">
        <el-option v-for="item in listCity" :key="item.id" :label="item.name"
                   :value="item.id"></el-option>
      </el-select>
      <el-input @keyup.enter.native="handleSearch" v-model="listQuery.name" style="width:200px;"
                class="filter-item"
                placeholder="供应商名称">
      </el-input>
      <el-input @keyup.enter.native="handleSearch" v-model="listQuery.link_name" style="width: 200px;"
                class="filter-item"
                placeholder="联系人名称">
      </el-input>
      <el-input @keyup.enter.native="handleSearch" v-model="listQuery.own_name" style="width: 200px;"
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
          prop="link_name"
          label="联系人"
          width="120">
        </el-table-column>
        <el-table-column
          prop="link_phone"
          label="电话"
          width="120">
        </el-table-column>
        <el-table-column
          prop="address"
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
        <el-form ref="form" :model="form" :rules="rules" label-width="100px" :inline="true">

          <el-form-item label="名称" prop="name">
            <el-input v-model="form.name" :disabled="lookOrEdit"></el-input>
          </el-form-item>

          <el-form-item label="企业代码" prop="e_code">
            <el-input v-model="form.e_code" :disabled="noEdit"></el-input>
          </el-form-item>

          <el-form-item label="经营范围" prop="business">
            <el-input v-model="form.business" :disabled="lookOrEdit"></el-input>
          </el-form-item>

          <el-form-item label="企业地址" prop="address">
            <el-input v-model="form.address" :disabled="lookOrEdit"></el-input>
          </el-form-item>

          <el-form-item label="省份" prop="provinceName">
            <el-input v-model="form.provinceName" :disabled="lookOrEdit"></el-input>
          </el-form-item>

          <el-form-item label="城市" prop="city_id">
            <el-select v-model="form.city_id" :disabled="lookOrEdit" style="width: 93%">
              <el-option v-for="item in listCity" :key="item.id" :label="item.name"
                         :value="item.id"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="财务姓名" prop="finance_name">
            <el-input v-model="form.finance_name" :disabled="lookOrEdit"></el-input>
          </el-form-item>

          <el-form-item label="财务电话" prop="finance_phone">
            <el-input v-model="form.finance_phone" :disabled="lookOrEdit"></el-input>
          </el-form-item>
          <br>
          <el-form-item label="营业执照">
            <el-upload
              class="upload-demo"
              :action="uploadUrl"
              :limit="1"
              :on-preview="handleUploadPreview"
              :on-remove="handleUploadRemove"
              accept="image/*"
              :disabled="lookOrEdit"
              :file-list="form.img_url"
              :on-success="handleUploadSuccess"
              :before-upload="handleBeforeUpload"
              :on-exceed="handleUploadExceed"
              name="img"
              list-type="picture">
              <el-button size="small" type="primary">点击上传</el-button>
              <div slot="tip" class="el-upload__tip">文件不超过1024kb</div>
            </el-upload>

          </el-form-item>
          <br>
          <el-form-item label="联系人姓名" prop="link_name">
            <el-input v-model="form.link_name" :disabled="lookOrEdit"></el-input>
          </el-form-item>

          <el-form-item label="联系人手机" prop="link_phone">
            <el-input v-model="form.link_phone" :disabled="lookOrEdit"></el-input>
          </el-form-item>

          <el-form-item label="联系人电话" prop="link_tel">
            <el-input v-model="form.link_tel" :disabled="lookOrEdit"></el-input>
          </el-form-item>

          <el-form-item label="联系人传真" prop="link_fax">
            <el-input v-model="form.link_fax" :disabled="lookOrEdit"></el-input>
          </el-form-item>

          <el-form-item label="法人姓名" prop="own_name">
            <el-input v-model="form.own_name" :disabled="lookOrEdit"></el-input>
          </el-form-item>

          <el-form-item label="生产编码" prop="production_licence_code">
            <el-input v-model="form.production_licence_code" :disabled="lookOrEdit"></el-input>
          </el-form-item>

          <el-form-item label="注册资金" prop="registered_capital">
            <el-input v-model="form.registered_capital" :disabled="lookOrEdit"></el-input>
          </el-form-item>

          <el-form-item label="供应商ID" prop="supplier_id">
            <el-input v-model="form.supplier_id" :disabled="lookOrEdit"></el-input>
          </el-form-item>

          <el-form-item label="开票信息" prop="invoice_msg">
            <el-input v-model="form.invoice_msg" :disabled="lookOrEdit"></el-input>
          </el-form-item>
          <br>
          <el-form-item label="产品描述" prop="main_product">
            <el-input type="textarea" class="allLine" v-model="form.main_product" :disabled="lookOrEdit"></el-input>
          </el-form-item>
          <br>
          <el-form-item label="备注信息" prop="remark">
            <el-input type="textarea" class="allLine" v-model="form.remark" :disabled="lookOrEdit"></el-input>
          </el-form-item>
          <br>
          <el-form-item style="margin-left: 20px;">
            <el-button type="primary" @click="handleSubmit('form')" :loading="submitLoading" v-if="!lookOrEdit">保存
            </el-button>
            <el-button @click="qxSubmit('form')">关闭</el-button>
          </el-form-item>
        </el-form>
      </el-dialog>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import {getSuppList, addSupp, editSupp, lookSupp, deleSupp, exportEnquipment} from '@/api/supplier'
  import {getCitys} from '@/api/city'
  import {getToken} from '@/utils/auth'
  import {IMG_SERVER_PATH, UPIMG_SERVER_PATH, EXCEL_SERVER_PATH} from '@/api/config'

  export default {
    data() {
      // 自定义校验规则
      var validatePhone = (rule, value, callback) => {
        if (/^[\d\-]+$/.test(value)) {
          callback()
        } else {
          callback(new Error('电话号码格式不正确，只能输入0536-1234567和11位纯数字'))
        }
      }
      return {
        // 列表相关
        tableData: [],
        imgDetail: '',
        total: 0,
        dateArea: '',
        imageView: false,
        loadingExport: false,
        tableLoading: false,
        noEdit: false,
        // 表单相关
        form: {
          id: '',
          name: '',
          e_code: '',
          business: '',
          cityName: '',
          createTime: '',
          createUser: '',
          createUserName: '',
          city_id: '',
          address: '',
          finance_name: '',
          finance_phone: '',
          province_id: '37',
          provinceName: '山东省',
          link_tel: '',
          img_url: [],
          link_fax: '',
          invoice_msg: '',
          own_name: '',
          main_product: '',
          remark: '',
          link_name: '',
          link_phone: '',
          production_licence_code: '',
          registered_capital: '',
          supplier_id: ''
        },
        rules: {
          name: [
            {required: true, message: '请输入名称', trigger: 'blur'},
            {max: 50, message: '长度在50个字符内', trigger: 'blur'}
          ],
          e_code: [
            {required: true, message: '请输入编号', trigger: 'blur'},
            {max: 50, message: '长度在50个字符内', trigger: 'blur'}
          ],
          city_id: [
            {required: true, message: '请选择城市', trigger: 'change'}
          ],
          business: [
            {required: true, message: '请填写主营范围', trigger: 'blur'},
            {max: 255, message: '长度在255个字符内', trigger: 'blur'}
          ],
          address: [
            {required: true, message: '请填写企业地址', trigger: 'blur'},
            {max: 100, message: '长度在100个字符内', trigger: 'blur'}
          ],
          finance_name: [
            {required: true, message: '请填写财务联系人', trigger: 'blur'},
            {max: 5, message: '长度在5个字符内', trigger: 'blur'}
          ],
          finance_phone: [
            {required: true, message: '请填写财务联系人电话', trigger: 'blur'},
            {max: 15, message: '长度在15个字符内', trigger: 'blur'},
            {validator: validatePhone, trigger: 'blur'}
          ],
          link_tel: [
            {required: true, message: '请填写联系人电话', trigger: 'blur'},
            {max: 15, message: '长度在15个字符内', trigger: 'blur'},
            {validator: validatePhone, trigger: 'blur'}
          ],
          link_fax: [
            {required: true, message: '请填写联系人传真', trigger: 'blur'},
            {max: 15, message: '长度在15个字符内', trigger: 'blur'}
          ],
          invoice_msg: [
            {required: true, message: '请填写开票信息', trigger: 'blur'},
            {max: 100, message: '长度在100个字符内', trigger: 'blur'}
          ],
          own_name: [
            {required: true, message: '请填写企业法人', trigger: 'blur'},
            {max: 5, message: '长度在5个字符内', trigger: 'blur'}
          ],
          link_name: [
            {required: true, message: '请填写联系人姓名', trigger: 'blur'},
            {max: 5, message: '长度在5个字符内', trigger: 'blur'}
          ],
          link_phone: [
            {required: true, message: '请填写联系人手机', trigger: 'blur'},
            {max: 15, message: '长度在15个字符内', trigger: 'blur'},
            {validator: validatePhone, trigger: 'blur'}
          ],
          main_product: [
            {required: true, message: '请填写主要产品描述', trigger: 'blur'},
            {max: 255, message: '长度在255个字符内', trigger: 'blur'}
          ],
          registered_capital: [
            {required: true, message: '请填写注册资金', trigger: 'blur'},
            {max: 10, message: '长度在10个字符内', trigger: 'blur'}
          ]
        },
        listCity: [],
        submitLoading: false,
        imgView: false,
        visibleView: false,
        lookOrEdit: true,
        titMsg: '编辑&添加',
        listQuery: {
          startTime: '',
          city_id: '',
          endTime: '',
          name: '',
          link_name: '',
          own_name: '',
          limit: 10,
          offset: 0,
          page: 1
        },
        // 上传相关
        uploadUrl: UPIMG_SERVER_PATH + 'unit/img?token=' + getToken()
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
          id: '',
          name: '',
          e_code: '',
          business: '',
          cityName: '',
          createTime: '',
          createUser: '',
          createUserName: '',
          city_id: '',
          address: '',
          finance_name: '',
          finance_phone: '',
          provinceName: '山东省',
          province_id: '37',
          link_tel: '',
          img_url: [],
          link_fax: '',
          invoice_msg: '',
          own_name: '',
          main_product: '',
          remark: '',
          link_name: '',
          link_phone: '',
          production_licence_code: '',
          registered_capital: '',
          supplier_id: ''
        }
      },
      _getList() {
        // 清空表格数据
        this.tableData = []
        // 设置表格loading效果
        this.tableLoading = true
        getSuppList(this.listQuery).then(response => {
          if (response.code === '200') {
            response.data.dataList.forEach(item => {
              item.img_url = JSON.parse(item.img_url)
            })
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
      handleUploadExceed() {
        this.$message.error('只能上传一个文件')
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
      handleUploadProgress(event, file, fileList) {
        console.log(file)
      },
      handleUploadSuccess(response, file, fileList) {
        if (response.code === '201') {
          this.form.img_url = []
          this.form.img_url.push({
            name: file.name,
            url: IMG_SERVER_PATH + response.data
          })
        } else {
          this.$message.error(response.message)
        }
      },
      handleBeforeUpload(file) {
        // const isJPG = file.type === 'image/jpeg'
        const isLt2M = file.size / 1024 / 1024
        // if (!isJPG) {
        //   this.$message.error('上传头像图片只能是 JPG 格式!')
        //   return false
        // }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 1MB!')
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
        lookSupp(param, row.id).then(responce => {
          responce.data.img_url = JSON.parse(responce.data.img_url)
          this.form = Object.assign({}, responce.data)
        })
        this.visibleView = true
      },
      handleEdit(row) {
        this.lookOrEdit = false
        this.noEdit = true
        this.titMsg = '编辑'
        const param = {
          id: row.id
        }
        lookSupp(param, row.id).then(responce => {
          responce.data.img_url = JSON.parse(responce.data.img_url)
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
        deleSupp(id).then(response => {
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
            link.setAttribute('href', EXCEL_SERVER_PATH + response.data)
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
      handleSubmit(formName) {
        this.$refs[formName].validate((valid) => {
          // 验证规则
          if (valid) {
            if (this.form.id === '') {
              this._addSubmit()
            }
            if (this.form.id !== '') {
              this._editSubmit()
            }
          } else {
            console.log('error submit!!')
            return false
          }
        })
      },
      qxSubmit(formName) {
        this.visibleView = false
        this.$refs[formName].resetFields()
      },
      _addSubmit() {
        const tempForm = Object.assign({}, this.form)
        tempForm.img_url = JSON.stringify(tempForm.img_url)
        addSupp(tempForm).then(response => {
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
        tempForm.img_url = JSON.stringify(tempForm.img_url)
        editSupp(tempForm).then(response => {
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

<style rel="stylesheet/scss" lang="scss" scoped>
  .chart-wrapper {
    background: #fff;
    padding: 16px 0px 0;
    margin-bottom: 32px;
  }

  .allLine {
    width: 700px;
  }
</style>
