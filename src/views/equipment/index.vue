<template>
  <div class="app-container">

    <div class="filter-container" style="padding-bottom: 10px;">
      <el-input @keyup.enter.native="handleFilter" v-model="listQuery.code" style="width: 200px;" class="filter-item" placeholder="DPF设备序号">
    </el-input>
      <el-select v-model="listQuery.supplier" placeholder="请选择" :loading="true">
        <el-option v-for="item in supplierList" :key="item.value" :label="item.label" :value="item.value"></el-option>
      </el-select>
      <el-button type="primary" icon="el-icon-search" @click="handleFilter">搜索</el-button>
      <el-button type="primary" icon="el-icon-edit" @click="handleCreate">添加</el-button>
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
          prop="dpf_code"
          label="设备序号"
          width="150">
        </el-table-column>
        <el-table-column
          prop="supplier"
          label="供应商"
          width="120">
        </el-table-column>
        <el-table-column
          prop="dpf_model"
          label="设备型号"
          width="120">
        </el-table-column>
        <el-table-column
          prop="createtime"
          label="创建时间">
        </el-table-column>
        <el-table-column
          prop="create_user_name"
          label="创建人">
        </el-table-column>
        <el-table-column
          label="状态">
          <template slot-scope="scope">
            <el-tag :type="scope.row.type | statusFilter">{{scope.row.type}}</el-tag>
          </template>
        </el-table-column>
        <el-table-column
          fixed="right"
          label="操作"
          width="160">
          <template slot-scope="scope">
            <el-button type="primary" size="mini" @click="handleEdit(scope.row)">编辑</el-button>
            <el-button type="danger" size="mini" @click="handleDelete(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <div class="pagination-container" style="margin-top: 20px">
      <el-pagination
        :page-sizes="[20, 40, 80, 100, 1000]"
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
      <el-dialog :visible.sync="dialogFormVisible" title="添加&编辑" :before-close="handleBeforeClose">
        <el-form ref="form" :model="tempModel" label-width="80px">
          <el-form-item label="设备序号">
            <el-input v-model="tempModel.dpf_code"></el-input>
          </el-form-item>
          <el-form-item label="供应商">
            <el-select v-model="tempModel.supplier_id" placeholder="请选择供应商">
              <el-option v-for="item in supplierList" :key="item.value" :label="item.label" :value="item.value"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="设备型号">
            <el-input v-model="tempModel.dpf_model"></el-input>
          </el-form-item>
          <el-form-item label="状态">
            <el-select v-model="tempModel.type" placeholder="请选择">
              <el-option label="未使用" value="0"></el-option>
              <el-option label="已使用" value="1"></el-option>
              <el-option label="已报废" value="2"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="handleSubmit" :loading="loadingSubmit">保存</el-button>
            <el-button @click="dialogFormVisible = false">取消</el-button>
          </el-form-item>
        </el-form>
      </el-dialog>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import {getListEnquipment, postModelEnquipment, deleteModelEnquipment} from '@/api/enquipment'
  import {getListSupplier} from '@/api/supplier'

  export default {
    data() {
      return {
        // 列表相关
        list: undefined,
        total: undefined,
        loadingList: false,
        listQuery: {
          page: 1,
          limit: 20,
          code: undefined,
          supplier: undefined,
          sort: '+id'
        },
        // 表单相关
        listSupplier: [],
        tempModel: {
          id: undefined,
          name: '',
          linkman: '',
          phone: '',
          remark: ''
        },
        loadingSubmit: false,
        dialogFormVisible: false,

        // 导出相关
        loadingExport: false
      }
    },
    filters: {
      statusFilter(status) {
        const statusMap = {
          0: '',
          1: 'success',
          2: 'danger'
        }
        return statusMap[status]
      }
    },
    created() {
      // 获取列表数据
      this._getList()
      // 获取供应商数据
      this._getListSupplier()
    },
    methods: {
      resetTempModel() {
        // 重置表单
        this.tempModel = {
          id: '',
          dpf_code: '',
          supplier_id: '',
          dpf_model: '',
          type: '0'
        }
      },
      handleCreate() {
        // 添加处理
        this.resetTempModel()
        this.dialogFormVisible = true
      },
      handleEdit(row) {
        // 编辑处理
        this.tempModel = row
        this.dialogFormVisible = true
      },
      handleDelete(row) {
        // 删除处理
        this.$confirm('此操作将永久删除该条数据, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
      },
      handleSubmit() {
        // 提交处理
        this.loadingSubmit = true
        // 提交数据
        setTimeout(() => {
          // 取消加载中
          this.loadingSubmit = false
          // 关闭dialog
          this.dialogFormVisible = false
          // 重新请求数据(带着原先的查询参数)
          this.getList()
        }, 2000)
      },
      handleBeforeClose(done) {
        // dialog关闭前处理
        if (!this.loadingSubmit) {
          done()
        }
      },
      handleExport() {
        // 导出处理
        // 显示loading
        this.loadingExport = true

        const rows = [['id', 'DPF设备序号', 'DPF供应商', 'DPF设备型号', '状态', '创建时间', '创建人']]
        this.tableData.forEach(item => {
          rows.push([
            item.dpf_code,
            item.supplier,
            item.dpf_model,
            item.status,
            item.createtime,
            item.createuser
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
        this.listQuery.page = 1
        this.getList()
      },
      handleSizeChange(val) {
        // 每页显示条数改变处理
        this.listQuery.limit = val
        this.getList()
      },
      handleCurrentChange(val) {
        // 页码改变处理
        this.listQuery.page = val
        this.getList()
      },
      _getList() {
        // 设置表格loading效果
        this.loadingList = true
        // 请求表格数据
        getListEnquipment(this.listQuery).then(response => {
          // 设置表格数据
          this.list = response.data.items
          // 设置分页插件数据总数
          this.total = response.data.total
          // 取消表格loading效果
          this.listLoading = false
        })
      },
      _getListSupplier() {
        getListSupplier().then(response => {
          this.listSupplier = response.data.data
        })
      }
    }
  }
</script>

<style scoped>

</style>
