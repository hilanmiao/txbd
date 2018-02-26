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
      <el-input @keyup.enter.native="handleFilter" v-model="listQuery.car_number" style="width:200px;"
                class="filter-item"
                placeholder="车牌号">
      </el-input>
      <el-button type="primary" icon="el-icon-search" @click="handleSearch">搜索</el-button>
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
          prop="car_number"
          label="车牌号"
          width="150">
        </el-table-column>
        <el-table-column
          prop="car_user_name"
          label="车主姓名"
          width="250">
        </el-table-column>
        <el-table-column
          prop="install_place_msg"
          label="安装地点">
        </el-table-column>
        <el-table-column
          prop="install_user_name"
          label="安装人姓名"
          width="120">
        </el-table-column>
        <el-table-column
          prop="createTime"
          label="安装时间"
          width="170">
        </el-table-column>
        <el-table-column
          fixed="right"
          label="操作"
          width="230">
          <template slot-scope="scope">
            <el-button type="success" size="mini" icon="el-icon-search" @click="handleView(scope.row)"></el-button>
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

          <el-form-item label="城市名">
            <el-col :span="10">
              <el-input v-model="form.cityName" style="width:80%;" :disabled="lookOrEdit"></el-input>
            </el-col>
            <el-col :span="4">供应商</el-col>
            <el-col :span="8">
              <el-input v-model="form.supplierName" :disabled="lookOrEdit"></el-input>
            </el-col>
          </el-form-item>
          <el-form-item label="dpf型号">
            <el-col :span="10">
              <el-input v-model="form.dpf_model" style="width:80%;" :disabled="lookOrEdit"></el-input>
            </el-col>
            <el-col :span="4">车辆编号</el-col>
            <el-col :span="8">
              <el-input v-model="form.car_number" :disabled="lookOrEdit"></el-input>
            </el-col>
          </el-form-item>
          <el-form-item label="颜色">
            <el-col :span="10">
              <el-input v-model="form.car_color" style="width:80%;" :disabled="lookOrEdit"></el-input>
            </el-col>
            <el-col :span="4">型号</el-col>
            <el-col :span="8">
              <el-input v-model="form.car_type_code" :disabled="lookOrEdit"></el-input>
            </el-col>
          </el-form-item>
          <el-form-item label="车主姓名">
            <el-col :span="10">
              <el-input v-model="form.car_user_name" style="width:80%;" :disabled="lookOrEdit"></el-input>
            </el-col>
            <el-col :span="4">车主身份证号</el-col>
            <el-col :span="8">
              <el-input v-model="form.car_user_identity_code" :disabled="lookOrEdit"></el-input>
            </el-col>
          </el-form-item>
          <el-form-item label="车主电话">
            <el-col :span="10">
              <el-input v-model="form.car_user_phone" style="width:80%;" :disabled="lookOrEdit"></el-input>
            </el-col>
            <el-col :span="4">发动机编号</el-col>
            <el-col :span="8">
              <el-input v-model="form.car_engine_number" :disabled="lookOrEdit"></el-input>
            </el-col>
          </el-form-item>
          <el-form-item label="安装地点信息">
            <el-col :span="10">
              <el-input v-model="form.install_place_msg" style="width:80%;" :disabled="lookOrEdit"></el-input>
            </el-col>
            <el-col :span="4">安装人信息</el-col>
            <el-col :span="8">
              <el-input v-model="form.install_user_name" :disabled="lookOrEdit"></el-input>
            </el-col>
          </el-form-item>
          <el-form-item label="安装人电话">
            <el-col :span="10">
              <el-input v-model="form.install_user_phone" style="width:80%;" :disabled="lookOrEdit"></el-input>
            </el-col>
            <el-col :span="4">创建时间</el-col>
            <el-col :span="8">
              <el-input v-model="form.createTime" :disabled="lookOrEdit"></el-input>
            </el-col>
          </el-form-item>
          <el-form-item label="唯一标识">
            <el-col :span="10">
              <el-input v-model="form.qr_code" style="width:80%;" :disabled="lookOrEdit"></el-input>
            </el-col>
            <el-col :span="4">车辆出厂日期</el-col>
            <el-col :span="8">
              <el-input v-model="form.car_manufacture_time" :disabled="lookOrEdit"></el-input>
            </el-col>
          </el-form-item>
          <el-form-item label="车辆状态">
            <el-col :span="10">
              <el-input v-model="form.car_status" style="width:80%;" :disabled="lookOrEdit"></el-input>
            </el-col>
          </el-form-item>
          <el-form-item label="车辆状态">
            <el-col :span="24">
              <a href="javascript:;" @click="openImageView(form.img_url_45)">45°照片</a>&nbsp;&nbsp;&nbsp;
              <a @click="openImageView(form.before_install_img_url)">安装前照片</a>&nbsp;&nbsp;&nbsp;
              <a @click="openImageView(form.after_install_img_url)">安装后照片</a>&nbsp;&nbsp;&nbsp;
            </el-col>
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
  import {getMainList, lookMain} from '@/api/register'
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
        form: {},
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
          car_number: '',
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
      openImageView(src) {
        this.imgDetail = src
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
          responce.data.imgUrl = JSON.parse(responce.data.imgUrl)
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
          responce.data.imgUrl = JSON.parse(responce.data.imgUrl)
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
