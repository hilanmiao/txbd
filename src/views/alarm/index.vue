<template>
  <div class="app-container">
    <el-row :gutter="20">
      <el-col :span="16">
        <el-card>
          <div>
            <h3 style="margin-top: 0;text-align: center;">
              <img :src="logo" alt="" style="width:40px;height: 40px;">
              报警车辆信息
            </h3>
          </div>
          <div class="info">
            <div style=" padding-right: 5px;border-right: 1px dashed #ccc;">
              <div class="img-grid">
                45°照片：<br>
                <img src="http://img.qc188.com/oledit/uploadfile/2017/03/13/20170313085934733.jpg" alt="">
                安装前照片：<br>
                <img src="http://img.qc188.com/oledit/uploadfile/2017/03/13/20170313085934605.jpg" alt="">
                安装后照片：<br>
                <img src="http://img.qc188.com/oledit/uploadfile/2017/03/13/20170313085934840.jpg" alt="">
              </div>
              <div style="margin-top: 10px;width: 210px;color: #999;">
                报警类别：
                <el-tag type="danger">dpf设备异常</el-tag>
              </div>
            </div>
            <div style="padding-left: 10px">
              <el-col :span="8">
                <p>车牌号码：鲁G809CP</p>
                <p>设备编号：7684653531</p>
                <p>车主姓名：张三</p>
                <p>在线率：60%</p>
                <p>历程统计：44000km</p>
              </el-col>
              <el-col :span="8">
                <p>经纬度：123,654</p>
                <p>定位时间：2018-01-01 17:18:17</p>
                <p>报警次数：11</p>
                <p>安装人姓名：李斯特所</p>
                <p>安装人电话：1835686678</p>
              </el-col>
              <el-col :span="8">
                <p>t1：500℃</p>
                <p>t2：500℃</p>
                <p>t2：500℃</p>
                <p>p1：256帕</p>
                <p>p2：256帕</p>
              </el-col>
              <el-form ref="form" label-width="90px">
                <el-form-item label="车牌号码:">
                  <el-col :span="10">
                    鲁G809CP
                  </el-col>
                  <el-col :span="3">车牌号码:</el-col>
                  <el-col :span="8">
                    鲁G809CP
                  </el-col>
                </el-form-item>
                <el-form-item label="设备编号:">
                  <el-col :span="10">
                    1234567897
                  </el-col>
                  <el-col :span="3">行驶速度:</el-col>
                  <el-col :span="8">
                    120km/h
                  </el-col>
                </el-form-item>
                <el-form-item label="经纬度">
                  <el-col :span="10">
                    222,254
                    <!--<el-input value="鲁G809CP" :disabled="true"></el-input>-->
                  </el-col>
                  <el-col :span="3">定位时间</el-col>
                  <el-col :span="8">
                    2018-08-01 11:11:32
                    <!--<el-input value="鲁G809CP" :disabled="true"></el-input>-->
                  </el-col>
                </el-form-item>
                <el-form-item label="t1">
                  <el-col :span="5">
                    <el-input value="鲁G809CP" :disabled="true"></el-input>
                  </el-col>
                  <el-col :span="2">t2</el-col>
                  <el-col :span="5">
                    <el-input value="鲁G809CP" :disabled="true"></el-input>
                  </el-col>
                  <el-col :span="2">t3</el-col>
                  <el-col :span="5">
                    <el-input value="鲁G809CP" :disabled="true"></el-input>
                  </el-col>
                </el-form-item>
                <el-form-item label="p1">
                  <el-col :span="6">
                    <el-input value="鲁G809CP" :disabled="true"></el-input>
                  </el-col>
                  <el-col :span="2">p2</el-col>
                  <el-col :span="6">
                    <el-input value="鲁G809CP" :disabled="true"></el-input>
                  </el-col>
                </el-form-item>
                <el-form-item label="车主姓名">
                  <el-col :span="10">
                    <el-input value="鲁G809CP" :disabled="true"></el-input>
                  </el-col>
                  <el-col :span="3">出电话</el-col>
                  <el-col :span="8">
                    <el-input value="鲁G809CP" :disabled="true"></el-input>
                  </el-col>
                </el-form-item>
                <el-form-item label="在线率">
                  <el-col :span="10">
                    <el-input value="鲁G809CP" :disabled="true"></el-input>
                  </el-col>
                  <el-col :span="3">在线时长</el-col>
                  <el-col :span="8">
                    <el-input value="鲁G809CP" :disabled="true"></el-input>
                  </el-col>
                </el-form-item>
                <el-form-item label="里程数">
                  <el-col :span="10">
                    <el-input value="鲁G809CP" :disabled="true"></el-input>
                  </el-col>
                  <el-col :span="3">维修次数</el-col>
                  <el-col :span="8">
                    <el-input value="鲁G809CP" :disabled="true"></el-input>
                  </el-col>
                </el-form-item>
                <el-form-item label="报警次数">
                  <el-col :span="10">
                    <el-input value="鲁G809CP" :disabled="true"></el-input>
                  </el-col>
                  <el-col :span="3">安装地址</el-col>
                  <el-col :span="8">
                    <el-input value="鲁G809CP" :disabled="true"></el-input>
                  </el-col>
                </el-form-item>
                <el-form-item label="安装人姓名">
                  <el-col :span="10">
                    <el-input value="鲁G809CP" :disabled="true"></el-input>
                  </el-col>
                  <el-col :span="4">安装人电话</el-col>
                  <el-col :span="10">
                    <el-input value="鲁G809CP" :disabled="true"></el-input>
                  </el-col>
                </el-form-item>
              </el-form>
            </div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card>
          <el-form label-width="80px">
            <el-form-item label="报警阀值">
              <el-select value="" placeholder="选择档位">
                <el-option label="3天" value=""></el-option>
                <el-option label="10天" value="1"></el-option>
                <el-option label="20天" value="1"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="标记">
              <el-input type="textarea"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="success" @click="open">确认</el-button>
              <el-button>暂不处理</el-button>
            </el-form-item>
          </el-form>
        </el-card>
      </el-col>
    </el-row>
    <div class="remind">
      TODO: 动画效果
      今日处理任务
      <div>123</div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import logo from '@/assets/home_images/img_logo.png'

  export default {
    data() {
      return {
        // 图片
        logo
      }
    },
    methods: {
      open() {
        this.$alert('<stong><el-icon class="el-icon-info"></el-icon>报警处理 <span style="color: greenyellow">成功</span></stong>', '操作提示', {
          confirmButtonText: '下一个',
          roundButton: true,
          dangerouslyUseHTMLString: true
        })
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss">
  .el-table .warning-row {
    background: oldlace;
  }

  .el-table .success-row {
    background: #f0f9eb;
  }

  .info {
    display: flex;
  }

  .logo {
    display: flex;
    align-items: center;
    img {
      width: 40px;
      height: 40px;
    }
  }

  .img-grid {
    width: 210px;
    img {
      width: 200px;
      height: 200px;
    }
  }

  .remind {
    display: flex;
    position: absolute;
    bottom: 40px;
    right: 60px;
  }

</style>
