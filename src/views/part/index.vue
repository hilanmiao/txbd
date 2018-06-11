<template>
  <div class="app-container">
    <el-row :gutter="20">
      <el-col :span="8">
        <div class="filter-container" style="padding-bottom: 10px;">
          <div style="padding-bottom: 10px">
            <el-input style="width: 150px;" size="mini" class="filter-item" placeholder="新的角色名称" v-model="newLabel">
            </el-input>
            <el-button type="success" size="mini" icon="el-icon-edit" @click="handleCreate">添加</el-button>
          </div>
          <div>
            <el-input style="width: 150px;" size="mini" class="filter-item" placeholder="当前角色名称" v-model="curLabel">
            </el-input>
            <el-button :disabled="!curLabel" type="primary" size="mini" icon="el-icon-edit" @click="handleEdit">编辑
            </el-button>
            <el-button :disabled="!curLabel" type="danger" size="mini" icon="el-icon-search" @click="handleDelete">删除
            </el-button>
          </div>
        </div>
        <div class="tree-container"
             v-loading="treeLoading"
             element-loading-text="请稍等...">
          <el-tree style="height: 600px;"
                   ref="treeRole"
                   node-key="id"
                   :data="treeData"
                   :props="defaultProps"
                   highlight-current
                   @node-click="handleNodeClick"
          ></el-tree>
        </div>
      </el-col>
      <el-col :span="16">
        <div class="filter-container" style="padding-bottom: 10px;">
          <el-button type="info" size="mini" icon="el-icon-search" @click="handleResetMenu">重置选择</el-button>
        </div>

        <el-tree style="height: 600px;"
                 ref="treeMenu"
                 node-key="id"
                 show-checkbox
                 default-expand-all
                 :data="treeDataMenu"
                 :props="defaultProps"
                 highlight-current></el-tree>
      </el-col>
    </el-row>
  </div>
</template>

<script type="text/ecmascript-6">
  import {getListRole, postModelRole, putModelRole, deleteModelRole} from '@/api/part'
  import {asyncRouterMapRole} from '@/router'
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
        asyncRouterMapRole.forEach(item => {
          if (item.children) {
            const menuGroup = {}
            menuGroup.isGroup = true
            menuGroup.id = item.id
            menuGroup.name = item.name
            menuGroup.children = []
            item.children.forEach(child => {
              if (!child.hidden) {
                menuGroup.children.push({
                  id: child.id,
                  name: child.name
                })
              }
            })
            this.treeDataMenu.push(menuGroup)
          }
        })

        this.treeLoading = false
      },
      handleCreate() {
        if (!this.newLabel) {
          this.$message({
            type: 'error',
            message: '请输入要创建的角色'
          })
          return
        }
        this._postModelRole()
      },
      handleEdit() {
        if (!this.curLabel) {
          this.$message({
            type: 'error',
            message: '请输入要编辑的角色'
          })
          return
        }
        this._putModelRole()
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
            deleteModelRole(this.curId).then(response => {
              if (response.code === '204') {
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
      handleBeforeClose(done) {
        if (!this.submitLoading) {
          done()
        }
      },
      handleNodeClick(data) {
        this.curId = data.id
        this.curLabel = data.name
        this.treeData.some(item => {
          if (item.id === this.curId) {
            // 不能主动选中根节点
            const menu_ids = item.menu_ids.split(',')
            asyncRouterMapRole.forEach(role => {
              // 从原始路由过滤下是不是根节点
              const index = menu_ids.findIndex(id => role.id === parseInt(id))
              if (index > -1) {
                menu_ids.splice(index, 1)
              }
            })
            this.$refs.treeMenu.setCheckedKeys(menu_ids, false)
            return true
          }
        })
      },
      handleResetMenu() {
        // 清空
        this.$refs.treeMenu.setCheckedKeys([])
      },
      _getListRole() {
        // 重置
        this.curId = ''
        this.curLabel = ''
        this.newLabel = ''

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
            this.$nextTick(() => {
              // 清空
              this.$refs.treeMenu.setCheckedKeys([])
            })
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
        // 获取checked子节点数组
        const menus = this.$refs.treeMenu.getCheckedKeys(false).concat(this.$refs.treeMenu.getHalfCheckedKeys()).join(',')
        if (!menus.length) {
          this.$message({
            type: 'error',
            message: '请配置菜单权限'
          })
          return
        }
        this.treeLoading = true
        const tempModel = {
          rolename: this.newLabel,
          menus: menus,
          remark: '前端路由权限存储',
          email: '2222@qq.com',
          isSendEmail: '1'
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
          this.treeLoading = false
        })
      },
      _putModelRole() {
        // 获取checked子节点数组
        const menus = this.$refs.treeMenu.getCheckedKeys(false).concat(this.$refs.treeMenu.getHalfCheckedKeys()).join(',')
        console.log(menus)
        if (!menus.length) {
          this.$message({
            type: 'error',
            message: '请配置菜单权限'
          })
          return
        }
        this.treeLoading = true
        const tempModel = {
          id: this.curId,
          rolename: this.curLabel,
          menus: menus,
          remark: '前端路由权限存储',
          email: '2222@qq.com',
          isSendEmail: '1'
        }
        putModelRole(tempModel).then(response => {
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
          this.treeLoading = false
        })
      }
    }
  }
</script>

<style scoped>

</style>
