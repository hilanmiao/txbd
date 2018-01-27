<template>
  <div class="app-container">

    <div class="filter-container" style="padding-bottom: 10px;">
      <el-input style="width: 200px;" class="filter-item" placeholder="名称">
      </el-input>
      <el-select value="" placeholder="下级平台类型">
        <el-option
          label="市级平台"
          value="">
        </el-option>
        <el-option
          label="供应商平台"
          value="李四">
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
          prop="name"
          label="下级平台名称"
          width="150">
        </el-table-column>
        <el-table-column
          prop="name"
          label="下级平台类型"
          width="150">
        </el-table-column>
        <el-table-column
          prop="name"
          label="名称"
          width="150">
        </el-table-column>
        <el-table-column
          prop="linkman"
          label="联系人"
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
        :page-size="listQuery.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      >
      </el-pagination>
    </div>

    <div class="others-container">
      <el-dialog :visible.sync="visibleEdit" title="添加&编辑" :before-close="handleBeforeClose">
        <el-form ref="form" :model="form" label-width="80px">
          <el-form-item label="下级平台名称">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item label="下级平台类型">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item label="名称">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item label="联系人">
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
            <el-button @click="visibleEdit = false">取消</el-button>
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
  // import {_getList,_postForm} from '@/api/supplier'

  export default {
    data() {
      return {
        // 列表相关
        tableData: [],
        tableLoading: false,
        listQuery: {
          // 其他搜索条件
          name: '',
          // 分页相关
          start: 0,
          pageSize: 20
        },
        total: 400,
        // 表单相关
        form: {},
        submitLoading: false,
        visibleEdit: false,
        visibleView: false
      }
    },
    created() {
      this.getList()
    },
    methods: {
      handleView(row) {
        this.form = row
        this.visibleView = true
      },
      handleEdit(row) {
        this.form = row
        this.visibleEdit = true
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
          this.visibleEdit = false
        }, 2000)
        // _postForm(this.name,this.phone).then(response => {
        // console.log('')
        // })
      },
      handleBeforeClose(done) {
        if (!this.submitLoading) {
          done()
        }
      },
      getList() {
        // 加载中动画
        this.tableLoading = true
        // _getList(this.listQuery).then(response => {
        //   this.tableData = response.data.items
        //   this.listLoading = false
        // })
        setTimeout(() => {
          this.tableData = [
            {
              id: '0',
              name: '济南',
              linkman: '张三',
              phone: '123456',
              remark: '这是济南市'
            },
            {
              id: '1',
              name: '潍坊',
              linkman: '李四',
              phone: '123456',
              remark: '这是潍坊市'
            }
          ]
          this.tableLoading = false
        }, 1000)
      }
    }
  }
</script>

<style scoped>

</style>
