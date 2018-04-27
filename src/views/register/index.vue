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
          label="信息上传时间"
          width="170">
        </el-table-column>
        <el-table-column
          fixed="right"
          label="操作"
          width="100">
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
        <el-form ref="form" :model="form" label-width="120px" size="mini">
          <el-form-item label="城市名" prop="cityName">
            <el-input v-model="form.cityName" :disabled="lookOrEdit"></el-input>
          </el-form-item>
          <el-form-item label="供应商" prop="supplierName">
            <el-input v-model="form.supplierName" :disabled="lookOrEdit"></el-input>
          </el-form-item>
          <el-form-item label="dpf型号" prop="dpf_model">
            <el-input v-model="form.dpf_model" :disabled="lookOrEdit"></el-input>
          </el-form-item>
          <el-form-item label="车辆编号" prop="car_number">
            <el-input v-model="form.car_number" :disabled="lookOrEdit"></el-input>
          </el-form-item>
          <el-form-item label="颜色" prop="car_color">
            <el-input v-model="form.car_color" :disabled="lookOrEdit"></el-input>
          </el-form-item>
          <el-form-item label="型号">
            <el-input v-model="form.car_type_code" :disabled="lookOrEdit"></el-input>
          </el-form-item>
          <el-form-item label="车主姓名" prop="car_user_name">
            <el-input v-model="form.car_user_name" :disabled="lookOrEdit"></el-input>
          </el-form-item>
          <el-form-item label="车主身份证号" prop="car_user_identity_code">
            <el-input v-model="form.car_user_identity_code" :disabled="lookOrEdit"></el-input>
          </el-form-item>
          <el-form-item label="车主电话" prop="car_user_phone">
            <el-input v-model="form.car_user_phone" :disabled="lookOrEdit"></el-input>
          </el-form-item>
          <el-form-item label="发动机编号" prop="car_engine_number">
            <el-input v-model="form.car_engine_number" :disabled="lookOrEdit"></el-input>
          </el-form-item>
          <el-form-item label="安装地点信息" prop="install_place_msg">
            <el-input v-model="form.install_place_msg" :disabled="lookOrEdit"></el-input>
          </el-form-item>
          <el-form-item label="安装人信息" prop="install_user_name">
            <el-input v-model="form.install_user_name" :disabled="lookOrEdit"></el-input>
          </el-form-item>
          <el-form-item label="安装人电话" prop="install_user_phone">
            <el-input v-model="form.install_user_phone" :disabled="lookOrEdit"></el-input>
          </el-form-item>
          <el-form-item label="信息上传时间" prop="install_user_phone">
            <el-input v-model="form.createTime" :disabled="lookOrEdit"></el-input>
          </el-form-item>
          <el-form-item label="唯一标识" prop="qr_code">
            <el-input v-model="form.qr_code" style="width:80%;" :disabled="lookOrEdit"></el-input>
          </el-form-item>
          <el-form-item label="车辆出厂日期" prop="car_manufacture_time">
            <el-input v-model="form.car_manufacture_time" :disabled="lookOrEdit"></el-input>
          </el-form-item>
          <el-form-item label="车辆状态" prop="car_status">
            <el-input v-model="form.car_status" :disabled="lookOrEdit"></el-input>
          </el-form-item>
          <el-form-item label="车辆业务类别" prop="car_status">
            <el-select v-model="form.car_bus_type" placeholder="" :disabled="lookOrEdit">
              <el-option label="客车" value="0"></el-option>
              <el-option label="普通货车" value="1"></el-option>
              <el-option label="危险品货车" value="1"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="已安装数据采集器" prop="car_status">
            <el-select v-model="form.collector" placeholder="" :disabled="lookOrEdit">
              <el-option label="已安装" value="0"></el-option>
              <el-option label="未安装" value="1"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="设备类别" prop="car_status">
            <el-select v-model="form.dpf_type" placeholder="" :disabled="lookOrEdit">
              <el-option label="主动清理" value="0"></el-option>
              <el-option label="被动清理" value="1"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="载重" prop="car_status">
            <el-select v-model="form.car_load" placeholder="" :disabled="lookOrEdit">
              <el-option label="8吨以下" value="0"></el-option>
              <el-option label="8(含)-20吨" value="1"></el-option>
              <el-option label="20(含)-30吨" value="2"></el-option>
              <el-option label="30(含)-40吨" value="3"></el-option>
              <el-option label="40(含)吨以上" value="4"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="所属运输公司" prop="car_status">
            <el-input v-model="form.fleetName" :disabled="lookOrEdit"></el-input>
          </el-form-item>
          <el-form-item label="数据采集器编号" prop="car_status">
            <el-input v-model="form.dataCollectorNo" :disabled="lookOrEdit"></el-input>
          </el-form-item>
          <el-form-item label="数据采集器厂家" prop="car_status">
            <el-input v-model="form.dataCollectorFactory" :disabled="lookOrEdit"></el-input>
          </el-form-item>
          <el-form-item label="数据采集器设备型号" prop="car_status">
            <el-input v-model="form.dataCollectorType" :disabled="lookOrEdit"></el-input>
          </el-form-item>
          <el-form-item label="数据采集器设备型号" prop="car_status">
            <el-input v-model="form.dataCollectorType" :disabled="lookOrEdit"></el-input>
          </el-form-item>
          <el-form-item label="车辆照片">
            <el-col :span="24">
              <a style="color:#66b1ff" @click="openImageView(form.img_url_45)">45°照片</a>&nbsp;&nbsp;&nbsp;
              <a style="color:#66b1ff" @click="openImageView(form.before_install_img_url)">安装前照片</a>&nbsp;&nbsp;&nbsp;
              <a style="color:#66b1ff" @click="openImageView(form.after_install_img_url)">安装后照片</a>&nbsp;&nbsp;&nbsp;
            </el-col>
          </el-form-item>
          <el-form-item label="环保合格证">
            <el-col :span="24">
              <a style="color:#66b1ff" @click="openImageView(form.hb_url)">环保合格证</a>&nbsp;&nbsp;&nbsp;
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
  import {getMainList, lookMain, exportEnquipment} from '@/api/register'
  import {getCitys} from '@/api/city'
  import {getToken} from '@/utils/auth'

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
        this.imgDetail = process.env.IMG_SERVER_PATH + file.url
        this.imageView = true
      },
      openImageView(src) {
        this.imgDetail = process.env.IMG_SERVER_PATH + src
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
