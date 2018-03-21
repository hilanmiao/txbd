<template>
  <div class="app-container">


    <div>
      <h2 class="cenTitle">
        报警车辆信息
        <img style="margin-left: 10%" :src="iconfault">
        <span v-show="longTime" style="font-size:20px;color:#FF0000">离线时间过长</span>
        <span v-show="moreBig" style="font-size:20px;color:#FF0000">温度压力异常</span>
      </h2>
    </div>

    <el-row :gutter="20" class="backImg" :style="{backgroundImage: 'url(' + backimg + ')' }">
      <el-col :span="16">


        <div class="info">

          <el-col :span="20">


            <div class="centerDetail">

              <el-col :span="4">
                <img :src="imgcar" alt="">
              </el-col>

              <el-col :span="20">

                <div class="detalForm">
                  <table class="detalTable">
                    <tr>
                      <td><img :src="wartime"><span class="tableTit">预警时间:</span><span class="tableCon">{{form.warning_time}}</span>
                      </td>
                      <td></td>
                    </tr>
                    <tr>
                      <td><img :src="person"><span class="tableTit">车主姓名:</span><span class="tableCon">{{form.car_user_name}}</span>
                      </td>
                      <td><img :src="person"><span class="tableTit">车主电话:</span><span class="tableCon">{{form.car_user_phone}}</span>
                      </td>
                    </tr>
                    <tr>
                      <td><img :src="online"><span class="tableTit">在线率:</span><span class="tableCon">{{form.dpf_high_lines}}</span>
                      </td>
                      <td><img :src="online"><span class="tableTit">在线时长:</span><span class="tableCon">{{form.dpf_online_num}}</span>
                      </td>
                    </tr>
                    <tr>
                      <td><img :src="numberL"><span class="tableTit">里程数:</span><span class="tableCon">{{form.dpf_mileage_num}}</span>
                      </td>
                      <td><img :src="numberL"><span class="tableTit">维修次数:</span><span class="tableCon">{{form.dpf_maintain_num}}</span>
                      </td>
                    </tr>
                    <tr>
                      <td><img :src="title"><span class="tableTit">报警次数:</span><span class="tableCon">{{form.dpf_warning_num}}</span>
                      </td>
                      <td><img :src="address"><span class="tableTit">安装地址:</span><span class="tableCon">{{form.install_place_msg}}</span>
                      </td>
                    </tr>
                    <tr>
                      <td><img :src="person"><span class="tableTit">安装人姓名:</span><span class="tableCon">{{form.install_user_name}}</span>
                      </td>
                      <td><img :src="person"><span class="tableTit">安装人电话:</span><span class="tableCon">{{form.install_user_phone}}</span>
                      </td>
                    </tr>
                  </table>
                </div>
              </el-col>
            </div>

            <div style="padding-top:200px;width:100%;height:20%">
              <span style="margin-left:20px;font-weight:bold;color:#005B74">DPF异常信息描述:</span>
              <span class="description">{{form.dpfInfo}}</span>
            </div>

            <div style=" padding-right: 5px;">
              <div class="img-grid">
                <div>
                  <img :src="img_url_45" alt="">
                  45°照片
                </div>
                <div>
                  <img :src="before_install_img_url" alt="">
                  安装前照片
                </div>

                <div>
                  <img :src="after_install_img_url" alt="">
                  安装后照片
                </div>
              </div>
            </div>
          </el-col>
        </div>
      </el-col>


      <el-col :span="5">

        <el-form label-width="80px" style="margin-top: 50px;">
          <!-- <el-form-item style="margin-top: 50px;">-->

          <table style="width: 100%;margin-top:30%;">
            <tr>
              <td>
                <span style="color:#005B74">报警阀值</span>
              </td>
              <td>
                <el-select v-model="listQuery.afterdays" clearable placeholder="选择档位"
                           style="width: 100%;border: 2px solid #005B74;">
                  <el-option v-for="item in listGrade" :key="item.ID" :label="item.NAME"
                             :value="item.THRESHOLD">
                    <span style="float: left;color:#005B74">{{ item.NAME }}</span>
                    <span style="float: right; color: #005B74; font-size: 13px">{{ item.THRESHOLD }}天</span>
                  </el-option>
                </el-select>
              </td>
            </tr>
            <tr>
              <td>
                <span style="margin-top:30px;color:#005B74">标记</span>
              </td>
              <td>
                <el-input style="margin-top:30px;border: 2px solid #005B74;color:#005B74;" :rows="4" type="textarea"
                          v-model="listQuery.dispose_content"></el-input>
              </td>
            </tr>
          </table>

          <el-form-item style="margin-top:30px;">
            <el-button :style="{backgroundImage: 'url(' + btn1 + ')' }" @click="_doMark" round style="color:white">确认
            </el-button>
            <el-button style="border: 2px solid #005B74;color:#005B74" @click="_noHandle" round>暂不处理</el-button>
          </el-form-item>
        </el-form>

        <div class="remind">
          <img :src="dhPic">
          <span style="margin-top: 15px;color:#8492a6;font-weight:bold;">今日处理任务</span>
          <span style="font-size:40px;color:#FF0000">99</span>
        </div>

      </el-col>

    </el-row>


  </div>
</template>

<script type="text/ecmascript-6">
  import iconfault from '@/assets/warming_images/web/icon_fault.png'
  import backimg from '@/assets/warming_images/img_bg.png'
  import wartime from '@/assets/warming_images/web/icon_information4.png'
  import person from '@/assets/warming_images/web/icon_information6.png'
  import online from '@/assets/warming_images/web/icon_information7.png'
  import numberL from '@/assets/warming_images/web/icon_information9.png'
  import title from '@/assets/warming_images/web/icon_information3.png'
  import address from '@/assets/warming_images/web/icon_information2.png'
  import detail from '@/assets/warming_images/web/icon_information5.png'
  import btn1 from '@/assets/warming_images/img_button1.png'
  import btn2 from '@/assets/warming_images/img_button2.png'
  import dhPic from '@/assets/warming_images/dhpic.gif'
  import imgcar from '@/assets/warming_images/img_car.png'
  import {getWarning, noHandle, doMark} from '@/api/alarm'
  import {getDetail} from '@/api/time_threshold'
  import {getToken} from '@/utils/auth'

  export default {
    data() {
      return {
        // 图片
        iconfault, wartime, person, backimg, dhPic, btn1,
        imgcar, online, numberL, title, address, detail, btn2,
        listGrade: [],
        upImg: process.env.BASE_API + 'v1/unit/img?token=' + getToken(),
        longTime: false,
        moreBig: false,
        noWarming: true,
        listQuery: {
          dispose_content: '',
          afterdays: ''
        },
        form: {
          // id: '1231',
          // installId: '1',
          // dpfStatus: '0',
          // warning_time: '2018-3-6 09:21:00',
          // dpfInfo: '恶搞发生过撒广东省分公司的分公司东方故事大概',
          // car_user_name: '掌声那',
          // car_user_phone: '15656565656',
          // install_place_msg: '三等功SD敢达',
          // install_user_name: '是涤公',
          // install_user_phone: '11111111111',
          // dpf_warning_num: '3',
          // dpf_maintain_num: '1',
          // dpf_mileage_num: '23',
          // dpf_online_num: '12',
          // dpf_high_lines: '2'
          id: '',
          installId: '',
          dpfStatus: '',
          warning_time: '',
          dpfInfo: '',
          car_user_name: '',
          car_user_phone: '',
          install_place_msg: '',
          install_user_name: '',
          install_user_phone: '',
          dpf_warning_num: '',
          dpf_maintain_num: '',
          dpf_mileage_num: '',
          dpf_online_num: '',
          dpf_high_lines: ''
        },
        img_url_45: '',
        before_install_img_url: '',
        after_install_img_url: ''
      }
    },
    created() {
      this._getWarning()
      this.getGrade()
    },
    destroyed() {
      this._nono()
    },
    mounted() {
      window.addEventListener('beforeunload', e => this.beforeunloadHandler(e))
    },
    methods: {
      refresh() {
        this.form = {
          id: '',
          installId: '',
          dpfStatus: '',
          warning_time: '',
          dpfInfo: '',
          car_user_name: '',
          car_user_phone: '',
          install_place_msg: '',
          install_user_name: '',
          install_user_phone: '',
          dpf_warning_num: '',
          dpf_maintain_num: '',
          dpf_mileage_num: '',
          dpf_online_num: '',
          dpf_high_lines: ''
        }
      },
      beforeunloadHandler(e) {
        this._nono()
      },
      getGrade() {
        getDetail().then(responce => {
          if (responce.code === '200') {
            this.listGrade = responce.data
          } else {
            this.$message({
              type: 'error',
              message: '阀值:' + responce.message
            })
          }
        })
      },
      open() {
        this.$alert('<stong><el-icon class="el-icon-info"></el-icon>报警处理 <span style="color: greenyellow">成功</span></stong>', '操作提示', {
          confirmButtonText: '下一个',
          roundButton: true,
          dangerouslyUseHTMLString: true
        }).then(() => {
          this._getWarning()
        })
      },
      _getWarning() {
        getWarning().then(responce => {
          if (responce.code === '200') {
            this.$message({
              type: 'success',
              message: responce.message
            })
            this.form = responce.data
            this.img_url_45 = responce.data.img_url_45
            this.before_install_img_url = responce.data.before_install_img_url
            this.after_install_img_url = responce.data.after_install_img_url
            if (responce.data.dpfStatus === '0') {
              this.moreBig = false
              this.longTime = true
              this.noWarming = false
            } else if (responce.data.dpfStatus === '1') {
              this.moreBig = true
              this.longTime = false
              this.noWarming = false
            }
          } else {
            this.$message({
              type: 'error',
              message: responce.message
            })
            this.refresh()
            this.img_url_45 = ''
            this.before_install_img_url = ''
            this.after_install_img_url = ''
          }
        })
      },
      _noHandle() {
        if (this.form.id == null || this.form.id === '') {
          this.$message({
            type: 'error',
            message: '没有要处理信息'
          })
          return
        }
        noHandle(this.form.id).then(responce => {
          if (responce.code === '201') {
            this.$message({
              type: 'success',
              message: responce.message
            })
          } else {
            this.$message({
              type: 'error',
              message: responce.message
            })
          }
        })
        this._getWarning()
      },
      _nono() {
        if (this.form.id == null || this.form.id === '') {
          console.log('无数据，不需默认处理')
          return
        }
        noHandle(this.form.id).then(responce => {
          console.log('已将未操作数据，进行未处理操作')
        })
      },
      _doMark() {
        if (this.form.id == null || this.form.id === '') {
          this.$message({
            type: 'error',
            message: '没有要处理信息'
          })
          return
        }
        if (this.listQuery.afterdays === '') {
          this.$message({
            type: 'error',
            message: '请选择阀值'
          })
          return
        }
        doMark(this.listQuery, this.form.id).then(responce => {
          if (responce.code === '201') {
            this.$message({
              type: 'success',
              message: responce.message
            })
          } else {
            this.$message({
              type: 'error',
              message: responce.message
            })
          }
          this.$alert('报警处理成功，继续处理请按“下一个”操作按钮', '操作提示', {
            confirmButtonText: '下一个',
            roundButton: true,
            callback: action => {
              this._getWarning()
            }
          })
        })
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss">
  .backImg {
    background-repeat: no-repeat;
    //width:2000;
  }

  .centerDetail {
    padding-left: 10px;
    width: 100%;
    height: 60%;
  }

  .cenTitle {
    margin-top: 10px;
    text-align: center;
    color: #005B74;
    img {
      vertical-align: middle;
      margin-right: 10px;
    }
  }

  .tableTit {

    color: #C0C0C0;
  }

  .tableCon {
    color: #FF4B00;
  }

  .detalForm {
    width: 100%;
  }

  .detalTable {
    width: 100%;
    height: 400px;
    margin-left: 10%;
    td {
      img {
        vertical-align: middle;
        margin-right: 10px;
      }
    }
  }

  .description {
    border: 1px solid #005B74;
    width: 700px;
    padding: 15px;
    background-color: #E4F0F2;
    color: #0094BE;
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
    display: flex;
    width: 100%;
    img {
      width: 200px;
      height: 200px;
    }
    div {
      margin: 50px;
      text-align: center;
      color: #005B74;
      font-weight: bold;

    }
  }

  .remind {
    display: flex;
    position: absolute;
    margin-top: 120px;
    margin-left: 70px;
    img {
      vertical-align: middle;
    }
  }

</style>
