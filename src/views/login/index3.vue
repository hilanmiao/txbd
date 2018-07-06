<template>
  <div class="login-container">
    <!--<div class="top">-->
      <!--<img src="/static/image/login_img_top.png"/>-->
    <!--</div>-->
    <div class="login-content">
      <div class="title">
        <h1>山东省DPF运行状态监控平台</h1>
        <h2>DPF operation status monitoring platform in Shandong Province</h2>
      </div>
      <div class="login">
        <input type="text" name="user" id="user" v-model="loginForm.username"/>
        <input type="password" name="key" id="key" v-model="loginForm.password"/>
        <input type="button" id="submit" value="登录" @click="handleLogin"/>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'login',
    data() {
      return {
        loginForm: {
          username: '',
          password: ''
        },
        loading: false
      }
    },
    methods: {
      handleLogin() {
        if (!this.loginForm.username || !this.loginForm.password) {
          this.$message({
            type: 'info',
            message: '账户名和密码不能为空'
          })
        } else {
          this.$store.dispatch('LoginByUsername', this.loginForm).then(() => {
            this.loading = false
            this.$router.push({
              path: '/home'
            })
          }).catch(() => {
            this.loading = false
          })
        }
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .login-container {
    position: absolute;
    width: 100%;
    height: 100%;
    font-family: Microsoft Yahei, "微软雅黑";
    font-size: 16px;
    margin: 0px;
    padding: 0px;
    background: url(/static/image/login_img_bg.jpg) no-repeat;
    background-size: cover;

    img {
      border: 0px;
    }

    * {
      margin: 0;
      padding: 0;
      border: 0;
      outline: 0;
      font-weight: inherit;
      font-style: inherit;
      font-size: 100%;
      font-family: inherit;
      text-decoration: none;
      box-sizing: border-box;
      -webkit-box-sizing: border-box;
      -moz-box-sizing: border-box;
    }

    .top {
      position: absolute;
      top: 0;
      left: 0;
    }

    .top img {
      width: 100%;
    }

    .login-content {
      position: fixed;
      right: 100px;
      top: 30%;
      .login {
        width: 680px;
        height: 370px;
        display: flex;
        flex-direction: column;
        align-items: center;
        background: url(/static/image/login_img_login.png) no-repeat;
      }

      .title {
        color: #0AA5FF;
        text-align: center;
        padding-bottom: 15px;
        h1 {
          font-size: 30px;
          font-weight: bold;
          letter-spacing: 5px;
        }
        h2 {
          padding-top: 5px;
          text-align: center;
          font-size: 14px;
        }
      }

      .login input {
        width: 260px;
        height: 37px;
        line-height: 36px;
        background: none;
        /*margin: 48px 0 0 240px;*/
        padding: 0 10px;
        /*display: block;*/
        color: #fff;
      }

      .login input#user {
        margin-top: 102px;
        margin-left: 140px;
      }

      .login input#key {
        margin-top: 50px;
        margin-left: 140px;
      }

      .login input#submit {
        width: 320px;
        margin-top: 50px;
        margin-left: 100px;
        cursor: pointer;
        font-size: 18px;
      }
    }
  }

</style>
