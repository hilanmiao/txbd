<template>
  <div class="home-container">
    <div class="" style="padding-bottom: 10px;padding-top: 10px;">
      <el-row type="flex" justify="space-between">
        <el-col :span="16">
          <el-button-group>
            <el-button type="primary" icon="el-icon-location">定时定位车辆查询</el-button>
            <el-button type="primary" icon="el-icon-location">数据统计</el-button>
            <el-button type="primary" icon="el-icon-location">信息管理</el-button>
            <el-button type="primary" icon="el-icon-location">系统管理</el-button>
            <el-button type="primary" icon="el-icon-location">系统帮助</el-button>
          </el-button-group>
        </el-col>
        <el-col :span="8" style="text-align:right;">
          <el-button-group>
            <el-button type="primary" icon="el-icon-edit"></el-button>
            <el-button type="primary" icon="el-icon-share"></el-button>
            <el-button type="primary" icon="el-icon-delete"></el-button>
          </el-button-group>
        </el-col>
      </el-row>
    </div>
    <div>
      <el-row>
        <el-col :span="6">
          <div class="filter-container">

          </div>
          <div class="tree-container"
               v-loading="treeLoading"
               element-loading-text="加载中..." style="min-height: 600px;">
            <el-tree
                     ref="tree"
                     node-key="id"
                     show-checkbox
                     default-expand-all
                     :data="treeData"
                     :props="defaultProps"
                     highlight-current
                     @node-click="handleNodeClick"></el-tree>
          </div>
        </el-col>
        <el-col :span="18">
          <div class="map-container">
            <div id="mapDiv" class="map" style="height: 700px;">

            </div>
          </div>
          <div class="control">
            <div style="margin-top: 10px;">
              <el-button-group>
                <el-button type="text">事件报告 0</el-button>
                <el-button type="text">事件报告 0</el-button>
                <el-button type="text">事件报告 0</el-button>
                <el-button type="text">事件报告 0</el-button>
                <el-button type="text">事件报告 0</el-button>
                <el-button type="text">事件报告 0</el-button>
                <el-button type="text">事件报告 0</el-button>
                <el-button type="text">事件报告 0</el-button>
              </el-button-group>
            </div>
            <div style="margin-top: 10px">
              <el-tabs type="border-card">
                <el-tab-pane>
                  <span slot="label"><i class="el-icon-date"></i> 我的行程</span>
                  我的行程
                </el-tab-pane>
                <el-tab-pane label="消息中心">消息中心</el-tab-pane>
                <el-tab-pane label="角色管理">角色管理</el-tab-pane>
                <el-tab-pane label="定时任务补偿">定时任务补偿</el-tab-pane>
              </el-tabs>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>

  </div>
</template>

<script type="text/ecmascript-6">
  import T from 'T'

  export default {
    data() {
      return {
        // tree相关
        treeLoading: false,
        treeData: [],
        defaultProps: {
          children: 'children',
          label: 'label'
        }
      }
    },
    mounted() {
      this.drawMap()
      this.getTreeData()
    },
    methods: {
      drawMap() {
        const map = new T.Map('mapDiv')
        map.centerAndZoom(new T.LngLat(116.40769, 39.89945), 12)
      },
      handleNodeClick(data) {
        console.log(data)
      },
      getTreeData() {
        this.treeLoading = true
        setTimeout(() => {
          this.treeData = [
            {
              id: '0',
              label: '所有车辆',
              children: [
                {
                  id: '1',
                  label: '济南出租',
                  children: [
                    {
                      id: '11',
                      label: '鲁G809CP'
                    },
                    {
                      id: '12',
                      label: '鲁G808CP'
                    },
                    {
                      id: '13',
                      label: '鲁G807CP'
                    }
                  ]
                }
              ]
            }
          ]
          this.treeLoading = false
        }, 1000)
      }
    }
  }
</script>

<style scoped>

</style>
