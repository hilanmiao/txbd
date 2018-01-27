<template>
  <div class="app-container">

    <div class="filter-container" style="padding-bottom: 10px;">
      <el-input style="width: 200px;" class="filter-item" placeholder="姓名">
      </el-input>
      <el-select value="" placeholder="请选择机构">
        <el-option
          v-for="item in departmentData"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
      <el-button type="primary" icon="el-icon-search" @click="handleSearch">搜索</el-button>
      <el-button type="primary" icon="el-icon-edit" @click="handleEdit({})">添加</el-button>
    </div>

    <div class="table-container">
      <el-table
        v-loading="tableLoading" element-loading-text="加载中..."
        :data="tableData"
        border
        stripe
        height="600"
        style="width: 100%">
        <el-table-column
          prop="loginName"
          label="登录账号"
          width="120">
        </el-table-column>
        <el-table-column
          prop="departmentName"
          label="机构名称"
          width="150">
        </el-table-column>
        <el-table-column
          prop="partName"
          label="角色"
          width="150">
        </el-table-column>
        <el-table-column
          prop="linkman"
          label="姓名"
          width="120">
        </el-table-column>
        <el-table-column
          prop="phone"
          label="电话"
          width="120">
        </el-table-column>
        <el-table-column
          prop="remark"
          label="备注">
        </el-table-column>
        <el-table-column
          fixed="right"
          label="操作"
          width="230">
          <template slot-scope="scope">
            <el-button size="mini" @click="handleView(scope.row)">查看</el-button>
            <el-button type="primary" size="mini" @click="handleEdit(scope.row)">编辑</el-button>
            <el-button type="danger" size="mini" @click="handleDelete(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <div class="pagination-container" style="margin-top: 20px">
      <el-pagination
        :page-sizes="[20, 40, 70, 100]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      >
      </el-pagination>
    </div>

    <div class="others-container">
      <el-dialog :visible.sync="visible" title="添加&编辑" :before-close="handleBeforeClose">
        <el-form ref="form" :model="form" label-width="80px">
          <el-form-item label="机构">
            <el-select v-model="form.department" placeholder="请选择">
              <el-option
                v-for="item in departmentData"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="角色">
            <el-select v-model="form.part" placeholder="请选择">
              <el-option
                v-for="item in partData"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="登录账号">
            <el-input v-model="form.loginName"></el-input>
          </el-form-item>
          <el-form-item label="姓名">
            <el-input v-model="form.linkman"></el-input>
          </el-form-item>
          <el-form-item label="电话">
            <el-input v-model="form.phone"></el-input>
          </el-form-item>
          <el-form-item label="备注">
            <el-input type="textarea" v-model="form.remark"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="handleSubmit" :loading="submitLoading">保存</el-button>
            <el-button @click="visible = false">取消</el-button>
          </el-form-item>
        </el-form>
      </el-dialog>

      <el-dialog :visible.sync="visibleView" title="查看">
        <el-form ref="form" :model="form" label-width="80px">
          <el-form-item label="机构名称">
            <el-input v-model="form.name" :disabled="true"></el-input>
          </el-form-item>
          <el-form-item label="联系人">
            <el-input v-model="form.linkman" :disabled="true"></el-input>
          </el-form-item>
          <el-form-item label="电话">
            <el-input v-model="form.phone" :disabled="true"></el-input>
          </el-form-item>
          <el-form-item label="备注">
            <el-input type="textarea" v-model="form.remark" :disabled="true"></el-input>
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
  export default {
    data() {
      return {
        // 列表相关
        tableData: [],
        tableLoading: false,
        // 表单相关
        form: {},
        submitLoading: false,
        visible: false,
        visibleView: false,
        // 分页相关
        start: 0,
        pageSize: 20,
        total: 400,
        // 搜索相关
        searchName: '',

        // 其他数据
        departmentData: [],
        partData: []
      }
    },
    created() {
      this.fetchData()
      this.getDepartmentData()
      this.getPartData()
    },
    methods: {
      fetchData() {
        this.tableLoading = true
        setTimeout(() => {
          this.tableData = [
            {
              id: '0',
              loginName: 'zhangsan',
              linkman: '张三',
              phone: '123456',
              remark: '这是济南市',
              department: '1',
              departmentName: '济南',
              part: '1',
              partName: '超级管理员'
            },
            {
              id: '1',
              loginName: 'lisi',
              linkman: '李四',
              phone: '123456',
              remark: '这是潍坊市',
              department: '2',
              departmentName: '潍坊',
              part: '2',
              partName: '市级管理员'
            }
          ]
          this.tableLoading = false
        }, 1000)
      },
      handleView(row) {
        this.form = row
        this.visibleView = true
      },
      handleEdit(row) {
        this.form = row
        this.visible = true
      },
      handleDelete(row) {
        this.form = row
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
      handleSearch() {
        this.fetchData()
      },
      handleSizeChange(val) {
        this.fetchData()
      },
      handleCurrentChange(val) {
        this.fetchData()
      },
      handleSubmit() {
        this.submitLoading = true
        // 提交数据
        setTimeout(() => {
          // 取消加载中
          this.submitLoading = false
          // 关闭dialog
          this.visible = false
        }, 2000)
      },
      handleBeforeClose(done) {
        if (!this.submitLoading) {
          done()
        }
      },
      getDepartmentData() {
        this.departmentData = [
          {
            value: '1',
            label: '济南'
          },
          {
            value: '2',
            label: '潍坊'
          },
          {
            value: '3',
            label: '北京'
          },
          {
            value: '4',
            label: '上海'
          }
        ]
      },
      getPartData() {
        this.partData = [
          {
            value: '1',
            label: '超级管理员'
          },
          {
            value: '2',
            label: '市级管理员'
          },
          {
            value: '3',
            label: '环检站'
          }
        ]
      },
      _getTableData() {
        //  hh
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
