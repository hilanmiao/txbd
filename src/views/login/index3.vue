<template>
  <div class="login-container">
    <div class="top">
      <img src="/static/image/login_img_top.png"/>
    </div>
    <div class="login">
      <h1>山东省DPF运行状态监控平台</h1>
      <h2>Monitoring platform for DPF operation status of Shandong Province</h2>
      <input type="text" name="user" id="user" v-model="loginForm.username"/>
      <input type="password" name="key" id="key" v-model="loginForm.password"/>
      <input type="button" id="submit" value="登录" @click="handleLogin"/>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'login',
    data() {
      return {
        loginForm: {
          username: 'admin',
          password: '1'
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

    .login {
      width: 689px;
      height: 344px;
      margin: 18% auto 0;
      background: url(/static/image/login_img_login.png) no-repeat;
    }

    .login h1 {
      text-align: center;
      font-size: 25px;
      color: #f3ac10;
      font-weight: bold;
      padding-top: 15px;
    }

    .login h2 {
      text-align: center;
      font-size: 12px;
      color: #f3ac10;
    }

    .login input {
      width: 260px;
      height: 36px;
      line-height: 36px;
      background: none;
      margin: 48px 0 0 240px;
      padding: 0 10px;
      display: block;
      color: #fff;
    }

    .login input#key {
      margin-top: 50px;
    }

    .login input#submit {
      width: 320px;
      margin: 56px 0 0 184px;
      cursor: pointer;
      font-size: 18px;
    }
  }

</style>
