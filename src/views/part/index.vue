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
          label: 'label'
        },
        newLabel: '',
        curId: '',
        curLabel: '',
        // tree menu 相关
        treeDataMenu: []
      }
    },
    created() {
      this.fetchData()
    },
    methods: {
      fetchData() {
        this.treeLoading = true
        this._getTreeData()
      },
      handleEdit() {
        if (!this.newLabel) {
          return
        }
        this.treeLoading = true
        this.treeLoadingText = '保存中'
        setTimeout(() => {
          this.$message({
            type: 'success',
            message: '添加、编辑成功!'
          })
          // 获取数据
          this._getTreeData()
          this.treeLoading = false
        }, 1000)
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
      handleNodeClick(data) {
        console.log(data)
        this.curId = data.id
        this.curLabel = data.label
        this._getTreeDataMenu()
      },
      handleSubmitMenu() {
        //  s
      },
      handleResetMenu() {
        // s
        this.$refs.treeMenu.setCheckedKeys([])
      },
      _getTreeDataMenu() {
        setTimeout(() => {
          this.treeDataMenu = [
            {
              id: '1',
              label: '系统管理',
              isGroup: true,
              children: [
                {
                  id: '11',
                  label: '用户管理'
                },
                {
                  id: '12',
                  label: '角色管理'
                },
                {
                  id: '13',
                  label: '部门管理'
                }
              ]
            },
            {
              id: '2',
              label: '供应商管理',
              isGroup: true,
              children: [
                {
                  id: '21',
                  label: '功能1'
                },
                {
                  id: '22',
                  label: '功能2'
                },
                {
                  id: '23',
                  label: '功能3'
                }
              ]
            }
          ]
          this.tableLoading = false
        }, 1000)
      },
      _getTreeData() {
        setTimeout(() => {
          this.treeData = [
            {
              id: '0',
              label: '超级管理员'
            },
            {
              id: '1',
              label: '市级管理员'
            },
            {
              id: '2',
              label: '环检站管理员'
            }
          ]
          this.treeLoading = false
        }, 1000)
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
