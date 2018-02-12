<template>
  <div class="app-container">
    <el-row :gutter="20">
      <el-col :span="8">
        <div class="filter-container" style="padding-bottom: 10px;">
          <div>当前选择角色：{{curLabel}}</div>
          <el-input style="width: 150px;" size="mini" class="filter-item" placeholder="当前选择角色" v-model="newLabel">
          </el-input>
          <el-button type="primary" size="mini" icon="el-icon-edit" @click="handleEdit">添加、编辑</el-button>
          <el-button type="danger" size="mini" icon="el-icon-search" @click="handleDelete">删除</el-button>
          <el-button type="info" size="mini" icon="el-icon-search" @click="handleReset">重置</el-button>
        </div>
        <div class="tree-container"
             v-loading="treeLoading"
             element-loading-text="加载中...">
          <el-tree style="height: 600px;"
                   ref="tree"
                   node-key="id"
                   :data="treeData"
                   :props="defaultProps"
                   highlight-current
                   @node-click="handleNodeClick"></el-tree>
        </div>
      </el-col>
      <el-col :span="16">
        <div class="filter-container" style="padding-bottom: 10px;">
          <el-button type="primary" size="mini" icon="el-icon-edit" @click="handleSubmitMenu">保存授权</el-button>
          <el-button type="info" size="mini" icon="el-icon-search" @click="handleResetMenu">重置选择</el-button>
        </div>

        <el-tree style="height: 600px;"
                 ref="treeMenu"
                 node-key="id"
                 show-checkbox
                 default-expand-all
                 :data="treeDataMenu"
                 :props="defaultProps"
                 highlight-current
                 @node-click="handleNodeClick"></el-tree>
      </el-col>
    </el-row>
  </div>
</template>

<script type="text/ecmascript-6">
  import {getListRole, postModelRole} from '@/api/part'
  import {asyncRouterMap} from '@/router'
  import {getToken} from '@/utils/auth'

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

        // tree相关
        treeLoading: false,
        treeData: [],
        defaultProps: {
          children: 'children',
          label: 'name'
        },
        newLabel: '',
        curId: '',
        curLabel: '',
        // tree menu 相关
        treeDataMenu: []
      }
    },
    created() {
      // 获取权限列表
      this._getListRole()
      // 获取菜单列表
      this.createMenuList()
    },
    methods: {
      createMenuList() {
        this.treeLoading = true
        // 过滤路由表，生成菜单树
        asyncRouterMap.forEach(item => {
          if (item.children) {
            const menuGroup = {}
            menuGroup.isGroup = true
            menuGroup.id = item.id
            menuGroup.name = item.name
            menuGroup.children = []
            item.children.forEach(child => {
              menuGroup.children.push({
                id: child.id,
                name: child.name
              })
            })
            this.treeDataMenu.push(menuGroup)
          }
        })

        this.treeLoading = false
      },
      handleEdit() {
        if (!this.newLabel) {
          return
        }
        this.treeLoading = true
        this.treeLoadingText = '保存中'
        if (!this.curLabel) {
          this._postModelRole()
        } else {
          this._postModelRole()
        }
      },
      handleDelete() {
        if (!this.curId) {
          this.$message({
            type: 'info',
            message: '未选择任何节点'
          })
        } else {
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
        }
      },
      handleReset() {
      },
      handleSubmit() {
        this.submitLoading = true
        // 提交数据
        this._postModelRole()
      },
      handleBeforeClose(done) {
        if (!this.submitLoading) {
          done()
        }
      },
      handleNodeClick(data) {
        console.log(data)
        this.curId = data.id
        this.curLabel = data.name
      },
      handleSubmitMenu() {
        // s
      },
      handleResetMenu() {
        // s
        this.$refs.treeMenu.setCheckedKeys([])
      },
      _getListRole() {
        this.treeData = []
        this.treeLoading = true
        // 请求表格数据
        const params = {
          token: getToken(),
          limit: 1000,
          offset: 0
        }
        getListRole(params).then(response => {
          if (response.code === '200') {
            this.treeData = response.data
          } else {
            this.$message({
              type: 'error',
              message: response.message
            })
          }
          this.treeLoading = false
        })
      },
      _postModelRole() {
        const tempModel = {
          token: getToken(),
          rolename: this.newLabel,
          menus: 'test',
          remark: 'test'
        }
        postModelRole(tempModel).then(response => {
          if (response.code === '201') {
            // 弹出提醒信息
            this.$message({
              type: 'success',
              message: '操作成功!'
            })
            // 重新请求数据(带着原先的查询参数)
            this.treeData = []
            this._getListRole()
          } else {
            this.$message({
              type: 'error',
              message: response.message
            })
          }
          // 取消加载中
          this.loadingSubmit = false
          // 关闭dialog
          this.dialogFormVisible = false
        })
      }
    }
  }
</script>

<style scoped>

</style>
