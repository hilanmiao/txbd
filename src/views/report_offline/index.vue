<template>
  <div class="app-container">

    <div class="filter-container" style="padding-bottom: 10px;">
      <el-select v-model="listQuery.city_id" style="width:120px;" clearable
                 placeholder="选择城市">
        <el-option v-for="item in listCity" :key="item.id" :label="item.name"
                   :value="item.id"></el-option>
      </el-select>

      <el-button type="primary" icon="el-icon-search" @click="handleSearch">搜索</el-button>
      <!--<el-button type="primary" icon="el-icon-download" @click="handleExport" :loading="loadingExport">导出</el-button>-->
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
          prop="car_number"
          label="车牌号">
        </el-table-column>
        <el-table-column
          prop="car_user_name"
          label="车主姓名">
        </el-table-column>
        <el-table-column
          prop="car_user_phone"
          label="车主电话">
        </el-table-column>
        <el-table-column
          prop="car_color"
          label="车身颜色">
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
        :page-sizes="[10,20, 80, 100, 1000]"
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
      <el-dialog :visible.sync="visibleView" title='查看详情'>
        <el-form ref="form" :model="form" label-width="120px">

          <el-form-item label="城市">
            <el-col :span="10">
              <el-form-item>
                <el-input v-model="form.cityName" style="width:80%;" :disabled="lookOrEdit"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="4">省份</el-col>
            <el-col :span="8">
              <el-form-item>
                <el-input v-model="form.provinceName" :disabled="lookOrEdit"></el-input>
              </el-form-item>
            </el-col>
          </el-form-item>

          <el-form-item label="供应商">
            <el-input v-model="form.supplierName" :disabled="lookOrEdit"></el-input>
          </el-form-item>

          <el-form-item label="DPF型号">
            <el-input v-model="form.dpf_model" :disabled="lookOrEdit"></el-input>
          </el-form-item>

          <el-form-item label="车牌号">
            <el-col :span="10">
              <el-input v-model="form.car_number" style="width:80%;" :disabled="lookOrEdit"></el-input>
            </el-col>
            <el-col :span="4">车身颜色</el-col>
            <el-col :span="8">
              <el-input v-model="form.car_color" :disabled="lookOrEdit"></el-input>
            </el-col>
          </el-form-item>


          <el-form-item label="车型编号">
            <el-col :span="10">
              <el-input v-model="form.car_type_code" style="width:80%;" :disabled="lookOrEdit"></el-input>
            </el-col>
            <el-col :span="4">车主姓名</el-col>
            <el-col :span="8">
              <el-input v-model="form.car_user_name" :disabled="lookOrEdit"></el-input>
            </el-col>
          </el-form-item>

          <el-form-item label="车主身份证号">
            <el-col :span="10">
              <el-input v-model="form.car_user_identity_code" style="width:80%;" :disabled="lookOrEdit"></el-input>
            </el-col>
            <el-col :span="4">车主电话</el-col>
            <el-col :span="8">
              <el-input v-model="form.car_user_phone" :disabled="lookOrEdit"></el-input>
            </el-col>
          </el-form-item>

          <el-form-item label="发动机编号">
            <el-input v-model="form.car_engine_number" :disabled="lookOrEdit"></el-input>
          </el-form-item>

          <el-form-item label="安装人姓名">
            <el-input v-model="form.install_user_name" :disabled="lookOrEdit"></el-input>
          </el-form-item>

          <el-form-item label="安装电话">
            <el-input v-model="form.install_user_phone" :disabled="lookOrEdit"></el-input>
          </el-form-item>

          <el-form-item label="信息上传时间">
            <el-input v-model="form.createTime" :disabled="lookOrEdit"></el-input>
          </el-form-item>

          <el-form-item label="信息上传人">
            <el-input v-model="form.createUserName" :disabled="lookOrEdit"></el-input>
          </el-form-item>

          <el-form-item label="车辆出厂时间">
            <el-input v-model="form.car_manufacture_time" :disabled="lookOrEdit"></el-input>
          </el-form-item>

          <el-form-item label="车辆状态">
            <el-input v-model="form.car_status" :disabled="lookOrEdit"></el-input>
          </el-form-item>

          <el-form-item label="安装信息唯一标示">
            <el-input v-model="form.qr_code" :disabled="lookOrEdit"></el-input>
          </el-form-item>



          <el-form-item>
           <el-button @click="visibleView = false">关闭</el-button>
          </el-form-item>
        </el-form>
      </el-dialog>
    </div>



  </div>
</template>

<script type="text/ecmascript-6">
  import {getList,getData} from '@/api/report_offline'
  import {getCitys} from '@/api/city'

  export default {
    data() {
      return {
        // 列表相关
        tableData: [],
        total: 0,
        lookOrEdit:true,
        loadingExport: false,
        visibleView: false,
        listCity: [],
        listQuery: {
         city_id: '0700',
         limit: 10,
         offset: 0,
         page: 1
        },
        form:{
          cityName:'',
          provinceName:'',
          supplierName:'',
          dpf_model:'',
          car_number:'',
          car_color:'',
          car_type_code:'',
          car_user_name:'',
          car_user_identity_code:'',
          car_user_phone:'',
          car_engine_number:'',
          install_place_msg:'',
          install_user_name:'',
          install_user_phone:'',
          createTime:'',
          createUserName:'',
          qr_code:'',
          car_manufacture_time:'',
          car_status:''
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
      this._getData()
      this._getCityList()
    },
    methods: {
      _getData(){
        if(this.listQuery.city_id==''){
          this.$message({
            type: 'error',
            message:'请选择城市'
          })
          return false
        }
         this._getList(this.listQuery.city_id)
      },
      _getList(city_id) {
        // 设置表格loading效果
        this.tableLoading = true

        getList(city_id).then(response => {
          if (response.code === '200') {
            // 设置表格数据
            this.tableData = response.data.slice(this.listQuery.offset,this.listQuery.offset+this.listQuery.limit)
            this.total=response.data.length
            // 设置分页插件数据总数
           } else {
            this.tableData =[]
            this.total=0
            this.$message({
              type: 'error',
              message: response.message
            })
          }
        })
        // 取消表格loading效果
        this.tableLoading = false
      },
      handleExport() {
        this.loadingExport = true
        const rows = [['车牌号', '报警信息', '报警时间', '车牌号']]
        this.tableData.forEach(item => {
          rows.push([
            item.DEVICENO,
            item.WARNNINGCONTENT,
            item.WARNNINGTIME,
            item.PLATENUMBER
          ])
        })
        let csvContent = 'data:text/csv;charset=utf-8,'
        rows.forEach(rowArray => {
          const row = rowArray.join(',')
          csvContent += row + '\r\n'
        })

        const encodedUri = encodeURI(csvContent)
        const link = document.createElement('a')
        link.setAttribute('href', encodedUri)
        link.setAttribute('download', 'download.csv')
        document.body.appendChild(link)
        link.click()
        this.loadingExport = false
      },
      handleView(row) {
        this.visibleView = true
        getData(row.id).then(response=>{
          this.form=response.data
        })
      },
      selectDate() {
        if (this.dateArea != null) {
          this.listQuery.startTime = this.dateArea[0]
          this.listQuery.endTime = this.dateArea[1]
        } else {
          this.listQuery.startTime = null
          this.listQuery.endTime = null
        }
      },
      handleSearch() {
        this._getData()
      },
     handleSizeChange(val) {
        this.listQuery.limit = val
        this._getData()
      },
      handleCurrentChange(val) {
        this.offset = val
        this._getData()
      },
      _getCityList() {
        getCitys().then(response => {
          this.listCity = response.data
        })
        this.listCity = getCitys()
      },
    }
  }
</script>

<style scoped>

</style>
