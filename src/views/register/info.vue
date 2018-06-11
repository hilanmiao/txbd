<template>
  <div class="app-container">
    <div class="filter-container" style="padding-bottom: 10px;">
      <el-input v-model="listQuery.key" style="width: 200px;"
                class="filter-item"
                placeholder="车牌号或者DPF编号">
      </el-input>
      <el-button type="primary" icon="el-icon-search" @click="_getList">搜索</el-button>
    </div>

    <div>
      <el-form ref="form" :model="form" label-width="120px" size="mini">
        <el-col :span="8">
        <el-form-item label="城市名" prop="cityName">
          <el-input v-model="form.cityName" disabled></el-input>
        </el-form-item>
        </el-col>
        <el-col :span="8">
        <el-form-item label="供应商" prop="supplierName">
          <el-input v-model="form.supplierName" disabled></el-input>
        </el-form-item>
        </el-col>
        <el-col :span="8">
        <el-form-item label="dpf型号" prop="dpf_model">
          <el-input v-model="form.dpf_model" disabled></el-input>
        </el-form-item>
        </el-col>
        <el-col :span="8">
        <el-form-item label="车辆编号" prop="car_number">
          <el-input v-model="form.car_number" disabled></el-input>
        </el-form-item>
        </el-col>
        <el-col :span="8">
        <el-form-item label="车牌颜色" prop="car_color">
          <!--<el-input v-model="form.car_color" disabled></el-input>-->
          <el-select v-model="form.car_color" style="width:100%;" disabled>
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
        <el-form-item label="型号">
          <el-input v-model="form.car_type_code" disabled></el-input>
        </el-form-item>
        </el-col>
        <el-col :span="8">
        <el-form-item label="车主姓名" prop="car_user_name">
          <el-input v-model="form.car_user_name" disabled></el-input>
        </el-form-item>
        </el-col>
        <el-col :span="8">
        <el-form-item label="车主身份证号" prop="car_user_identity_code">
          <el-input v-model="form.car_user_identity_code" disabled></el-input>
        </el-form-item>
        </el-col>
        <el-col :span="8">
        <el-form-item label="车主电话" prop="car_user_phone">
          <el-input v-model="form.car_user_phone" disabled></el-input>
        </el-form-item>
        </el-col>
        <el-col :span="8">
        <el-form-item label="发动机编号" prop="car_engine_number">
          <el-input v-model="form.car_engine_number" disabled></el-input>
        </el-form-item>
        </el-col>
        <el-col :span="8">
        <el-form-item label="安装地点信息" prop="install_place_msg">
          <el-input v-model="form.install_place_msg" disabled></el-input>
        </el-form-item>
        </el-col>
        <el-col :span="8">
        <el-form-item label="安装人信息" prop="install_user_name">
          <el-input v-model="form.install_user_name" disabled></el-input>
        </el-form-item>
        </el-col>
        <el-col :span="8">
        <el-form-item label="安装人电话" prop="install_user_phone">
          <el-input v-model="form.install_user_phone" disabled></el-input>
        </el-form-item>
        </el-col>
        <el-col :span="8">
        <el-form-item label="信息上传时间" prop="install_user_phone">
          <el-input v-model="form.createTime" disabled></el-input>
        </el-form-item>
        </el-col>
        <el-col :span="8">
        <el-form-item label="唯一标识" prop="qr_code">
          <el-input v-model="form.qr_code" style="width:80%;" disabled></el-input>
        </el-form-item>
        </el-col>
        <el-col :span="8">
        <el-form-item label="车辆出厂日期" prop="car_manufacture_time">
          <el-input v-model="form.car_manufacture_time" disabled></el-input>
        </el-form-item>
        </el-col>
        <el-col :span="8">
        <el-form-item label="车辆状态" prop="car_status">
          <el-input v-model="form.car_status" disabled></el-input>
        </el-form-item>
        </el-col>
        <el-col :span="8">
        <el-form-item label="车辆业务类别" prop="car_status">
          <el-select v-model="form.car_bus_type" placeholder="" disabled>
            <el-option label="客车" value="0"></el-option>
            <el-option label="普通货车" value="1"></el-option>
            <el-option label="危险品货车" value="1"></el-option>
          </el-select>
        </el-form-item>
        </el-col>
        <el-col :span="8">
        <el-form-item label="已安装数据采集器" prop="car_status">
          <el-select v-model="form.collector" placeholder="" disabled>
            <el-option label="已安装" value="0"></el-option>
            <el-option label="未安装" value="1"></el-option>
          </el-select>
        </el-form-item>
        </el-col>
        <el-col :span="8">
        <el-form-item label="设备类别" prop="car_status">
          <el-select v-model="form.dpf_type" placeholder="" disabled>
            <el-option label="主动清理" value="0"></el-option>
            <el-option label="被动清理" value="1"></el-option>
          </el-select>
        </el-form-item>
        </el-col>
        <el-col :span="8">
        <el-form-item label="载重" prop="car_status">
          <el-select v-model="form.car_load" placeholder="" disabled>
            <el-option label="8吨以下" value="0"></el-option>
            <el-option label="8(含)-20吨" value="1"></el-option>
            <el-option label="20(含)-30吨" value="2"></el-option>
            <el-option label="30(含)-40吨" value="3"></el-option>
            <el-option label="40(含)吨以上" value="4"></el-option>
          </el-select>
        </el-form-item>
        </el-col>
        <el-col :span="8">
        <el-form-item label="所属运输公司" prop="car_status">
          <el-input v-model="form.fleetName" disabled></el-input>
        </el-form-item>
        </el-col>
        <el-col :span="8">
        <el-form-item label="数据采集器编号" prop="car_status">
          <el-input v-model="form.dataCollectorNo" disabled></el-input>
        </el-form-item>
        </el-col>
        <el-col :span="8">
        <el-form-item label="数据采集器厂家" prop="car_status">
          <el-input v-model="form.dataCollectorFactory" disabled></el-input>
        </el-form-item>
        </el-col>
        <el-col :span="8">
        <el-form-item label="数据采集器设备型号" prop="car_status">
          <el-input v-model="form.dataCollectorType" disabled></el-input>
        </el-form-item>
        </el-col>
        <el-col :span="8">
        <el-form-item label="数据采集器设备型号" prop="car_status">
          <el-input v-model="form.dataCollectorType" disabled></el-input>
        </el-form-item>
        </el-col>
        <el-col :span="24">
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
        </el-col>
      </el-form>
    </div>

    <div class="others-container">
      <el-dialog :visible.sync="imageView" title="查看图片">
        <img :src="imgDetail" @click="closeImage" width="100%">
      </el-dialog>
    </div>

    <div class="table-container">
      <el-table
        v-loading="loadingList" element-loading-text="加载中..."
        :data="form.warnList"
        border
        stripe
        fit
        highlight-current-row
        style="width: 100%">
        <el-table-column
          prop="warningTime"
          label="报警时间">
        </el-table-column>
        <el-table-column
          prop="warningContent"
          label="报警内容">
        </el-table-column>
        <el-table-column
          label="DPF异常状态">
          <template slot-scope="scope">
          {{scope.row.dpfStatus | statusFilter}}
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import {getInfo} from '@/api/register'

  export default {
    data() {
      return {
        // 列表相关
        list: [],
        listSupp: [],
        loadingList: false,
        listQuery: {
          key: '鲁G12345'
        },
        form: {},
        imageView: false,
        imgDetail: ''
      }
    },
    created() {},
    filters: {
      statusFilter(status) {
        const statusMap = {
          0: '离线时间过长',
          1: '温度、压力异常',
          2: '定位异常'
        }
        return statusMap[status]
      }
    },
    methods: {
      openImageView(src) {
        this.imgDetail = process.env.IMG_SERVER_PATH + src
        this.imageView = true
      },
      closeImage() {
        this.imageView = false
      },
      _getList() {
        // 设置表格loading效果
        this.loadingList = true
        // 请求表格数据
        getInfo(this.listQuery).then(response => {
          if (response.code === '200') {
            // 设置表格数据
            this.form = response.data
          } else {
            this.$message({
              type: 'error',
              message: response.message
            })
          }
          // 取消表格loading效果
          this.loadingList = false
        })
      }
    }
  }
</script>

<style scoped>

</style>
