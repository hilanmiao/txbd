<template>
  <div class="">
    <el-tabs type="border-card" @tab-click="tabClick">
      <el-tab-pane >
        <span slot="label"><i class="el-icon-date"></i>车辆信息</span>
        <template>
          <el-table
            ref="table1"
            :data="list1"
            height="88"
            border
            style="width: 100%"
          >
            <el-table-column
              class="text-smaller"
              prop="car_number"
              label="车牌号码">
            </el-table-column>
            <el-table-column
              prop="create_time"
              label="信息上传时间">
            </el-table-column>
            <el-table-column
              prop="car_model"
              label="车辆类型">
            </el-table-column>
            <el-table-column
              prop="car_status"
              label="车辆状态">
            </el-table-column>
            <el-table-column
              label="行驶速度">
              <template slot-scope="scope">
                <el-tag :type="scope.row.car_speed | speedFilter">{{scope.row.car_speed}}km/h</el-tag>
              </template>
            </el-table-column>
            <el-table-column
              prop="car_direction"
              label="方向">
            </el-table-column>
            <el-table-column
              label="经纬度">
              <template slot-scope="scope">
                {{scope.row.car_longitude + ',' + scope.row.car_latitude}}
              </template>
            </el-table-column>
          </el-table>
        </template>
      </el-tab-pane>
      <el-tab-pane>
        <span slot="label"><i class="el-icon-date"></i>车辆历史记录</span>
        <template>
          <el-table
            ref="table2"
            :data="list2"
            height="88"
            border
            style="width: 100%"
          >
            <el-table-column
              class="text-smaller"
              prop="car_number"
              label="车牌号码">
            </el-table-column>

            <el-table-column
              class="text-smaller"
              prop="car_number"
              label="车牌号码">
            </el-table-column>
            <el-table-column
              prop="create_time"
              label="信息上传时间">
            </el-table-column>
            <el-table-column
              prop="car_model"
              label="车辆类型">
            </el-table-column>
            <el-table-column
              prop="car_status"
              label="车辆状态">
            </el-table-column>
            <el-table-column
              label="行驶速度">
              <template slot-scope="scope">
                <el-tag :type="scope.row.car_speed | speedFilter">{{scope.row.car_speed}}km/h</el-tag>
              </template>
            </el-table-column>
            <el-table-column
              prop="car_direction"
              label="方向">
            </el-table-column>
            <el-table-column
              label="经纬度">
              <template slot-scope="scope">
                {{scope.row.car_longitude + ',' + scope.row.car_latitude}}
              </template>
            </el-table-column>
          </el-table>
        </template>
      </el-tab-pane>
      <el-tab-pane>
        <span slot="label"><i class="el-icon-date"></i>终端上报警情（预处警）</span>
        <template>
          <el-table
            ref="table3"
            :data="list3"
            height="88"
            border
            style="width: 100%"
          >
            <el-table-column
              class="text-smaller"
              prop="car_number"
              label="车牌号码">
            </el-table-column>
            <el-table-column
              class="text-smaller"
              prop="car_number"
              label="车牌号码">
            </el-table-column>
            <el-table-column
              class="text-smaller"
              prop="car_number"
              label="车牌号码">
            </el-table-column>
            <el-table-column
              prop="create_time"
              label="信息上传时间">
            </el-table-column>
            <el-table-column
              prop="car_model"
              label="车辆类型">
            </el-table-column>
            <el-table-column
              prop="car_status"
              label="车辆状态">
            </el-table-column>
            <el-table-column
              label="行驶速度">
              <template slot-scope="scope">
                <el-tag :type="scope.row.car_speed | speedFilter">{{scope.row.car_speed}}km/h</el-tag>
              </template>
            </el-table-column>
            <el-table-column
              prop="car_direction"
              label="方向">
            </el-table-column>
            <el-table-column
              label="经纬度">
              <template slot-scope="scope">
                {{scope.row.car_longitude + ',' + scope.row.car_latitude}}
              </template>
            </el-table-column>
          </el-table>
        </template>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    props: {
      listCar: {
        type: Array
      }
    },
    data() {
      return {
        list1: [],
        list2: [],
        list3: []
      }
    },
    watch: {
      listCar: function () {
        this.getData()
      }
    },
    created() {
      this.carData = [
        {
          id: '11',
          car_number: '鲁G809CP',
          car_model: '普通货车',
          createtime: '2018-1-30 12:30:33',
          car_status: '运营中',
          car_speed: 89,
          car_longitude: '116.988770',
          car_latitude: '36.661600',
          car_direction: '东偏北',
          dpf_status: '正常',
          t1: '120℃',
          t2: '200℃',
          t3: '80℃'
        },
        {
          id: '12',
          car_number: '鲁G6666',
          car_model: '普通货车',
          createtime: '2018-1-14 18:40:43',
          car_status: '运营中',
          car_speed: 99,
          car_longitude: '116.975770',
          car_latitude: '36.656540',
          car_direction: '东偏北',
          dpf_status: '正常',
          t1: '120℃',
          t2: '200℃',
          t3: '80℃'
        },
        {
          id: '13',
          car_number: '鲁G3726',
          car_model: '普通货车',
          createtime: '2018-1-28 07:16:55',
          car_status: '运营中',
          car_speed: 40,
          car_longitude: '117.007870',
          car_latitude: '36.670590',
          car_direction: '东偏北',
          dpf_status: '正常',
          t1: '120℃',
          t2: '200℃',
          t3: '80℃'
        },
        {
          id: '21',
          car_number: '鲁G1586CP',
          car_model: '普通货车',
          createtime: '2018-1-25 05:45:44',
          car_status: '运营中',
          car_speed: 60,
          car_longitude: '119.129220',
          car_latitude: '36.707650',
          car_direction: '东偏北',
          dpf_status: '正常',
          t1: '120℃',
          t2: '200℃',
          t3: '80℃'
        },
        {
          id: '22',
          car_number: '鲁G8986CP',
          car_model: '普通货车',
          createtime: '2018-1-29 01:55:29',
          car_status: '运营中',
          car_speed: 80,
          car_longitude: '119.198740',
          car_latitude: '36.726640',
          car_direction: '东偏北',
          dpf_status: '正常',
          t1: '120℃',
          t2: '200℃',
          t3: '80℃'
        },
        {
          id: '23',
          car_number: '鲁G1876CP',
          car_model: '普通货车',
          createtime: '2018-1-27 09:47:16',
          car_status: '运营中',
          car_speed: 120,
          car_longitude: '119.189470',
          car_latitude: '36.772030',
          car_direction: '东偏北',
          dpf_status: '正常',
          t1: '120℃',
          t2: '200℃',
          t3: '80℃'
        }
      ]
    },
    filters: {
      speedFilter(speed) {
        let speedTag = 'info'
        if (speed >= 80) {
          speedTag = 'warning'
        }
        if (speed >= 120) {
          speedTag = 'danger'
        }
        return speedTag
      }
    },
    methods: {
      tabClick(target) {
        console.log(target)
        this.$nextTick(() => {
          this.$refs.table1.doLayout()
          this.$refs.table2.doLayout()
          this.$refs.table3.doLayout()
        })
      },
      getData() {
        this.list1 = []
        this.list2 = []
        this.list3 = []
        this.listCar.forEach(id => {
          this.carData.some(item => {
            if (item.id === id) {
              this.list1.push(item)
              this.list2.push(item)
              this.list3.push(item)
              return true
            }
          })
        })
      }
    }
  }
</script>

<style scoped>

</style>
