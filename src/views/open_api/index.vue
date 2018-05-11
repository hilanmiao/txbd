<template>
  <div class="app-container">
    <el-card>
      <el-form ref="form" :model="tempModel" :rules="rules" label-width="110px" size="mini">
        <el-row :gutter="40">
          <el-col :span="8">
            <el-form-item label="accessKey" prop="accessKey">
              <el-input v-model="tempModel.accessKey"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="accessSecret" prop="accessSecret">
              <el-input v-model="tempModel.accessSecret"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="车辆业务类别" prop="carBusType">
              <el-select v-model="tempModel.carBusType" style="width:100%;" placeholder="请选择">
                <el-option label="客车" value="1"></el-option>
                <el-option label="普通货车" value="2"></el-option>
                <el-option label="危险品货车" value="3"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="车牌颜色" prop="carColor">
              <el-select v-model="tempModel.carColor" style="width:100%;" placeholder="车牌颜色">
                <el-option value="1" label="蓝色"></el-option>
                <el-option value="2" label="黄色"></el-option>
                <el-option value="3" label="黑色"></el-option>
                <el-option value="4" label="白色"></el-option>
                <el-option value="9" label="其他"></el-option>
                <el-option value="0" label="未上牌"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="车辆出厂日期" prop="carCreateTime">
              <el-date-picker
                style="width: 100%"
                v-model="tempModel.carCreateTime"
                align="right"
                type="date"
                placeholder="选择日期"
                value-format="yyyy-MM-dd">
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="发动机编号" prop="carEngineNo">
              <el-input v-model="tempModel.carEngineNo"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="载重" prop="carLoad">
              <el-select v-model="tempModel.carLoad" style="width:100%;" placeholder="载重">
                <el-option label="8吨以下" value="0"></el-option>
                <el-option label="8(含)-20吨" value="1"></el-option>
                <el-option label="20(含)-30吨" value="2"></el-option>
                <el-option label="30(含)-40吨" value="3"></el-option>
                <el-option label="40(含)吨以上" value="4"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="机动车号牌" prop="carMark">
              <el-input v-model="tempModel.carMark"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="车主身份证编号" prop="carOwnerIdCard">
              <el-input v-model="tempModel.carOwnerIdCard"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="车主姓名" prop="carOwnerName">
              <el-input v-model="tempModel.carOwnerName"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="车主电话" prop="carOwnerPhone">
              <el-input v-model="tempModel.carOwnerPhone"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="车型编号" prop="carTypeNo">
              <el-input v-model="tempModel.carTypeNo"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="车辆VIN码" prop="carVIN">
              <el-input v-model="tempModel.carVIN"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="城市" prop="city_id">
              <el-select v-model="tempModel.city_id" style="width:100%;" placeholder="请选择">
                <el-option v-for="item in listCity" :key="item.id" :label="item.name"
                           :value="item.id"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="数据采集器厂家名称" prop="dataCollectorFactory">
              <el-input v-model="tempModel.dataCollectorFactory"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="数据采集器编号" prop="dataCollectorNo">
              <el-input v-model="tempModel.dataCollectorNo"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="数据采集器设备型号" prop="dataCollectorType">
              <el-input v-model="tempModel.dataCollectorType"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="汽车排量" prop="displacement">
              <el-input v-model="tempModel.displacement"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="DPF编号" prop="dpfId">
              <el-input v-model="tempModel.dpfId"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="DPF型号" prop="dpfModel">
              <el-select v-model="tempModel.dpfModel" style="width:100%;" placeholder="请选择">
                <el-option v-for="item in listDpfModels" :key="item.id" :label="item.dpf_model"
                           :value="item.id"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="DPF类型" prop="dpfType">
              <el-select v-model="tempModel.dpfType">
                <el-option label="主动清理" value="0"></el-option>
                <el-option label="被动清理" value="1"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="发动机型号" prop="engineModel">
              <el-input v-model="tempModel.engineModel"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="公司/车队名称" prop="fleetName">
              <el-input v-model="tempModel.fleetName"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="安装地点信息" prop="installPlaceMsg">
              <el-input v-model="tempModel.installPlaceMsg"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="安装人姓名" prop="installUserName">
              <el-input v-model="tempModel.installUserName"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="安装人电话" prop="installUserPhone">
              <el-input v-model="tempModel.installUserPhone"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="当前里程" prop="mileage">
              <el-input v-model="tempModel.mileage"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="物联网卡号" prop="networkCard">
              <el-input v-model="tempModel.networkCard"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="供应商" prop="supplier_id">
              <el-select v-model="tempModel.supplierId" placeholder="请选择">
                <el-option v-for="item in listSupplier" :key="item.SUPPLIER_ID" :label="item.NAME"
                           :value="item.SUPPLIER_ID"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="45°照片" :required="true" :error="imgRequiredFortyFiveImgUrl">
              <el-upload
                class="upload-demo"
                :action="uploadUrl + '?accessKey=' + tempModel.accessKey + '&accessSecret=' + tempModel.accessSecret"
                :limit="1"
                :on-remove="handleUploadRemoveFortyFiveImgUrl"
                accept="image/*"
                :file-list="tempModel.fortyFiveImgUrl"
                :on-success="handleUploadSuccessFortyFiveImgUrl"
                :on-exceed="handleUploadExceed"
                name="img"
                list-type="picture">
                <el-button size="mini" type="primary">点击上传</el-button>
              </el-upload>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="环保合格证照片" :required="true" :error="imgRequiredHbImgUrl">
              <el-upload
                class="upload-demo"
                :action="uploadUrl + '?accessKey=' + tempModel.accessKey + '&accessSecret=' + tempModel.accessSecret"
                :limit="1"
                :on-remove="handleUploadRemoveHbImgUrl"
                accept="image/*"
                :file-list="tempModel.hbImgUrl"
                :on-success="handleUploadSuccessHbImgUrl"
                :on-exceed="handleUploadExceed"
                name="img"
                list-type="picture">
                <el-button size="mini" type="primary">点击上传</el-button>
              </el-upload>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="安装后照片" :required="true" :error="imgRequiredInstallAfterImgUrl">
              <el-upload
                class="upload-demo"
                :action="uploadUrl + '?accessKey=' + tempModel.accessKey + '&accessSecret=' + tempModel.accessSecret"
                :limit="1"
                :on-remove="handleUploadRemoveInstallAfterImgUrl"
                accept="image/*"
                :file-list="tempModel.installAfterImgUrl"
                :on-success="handleUploadSuccessInstallAfterImgUrl"
                :on-exceed="handleUploadExceed"
                name="img"
                list-type="picture">
                <el-button size="mini" type="primary">点击上传</el-button>
              </el-upload>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="安装前照片" :required="true" :error="imgRequiredInstallBeforeImgUrl">
              <el-upload
                class="upload-demo"
                :action="uploadUrl + '?accessKey=' + tempModel.accessKey + '&accessSecret=' + tempModel.accessSecret"
                :limit="1"
                :on-remove="handleUploadRemoveInstallBeforeImgUrl"
                accept="image/*"
                :file-list="tempModel.installBeforeImgUrl"
                :on-success="handleUploadSuccessInstallBeforeImgUrl"
                :on-exceed="handleUploadExceed"
                name="img"
                list-type="picture">
                <el-button size="mini" type="primary">点击上传</el-button>
              </el-upload>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item>
              <el-button round size="medium" type="primary" @click="handleSubmit('form')" :loading="submitLoading"
                         icon="el-icon-upload">保存
              </el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </el-card>
  </div>
</template>

<script type="text/ecmascript-6">
  import {getSuppList, postModelDpf, getDpfModels} from '@/api/open_api'

  export default {
    data: function () {
      return {
        // 表单相关
        listSupplier: [],
        listDpfModels: [],
        tempModel: {
          // key
          accessKey: 'a6758e88',
          // 秘钥
          accessSecret: 'cea1177f',
          // 车辆业务类别(与甲方确认后定为三种1.客车 2.普通货车 3.危险品货车)
          carBusType: '',
          // 车牌颜色 1:蓝色，2：黄色：3：黑色4：白色9：其他0：未上牌
          carColor: '',
          // 车辆出厂日期
          carCreateTime: '',
          // 发动机编号
          carEngineNo: '',
          // 载重0,8吨以下；1，8(含)-20吨 2，20(含)-30吨； 3，30(含)-40吨； 4：40(含)吨以上
          carLoad: '',
          // 标识公安交通管理部门颁发的机动车号牌
          carMark: '',
          // 车主身份证编号
          carOwnerIdCard: '',
          // 车主姓名
          carOwnerName: '',
          // 车主电话
          carOwnerPhone: '',
          // 车型编号
          carTypeNo: '',
          // 车辆VIN码
          carVIN: '',
          // 城市id
          cityId: '',
          // 数据采集器厂家名称
          dataCollectorFactory: '',
          // 数据采集器编号
          dataCollectorNo: '',
          // 数据采集器设备型号
          dataCollectorType: '',
          // 汽车排量
          displacement: '',
          // DPFid
          dpfId: '',
          // DPF编号
          dpfModel: '',
          // DPF类型0：主动清理，1被动清理
          dpfType: '',
          // 发动机型号
          engineModel: '',
          // 所在公司或者车队名称
          fleetName: '无',
          // 45º照片信息
          fortyFiveImgUrl: [],
          // 环保合格证照片
          hbImgUrl: [],
          // 安装后照片
          installAfterImgUrl: [],
          // 安装前照片
          installBeforeImgUrl: [],
          // 安装地点信息
          installPlaceMsg: '',
          // 安装人姓名
          installUserName: '',
          // 安装人电话
          installUserPhone: '',
          // 当前里程
          mileage: '',
          // 物联网卡号
          networkCard: '',
          // 省id
          provinceId: '37',
          // 供应商id
          supplierId: ''
        },
        submitLoading: false,
        // 表单验证相关
        rules: {
          accessKey: [{required: true, message: '请输入内容', trigger: 'blur'}],
          // 秘钥
          accessSecret: [{required: true, message: '请输入内容', trigger: 'blur'}],
          // 车辆业务类别(与甲方确认后定为三种1.客车 2.普通货车 3.危险品货车)
          carBusType: [{required: true, message: '请输入内容', trigger: 'blur'}],
          // 车牌颜色，按照JT/T415-2006的5.4.12.未上牌时，取值为0 ,
          carColor: [{required: true, message: '请输入内容', trigger: 'blur'}],
          // 车辆出厂日期
          carCreateTime: [{required: true, message: '请输入内容', trigger: 'blur'}],
          // 发动机编号
          carEngineNo: [{required: true, message: '请输入内容', trigger: 'blur'}],
          // 载重0,8吨以下；1，8(含)-20吨 2，20(含)-30吨； 3，30(含)-40吨； 4：40(含)吨以上
          carLoad: [{required: true, message: '请输入内容', trigger: 'blur'}],
          // 标识公安交通管理部门颁发的机动车号牌
          carMark: [{required: true, message: '请输入内容', trigger: 'blur'}],
          // 车主身份证编号
          carOwnerIdCard: [{required: true, message: '请输入内容', trigger: 'blur'}],
          // 车主姓名
          carOwnerName: [{required: true, message: '请输入内容', trigger: 'blur'}],
          // 车主电话
          carOwnerPhone: [{required: true, message: '请输入内容', trigger: 'blur'}],
          // 车型编号
          carTypeNo: [{required: true, message: '请输入内容', trigger: 'blur'}],
          // 车辆VIN码
          carVIN: [{required: true, message: '请输入内容', trigger: 'blur'}],
          // 城市id
          cityId: [{required: true, message: '请输入内容', trigger: 'blur'}],
          // 数据采集器厂家名称
          dataCollectorFactory: [{required: true, message: '请输入内容', trigger: 'blur'}],
          // 数据采集器编号
          dataCollectorNo: [{required: true, message: '请输入内容', trigger: 'blur'}],
          // 数据采集器设备型号
          dataCollectorType: [{required: true, message: '请输入内容', trigger: 'blur'}],
          // 汽车排量
          displacement: [{required: true, message: '请输入内容', trigger: 'blur'}],
          // DPFid
          dpfId: [{required: true, message: '请输入内容', trigger: 'blur'}],
          // DPF编号
          dpfModel: [{required: true, message: '请输入内容', trigger: 'blur'}],
          // DPF类型0：主动清理，1被动清理
          dpfType: [{required: true, message: '请输入内容', trigger: 'blur'}],
          // 发动机型号
          engineModel: [{required: true, message: '请输入内容', trigger: 'blur'}],
          // 所在公司或者车队名称
          fleetName: [{required: true, message: '请输入内容', trigger: 'blur'}],
          // 安装地点信息
          installPlaceMsg: [{required: true, message: '请输入内容', trigger: 'blur'}],
          // 安装人姓名
          installUserName: [{required: true, message: '请输入内容', trigger: 'blur'}],
          // 安装人电话
          installUserPhone: [{required: true, message: '请输入内容', trigger: 'blur'}],
          // 当前里程
          mileage: [{required: true, message: '请输入内容', trigger: 'blur'}],
          // 物联网卡号
          networkCard: [{required: true, message: '请输入内容', trigger: 'blur'}],
          // 供应商id
          supplierId: [{required: true, message: '请输入内容', trigger: 'blur'}]
        },
        imageView: false,
        // 上传相关
        uploadUrl: process.env.BASE_API + 'v1/supplier/img',
        imgRequiredFortyFiveImgUrl: '',
        imgRequiredHbImgUrl: '',
        imgRequiredInstallAfterImgUrl: '',
        imgRequiredInstallBeforeImgUrl: '',
        listCity: [
          {
            id: '0100',
            name: '济南市'
          },
          {
            id: '0200',
            name: '青岛市'
          },
          {
            id: '0300',
            name: '淄博市'
          },
          {
            id: '0400',
            name: '枣庄市'
          },
          {
            id: '0500',
            name: '东营市'
          },
          {
            id: '0600',
            name: '烟台市'
          },
          {
            id: '0700',
            name: '潍坊市'
          },
          {
            id: '0800',
            name: '济宁市'
          },
          {
            id: '0900',
            name: '泰安市'
          },
          {
            id: '1000',
            name: '威海市'
          },
          {
            id: '1100',
            name: '日照市'
          },
          {
            id: '1200',
            name: '莱芜市'
          },
          {
            id: '1300',
            name: '临沂市'
          },
          {
            id: '1400',
            name: '德州市'
          },
          {
            id: '1500',
            name: '聊城市'
          },
          {
            id: '1600',
            name: '滨州市'
          },
          {
            id: '1700',
            name: '菏泽市'
          }
        ]
      }
    },
    watch: {
      'tempModel.supplierId': {
        handler: function (val, oldVal) {
          this._getDpfModels()
        },
        deep: true
      },
      'tempModel.accessKey': {
        handler: function (val, oldVal) {
          this._getSupplierList()
        },
        deep: true
      },
      'tempModel.accessSecret': {
        handler: function (val, oldVal) {
          this._getSupplierList()
        },
        deep: true
      }
    },
    created() {
      this._getSupplierList()
    },
    methods: {
      handleUploadExceed() {
        this.$message.error('只能上传一个文件')
      },
      handleUploadRemoveFortyFiveImgUrl(file, fileList) {
        this.tempModel.fortyFiveImgUrl = []
      },
      handleUploadRemoveHbImgUrl(file, fileList) {
        this.tempModel.hbImgUrl = []
      },
      handleUploadRemoveInstallAfterImgUrl(file, fileList) {
        this.tempModel.installAfterImgUrl = []
      },
      handleUploadRemoveInstallBeforeImgUrl(file, fileList) {
        this.tempModel.installBeforeImgUrl = []
      },
      handleUploadSuccessFortyFiveImgUrl(response, file, fileList) {
        if (response.code === '201') {
          this.tempModel.fortyFiveImgUrl = []
          this.tempModel.fortyFiveImgUrl.push({
            name: file.name,
            url: process.env.IMG_SERVER_PATH + response.data
          })
          // 清空上传验证信息
          this.imgRequiredFortyFiveImgUrl = ''
        } else {
          this.$message.error(response.message)
        }
      },
      handleUploadSuccessHbImgUrl(response, file, fileList) {
        if (response.code === '201') {
          this.tempModel.hbImgUrl = []
          this.tempModel.hbImgUrl.push({
            name: file.name,
            url: process.env.IMG_SERVER_PATH + response.data
          })
          // 清空上传验证信息
          this.imgRequiredHbImgUrl = ''
        } else {
          this.$message.error(response.message)
        }
      },
      handleUploadSuccessInstallAfterImgUrl(response, file, fileList) {
        if (response.code === '201') {
          this.tempModel.installAfterImgUrl = []
          this.tempModel.installAfterImgUrl.push({
            name: file.name,
            url: process.env.IMG_SERVER_PATH + response.data
          })
          // 清空上传验证信息
          this.imgRequiredInstallAfterImgUrl = ''
        } else {
          this.$message.error(response.message)
        }
      },
      handleUploadSuccessInstallBeforeImgUrl(response, file, fileList) {
        if (response.code === '201') {
          this.tempModel.installBeforeImgUrl = []
          this.tempModel.installBeforeImgUrl.push({
            name: file.name,
            url: process.env.IMG_SERVER_PATH + response.data
          })
          // 清空上传验证信息
          this.imgRequiredInstallBeforeImgUrl = ''
        } else {
          this.$message.error(response.message)
        }
      },
      handleSubmit(formName) {
        this.$refs[formName].validate((valid) => {
          // 验证规则
          if (valid) {
            // 照片上传手动验证
            if (!this.tempModel.fortyFiveImgUrl.length) {
              this.imgRequiredFortyFiveImgUrl = '请上传照片'
              return false
            } else {
              // 清空上传验证信息
              this.imgRequiredFortyFiveImgUrl = ''
            }
            if (!this.tempModel.hbImgUrl.length) {
              this.imgRequiredHbImgUrl = '请上传照片'
              return false
            } else {
              // 清空上传验证信息
              this.imgRequiredHbImgUrl = ''
            }
            if (!this.tempModel.installAfterImgUrl.length) {
              this.imgRequiredInstallAfterImgUrl = '请上传照片'
              return false
            } else {
              // 清空上传验证信息
              this.imgRequiredInstallAfterImgUrl = ''
            }
            if (!this.tempModel.installBeforeImgUrl.length) {
              this.imgRequiredInstallBeforeImgUrl = '请上传照片'
              return false
            } else {
              // 清空上传验证信息
              this.imgRequiredInstallBeforeImgUrl = ''
            }
            this.submitLoading = true
            this._addSubmit()
          } else {
            console.log('error submit!!')
            return false
          }
        })
      },
      _addSubmit() {
        // 因为要改变了值，所以要深拷贝
        const tempForm = JSON.parse(JSON.stringify(this.tempModel))
        if (tempForm.fortyFiveImgUrl.length > 0) {
          // 处理图片路径
          tempForm.fortyFiveImgUrl[0].url = tempForm.fortyFiveImgUrl[0].url.replace(process.env.IMG_SERVER_PATH, '')
        }
        tempForm.fortyFiveImgUrl = tempForm.fortyFiveImgUrl[0].url
        // tempForm.fortyFiveImgUrl = 'http://07.imgmini.eastday.com/mobile/20180503/20180503090908_177cb9860dd3e4557c7d74d8ff27cbdd_1.jpeg'
        if (tempForm.hbImgUrl.length > 0) {
          // 处理图片路径
          tempForm.hbImgUrl[0].url = tempForm.hbImgUrl[0].url.replace(process.env.IMG_SERVER_PATH, '')
        }
        tempForm.hbImgUrl = tempForm.hbImgUrl[0].url
        // tempForm.hbImgUrl = 'http://07.imgmini.eastday.com/mobile/20180503/20180503090908_177cb9860dd3e4557c7d74d8ff27cbdd_1.jpeg'
        if (tempForm.installAfterImgUrl.length > 0) {
          // 处理图片路径
          tempForm.installAfterImgUrl[0].url = tempForm.installAfterImgUrl[0].url.replace(process.env.IMG_SERVER_PATH, '')
        }
        tempForm.installAfterImgUrl = tempForm.installAfterImgUrl[0].url
        // tempForm.installAfterImgUrl = 'http://07.imgmini.eastday.com/mobile/20180503/20180503090908_177cb9860dd3e4557c7d74d8ff27cbdd_1.jpeg'
        if (tempForm.installBeforeImgUrl.length > 0) {
          // 处理图片路径
          tempForm.installBeforeImgUrl[0].url = tempForm.installBeforeImgUrl[0].url.replace(process.env.IMG_SERVER_PATH, '')
        }
        tempForm.installBeforeImgUrl = tempForm.installBeforeImgUrl[0].url
        // tempForm.installBeforeImgUrl = 'http://07.imgmini.eastday.com/mobile/20180503/20180503090908_177cb9860dd3e4557c7d74d8ff27cbdd_1.jpeg'
        postModelDpf(tempForm).then(response => {
          if (response.code === '201') {
            // 弹出提醒信息
            // this.$message({
            //   type: 'success',
            //   message: '操作成功!'
            // })
            this.$notify({
              title: '成功',
              message: '保存信息成功',
              type: 'success',
              position: 'bottom-left'
            })
          } else {
            // this.$message({
            //   type: 'error',
            //   message: response.message
            // })
            this.$notify.error({
              title: '错误',
              message: response.message,
              position: 'bottom-left'
            })
          }
          this.submitLoading = false
        })
      },
      _getSupplierList() {
        const params = {accessKey: this.tempModel.accessKey, accessSecret: this.tempModel.accessSecret}
        getSuppList(params).then(response => {
          if (response.code === '200') {
            this.listSupplier = response.data
          }
        })
      },
      _getDpfModels() {
        const params = {
          accessKey: this.tempModel.accessKey,
          accessSecret: this.tempModel.accessSecret,
          supplier_id: this.tempModel.supplierId
        }
        getDpfModels(params).then(response => {
          if (response.code === '200') {
            // 设置表格数据
            this.listDpfModels = response.data
          } else {
            this.$message({
              type: 'error',
              message: response.message
            })
          }
        })
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .el-upload__tip {
    color: #cccccc;
  }
</style>
