<template>
  <div class="login-container">

    <div class="content">
      <img :src="img_pic1"/>
      <div class="login">
        <img :src="img_logo"/>
        <div>
          <p style="padding-top: 0;">
            <img :src="img_username"/>
            <input type="text" v-model="loginForm.username" placeholder="请输入用户名" style="background-color: transparent"/>
          </p>
          <p>
            <img :src="img_key"/>
            <input type="password" v-model="loginForm.password" placeholder="请输入密码"/>
          </p>
          <p>
            <button @click="handleLogin">登录</button>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import img_key from '@/assets/home_images/img_key.png'
  import img_bg from '@/assets/home_images/img_bg.png'
  import img_logo from '@/assets/home_images/img_logo.png'
  import img_pic1 from '@/assets/home_images/img_pic1.png'
  import img_pic2 from '@/assets/home_images/img_pic2.png'
  import img_pic3 from '@/assets/home_images/img_pic3.png'
  import img_pic4 from '@/assets/home_images/img_pic4.png'
  import img_username from '@/assets/home_images/img_username.png'

  export default {
    name: 'login',
    data() {
      return {
        loginForm: {
          username: 'admin',
          password: '1'
        },
        loading: false,
        img_key,
        img_bg,
        img_logo,
        img_pic1,
        img_pic2,
        img_pic3,
        img_pic4,
        img_username
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
    height: 100%;
    width: 100%;
    position: absolute;
    padding: 0;
    margin: 0;
    background: url('../../assets/home_images/img_bg.png') no-repeat;
    background-size: cover;
  }

  .white {
    color: #fff
  }

  .content > img {
    display: block;
    width: 40%;
    margin-top: 7%;
    margin-left: 5%;
  }

  .login {
    background: url('../../assets/home_images/img_pic2.png') no-repeat;
    margin-top: 6%;
    width: 965px;
    height: 421px;
    padding: 90px 0 0 94px;
  }

  .login > img {
    float: left;
    padding-top: 40px;
  }

  .login div {
    display: inline-block;
    width: 650px;
    padding-left: 80px;
  }

  .login div p {
    clear: both;
    padding-top: 30px;
    display: table;
    margin: 0;
  }

  .login div img {
    float: left;
  }

  .login div input {
    float: left;
    background: url('../../assets/home_images/img_pic3.png') no-repeat;
    border: 0;
    height: 55px;
    width: 420px;
    margin-left: 8px;
    padding: 0 10px;
    color: #fff !important;
    font-size: 16px;
    background-color: transparent !important;
  }

  :-moz-placeholder {
    color: #fff;
    font-size: 16px;
  }

  ::-moz-placeholder {
    color: #fff;
    font-size: 16px;
  }

  input:-ms-input-placeholder {
    color: #fff;
    font-size: 16px;
  }

  input::-webkit-input-placeholder {
    color: #fff;
    font-size: 16px;
  }

  button {
    background: url('../../assets/home_images/img_pic4.png') no-repeat;
    height: 55px;
    width: 483px;
    border: 0;
    color: #fff;
    font-size: 20px;
    margin-top: 13px;
    cursor: pointer;
  }

  @media only screen and (max-width: 1440px) {
    .login {
      width: 650px;
      height: 320px;
      padding: 50px 0 0 44px;
      background: url('../../assets/home_images/img_pic2.png') no-repeat;
      background-size: 100% 100%;
    }
    .login div {
      width: 420px;
      padding-left: 40px;
    }
    .login div input {
      width: 300px;
      background: url('../../assets/home_images/img_pic3.png') no-repeat;
    }
    button {
      width: 363px;
      margin-top: 3px;
    }
  }

</style>
