<template>
  <v-container fluid style="height: max-content;padding: 0 !important;">
    <!--背景图片-->
    <v-img
        class="background-img"
        justify-center
        src="../assets/images/bg-navigator.jpg"
    >
      <!--:src="this.isPhone ? require('../assets/images/bg-navigator.jpg'): require('../assets/images/bg-login.jpg')"-->
      <v-container justify-center :class="{ 'login-box-pc': !isPhone, 'login-box-phone': isPhone }">
        <v-card>
          <v-container>
            <h2>管理员登录</h2>
            <v-form
                ref="form"
                v-model="valid"
            >
              <v-text-field
                  v-model="name"
                  :rules="nameRules"
                  label="账户名"
                  required
              ></v-text-field>

              <v-text-field
                  v-model="password"
                  :rules="passwordRules"
                  label="密码"
                  type="password"
                  required
              ></v-text-field>

              <v-btn
                  id="confirm"
                  :disabled="!valid"
                  color="info"
                  @click="login"
              >
                登录
              </v-btn>

              <v-btn
                  id="reset"
                  color="error"
                  @click="reset"
              >
                清空
              </v-btn>
            </v-form>
          </v-container>
        </v-card>
      </v-container>
    </v-img>

    <!-- 顶部居中的提示框 -->
    <v-snackbar
        class="snackbar"
        v-model="snackbarShow"
        :color="snackBarColor"
        :timeout="2000"
        top
    >
      <v-icon color="white" class="mr-3">{{ snackbarIcon }}</v-icon>
      <div>{{ snackBarText }}</div>
      <v-icon @click="snackbarShow = false">mdi-close-circle</v-icon>
    </v-snackbar>
  </v-container>
</template>

<script>
import ILogin from '../api/ILogin';

export default {
  name: 'Login',
  data: () => ({
    isPhone: false,
    valid: true,
    name: '',
    nameRules: [
      v => !!v || '账号不能为空！'
    ],
    password: '',
    passwordRules: [
      v => !!v || '密码不能为空！'
    ],

    snackbarShow: false, // 是否显示提示框
    snackbarIcon: undefined, // 提示框中图标
    snackBarText: undefined, // 提示框中文字
    snackBarColor: undefined // 提示框主题颜色
  }),
  mounted () {
    // 先根据屏幕宽度判断设备类型
    this.onWidthChange();
    window.addEventListener('resize', this.onWidthChange);
    // 查看是否无需登陆
    if (localStorage.getItem('State') === 'isLogin') {
      this.$router.push('/home');
    }
  },
  methods: {
    onWidthChange () {
      // 根据宽度判断设备是否为手机
      this.isPhone = window.innerWidth <= 500;
    },
    // 登陆方法
    login () {
      if (this.$refs.form.validate()) {
        ILogin.mockAdminLogin(this.name, this.password).then(res => {
          if (res.code === 200) {
            if (res.msg === 'ok') {
              localStorage.setItem('State', 'isLogin');
              setTimeout(function () {
                this.$router.push('/home');
              }.bind(this), 300);
            } else {
              this.showErrorSnackbar(res.msg);
            }
          } else {
            this.showErrorSnackbar('请求失败，请稍后重试！');
          }
        });
        // if (this.name === 'networker' && this.password === '123') {
        //   this.$router.push('/home');
        // } else {
        //   alert('账号或密码错误啊喂！');
        // }
      }
    },
    reset () {
      this.$refs.form.reset();
    },
    /**
     * @author hxw
     * @des 展示指定样式的提示
     * @param {string} icon 'mdi-xxx'
     * @param {string} text 'hxwnb'
     * @param {string} color 'success'
     */
    showSnackbar (icon, text, color) {
      this.snackbarIcon = icon;
      this.snackBarText = text;
      this.snackBarColor = color;
      this.snackbarShow = true;
    },
    showSuccessSnackbar (text) {
      this.showSnackbar('mdi-checkbox-marked-circle', text, 'success');
    },
    showErrorSnackbar (text) {
      this.showSnackbar('mdi-alert', text, 'error');
    }
  }
};
</script>

<style lang="scss" scoped>
  .background-img{
    height: 100vh;
    width: 100vw;
  }
  .login-box-pc{
    width: 40%;
    margin-top: 10%;
    border-radius: 10px;
  }
  .login-box-phone{
    width: 65%;
    margin-top: 50%;
    border-radius: 10px;
  }
  #confirm{
    background-color: #2196f3;
    width: 10% !important;
    margin-right: 7px;
  }
  #reset{
    background-color: #ff5252;
    width: 10% !important;
    margin-left: 7px;
  }
  h2{
    text-align: center;
  }
</style>
